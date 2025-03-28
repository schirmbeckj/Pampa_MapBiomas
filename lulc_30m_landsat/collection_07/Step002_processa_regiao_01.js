/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var controles = ee.FeatureCollection("users/evelezmartin/shp/Controles_regiao_cel_3km"),
    anv = 
    /* color: #ea9999 */
    /* shown: false */
    ee.FeatureCollection([]),
    arocho = 
    /* color: #ff8c00 */
    /* shown: false */
    ee.FeatureCollection([]),
    agua = 
    /* color: #0000ff */
    /* shown: false */
    ee.FeatureCollection([]),
    floresta = 
    /* color: #006400 */
    /* shown: false */
    ee.FeatureCollection([]),
    aumi = 
    /* color: #45c2a5 */
    /* shown: false */
    ee.FeatureCollection([]),
    campo = 
    /* color: #b8af4f */
    /* shown: false */
    ee.FeatureCollection([]),
    agric = /* color: #ffefc3 */ee.FeatureCollection([]),
    geom_limite = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-53.18927256781215, -30.28920430878052],
          [-53.429735407958574, -30.067787234577363],
          [-53.957079157958574, -30.115315480957904],
          [-54.594286189208574, -30.400004197789062],
          [-54.713583219936865, -30.864860507746354],
          [-54.460897673061865, -31.3164500041102],
          [-53.982992399624365, -31.410260466945605],
          [-53.851156462124365, -31.663080244302673],
          [-53.807211149624365, -32.06895649628371],
          [-53.763265837124365, -32.42668460704181],
          [-53.362264860561865, -32.60270543845504],
          [-53.164510954311865, -32.533264713052134],
          [-52.725057829311865, -32.11084154277273],
          [-52.07949740090629, -31.434849239210415],
          [-51.91208230681668, -31.264980485528042],
          [-51.85440408416043, -31.172200282850383],
          [-52.15328627777078, -31.000987205479728],
          [-51.85665541839578, -30.927977354349707],
          [-51.55727797698953, -30.713336175933474],
          [-51.33480483245828, -30.4532408649499],
          [-51.32931166839578, -30.261270954860564],
          [-51.42818862152078, -30.06417101307813],
          [-51.61770278167703, -30.06417101307813],
          [-52.00497084808328, -30.08556233297065],
          [-52.30709487152078, -30.225679666397998],
          [-52.89211684417703, -30.244663291023567]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Coleção 6
// Script para fazer ajuste fino da classificação das regiões
// Para rodar veja instruções no final do arquivo
   
//baseado na versao R0X feita pelo Juliano, customizada para calcular a area pelo limite sem buffer
//customizada para incluir mosaico 2017 com duas versões de bandas RGB falsa cor
 
//var classRegion01 = function (version_out, sufixName, versao_amostra, RFtrees) {
var version_out = '031' //mudar a cada nova versao que for exportada
var version = '2' //versão dos mosaicos da col 7
var version_samples = '03'
var ano_base = 2000
var RFtrees = 100//60, 100 
var classe_diferenca = 12 // classe para mapa de diferenças

var desvio = 0 // desvio para calculo de balanceamento de amostras
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

var debug = 1   //variavel para uso de debug, habilita os prints e os addLayers
var calcula_acuracia = 1
var calcula_area = 1 
var ano_calcula_area = '2017'
var calcula_confusao = 1 //se calcula acuracia igual a zero esse é ignorado
var exporta_colecao = 0//ativar a geometria do bioma antes de dar o Run
//*************************************
//var dirasset =  'projects/nexgenmap/MapBiomas2/LANDSAT/mosaics';
//var dirasset7 = 'projects/nexgenmap/MapBiomas2/LANDSAT/mosaics-landsat-7';

var dirasset =  'projects/nexgenmap/MapBiomas2/LANDSAT/BRAZIL/mosaics-2-pampa';

//pontos estaveis com propriedades
var dirsamples = 'projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/SAMPLES/v' + version_samples + '/training_periodosFO_'
//var dirsamples = 'projects/mapbiomas-workspace/AMOSTRAS/col6/PAMPA/SAMPLES_FO/training_LabGeo_FO_SHP'
var dircomple = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/'
var dirout = 'projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/class_col7/'

var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);

//limite sem o buffer  
var regioesCollection2 = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05')
var limite2 = regioesCollection2.filterMetadata('ID', 'equals', regiao);

//print('limite2',limite2)

var limite_reg_raster = ee.Image('projects/mapbiomas-workspace/AUXILIAR/PAMPA/Pampa_regions_col5_raster_buff')

var diferenca = require('users/schirmbeckj/MapBiomas:Coll07/Passo100_Mapa_Diferencas_Classe_v02.js').diferenca
var vischange = {"min": 0, "max": 3,
        "palette": "ffffff,ff0000,e6f919,aaaaaa",    //amarelo=e6f919    magenta=bb34c0
        "format": "png"
  }
  
if (exporta_colecao == 1){
  debug = 0
  limite = geom_limite
  var anos = [
    1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,
    1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,
    2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021
    ];
}else
{
    var anos = [1990,2000,2010,2017,2020]
    limite = limite.geometry()
}


var biomes = ee.Image('projects/mapbiomas-workspace/AUXILIAR/biomas-raster-41')
var bioma250mil_PA = biomes.mask(biomes.eq(6))

var palettes = require('users/mapbiomas/modules:Palettes.js');

//nomes bandas
{var bandNames = ee.List([
'evi2_amp',
'gv_amp',
'ndfi_amp',
'ndvi_amp',
'ndwi_amp',
'soil_amp',
'wefi_amp',
'blue_median',
'blue_median_dry',
'blue_median_wet',
'cai_median',
'cai_median_dry',
'cloud_median',
'evi2_median',
'evi2_median_dry',
'evi2_median_wet',
'gcvi_median',
'gcvi_median_dry',
'gcvi_median_wet',
'green_median',
'green_median_dry',
'green_median_wet',
'green_median_texture',
'gv_median',
'gvs_median',
'gvs_median_dry',
'gvs_median_wet',
'hallcover_median',
'latitude', //calculada no script
'longitude', //calculada no script
'ndfi_median',
'ndfi_median_dry',
'ndfi_median_wet',
'ndvi_median',
'ndvi_median_dry',
'ndvi_median_wet',
'ndvi_amp_3y', //calculada no script
'ndwi_median',
'ndwi_median_dry',
'ndwi_median_wet',
'nir_median',
'nir_median_dry',
'nir_median_wet',
'npv_median',
'pri_median',
'pri_median_dry',
'pri_median_wet',
'red_median',
'red_median_dry',
'red_median_wet',
'savi_median',
'savi_median_dry',
'savi_median_wet',
'sefi_median',
'sefi_median_dry',
'shade_median',
'soil_median',
'swir1_median',
'swir1_median_dry',
'swir1_median_wet',
'swir2_median',
'swir2_median_dry',
'swir2_median_wet',
'wefi_median',
'wefi_median_wet',
'blue_min',
'green_min',
'nir_min',
'red_min',
'swir1_min',
'swir2_min',
'blue_stdDev',
'cai_stdDev',
'cloud_stdDev',
'evi2_stdDev',
'gcvi_stdDev',
'green_stdDev',
'gv_stdDev',
'gvs_stdDev',
'hallcover_stdDev',
'ndfi_stdDev',
'ndvi_stdDev',
'ndwi_stdDev',
'nir_stdDev',
'red_stdDev',
'savi_stdDev',
'sefi_stdDev',
'shade_stdDev',
'soil_stdDev',
'swir1_stdDev',
'swir2_stdDev',
'wefi_stdDev',
'slope'
]);


var bandNamesShort = ee.List([
'evi2_a',
'gv_a',
'ndfi_a',
'ndvi_a',
'ndwi_a',
'soil_a',
'wefi_a',
'blue_m',
'blue_m_d',
'blue_m_w',
'cai_m',
'cai_m_d',
'cloud_m',
'evi2_m',
'evi2_m_d',
'evi2_m_w',
'gcvi_m',
'gcvi_m_d',
'gcvi_m_w',
'green_m',
'green_m_d',
'green_m_w',
'green_m_t',
'gv_m',
'gvs_m',
'gvs_m_d',
'gvs_m_w',
'hallcov_m',
'lat', //calculada no script
'long', //calculada no script
'ndfi_m',
'ndfi_m_d',
'ndfi_m_w',
'ndvi_m',
'ndvi_m_d',
'ndvi_m_w',
'ndvi_a_3y', //calculada no script
'ndwi_m',
'ndwi_m_d',
'ndwi_m_w',
'nir_m',
'nir_m_d',
'nir_m_w',
'npv_m',
'pri_m',
'pri_m_d',
'pri_m_w',
'red_m',
'red_m_d',
'red_m_w',
'savi_m',
'savi_m_d',
'savi_m_w',
'sefi_m',
'sefi_m_d',
'shade_m',
'soil_m',
'swir1_m',
'swir1_m_d',
'swir1_m_w',
'swir2_m',
'swir2_m_d',
'swir2_m_w',
'wefi_m',
'wefi_m_w',
'blue_min',
'green_min',
'nir_min',
'red_min',
'swir1_min',
'swir2_min',
'blue_sD',
'cai_sD',
'cloud_sD',
'evi2_sD',
'gcvi_sD',
'green_sD',
'gv_sD',
'gvs_sD',
'hallcov_sD',
'ndfi_sD',
'ndvi_sD',
'ndwi_sD',
'nir_sD',
'red_sD',
'savi_sD',
'sefi_sD',
'shade_sD',
'soil_sD',
'swir1_sD',
'swir2_sD',
'wefi_sD',
'slope'
])}

//vis coll 05
//var vis = { 'bands': ['classification_' + String(ano_base)], 'min': 0, 'max': 45,  'palette': palettes.get('classification5')};
var vis = {'min': 0, 'max': 45,  'palette': palettes.get('classification5')};
var visParMedian = {'bands':['swir1_m','nir_m','red_m'], 'gain':[0.08, 0.06,0.2],'gamma':0.5 };
var visParMedian2 = {'bands':['nir_m','swir1_m','red_m'], 'gain':[0.06, 0.08,0.2],'gamma':0.5 };

var mosaicos1 = ee.ImageCollection(dirasset)
                  .filterMetadata('biome', 'equals', bioma)
                  .filterMetadata('version', 'equals', version)
//var mosaicos2 = ee.ImageCollection(dirasset7)
//                  .filterMetadata('biome', 'equals', bioma)
//                  .filterMetadata('version', 'equals', version)
var mosaicos = mosaicos1//.merge(mosaicos2)
   
//print('mosaicos',mosaicos)
var n_amostas = ee.Feature(ee.Geometry.Point([0, 0]))

for (var i_ano=0;i_ano<anos.length; i_ano++){
  var ano = anos[i_ano];

 if (ano <= 1994){ // ajustar para período 
    var percent_Flo = -562.93    + desvio + ano *  0.29481
    var percent_Umi =   -2.14    + desvio + ano *  0.00111
    var percent_Cam = 1081.16    + desvio + ano * -0.50958
    var percent_Agr = -419.26    + desvio + ano *  0.21463
    var percent_Anv =    0.29729 + desvio + ano *  0.00007
    var percent_Afr =    5.45    + desvio + ano * -0.00250
    var percent_Agu =   -2.61    + desvio + ano *  0.00147
 }
 if (ano > 1994 && ano <= 2004){// ajustar para período 2
    var percent_Flo = -562.93    + desvio + ano *  0.29481
    var percent_Umi =   -2.14    + desvio + ano *  0.00111
    var percent_Cam = 1081.16    + desvio + ano * -0.50958
    var percent_Agr = -419.26    + desvio + ano *  0.21463
    var percent_Anv =    0.29729 + desvio + ano *  0.00007
    var percent_Afr =    5.45    + desvio + ano * -0.00250
    var percent_Agu =   -2.61    + desvio + ano *  0.00147
 }
 if (ano > 2004){ // ajustar para período 3
    var percent_Flo = -562.93    + desvio + ano *  0.29481
    var percent_Umi =   -2.14    + desvio + ano *  0.00111
    var percent_Cam = 1081.16    + desvio + ano * -0.50958
    var percent_Agr = -419.26    + desvio + ano *  0.21463
    var percent_Anv =    0.29729 + desvio + ano *  0.00007
    var percent_Afr =    5.45    + desvio + ano * -0.00250
    var percent_Agu =   -2.61    + desvio + ano *  0.00147
 }

  var mosaicoTotal =   mosaicos.filterMetadata('year', 'equals', ano)
                      .filterBounds(limite)
                      .mosaic()
  if (ano == 1985){//usa o valor do ano como apmlitude
      //var amp3anos = max3anos.subtract(min3anos).rename('amp_ndvi_3anos')
      var min3anos = mosaicoTotal.select('ndvi_median_dry')
      var max3anos = mosaicoTotal.select('ndvi_median_wet')
  }
  if (ano == 1986){//usa os 2 anos anteriores como amplitude
    //var amp3anos = max3anos.subtract(min3anos).rename('amp_ndvi_3anos')
    var mosaico1ano_antes = mosaicos.filterMetadata('year', 'equals', ( ano - 1))
                    .filterBounds(limite)
                    .mosaic()
    var min3anos = ee.ImageCollection.fromImages([mosaicoTotal.select('ndvi_median_dry'),
                                                mosaico1ano_antes.select('ndvi_median_dry')]).min()
    var max3anos = ee.ImageCollection.fromImages([mosaicoTotal.select('ndvi_median_wet'),
                                                mosaico1ano_antes.select('ndvi_median_wet')]).max()
  }
  if (ano > 1986){
    var mosaico1ano_antes = mosaicos.filterMetadata('year', 'equals', ( ano - 1))
                    .filterBounds(limite)
                    .mosaic()
    var mosaico2anos_antes = mosaicos.filterMetadata('year', 'equals', ( ano - 2))
                    .filterBounds(limite)
                    .mosaic()
    var min3anos = ee.ImageCollection.fromImages([mosaicoTotal.select('ndvi_median_dry'),
                                                mosaico1ano_antes.select('ndvi_median_dry'),
                                                mosaico2anos_antes.select('ndvi_median_dry')]).min()
    var max3anos = ee.ImageCollection.fromImages([mosaicoTotal.select('ndvi_median_wet'),
                                                mosaico1ano_antes.select('ndvi_median_wet'),
                                                mosaico2anos_antes.select('ndvi_median_wet')]).max()
  }
  var ndvi_a_3y = max3anos.subtract(min3anos).rename('ndvi_amp_3y')
 // print('ndvi_a_3y',ndvi_a_3y)

  var ndvi_color = '0f330f, 005000, 4B9300, 92df42, bff0bf, FFFFFF, eee4c7, ecb168, f90000'
  var visParNDFI_amp = {'min':0, 'max':60, 'palette':ndvi_color};
  //Map.addLayer(ndvi_a_3y, {}, 'ndvi_a_3y', true);
  mosaicoTotal = mosaicoTotal.addBands(ndvi_a_3y)

  var ll = ee.Image.pixelLonLat().mask(bioma250mil_PA);
  
  var long = ll.select('longitude').add(0).multiply(-1).multiply(1000).toInt16()
  var lati = ll.select('latitude').add(0).multiply(-1).multiply(1000).toInt16()

  mosaicoTotal = mosaicoTotal.addBands(long.rename('longitude'))
  mosaicoTotal = mosaicoTotal.addBands(lati.rename('latitude' ))
  //print('mosaico',mosaicoTotal)

  mosaicoTotal = mosaicoTotal.select(bandNames,bandNamesShort)
  
  //if (debug == 1){Map.addLayer(mosaicoTotal, visParMedian, 'Img_Year_'+ano, false)}

  if (importar_estaveis == 1){
    
    var SS_amostras = ee.FeatureCollection(dirsamples + ano)
    //var SS_amostras = ee.FeatureCollection(dirsamples + ano + '_v' + version_samples)
        .filter(ee.Filter.lt('outlier', 20))
    //print(SS_amostras.size())
    var SS_Flo = SS_amostras.filterMetadata('reference', 'equals', 3)
    var SS_Umi = SS_amostras.filterMetadata('reference', 'equals', 11)
    var SS_Cam = SS_amostras.filterMetadata('reference', 'equals', 12)
    var SS_Agr = SS_amostras.filterMetadata('reference', 'equals', 21)
    var SS_Anv = SS_amostras.filterMetadata('reference', 'equals', 22)
    var SS_Afr = SS_amostras.filterMetadata('reference', 'equals', 29)
    var SS_Agu = SS_amostras.filterMetadata('reference', 'equals', 33)

    var n_samples_Flo = ee.Number(ee.Number(nSamplesMax).multiply(percent_Flo).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
    var n_samples_Umi = ee.Number(ee.Number(nSamplesMax).multiply(percent_Umi).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
    var n_samples_Cam = ee.Number(ee.Number(nSamplesMax).multiply(percent_Cam).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
    var n_samples_Agr = ee.Number(ee.Number(nSamplesMax).multiply(percent_Agr).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
    var n_samples_Anv = ee.Number(ee.Number(nSamplesMax).multiply(percent_Anv).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
    var n_samples_Afr = ee.Number(ee.Number(nSamplesMax).multiply(percent_Afr).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
    var n_samples_Agu = ee.Number(ee.Number(nSamplesMax).multiply(percent_Agu).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)

    var SS_Flo_samples = SS_Flo.randomColumn().sort('random').limit(n_samples_Flo)
    var SS_Umi_samples = SS_Umi.randomColumn().sort('random').limit(n_samples_Umi)
    var SS_Cam_samples = SS_Cam.randomColumn().sort('random').limit(n_samples_Cam)
    var SS_Agr_samples = SS_Agr.randomColumn().sort('random').limit(n_samples_Agr)
    var SS_Anv_samples = SS_Anv.randomColumn().sort('random').limit(n_samples_Anv)
    var SS_Afr_samples = SS_Afr.randomColumn().sort('random').limit(n_samples_Afr)
    var SS_Agu_samples = SS_Agu.randomColumn().sort('random').limit(n_samples_Agu)

//    print('SS_Flo_samples',SS_Flo_samples)
//    print('SS_Flo',SS_Flo)Colecao 6
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

     n_amostas = n_amostas.set(String(ano),[
      SS_Flo_samples.size().subtract(n_samples_Flo),
      SS_Umi_samples.size().subtract(n_samples_Umi),
      SS_Cam_samples.size().subtract(n_samples_Cam),
      SS_Agr_samples.size().subtract(n_samples_Agr),
      SS_Anv_samples.size().subtract(n_samples_Anv),
      SS_Afr_samples.size().subtract(n_samples_Afr),
      SS_Agu_samples.size().subtract(n_samples_Agu)])
  }

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
    //var training = complementares
  }  

  //classificador sem informações de importÂncia e arvores 
  //print(training)
  var classifier = ee.Classifier.smileRandomForest({numberOfTrees: RFtrees, variablesPerSplit:1}).train(training, 'reference', bandNamesShort);
  //var classifier = ee.Classifier.smileRandomForest({numberOfTrees: RFtrees, variablesPerSplit:1}).train(training, 'reference', bandNames);
  //if (debug == 1){print('importância',classifier.explain())}
  
  var classified = mosaicoTotal.classify(classifier).mask(mosaicoTotal.select('red_m'));
  classified = classified.select(['classification'],['classification_'+ano]).clip(limite).toInt8()
  //if (debug == 1){print('classified',classified)}

  if(debug == 1){
    //camadas usadas para o processo de coleta de amostras
    //ajsutar para coleção preliminar da versao 5
    var colecao6 = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/col6/PAMPA/class_col6_mosaic/PAMPA_03')
        colecao6 = colecao6.select('classification_'+ano)
        .clip(limite)
        
    Map.addLayer(mosaicoTotal, visParMedian, 'Img_Year_' + String(ano), false)  
    Map.addLayer(colecao6, vis, 'Colecao 6 - ' +  ano, false)
    Map.addLayer(classified, vis, 'RF Teste ' + ano)
    var img_dif = diferenca(colecao6,classified,classe_diferenca, false)
    Map.addLayer(img_dif,vischange,'Diferença classe ' + String(classe_diferenca) + ' ' + String(ano),false)
  }
  if (i_ano == 0){ var classified85a21 = classified }  
  else {classified85a21 = classified85a21.addBands(classified); }
} 

//print('classified85a21', classified85a21)
print('diponibilidade de amostras x balanceamento',n_amostas)

classified85a21 = classified85a21.mask(limite_reg_raster.eq(regiao))
  
classified85a21 = classified85a21
    .set('collection', collection_out)
    .set('version', version_out)
    .set('biome', bioma)

Export.image.toAsset({
  'image': classified85a21.toInt8(),
  'description': regiao + '-'+'RF85a21_v' + version_out,
  'assetId': dirout + '0'+ regiao + '_' + 'RF85a21_v' + version_out,
  'scale': 30,
  'pyramidingPolicy': {
      '.default': 'mode'
  },
  'maxPixels': 1e13,
  'region': limite
});    
//***************************************************************
//Funções de cálculo de area
//***************************************************************
//***************************************************************
//***************************************************************


if (debug == 1){
      //calculo da acuracia
  if (calcula_acuracia == 1){
    var acura_region = require('users/schirmbeckj/MapBiomas:Coll05_final/Coll05/Passo008_acuracia_class_2017_Pampa_Regioes_function.js').acura_region;
    // o 'calcula_confusao' como ultimo parâmetro da função de acuracia é usado para
   //ativar ou desativar o cáculo da Matriz de Confusão    
	
	var acc = acura_region(classified85a21, '2017',regiao,version_out,calcula_confusao);
  }
  //print(classified85a21)
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
    
    // get raster with area km2
    var areas = calculateArea(classified85a21.select('classification_' + ano_calcula_area).selfMask(), limite2)
        .map(
            function(feature){
                return feature.set('year', String(ano_calcula_area));
            }
        );
    //print(areas);
    
    print('Área da classe 03 ano: ' + ano_calcula_area +  ' ' , areas.filterMetadata('classe','equals', 3).first().get('area'))
    print('Área da classe 11 ano: ' + ano_calcula_area +  ' ' , areas.filterMetadata('classe','equals',11).first().get('area'))
    print('Área da classe 12 ano: ' + ano_calcula_area +  ' ' , areas.filterMetadata('classe','equals',12).first().get('area'))
    print('Área da classe 21 ano: ' + ano_calcula_area +  ' ' , areas.filterMetadata('classe','equals',21).first().get('area'))
    print('Área da classe 22 ano: ' + ano_calcula_area +  ' ' , areas.filterMetadata('classe','equals',22).first().get('area'))
    print('Área da classe 29 ano: ' + ano_calcula_area +  ' ' , areas.filterMetadata('classe','equals',29).first().get('area'))
    print('Área da classe 33 ano: ' + ano_calcula_area +  ' ' , areas.filterMetadata('classe','equals',33).first().get('area'))
  }
  
//***************************************************************
//***************************************************************
//***************************************************************

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
Map.centerObject(limite)


//******************************************************************************************
//
//******************************************************************************************
/*

var m_from = [3, 4, 5, 49, 9, 11, 12, 15, 19, 20, 21, 40, 41, 36, 46, 47, 48, 22, 23, 24, 30, 39, 25, 29, 26, 33, 31];
var m_to   = [3, 3, 3, 3,  9, 11, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 21, 22, 29, 33, 33, 33];
// import classification data - each band needs to correspond to one year 
//var classification = ee.Image(file_path + file_name);
var classification = classified85a21
// import validation points 
var assetPoints = ee.FeatureCollection('projects/mapbiomas-workspace/VALIDACAO/MAPBIOMAS_100K_POINTS_utf8');
// import classification regions
//var regionsCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/CERRADO/cerrado_regioes_c6')
var regionsCollection = limite2
print('classification',classification,'regionsCollection',regionsCollection)

// define years to be assessed 
var years = [ 
            ano_base
            //1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998,
            //1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
            //2013, 2014, 2015, 2016, 2017, 2018
            //2018
           ];
            
// exclude this classes from validation points (for col6)
var excludedClasses = [
    "Não Observado",
    "Erro",
    "-",
    "Não consolidado",
    "Não consolidado",
//   "Silvicultura",
//   "silvicultura",
//    "Floresta Plantada",
//    "Cultura Perene",
//    "Cultura Anual",
//    "Cultura Semi-Perene",
    "Mangue",
//    "Mineração",
    "Outra Formação não Florestal",
    "Apicum",
 //   "Praia e Duna",
//    "�rea �mida Natural n�o Florestal",
//    "Área Úmida Natural não Florestal",
//    "�rea �mida Natural N�o Florestal",
//    "Área Úmida Natural Não Florestal",
    "Outra Forma��o Natural N�o Florestal",
    "Outra Formação Natural Não Florestal",
 //   "Outra �rea N�o Vegetada",
 //   "Outra Área Não Vegetada",
    "Rengeração",
    "Desmatamento"
];

// define pixel value that corresponds to each LAPIG class for col 6
var classes = {
  "Cultura Anual": 21,
  "Cultura Perene": 21,
  "Cultura Semi-Perene": 21,
  "Infraestrutura Urbana": 22,
  "Mineração": 22,
  "Pastagem Cultivada": 21,
  "Silvicultura": 3,
  "silvicultura": 3,
  "Floresta Plantada": 3,
  "Formação Florestal": 3,
  "Rio, Lago e Oceano": 33,
  "Outra Área não Vegetada": 22,
  //"Outra Formação não Florestal": 13,
  "Formação Campestre": 12,
  "Afloramento Rochoso": 29,
//  "Formação Savânica": 4,
  "Pastagem Natural": 12,
  //"Apicum": 13,
  "Aquicultura": 33,
  "Praia e Duna": 22,
//  "Regeneração": 3,
//  "Desmatamento": 21,
  "�rea �mida Natural n�o Florestal": 11,
  "Área Úmida Natural não Florestal": 11,
  "�rea �mida Natural N�o Florestal": 11,
  "Área Úmida Natural Não Florestal": 11,
//  "Outra Forma��o Natural N�o Florestal": 13,
//  "Outra Formação Natural Não Florestal": 13,
  "Outra �rea N�o Vegetada": 22,
  "Outra Área Não Vegetada": 22
};

// create empty recipe to receive data
var recipe = ee.FeatureCollection([]);

// for each year:
years.forEach(function(year_i){
  // import image classification for the year [i]
  var classification_i = classification.select('classification_' + year_i);
  // use only vlaid pixels, that is, not equal to zero
      classification_i = classification_i.updateMask(classification_i.neq(0));
      //Map.addLayer(classification_i, {}, 'year ' + year_i);
      
  // reclassify accordin criteria 
      classification_i = classification_i.remap(m_from, m_to).rename('classification_' + year_i);
      //Map.addLayer(classification_i, {}, 'year ' + year_i);
      
  // import validation points and filter only to Cerrado 
  var valPoints_i = assetPoints
                    .filterMetadata('POINTEDITE', 'not_equals', 'true')
                    .filterMetadata('BIOMA', 'equals', 'CERRADO')
                    .filter(ee.Filter.inList('CLASS_' + year_i, excludedClasses).not())
                    .map(function(feature) {
                      return feature.set('year', year_i).set('reference', classes.get(feature.get('CLASS_' + year_i)));
                    });
  print(valPoints_i)
  // for each region:
  var computeAccuracy = regionsCollection.map(function(feature) {
    // clip classification for the year [i]
    var classification_ij = classification_i.clip(feature);
    
    // filter validation points to the year [i] 
    var valPoints_ij = valPoints_i.filterBounds(feature.geometry());
    
    // extract classification value for each point and pair it with the reference data
    var paired_data = classification_ij.sampleRegions({
                      collection: valPoints_ij, 
                      properties: ['reference'], 
                      scale: 30, // 30 for collection 6
                      geometries: false});
    
    // compute confusion matrix
    var confusionMatrix= paired_data.errorMatrix('classification_' + year_i, 'reference');
    
    // compute accuracy metrics
    var global_accuracy = confusionMatrix.accuracy();
    var user_accuracy = confusionMatrix.consumersAccuracy();
    var producer_accuracy = confusionMatrix.producersAccuracy();
  
    // insert accuracy metrics as metadata for each vector
    return feature.set('GLOB_ACC', global_accuracy)
                  .set('VERSION', version_out)
                  .set('YEAR', year_i)
                  //.set('SIZE', valPoints_ij.size());
    });
  
  // update recipe with yearly data
  recipe = recipe.merge(computeAccuracy);
  
  // set geometries to null
  recipe = recipe.map(function (feature) {
    return feature.setGeometry(null);
   }
  );
 
});
print(recipe);

//print (recipe);

// export result as CSV
Export.table.toDrive({
  collection: recipe,
  description: 'accuracy_' + regiao + '_' + version_out + '_col07',
  folder: 'EXPORT',
  fileFormat: 'CSV'
});
*/
 