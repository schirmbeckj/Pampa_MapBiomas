// Coleção 1
// Script para fazer ajuste fino da classificação das regiões
// Para rodar veja instruções no final do arquivo
   
//baseado na versao R0X feita pelo Juliano, customizada para calcular a area pelo limite sem buffer
//customizada para incluir mosaico 2017 com duas versões de bandas RGB falsa cor
 
//var classRegion01 = function (version_out, sufixName, versao_amostra, RFtrees) {
  var version_out = '04'//mudar a cada nova versao que for exportada
  var version_mosaic = '3' //versão dos mosaicos da col 6
  var versao_pt = 'SENTINEL2_v2';
  
  var RFtrees = 100//60, 100  
  var desvio = 0
  
  //pocentagens calculadas no for de anos
  
  var nSamplesMin = 200;
  var nSamplesMax = 2000;
  
  var regiao = 1
  var collection_out = 7
  var versaocomplementares = '01' 
  
  var bioma = 'PAMPA'
  
  
  //print('pontos_exp1_' + sufixName + '_' + versao_amostra + ' RFtrees = ' + RFtrees)
  
  //conjunto de flags para ativar e desativar recursos de processamento
  //*****************************************
  //definir com 1 para usar e como zero para não usar
  var importar_estaveis = 1    //definir com 1 para importar e como zero para gerar a partir de pontos estaveis
  var usar_complementares = 1
  
  var sampleComplementar6  = 250
  
  var debug = 1   //variavel para uso de debug, habilita os prints e os addLayers
  var calcula_acuracia = 1
  var calcula_area = 1 
  var calcula_confusao = 1 //se calcula acuracia igual a zero esse é ignorado
  var exporta_colecao = 0//ativar a geometria do bioma antes de dar o Run
  //*************************************
  
  var  dirasset =   'projects/nexgenmap/MapBiomas2/SENTINEL/mosaics-3'
  //pontos estaveis com propriedades
  var dirsamples = 'projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/SAMPLES/SENTINEL/';
  
  var dirout = 'projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/class_Sentinel/';
  
  var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
  var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);
  
  //limite sem o buffer  
  var regioesCollection2 = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05')
  var limite2 = regioesCollection2.filterMetadata('ID', 'equals', regiao);
  
  var limite_reg_raster = ee.Image('projects/mapbiomas-workspace/AUXILIAR/PAMPA/Pampa_regions_col5_raster_buff')
  
  
  if (exporta_colecao == 1){
    debug = 0
    limite = limite.geometry(100)
    var anos = [2016,2017,2018,2019,2020,2021,2022];
    var anos = [2021,2022];
  }else
  {
      var anos = [2019]
      limite = limite.geometry()
  }
  
  var biomes = ee.Image('projects/mapbiomas-workspace/AUXILIAR/biomas-raster-41')
  var bioma250mil_PA = biomes.mask(biomes.eq(6))
  
  var palettes = require('users/mapbiomas/modules:Palettes.js');
  //vis coll 05
  var vis = { 'min': 0, 'max': 45,  'palette': palettes.get('classification5')};
  
  var bandNames = ee.List([
    'blue_median'
  ,'blue_median_wet'
  ,'blue_median_dry'
  ,'blue_min'
  ,'blue_stdDev'
  ,'green_median'
  ,'green_median_dry'
  ,'green_median_wet'
  ,'green_median_texture'
  ,'green_min'
  ,'green_stdDev'
  ,'red_median'
  ,'red_median_dry'
  ,'red_min'
  ,'red_median_wet'
  ,'red_stdDev'
  ,'nir_median'
  ,'nir_median_dry'
  ,'nir_median_wet'
  ,'nir_min'
  ,'nir_stdDev'
  ,'red_edge_1_median'
  ,'red_edge_1_median_dry'
  ,'red_edge_1_median_wet'
  ,'red_edge_1_min'
  ,'red_edge_1_stdDev'
  ,'red_edge_2_median'
  ,'red_edge_2_median_dry'
  ,'red_edge_2_median_wet'
  ,'red_edge_2_min'
  ,'red_edge_2_stdDev'
  ,'red_edge_3_median'
  ,'red_edge_3_median_dry'
  ,'red_edge_3_median_wet'
  ,'red_edge_3_min'
  ,'red_edge_3_stdDev'
  ,'red_edge_4_median'
  ,'red_edge_4_median_dry'
  ,'red_edge_4_median_wet'
  ,'red_edge_4_min'
  ,'red_edge_4_stdDev'
  ,'swir1_median'
  ,'swir1_median_dry'
  ,'swir1_median_wet'
  ,'swir1_min'
  ,'swir1_stdDev'
  ,'swir2_median'
  ,'swir2_median_wet'
  ,'swir2_median_dry'
  ,'swir2_min'
  ,'swir2_stdDev'
  ,'ndvi_median_dry'
  ,'ndvi_median_wet'
  ,'ndvi_median'
  ,'ndvi_amp'
  ,'ndvi_stdDev'
  ,'ndwi_median'
  ,'ndwi_median_dry'
  ,'ndwi_median_wet'
  ,'ndwi_amp'
  ,'ndwi_stdDev'
  ,'evi2_median'
  ,'evi2_median_dry'
  ,'evi2_median_wet'
  ,'evi2_amp'
  ,'evi2_stdDev'
  ,'savi_median_dry'
  ,'savi_median_wet'
  ,'savi_median'
  ,'savi_stdDev'
  ,'pri_median_dry'
  ,'pri_median'
  ,'pri_median_wet'
  ,'gcvi_median'
  ,'gcvi_median_dry'
  ,'gcvi_median_wet'
  ,'gcvi_stdDev'
  ,'hallcover_median'
  ,'hallcover_stdDev'
  ,'cai_median'
  ,'cai_median_dry'
  ,'cai_stdDev'
  ,'gv_median'
  ,'gv_median_dry'
  ,'gv_median_wet'
  ,'gv_max'
  ,'gv_min'
  ,'gv_amp'
  ,'gv_stdDev'
  ,'gvs_median'
  ,'gvs_median_dry'
  ,'gvs_median_wet'
  ,'gvs_max'
  ,'gvs_min'
  ,'gvs_amp'
  ,'gvs_stdDev'
  ,'npv_median'
  ,'npv_median_dry'
  ,'npv_median_wet'
  ,'npv_max'
  ,'npv_min'
  ,'npv_amp'
  ,'npv_stdDev'
  ,'soil_median'
  ,'soil_median_dry'
  ,'soil_median_wet'
  ,'soil_max'
  ,'soil_min'
  ,'soil_amp'
  ,'soil_stdDev'
  ,'cloud_median'
  ,'cloud_median_dry'
  ,'cloud_median_wet'
  ,'cloud_max'
  ,'cloud_min'
  ,'cloud_amp'
  ,'cloud_stdDev'
  ,'shade_median'
  ,'shade_median_dry'
  ,'shade_median_wet'
  ,'shade_max'
  ,'shade_min'
  ,'shade_amp'
  ,'shade_stdDev'
  ,'ndfi_median'
  ,'ndfi_median_dry'
  ,'ndfi_median_wet'
  ,'ndfi_max'
  ,'ndfi_min'
  ,'ndfi_amp'
  ,'ndfi_stdDev'
  ,'sefi_median'
  ,'sefi_stdDev'
  ,'sefi_median_dry'
  ,'wefi_median'
  ,'wefi_median_wet'
  ,'wefi_amp'
  ,'wefi_stdDev'
  ,'slope'])
                           
  var visParMedian2 = {'bands':['nir_median','swir1_median','red_median'], 'gain':[0.06, 0.08,0.2],'gamma':0.5 };
  
  var collection = ee.ImageCollection(dirasset)
      .filterMetadata('version', 'equals', version_mosaic)
      .filterMetadata('biome','equals',bioma);
  
  //print('mosaicos',mosaicos)
    var ll = ee.Image.pixelLonLat().mask(bioma250mil_PA);
    var long = ll.select('longitude').add(0).multiply(-1).multiply(1000).toInt16()
    var lati = ll.select('latitude').add(0).multiply(-1).multiply(1000).toInt16()
    
    
  for (var i_ano=0;i_ano<anos.length; i_ano++){
    var ano = anos[i_ano];
    
    var percent_Flo = -562.93    + desvio + ano *  0.29481//
  //var percent_Flo = 18
    var percent_Umi = 8
  //    var percent_Umi =   -2.14    + desvio + ano *  0.00111//n min 
  //    var percent_Cam = 20//
    var percent_Cam = 1081.16    + desvio + ano * -0.50958//
    var percent_Agr = -419.26    +  30 + ano *  0.21463//
  //    var percent_Anv =    0.29729 + desvio + ano *  0.00007//n min 
    var percent_Anv = 11//220
    var percent_Afr = 10
  //    var percent_Afr =    5.45    + desvio + ano * -0.00250 //n min 
  //    var percent_Agu =   -2.61    + desvio + ano *  0.00147
    var percent_Agu =   20
    
    
    
    var mosaicoTotal =   collection.filterMetadata('year', 'equals', ano)
                        .filterBounds(limite)
                        .mosaic()
    
    mosaicoTotal = mosaicoTotal.addBands(long.rename('longitude'))
    mosaicoTotal = mosaicoTotal.addBands(lati.rename('latitude' ))
    //print('mosaico',mosaicoTotal)
  
    mosaicoTotal = mosaicoTotal.select(bandNames)
    
    //if (debug == 1){Map.addLayer(mosaicoTotal, visParMedian, 'Img_Year_'+ano, false)}
  
    if (importar_estaveis == 1){
      var SS_amostras = ee.FeatureCollection(dirsamples + 'pontos_train_' + versao_pt + '_'+ String(ano))
          .filterMetadata('ID','equals',regiao)
          //.filterBounds(limite) 
  
      var SS_Flo = SS_amostras.filterMetadata('reference', 'equals', 3)
      var SS_Umi = SS_amostras.filterMetadata('reference', 'equals', 11)
      var SS_Cam = SS_amostras.filterMetadata('reference', 'equals', 12)
      var SS_Agr = SS_amostras.filterMetadata('reference', 'equals', 21)
      var SS_Anv = SS_amostras.filterMetadata('reference', 'equals', 22)
      var SS_Afr = SS_amostras.filterMetadata('reference', 'equals', 29)
      var SS_Agu = SS_amostras.filterMetadata('reference', 'equals', 33)
  
      var n_samples_Flo = ee.Number(SS_Flo.size().multiply(percent_Flo).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
      var n_samples_Umi = ee.Number(SS_Umi.size().multiply(percent_Umi).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
      var n_samples_Cam = ee.Number(SS_Cam.size().multiply(percent_Cam).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
      var n_samples_Agr = ee.Number(SS_Agr.size().multiply(percent_Agr).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
      var n_samples_Anv = ee.Number(SS_Anv.size().multiply(percent_Anv).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
      var n_samples_Afr = ee.Number(SS_Afr.size().multiply(percent_Afr).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
      var n_samples_Agu = ee.Number(SS_Agu.size().multiply(percent_Agu).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
  
      var SS_Flo_samples = SS_Flo.randomColumn().sort('random').limit(n_samples_Flo)
      var SS_Umi_samples = SS_Umi.randomColumn().sort('random').limit(n_samples_Umi)
      var SS_Cam_samples = SS_Cam.randomColumn().sort('random').limit(n_samples_Cam)
      var SS_Agr_samples = SS_Agr.randomColumn().sort('random').limit(n_samples_Agr)
      var SS_Anv_samples = SS_Anv.randomColumn().sort('random').limit(n_samples_Anv)
      var SS_Afr_samples = SS_Afr.randomColumn().sort('random').limit(n_samples_Afr)
      var SS_Agu_samples = SS_Agu.randomColumn().sort('random').limit(n_samples_Agu)
  
  //    print('SS_Flo_samples',SS_Flo_samples)
  //    print('SS_Flo',SS_Flo)
  //    Map.addLayer(SS_Flo,{color:'0000ff'},'todos')
  //    Map.addLayer(SS_Flo_samples,{color:'ff0000'},'selecao')
      
      //cria variavel com todas as amostras estáveis
      var SS_amostras = SS_Flo_samples
              .merge(SS_Umi_samples)
              .merge(SS_Cam_samples)
              .merge(SS_Agr_samples)
              .merge(SS_Anv_samples)
              .merge(SS_Afr_samples)
              .merge(SS_Agu_samples)
      
      if (0){
      print('SS_Flo_samples',SS_Flo_samples.size())
      print('SS_Umi_samples',SS_Umi_samples.size())
      print('SS_Cam_samples',SS_Cam_samples.size())
      print('SS_Agr_samples',SS_Agr_samples.size())
      print('SS_Anv_samples',SS_Anv_samples.size())
      print('SS_Afr_samples',SS_Afr_samples.size())
      print('SS_Agu_samples',SS_Agu_samples.size())
      }
      //print('primeiro elemento estaveis',training.first())
    }
   
   var dictClass = {
      3: "Floresta",
      11: "Area Úmida",
      12: "Campo",
      21: "Mosaico de Uso",
      22: "Área não vegetada",
      29: "Afloramento Rochoso",
      33: "Água",
  }  
   var listClass = SS_amostras.distinct(['reference']).reduceColumns(ee.Reducer.toList(), ['reference']).get('list') 
   listClass.evaluate(function (item) {
      item.forEach(function (value) {
          var mySamp = SS_amostras.filterMetadata('reference', 'equals', value)
          print('Samples ' + dictClass[value], mySamp.size())
          Map.addLayer(mySamp, { "color": palettes.get('classification5')[value] }, 'Samples ' + dictClass[value])
          // print(dictClass[value],mySamples.filterMetadata('reference','equals',value).limit(1))
      })
  }) 
    
    // Amostras complementares
     if(usar_complementares == 1){
    
      var pontos_complementares = floresta
                  .merge(aumi)
                  .merge(campo)
                  .merge(agric)
                  .merge(anv)
                  .merge(arocho)
                  .merge(agua)
                  
      // Samples 
      var trainingComp = mosaicoTotal.sampleRegions({
          'collection': pontos_complementares,
          'properties': ['reference'],
          'scale': 30
      });
      var complementares = trainingComp.map(function (feature) {return feature.set('comp_coll', '7')});
    }
    
   if (usar_complementares == 0){
   var training = SS_amostras//.merge(complementares)
    }else{
      var training = SS_amostras.merge(complementares)
    }  
  
    //classificador sem informações de importÂncia e arvores 
    
    //print(training.first())
    var classifier = ee.Classifier.smileRandomForest({numberOfTrees: RFtrees, variablesPerSplit:1}).train(training, 'reference', bandNames);
    
    //classificador com informações de importÂncia e arvores
    //var classifier = ee.Classifier.smileRandomForest({numberOfTrees: RFtrees, variablesPerSplit:1}).train(training, 'reference', bandNames);
    //if (debug == 1){print('importância',classifier.explain())}
    
    var classified = mosaicoTotal.classify(classifier)//.mask(mosaicoTotal.select('red_m'));
    classified = classified.select(['classification'],['classification_'+ano]).clip(limite).toInt8()
    //if (debug == 1){print('classified',classified)}
  
    if(debug == 1){
  
      //camadas usadas para o processo de coleta de amostras
      //ajsutar para coleção preliminar da versao 5
      var ano_base = 2019
      var classe_dif = 3
      var col07 = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/class_col7_mosaic/PAMPA_034_final_com_filtro')
          .select('classification_'+String(ano_base))
      var sent_v01 = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/class_Sentinel_mosaic/PAMPA_01')
          .select('classification_'+String(ano_base))
      var sent_v02 = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/class_Sentinel_mosaic/PAMPA_02')
          .select('classification_'+String(ano_base))
      var col_compara = col07
  
      //var col_comparapB = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/col6/PAMPA/class_col6_filtros/0' + regiao + '_RF85a20_v07_final')
      //var col_compara = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/col6/PAMPA/class_col6_filtros/01_RF85a20_v05_final')
      col_compara = col_compara.select('classification_'+ano)
  
      var mosaico16=collection.filterMetadata('year', 'equals', 2016)
                        .filterBounds(limite)
                        .mosaic()
    
      var mosaico22=collection.filterMetadata('year', 'equals', 2022)
                        .filterBounds(limite)
                        .mosaic()
  
      Map.addLayer(mosaico16, visParMedian2, 'Img_Year_2016', false);    
      Map.addLayer(mosaico22, visParMedian2, 'Img_Year_2022', false)  
      Map.addLayer(col_compara, vis, 'Colecao 7 - ' + ano, false)
      //Map.addLayer(col_compara_final, vis, 'Colecao 5 v10_final - '+ano, false)
      Map.addLayer(classified, vis, 'RF Teste ' + ano + ' regiao 0' + regiao, false)
    }
    
    if (i_ano == 0){ var classified85a20 = classified }  
    else {classified85a20 = classified85a20.addBands(classified); }
  } 
  
    if (debug == 1){
        Map.addLayer(SS_amostras, {} , 'Pontos estáveis', false)
        //Map.addLayer(amostraTotalimg4, vis, 'Poligonos complementares 4', false)
        //Map.addLayer(trainingComp4, {}, 'Pontos complementares 4', false)
        //Map.addLayer(amostraTotalimg5, vis, 'Poligonos complementares 5', false)
        //Map.addLayer(trainingComp5, {}, 'Pontos complementares 5', false)
        
          
        //Map.addLayer(SS_Flo, {} , 'Estáveis Floresta', false)
        //Map.addLayer(SS_Umi, {} , 'Estáveis Area_umida', false)
        //Map.addLayer(SS_Cam, {}, 'Estáveis Campos', false)
        //Map.addLayer(SS_Agr,  {}, 'Estáveis Agricultura', false)
        //Map.addLayer(SS_Anv, {}, 'Estáveis Area nao vegetada', false)
        //Map.addLayer(SS_Afr, {}, 'Estáveis Afloramento rochoso', false)
        //Map.addLayer(SS_Agu,  {}, 'Estáveis Agua', false)
    }
    
  //if (debug == 1){print('classified85a20', classified85a20)}
  
  
    
  classified85a20 = classified85a20
      .set('collection', collection_out)
      .set('version', version_out)
      .set('biome', bioma)
  
  Export.image.toAsset({
    'image': classified85a20.toInt8(),
    'description': regiao+'-'+'RF16a20_v'+version_out,
    'assetId': dirout + '0'+ regiao + '_' + 'RF16a20_v'+version_out,
    'scale': 10,
    'pyramidingPolicy': {
        '.default': 'mode'
    },
    'maxPixels': 1e13,
    'region': limite
  });    
  
  classified85a20 = classified85a20.mask(limite_reg_raster.eq(regiao))
  
  if (debug == 1){
      //calculo da acuracia
    if (calcula_acuracia == 1){
      var acura_region = require('users/schirmbeckj/MapBiomas:Coll05_final/Coll05/Passo008_acuracia_class_2017_Pampa_Regioes_function.js').acura_region;
      // o 'calcula_confusao' como ultimo parâmetro da função de acuracia é usado para
      //ativar ou desativar o cáculo da Matriz de Confusão
      
      var acc = acura_region(classified85a20,String(ano_base),regiao,version_out,calcula_confusao);
    }
    //print(classified85a20)
    //cálculo da area de cada classe
    
    if (calcula_area == 1){
      // get raster with area km2
      var pixelArea = ee.Image.pixelArea().divide(1000000);
      /**
       * Helper function
       * @param item 
       */
      var convert2featCollection = function (item) {
          item = ee.Dictionary(item);
          var feature = ee.Feature(ee.Geometry.Point([0, 0]))
              .set('classe', item.get('classe'))
              .set('area', item.get('sum'));
          return feature;
      };
      
      /**
       * Calculate area crossing a cover map (deforestation, mapbiomas)
       * and a region map (states, biomes, municipalites)
       * @param image 
       * @param geometry
       */
      var calculateArea = function (image, geometry) {
          var reducer = ee.Reducer.sum().group(1, 'classe');
          var areas = pixelArea.addBands(image)
              .reduceRegion({
                  reducer: reducer,
                  geometry: geometry,
                  scale: 120,
                  maxPixels: 1e12,
                  tileScale:4
              });
          var year = ee.Number(image.get('year'));
          areas = ee.List(areas.get('groups')).map(convert2featCollection);
          areas = ee.FeatureCollection(areas);
          return areas;
      };
      
      var year = ano_base
      
      
      var areas = calculateArea(classified85a20.select('classification_' + String(ano_base)).selfMask(), limite2)
          .map(
              function(feature){
                  return feature.set('year', year);
              }
          );
      //print(areas);
      
      print('Área da classe 03 ano' + String(ano_base) + ': ' , areas.filterMetadata('classe','equals', 3).first().get('area'))
      print('Área da classe 11 ano' + String(ano_base) + ': ' , areas.filterMetadata('classe','equals',11).first().get('area'))
      print('Área da classe 12 ano' + String(ano_base) + ': ' , areas.filterMetadata('classe','equals',12).first().get('area'))
      print('Área da classe 21 ano' + String(ano_base) + ': ' , areas.filterMetadata('classe','equals',21).first().get('area'))
      print('Área da classe 22 ano' + String(ano_base) + ': ' , areas.filterMetadata('classe','equals',22).first().get('area'))
      print('Área da classe 29 ano' + String(ano_base) + ': ' , areas.filterMetadata('classe','equals',29).first().get('area'))
      print('Área da classe 33 ano' + String(ano_base) + ': ' , areas.filterMetadata('classe','equals',33).first().get('area'))
    }
    
    //gera mapa de diferença
    var diferenca = require('users/schirmbeckj/MapBiomas:Coll06/Passo019_Mapa_Diferencas_Classe_v02.js').diferenca
    var ano_dif = ano_base
    var img_antes = col_compara.select('classification_'+ ano_dif)
    var img_depois = classified85a20.select('classification_'+ ano_dif)
    print('img_antes',img_antes,img_depois)
    var img_dif = diferenca(img_antes,img_depois,classe_dif)
  
  }
  
  var controles = ee.FeatureCollection("users/evelezmartin/shp/Controles_regiao_cel_3km");
  var blank = ee.Image(0).mask(0);
  var outline = blank.paint(controles, 'AA0000', 2); 
  var visPar = {'palette':'000000','opacity': 0.6};
  if (debug == 1){Map.addLayer(outline, visPar, 'Áreas controle', false)}
  
  var biomeCode2019 = 'Pampa';
  var biomas = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas_IBGE_250mil')
     .filterMetadata('Bioma', 'equals', biomeCode2019);
      
  var blank = ee.Image(0).mask(0);
  var outline = blank.paint(biomas, 'AA0000', 2); 
  var visPar = {'palette':'000000','opacity': 0.6};
  if (debug == 1){Map.addLayer(outline, visPar, 'Bioma', false)}
  
  var blank = ee.Image(0).mask(0);
  var outline = blank.paint(limite, 'AA0000', 2); 
  var visPar = {'palette':'000000','opacity': 0.6};
  if (debug == 1){Map.addLayer(outline, visPar, 'Limite região 0' + String(regiao), false)}
  //Map.centerObject(limite)
  
   