// MAPBIOMAS PAMPA
// COLLECTION 02
// AUTHOR: Juliano Schirmbeck
// UPDATED: Oct 2024
// Script para fazer ajuste fino da classificação das regiões
 
// Baseado na versao R0X feita pelo Juliano, customizada para calcular a area pelo limite sem buffer
// customizada para incluir mosaico com duas versões de bandas RGB falsa cor

// =================================================================================================================
//                                    DEFINITIONS:
// =================================================================================================================
// Variáveis para usar ao exportar o asset
var dirout = 'projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/class_s2_col_01/';
var version_out = '05' // mudar a cada nova versao que for exportada

// ----------------------------------------------------------------------
// Versões das amostras
var versao_pt = 'SENTINEL2_v2'; 

// Região e coleção do Sentinel
var regiao = 7
var collection_out = 1 
var bioma = 'PAMPA' 
// -----------------------------------------------------------------------
// Define ano de comparação e classe - imagem de diferença
var ano_compara = 2020
// Define as classes a serem comparadas
var classes_list = [12]

// Define a versão anterior para plotar nos gráficos
var versao_ante = "1"

// Flags
var calc_area = 1
// -----------------------------------------------------------------------
// Pocentagens calculadas no for de anos
var nSamplesMin = 80;
var nSamplesMax = 2000;

var RFtrees = 100 //60, 100  
var desvio = 0

// ----------------------------------------------------------------------
// Define os parâmetros de visualização
var palettes = require('users/mapbiomas/modules:Palettes.js');
// Vis coll 08
var vis = { 'min': 0, 'max': 62,  'palette': palettes.get('classification8')};
var visParMedian2 = {'bands':['nir_median','swir1_median','red_median'], 'gain':[0.06, 0.08,0.2],'gamma':0.5 };
// Parâmetros de visualização da imagem de diferença
var vischange = {"min": 0, "max": 3,
        "palette": "ffffff,ff0000,e6f919,aaaaaa",    //amarelo=e6f919    magenta=bb34c0
        "format": "png"
}
// =================================================================================================================
//                                    ASSETS:
// =================================================================================================================
// Local dos mosaicos e das amostras
var  dirasset =   'projects/mapbiomas-mosaics/assets/SENTINEL/BRAZIL/mosaics-3'
//pontos estaveis com propriedades
var dirsamples = 'projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/SAMPLES/';

// Mosaicos com a segmentação
var S2_cluster_evi = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/S2_clusters_2016_2023_evi_80')
var S2_cluster_ndvi = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/S2_clusters_2016_2023_ndvi_20')

// Limites do PAMPA com buffer
var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col09_buff')
var limite = regioesCollection.filter(ee.Filter.eq('ID', regiao));

// Limite sem o buffer  
var regioesCollection2 = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05')
var limite2 = regioesCollection2.filter(ee.Filter.eq('ID', regiao));

// Raster limite do PAMPA 
var limite_reg_raster = ee.Image('projects/mapbiomas-workspace/AUXILIAR/PAMPA/Pampa_regions_col5_raster_buff')
var mask_regiao = limite_reg_raster.eq(regiao).selfMask()
Map.centerObject(mask_regiao, 6)

// Filtra o mosaico                        
var collection = ee.ImageCollection(dirasset)
    .filter(ee.Filter.eq('version', "3"))
    .filter(ee.Filter.eq('biome', "PAMPA"));
// print('mosaicos', collection)

// Define a região e os anos
limite = limite.geometry(100)
var anos = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

// =================================================================================================================
//                                    CLASSIFICATION:
// =================================================================================================================
for (var i_ano=0;i_ano<anos.length; i_ano++){
  var ano = anos[i_ano];
 
 if (ano <= 2019){
  // Define o percentual de cada classe
  // var percent_Flo = -67.15    + 20 + ano *  0.03533
  var percent_Flo = 19
  // var percent_Umi =   8.23	  + desvio + ano * -0.00086
  var percent_Umi = 18
  // var percent_Cam =-168.52    + 5 + ano *  0.09066
  var percent_Cam = 17
  // var percent_Agr = 230.34    + desvio + ano * -0.09970
  var percent_Agr = 57
  var percent_Anv = 20
  // var percent_Anv =  58.27	  + desvio + ano * -0.02647
  // var percent_Afr =   0.00000 + desvio + ano *  0.00000
  // var percent_Agu =  38.84	  + desvio + ano *  0.00103
  var percent_Agu = 40
}  
  // // Exemplos de blocos - colar o bloco dentro e ativar *******************
  
  // if (ano > 2018 && ano <= 2020){ 
  //  .... bloco de amostras aqui
  // }

 if (ano > 2019){
  var percent_Flo = 19
  // var percent_Umi =   8.23	  + desvio + ano * -0.00086
  var percent_Umi = 18
  // var percent_Cam =-168.52    + 5 + ano *  0.09066
  var percent_Cam = 14
  // var percent_Agr = 230.34    + desvio + ano * -0.09970
  var percent_Agr = 59
  var percent_Anv = 24
  // var percent_Anv =  58.27	  + desvio + ano * -0.02647
  // var percent_Afr =   0.00000 + desvio + ano *  0.00000
  // var percent_Agu =  38.84	  + desvio + ano *  0.00103
  var percent_Agu = 40
  }
  // // ********************************************************************
  
  // Nomes das bandas dos mosaicos
  var bandNames = ee.List([ 'afvi_median', 'afvi_median_dry', 'afvi_median_wet', 'avi_median', 'avi_median_dry','avi_median_wet', 
                          'awei_median', 'awei_median_dry', 'awei_median_wet',
                          'blue_median', 'blue_median_dry', 'blue_median_wet', 'blue_stdDev', 
                          'brba_median', 'brba_median_dry', 'brba_median_wet', 'bsi_median', 'bsi_median_1', 'bsi_median_2',
                          'brightness_median', 'brightness_median_dry', 'brightness_median_wet', 
                          'clusters_'+ano, 'clusters_'+ano+'_1', 'co2flux_median', 
                          'cvi_median', 'cvi_median_dry', 'cvi_median_wet', 
                          'dswi5_median', 'dswi5_median_dry', 'dswi5_median_wet', 
                          'evi_median', 'evi_median_'+ano, 'evi_median_dry', 'evi_median_wet', 
                          'gcvi_median', 'gcvi_median_dry', 'gcvi_median_wet', 
                          'gemi_median', 'gemi_median_dry', 'gemi_median_wet', 'gli_median', 'gli_median_dry', 'gli_median_wet', 
                          'green_median', 'green_median_dry', 'green_median_texture', 'green_median_wet', 'green_min', 'green_stdDev', 
                          'gvmi_median', 'gvmi_median_1', 'gvmi_median_dry', 'gvmi_median_dry_1', 'gvmi_median_wet', 'gvmi_median_wet_1', 
                          'iia_median', 'iia_median_dry', 'iia_median_wet', 
                          'lai_median', 'latitude', 'longitude', 'lswi_median', 'lswi_median_dry', 'lswi_median_wet', 
                          'mbi_median', 'mbi_median_dry', 'mbi_median_wet', 'msi_median', 'msi_median_dry', 'msi_median_wet', 
                          'nddi_median', 'nddi_median_dry', 'nddi_median_wet', 'ndwi_median', 'ndwi_median_dry', 'ndwi_median_wet',
                          'ndvi_median', 'ndvi_median_'+ano, 'ndvi_median_dry', 'ndvi_median_wet', 
                          'nir_median', 'nir_median_contrast', 'nir_median_dry', 'nir_median_dry_contrast', 'nir_median_wet', 'nir_stdDev', 
                          'osavi_median', 'osavi_median_dry', 'osavi_median_wet', 'ratio_median', 'ratio_median_dry', 'ratio_median_wet', 
                          'red_edge_1_median', 'red_edge_1_median_dry', 'red_edge_1_median_wet', 'red_edge_1_stdDev', 
                          'red_edge_2_median', 'red_edge_2_median_dry', 'red_edge_2_median_wet', 'red_edge_2_stdDev', 
                          'red_edge_3_median', 'red_edge_3_median_dry', 'red_edge_3_median_wet', 'red_edge_3_stdDev', 
                          'red_edge_4_median', 'red_edge_4_median_dry', 'red_edge_4_median_wet', 'red_edge_4_stdDev',
                          'red_median', 'red_median_contrast', 'red_median_dry', 'red_median_dry_contrast', 'red_median_wet', 'red_min', 'red_stdDev', 
                          'ri_median', 'ri_median_dry', 'ri_median_wet', 'rvi_median', 'rvi_median_1', 'rvi_median_wet', 
                          'shape_median', 'shape_median_dry', 'shape_median_wet', 'spri_median', 'spri_median_1', 'spri_median_wet', 
                          'swir1_median', 'swir1_median_dry', 'swir1_median_wet', 'swir1_stdDev', 
                          'swir2_median', 'swir2_median_dry', 'swir2_median_wet', 'swir2_stdDev', 
                          'ui_median', 'ui_median_dry', 'ui_median_wet', 'wetness_median', 'wetness_median_dry', 'wetness_median_wet', 
                          'ana_slope', 'merit_slope', 'hand'
  ])
  
  // Nomes das bandas dos mosaicos
  var bandNames_selected = ee.List(['longitude', 'ana_slope', 'evi_median_'+ano, 'latitude', 'blue_median', 'evi_median', 
                                'ndvi_median_'+ano, 'gcvi_median_wet', 'gvmi_median_dry', 'hand', 'ndvi_median_dry', 
                                'red_edge_3_median_wet', 'brba_median', 'evi_median_dry', 'gemi_median', 'swir1_stdDev', 
                                'ui_median', 'brba_median_dry', 'evi_median_wet', 'gcvi_median_dry', 'mbi_median_dry', 
                                'mbi_median_wet', 'msi_median_dry', 'ratio_median_wet', 'red_edge_1_median_dry', 
                                'red_edge_4_stdDev', 'rvi_median', 'wetness_median', 'bsi_median', 'cvi_median', 
                                'green_median_texture', 'green_min', 'gvmi_median_1', 'gvmi_median_dry_1', 'nddi_median', 
                                'osavi_median_wet', 'ratio_median', 'red_median_dry', 'ri_median', 'shape_median', 
                                'spri_median', 'swir2_stdDev', 'wetness_median_dry', 'avi_median_dry', 'brba_median_wet', 
                                'brightness_median', 'dswi5_median_wet', 'gemi_median_dry', 'gli_median_wet', 'gvmi_median_wet_1', 
                                'iia_median', 'iia_median_dry', 'iia_median_wet', 'lai_median', 'lswi_median_dry', 'lswi_median_wet', 
                                'mbi_median', 'nddi_median_dry', 'ndvi_median', 'ndwi_median_wet', 'nir_median_wet', 'ratio_median_dry', 
                                'red_edge_1_median_wet', 'red_edge_1_stdDev', 'red_edge_4_median_dry', 'rvi_median_1', 'shape_median_wet', 
                                'swir1_median_dry', 'swir1_median_wet', 'swir2_median_wet', 'ui_median_dry'])
  
  var bandNames_used = bandNames_selected
  
  // Filtra o ano e faz o mosaico da coleção
  var mosaicoTotal =   collection.filter(ee.Filter.eq('year', ano))
                      .filterBounds(limite)
                      .mosaic()
  
  // Adiciona índices calculadas Caatinga + variáveis 
  var addIndexComplem = require('users/evelezmartin/Sentinel_Col1:Amostras/CalculateIndices.js');
  mosaicoTotal = addIndexComplem.getIndices(mosaicoTotal)
  
  // Adiciona bandas geradas no cluster - Marcos Rosa - EVI e NDVI
  mosaicoTotal = mosaicoTotal
    .addBands(S2_cluster_evi
      .select(['clusters_'+ano, 'evi_median_'+ano])
    )
    .addBands(S2_cluster_ndvi
      .select(['clusters_'+ano, 'ndvi_median_'+ano])
    )
  
  // Seleciona as bandas de interesse
  mosaicoTotal = mosaicoTotal.select(bandNames_used)
  
  // Importa e seleciona as amostras estáveis
  var SS_amostras = ee.FeatureCollection(dirsamples + 'pontos_train_' + versao_pt + '_'+ String(ano))
      .filter(ee.Filter.eq('ID', regiao))
      //.filterBounds(limite) 
  
  // Filtra cada classe
  var SS_Flo = SS_amostras.filter(ee.Filter.eq('reference', 3))
  var SS_Umi = SS_amostras.filter(ee.Filter.eq('reference', 11))
  var SS_Cam = SS_amostras.filter(ee.Filter.eq('reference', 12))
  var SS_Agr = SS_amostras.filter(ee.Filter.eq('reference', 21))
  var SS_Anv = SS_amostras.filter(ee.Filter.eq('reference', 22))
  // var SS_Afr = SS_amostras.filter(ee.Filter.eq('reference', 29))
  var SS_Agu = SS_amostras.filter(ee.Filter.eq('reference', 33))

  var n_samples_Flo = ee.Number(SS_Flo.size().multiply(percent_Flo).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
  var n_samples_Umi = ee.Number(SS_Umi.size().multiply(percent_Umi).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
  var n_samples_Cam = ee.Number(SS_Cam.size().multiply(percent_Cam).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
  var n_samples_Agr = ee.Number(SS_Agr.size().multiply(percent_Agr).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
  var n_samples_Anv = ee.Number(SS_Anv.size().multiply(percent_Anv).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
  // var n_samples_Afr = ee.Number(SS_Afr.size().multiply(percent_Afr).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
  var n_samples_Agu = ee.Number(SS_Agu.size().multiply(percent_Agu).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
  
  // Seleciona a quantidade de amostras
  var SS_Flo_samples = SS_Flo.randomColumn().sort('random').limit(n_samples_Flo)
  var SS_Umi_samples = SS_Umi.randomColumn().sort('random').limit(n_samples_Umi)
  var SS_Cam_samples = SS_Cam.randomColumn().sort('random').limit(n_samples_Cam)
  var SS_Agr_samples = SS_Agr.randomColumn().sort('random').limit(n_samples_Agr)
  var SS_Anv_samples = SS_Anv.randomColumn().sort('random').limit(n_samples_Anv)
  // var SS_Afr_samples = SS_Afr.randomColumn().sort('random').limit(n_samples_Afr)
  var SS_Agu_samples = SS_Agu.randomColumn().sort('random').limit(n_samples_Agu)

  // print('SS_Flo_samples',SS_Flo_samples)
  // print('SS_Flo',SS_Flo)
  // Map.addLayer(SS_Flo,{color:'0000ff'},'todos')
  // Map.addLayer(SS_Flo_samples,{color:'ff0000'},'selecao')
  
  // Cria variavel com todas as amostras estáveis
  var SS_amostras = SS_Flo_samples
          .merge(SS_Umi_samples)
          .merge(SS_Cam_samples)
          .merge(SS_Agr_samples)
          .merge(SS_Anv_samples)
          // .merge(SS_Afr_samples)
          .merge(SS_Agu_samples)
  
  // print('SS_Flo_samples',SS_Flo_samples.size())
  // print('SS_Umi_samples',SS_Umi_samples.size())
  // print('SS_Cam_samples',SS_Cam_samples.size())
  // print('SS_Agr_samples',SS_Agr_samples.size())
  // print('SS_Anv_samples',SS_Anv_samples.size())
  // print('SS_Afr_samples',SS_Afr_samples.size())
  // print('SS_Agu_samples',SS_Agu_samples.size())
  
  // Amostras complementares
  var pontos_complementares = floresta
              .merge(aumi)
              .merge(campo)
              .merge(agric)
              .merge(anv)
              // .merge(arocho)
              .merge(agua)
              
  // Samples
  var trainingComp = mosaicoTotal.sampleRegions({
      'collection': pontos_complementares,
      'properties': ['reference'],
      'scale': 10
  });
  var complementares = trainingComp//.map(function (feature) {return feature.set('comp_coll', '7')});
  
  // Faz o merge das amostras estáveis com as complementares
  var training = SS_amostras.merge(complementares)
    
  // Classificador sem informações de importância e arvores 
  var classifier = ee.Classifier.smileRandomForest({numberOfTrees: RFtrees, variablesPerSplit:1}).train(training, 'reference', bandNames_used);
  
  // Classifica o mosaico
  var classified = mosaicoTotal.classify(classifier)//.mask(mosaicoTotal.select('red_m'));
  classified = classified.select(['classification'],['classification_'+ano]).clip(limite).toInt8()
  // if (debug == 1){print('classified',classified)}
  
  if (i_ano == 0){ var classified16a23 = classified }  
  else {classified16a23 = classified16a23.addBands(classified); }
  
  // // ==============================================================================================================
  //                                        VERIFICA A IMPORTÂNCIA DAS BANDAS:
  
  // // Classificador com informações de importância e arvores 
  // // Código para obter a importância ordenada de cada variável
  // var exp = classifier.explain()
  // // print('Explain', exp)
  // var importance = ee.Dictionary(exp.get('importance'))
  // var keys = importance.keys().sort(importance.values()).reverse()
  // // print("keys", keys)
  // var values = importance.values(keys);
  // // print("values", values)
  // var rows = keys.zip(values)
  // // print("rows", rows)
  // var map_teste = rows.map(function(list) {
  //   return {c: ee.List(list).map(function(n) { return {v: n}; })}
  // })
  // // Definições para gerar o gráfico
  // var dataTable = {
  //   cols: [{id: 'band', label: 'Band', type: 'string'},
  //         {id: 'importance', label: 'Importance', type: 'number'}],
  //   rows: map_teste.slice(0,50)
  // };
  // // Gera o gráfico de importância das variáveis
  // ee.Dictionary(dataTable).evaluate(function(result) {
  //   var chart = ui.Chart(result)
  //     .setChartType('ColumnChart')
  //     .setOptions({
  //       title: 'Random Forest Band Importance',
  //       legend: {position: 'none'},
  //       hAxis: {title: 'Bands'},
  //       vAxis: {title: 'Importance'}
  //     });
  //   print(chart);
  // })

  // =================================================================================================================
  //                                    CALCULATE ACURACY:
    var acura_region = require('users/schirmbeckj/MapBiomas:Coll05_final/Coll05/Passo008_acuracia_class_2017_Pampa_Regioes_function.js').acura_region;
    // o 'calcula_confusao' como ultimo parâmetro da função de acuracia é usado para
    // ativar ou desativar o cáculo da Matriz de Confusão
    var calcula_confusao = 0
    // var acc = acura_region(classified, String(ano), regiao, version_out, calcula_confusao);
}
// =================================================================================================================
//                                   PRINTA E EXPORTA A COLEÇÃO

// print(col9_all, "Classificação L9")
// print(classified16a23, "Classificação S2")

// // Adiciona no mapa as camadas de amostras e pontos estáveis
// Map.addLayer(SS_amostras, {} , 'Pontos estáveis', false)

classified16a23 = classified16a23
    .set('collection', collection_out)
    .set('version', version_out)
    .set('biome', bioma)

// Exporta a coleção
Export.image.toAsset({
  'image': classified16a23.toInt8(),
  'description': regiao+'-'+'RF16a23_v'+version_out,
  'assetId': dirout + '0'+ regiao + '_' + 'RF16a23_v'+version_out,
  'scale': 10,
  'pyramidingPolicy': {
      '.default': 'mode'
  },
  'maxPixels': 1e13,
  'region': limite
});    

// classified16a23 = classified16a23.mask(limite_reg_raster.eq(regiao))

// =================================================================================================================
//                                    CALCULATE AREA:
// =================================================================================================================
if (calc_area == 1) {
  var years = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
  
  // Função para converter resultados em FeatureCollection
  var convert2featCollection = function (item, year) { 
      item = ee.Dictionary(item);
      var feature = ee.Feature(ee.Geometry.Point([0, 0]))
          .set('classe', item.get('class'))
          .set('area', item.get('sum')) 
          .set('year', year); 
      return feature;
  };
  
  // Função para calcular a área de cada classe (km²)
  var calculateArea = function (image, geometry, year) {
      var pixelArea = ee.Image.pixelArea().divide(10000); // Área em ha (10000) e em km² (1000000)
      var reducer = ee.Reducer.sum().group(1, 'class'); 
      var areas = pixelArea.addBands(image)
          .reduceRegion({
              reducer: reducer,
              geometry: geometry,
              scale: 30,
              bestEffort: true,
              maxPixels: 1e12,
              tileScale: 4
          });
  
      var areasList = ee.List(areas.get('groups')).map(function(item) {
          return convert2featCollection(item, year); 
      });
      return ee.FeatureCollection(areasList);
  };
    
  // Sentinel ---------------------------
  // Função para calcular as áreas para cada ano e criar uma FeatureCollection
  var areasByYear_s2 = years.map(function(year) {
      var image = classified16a23.select('classification_' + year); 
      var areaClass = calculateArea(image, geom_limite, year); 
      return areaClass; 
  });
  // Unir todas as FeatureCollections em uma única coleção
  var allAreas_s2 = ee.FeatureCollection(areasByYear_s2).flatten();
  // print('Áreas por ano e classe S2:', allAreas_s2);
  
  var asset_area = 'projects/ee-grazielirodigheri/assets/areas_col_s2_col9_30_v'+versao_ante
  var colls_area = ee.FeatureCollection(asset_area)
  
  // Função para criar um gráfico de comparação para uma classe específica
  var createComparisonChart = function(classNumber) {
      var filteredFeatures1 = allAreas_s2.filter(ee.Filter.eq('classe', classNumber)).map(function(ft){
        return ft.set('col', "Col1_S2 v"+version_out)
      })
  
      var filteredFeatures2 = colls_area
        .filter(ee.Filter.eq('ID_region', regiao))
        .filter(ee.Filter.eq('col', 'Beta_S2'))
        .filter(ee.Filter.eq('classe', classNumber))
      
      var filteredFeatures3 = colls_area
        .filter(ee.Filter.eq('ID_region', regiao))
        .filter(ee.Filter.eq('col', 'S2_CF_v'+versao_ante))
        .filter(ee.Filter.eq('classe', classNumber))
  
      var feat_colls = filteredFeatures1.merge(filteredFeatures2).merge(filteredFeatures3)
      // Criar o gráfico
      var chart = ui.Chart.feature.groups({
          features: feat_colls, 
          xProperty: 'year', 
          yProperty: 'area',
          seriesProperty: 'col'
      })
      .setChartType('LineChart') // Gráfico de linhas
      .setOptions({
          title: 'Comparação da Área da Classe ' + classNumber,
          hAxis: {title: 'Ano'},
          vAxis: {title: 'Área (ha)', viewWindow: {min: 0}},
          lineWidth: 2,
          pointSize: 3,
          series: {
              0: {color: 'orange', label: 'Col1_S2 v'+version_out},
              1: {color: 'green', label: 'Beta_S2'},
              2: {color: 'orangered', label: 'S2_CF_v'+versao_ante}
          },
          legend: {position: 'bottom'}
      });
      return chart;
  };
  // Gerar gráficos para comparação de todas as classes
  classes_list.forEach(function(classNumber) {
      var chart = createComparisonChart(classNumber);
      print(chart);
  });
}

// =================================================================================================================
//                                    PLOTA CAMADAS DE APOIO
// =================================================================================================================

// Classes Mapbiomas BR e PAMPA
var class_in =  [3,4,5,6,49,11,12,13,32,29,50,15,19,39,20,40,62,41,36,46,47,48,9,21,22,23,24,30,25,33,31]
var class_out = [3,4,5,6, 3,11,12,13,32,29,12,21,21,21,21,21,21,21,21,21,21,21,3,21,22,22,22,22,22,33,33]

// Carrega a coleção 9 e reclassificada para as classes do PAMPA
var col9 = ee.Image('projects/mapbiomas-public/assets/brazil/lulc/collection9/mapbiomas_collection90_integration_v1')
  .mask(mask_regiao)
  .select('classification_'+ano_compara)
  .remap(class_in, class_out)
  .rename('classification_'+ano_compara)

// ---------------------------------------------------------------------------------
// Mosaicos
var mosaico16 = collection.filter(ee.Filter.eq('year', 2016))
                  .filterBounds(limite)
                  .mosaic()
var mosaicoComp = collection.filter(ee.Filter.eq('year', ano_compara))
                  .filterBounds(limite)
                  .mosaic()
var mosaico23 = collection.filter(ee.Filter.eq('year', 2023))
                  .filterBounds(limite)
                  .mosaic()
// --------------------------------------------------------------------------------- 

// Adiciona os layers no mapa
Map.addLayer(mosaico16, visParMedian2, 'Img_Year_2016', false);  
Map.addLayer(mosaicoComp, visParMedian2, 'Img_Year_'+ano_compara, false); 
Map.addLayer(mosaico23, visParMedian2, 'Img_Year_2023', false);
Map.addLayer(col9, vis, 'Colecao 9 - ' + ano_compara, false)

// =================================================================================================================
//                                    CALCULATE DIFFERENCE :
// =================================================================================================================

// Sentinel col beta - camadas usada para imagem diferença
var col_beta = ee.Image('projects/mapbiomas-public/assets/brazil/lulc/collection_S2_beta/collection_LULC_S2_beta')
  .mask(mask_regiao)
  .select('classification_'+ano_compara)
  .remap(class_in, class_out)
  .rename('classification_'+ano_compara)
// print(col_beta, "S2 BETA")

var class_atual = classified16a23.select('classification_'+ano_compara)

// Coleção para comparar                 
Map.addLayer(col_beta, vis, 'Sentinel Beta - ' + ano_compara, false)
Map.addLayer(class_atual, vis, 'RF Teste ' + ano_compara + ' regiao 0' + regiao, false)

// Define variáveis para o mapa de diferença
var diferenca = require('users/schirmbeckj/MapBiomas:Coll06/Passo019_Mapa_Diferencas_Classe_v02.js').diferenca

// Itera sobre a lista de classes
for (var i_classe=0;i_classe<classes_list.length; i_classe++){
  var classe = classes_list[i_classe]
  
  // Gera mapa de diferença
  var img_dif = diferenca(col_beta, class_atual, classe)
    .updateMask(mask_regiao)
 
  Map.addLayer(img_dif, vischange, 'Diferença classe ' + String(classe) + ' - ' + ano_compara, false)
}

// Adiciona no mapa as camadas
// var controles = ee.FeatureCollection("users/evelezmartin/shp/Controles_regiao_cel_3km");
// var blank = ee.Image(0).mask(0);
// var outline = blank.paint(controles, 'AA0000', 2); 
// var visPar = {'palette':'000000','opacity': 0.6};
// Map.addLayer(outline, visPar, 'Áreas controle', false)

var blank = ee.Image(0).mask(0);
var outline = blank.paint(limite, 'AA0000', 2); 
var visPar = {'palette':'000000','opacity': 0.6};
Map.addLayer(outline, visPar, 'Limite região 0' + String(regiao), false)
// Map.centerObject(limite)