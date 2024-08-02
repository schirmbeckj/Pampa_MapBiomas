
// Coleção 9
// Script para fazer ajuste fino da classificação das regiões
// Para rodar veja instruções no final do arquivo
      
 //baseado na versao R0X feita pelo Juliano, customizada para calcular a area pelo limite sem buffer
//customizada para incluir mosaico 2017 com duas versões de bandas RGB falsa cor
  
//var classRegion01 = function (version_out, sufixName, versao_amostra, RFtrees) {
var version_out = '08'//mudar a cada nova versao que for exportada
var version = '2' //versão dos mosaicos da col 8
var version_samples = '02'
var ano_base = 2017
var RFtrees = 100//60, 100 
var classe_diferenca = 22

var desvio = 0 // desvio para calculo de balanceamento de amostras																  
var nSamplesMin = 0;
var nSamplesMax = 2000;

var regiao = 2
var collection_out = 9
var bioma = 'PAMPA'

//conjunto de flags para ativar e desativar recursos de processamento
//*****************************************
//definir com 1 para usar e como zero para não usar
var importar_estaveis = 1    //definir com 1 para importar e como zero para gerar a partir de pontos estaveis
var usar_complementares = 1

var debug = 1   //variavel para uso de debug, habilita os prints e os addLayers
var calcula_acuracia = 1
var calcula_area = 1 
var ano_calcula_area = '2006'
var calcula_confusao = 1 //se calcula acuracia igual a zero esse é ignorado
var exporta_colecao = 1//ativar a geometria do bioma antes de dar o Run
var exporta_prob = 1
//*************************************

var dirasset =  'projects/nexgenmap/MapBiomas2/LANDSAT/BRAZIL/mosaics-2-pampa';

//pontos estaveis com propriedades
var dirsamples = 'projects/mapbiomas-workspace/AMOSTRAS/col' + collection_out + '/PAMPA/SAMPLES/v' + version_samples + '/training_periodos_'

var dirout = 'projects/mapbiomas-workspace/AMOSTRAS/col' + collection_out + '/PAMPA/class_col_' + collection_out + '/'

var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col09_buff')
var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);

//limite sem o buffer  
var regioesCollection2 = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05')
var limite2 = regioesCollection2.filterMetadata('ID', 'equals', regiao);

var limite_reg_raster = ee.Image().uint32().paint({
    featureCollection: limite,
    color: 'ID',
}).rename(['limite']);

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
    2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,
    2015,2016,2017,2018,2019,2020,2021,2022,2023
    ];
}else
{
    var anos = [1985,2006,2017,2023]
    limite = limite.geometry()
}

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

var vis = {'min': 0, 'max': 62,  'palette': palettes.get('classification8')};
var visParMedian = {'bands':['swir1_m','nir_m','red_m'], 'gain':[0.08, 0.06,0.2],'gamma':0.5 };
var visParMedian2 = {'bands':['nir_m','swir1_m','red_m'], 'gain':[0.06, 0.08,0.2],'gamma':0.5 };

var mosaicos = ee.ImageCollection(dirasset)
                  .filterMetadata('biome', 'equals', bioma)
                  .filterMetadata('version', 'equals', version)
//print('mosaicos',mosaicos)

var deficit_amostras = ee.Feature(ee.Geometry.Point([0, 0]))

for (var i_ano=0;i_ano<anos.length; i_ano++){
  var ano = anos[i_ano];
//bloco 1A 
if (ano <= 1987){ // ajustar para período 1
    var percent_Flo =  -53.06	   + 20 + ano * 	 0.02969
    var percent_Umi = 0
//    var percent_Umi =   -5.72	   + desvio + ano *  0.00300
    var percent_Cam = 1286.55	   + -29 + ano * -0.61389
//  var percent_Agr = 25
    var percent_Agr =-1062.50	   + 8 + ano *  0.54669
    var percent_Anv = 10 //260 amostras
//    var percent_Anv =   -3.54	   + desvio + ano *  0.00218
//    var percent_Afr =    0.00000 + desvio + ano *  0.00000
    var percent_Agu =  30
//    var percent_Agu =  -61.72	   + desvio + ano *  0.03232
 }
 
// Bloco 1B
  if (ano > 1987 && ano <= 1998){// ajustar para período 2
     var percent_Flo =  -53.06	   + 20 + ano * 	 0.02969
    var percent_Umi = 0
//    var percent_Umi =   -5.72	   + desvio + ano *  0.00300
    var percent_Cam = 1286.55	   + -41 + ano * -0.61389
//  var percent_Agr = 25
    var percent_Agr =-1062.50	   + 13 + ano *  0.54669
    var percent_Anv = 10 //260 amostras
//    var percent_Anv =   -3.54	   + desvio + ano *  0.00218
//    var percent_Afr =    0.00000 + desvio + ano *  0.00000
    var percent_Agu =  30
//    var percent_Agu =  -61.72	   + desvio + ano *  0.03232
 }
 

//bloco 2A
 if (ano > 1998 && ano <= 2004){// ajustar para período 2
    var percent_Flo =  -53.06	   + 22 + ano * 	 0.02969
  var percent_Umi = 0
//    var percent_Umi =   -5.72 + desvio + ano *  0.00300
    var percent_Cam = 1286.55	 + -35 + ano * -0.61389
    var percent_Agr =-1062.50	   + 11 + ano *  0.54669
    var percent_Anv = 9 //260 amostras
//    var percent_Anv =   -3.54	   + desvio + ano *  0.00218
//    var percent_Afr =    0.00000 + desvio + ano *  0.00000
    var percent_Agu =  30
//    var percent_Agu =  -61.72	   + desvio + ano *  0.03232
 }

 //bloco 2Ba
 if (ano > 2004 && ano <= 2008){ // ajustar para período 3
    var percent_Flo =  -53.06	   + 15 + ano * 	 0.02969
  var percent_Umi = 0
//    var percent_Umi =   -5.72	   + desvio + ano *  0.00300
    var percent_Cam = 1286.55	   + -37 + ano * -0.61389
    var percent_Agr =-1062.50	   + 10 + ano *  0.54669
    var percent_Anv = 10 //260 amostras
//    var percent_Anv =   -3.54	   + desvio + ano *  0.00218
//    var percent_Afr =    0.00000 + desvio + ano *  0.00000
//    var percent_Agu =  -61.72	   + desvio + ano *  0.03232
    var percent_Agu =  30
 }
 
 //bloco 2Bb
 if (ano > 2008 && ano <= 2012){ // ajustar para período 3
    var percent_Flo =  -53.06	   + 15 + ano * 	 0.02969
  var percent_Umi = 0
//    var percent_Umi =   -5.72	   + desvio + ano *  0.00300
    var percent_Cam = 1286.55	   + -37 + ano * -0.61389
    var percent_Agr =-1062.50	   + 9 + ano *  0.54669
    var percent_Anv = 10 //260 amostras
//    var percent_Anv =   -3.54	   + desvio + ano *  0.00218
//    var percent_Afr =    0.00000 + desvio + ano *  0.00000
//    var percent_Agu =  -61.72	   + desvio + ano *  0.03232
    var percent_Agu =  30
 }
 
 //bloco 3
  if (ano > 2012){ // ajustar para período 3
    var percent_Flo =  -53.06	   + 15 + ano * 	 0.02969
  var percent_Umi = 0
//    var percent_Umi =   -5.72	   + desvio + ano *  0.00300
    var percent_Cam = 1286.55	   + -17 + ano * -0.61389
    var percent_Agr =-1062.50	   + 3 + ano *  0.54669
    var percent_Anv = 10 //260 amostras
//    var percent_Anv =   -3.54	   + desvio + ano *  0.00218
//    var percent_Afr =    0.00000 + desvio + ano *  0.00000
//    var percent_Agu =  -61.72	   + desvio + ano *  0.03232
    var percent_Agu =  30
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

  //var ndvi_color = '0f330f, 005000, 4B9300, 92df42, bff0bf, FFFFFF, eee4c7, ecb168, f90000'
  //var visParNDFI_amp = {'min':0, 'max':60, 'palette':ndvi_color};
  //Map.addLayer(ndvi_a_3y, {}, 'ndvi_a_3y', true);
  mosaicoTotal = mosaicoTotal.addBands(ndvi_a_3y)

  var ll = ee.Image.pixelLonLat().mask(limite_reg_raster);
  
  var long = ll.select('longitude').add(0).multiply(-1).multiply(1000).toInt16()
  var lati = ll.select('latitude').add(0).multiply(-1).multiply(1000).toInt16()

  mosaicoTotal = mosaicoTotal.addBands(long.rename('longitude'))
  mosaicoTotal = mosaicoTotal.addBands(lati.rename('latitude' ))
  //print('mosaico',mosaicoTotal)

  mosaicoTotal = mosaicoTotal.select(bandNames,bandNamesShort)
  
  //if (debug == 1){Map.addLayer(mosaicoTotal, visParMedian, 'Img_Year_'+ano, false)}

  if (importar_estaveis == 1){
        var SS_amostras = ee.FeatureCollection(dirsamples + ano + '_FOc8v01')
          .filter(ee.Filter.lt('outlier', 20))
    //var SS_amostras = ee.FeatureCollection(dirsamples + ano + '_v' + version_samples)
	  //print(SS_amostras.size())
    var SS_Flo = SS_amostras.filterMetadata('reference', 'equals', 3)
    var SS_Umi = SS_amostras.filterMetadata('reference', 'equals', 11)
    var SS_Cam = SS_amostras.filterMetadata('reference', 'equals', 12)
    var SS_Agr = SS_amostras.filterMetadata('reference', 'equals', 21)
    var SS_Anv = SS_amostras.filterMetadata('reference', 'equals', 22)
//    var SS_Afr = SS_amostras.filterMetadata('reference', 'equals', 29)
    var SS_Agu = SS_amostras.filterMetadata('reference', 'equals', 33)

    var n_samples_Flo = ee.Number(ee.Number(nSamplesMax).multiply(percent_Flo).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
    var n_samples_Umi = ee.Number(ee.Number(nSamplesMax).multiply(percent_Umi).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
    var n_samples_Cam = ee.Number(ee.Number(nSamplesMax).multiply(percent_Cam).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
    var n_samples_Agr = ee.Number(ee.Number(nSamplesMax).multiply(percent_Agr).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
    var n_samples_Anv = ee.Number(ee.Number(nSamplesMax).multiply(percent_Anv).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
//    var n_samples_Afr = ee.Number(ee.Number(nSamplesMax).multiply(percent_Afr).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
    var n_samples_Agu = ee.Number(ee.Number(nSamplesMax).multiply(percent_Agu).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)

    var SS_Flo_samples = SS_Flo.randomColumn().sort('random').limit(n_samples_Flo)
    var SS_Umi_samples = SS_Umi.randomColumn().sort('random').limit(n_samples_Umi)
    var SS_Cam_samples = SS_Cam.randomColumn().sort('random').limit(n_samples_Cam)
    var SS_Agr_samples = SS_Agr.randomColumn().sort('random').limit(n_samples_Agr)
    var SS_Anv_samples = SS_Anv.randomColumn().sort('random').limit(n_samples_Anv)
//    var SS_Afr_samples = SS_Afr.randomColumn().sort('random').limit(n_samples_Afr)
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
  //          .merge(SS_Afr_samples)
            .merge(SS_Agu_samples)
            
            
    deficit_amostras = deficit_amostras.set(String(ano),[
      SS_Flo_samples.size().subtract(n_samples_Flo),
      SS_Umi_samples.size().subtract(n_samples_Umi),
      SS_Cam_samples.size().subtract(n_samples_Cam),
      SS_Agr_samples.size().subtract(n_samples_Agr),
      SS_Anv_samples.size().subtract(n_samples_Anv),
 //     SS_Afr_samples.size().subtract(n_samples_Afr),
      SS_Agu_samples.size().subtract(n_samples_Agu)])
  }
   
  if(usar_complementares == 1){
  
    var pontos_complementares = floresta
                .merge(aumi)
                .merge(campo)
                .merge(agric)
                .merge(anv)
 //               .merge(arocho)
                .merge(agua)
                
    // Samples 
    var trainingComp = mosaicoTotal.sampleRegions({
        'collection': pontos_complementares,
        'properties': ['reference'],
        'scale': 30,
        'tileScale': 4
    });
    var complementares = trainingComp.map(function (feature) {return feature.set('comp_coll', String(collection_out))});
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
  
  var classifier_prob = classifier.setOutputMode('MULTIPROBABILITY')
  
  var classified = mosaicoTotal.classify(classifier).mask(limite_reg_raster);
  var classified_prob = mosaicoTotal.classify(classifier_prob).mask(limite_reg_raster);
  var max_prob = classified_prob.arrayReduce(ee.Reducer.max(), [0]);
  var img_max_prob = max_prob.arrayFlatten([['classification']]).multiply(100)
  
  if (debug == 1){
    //print("Image_max_prob", img_max_prob)
    var imageVisParam3 = {"opacity":1,"bands":["classification"],"min":17.347148895263672,"max":99.36353302001953,"palette":["ffff55","38761d"]};
    Map.addLayer(img_max_prob, imageVisParam3, 'RF classified_prob', false)
  }

  classified = classified.select(['classification'],['classification_'+ano]).toInt8()
  //if (debug == 1){print('classified',classified)}

  if (i_ano == 0){ var classified_serie = classified;
                   var   classified_max_prob_serie = img_max_prob 
  }  
  else {classified_serie = classified_serie.addBands(classified); 
        classified_max_prob_serie = classified_max_prob_serie.addBands(img_max_prob);
  }
 
 
 //
 if(debug == 1){
    //camadas usadas para o processo de coleta de amostras
    //ajsutar para coleção preliminar da versao 5
 
  var img = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/col' + collection_out + '/PAMPA/estabilidade_colecoes/pampa_colecoes_' + ano)
  var estabilidadeMask = img.select('estabilidade').lte(1).selfMask().updateMask(limite_reg_raster);
  
      Map.addLayer(mosaicoTotal, visParMedian, 'Img_Year_' + String(ano), false)  
  
  //Coleção 8
  //ultima versão da coleção 8  sem filtros
  var colecao_ante_SF = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/col8/PAMPA/class_col_8_mosaic/PAMPA_07_sem_filtro')
  //ultima versão da coleção 8  com filtros
  var colecao_ante_CF = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/col8/PAMPA/class_col_8_mosaic/PAMPA_07a_blend_com_filtro_restinga')
  
    colecao_ante_CF = colecao_ante_CF.select('classification_'+ano).mask(limite_reg_raster);
    colecao_ante_SF = colecao_ante_SF.select('classification_'+ano).mask(limite_reg_raster);
    
    Map.addLayer(colecao_ante_SF, vis, 'Colecao 8 SF - ' +  ano, false)
    Map.addLayer(colecao_ante_CF, vis, 'Colecao 8 CF - ' +  ano, false)

  
  
  //Coleção 9
  var versao_anteSF = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/col9/PAMPA/class_col_9_mosaic/PAMPA_01_sem_filtro')
    versao_anteSF = versao_anteSF.select('classification_'+ano).mask(limite_reg_raster);
  
  var versao_anteCF = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/col9/PAMPA/class_col_9_mosaic/PAMPA_01_com_filtro_restinga_aroc')
    versao_anteCF = versao_anteCF.select('classification_'+ano).mask(limite_reg_raster);


    Map.addLayer(versao_anteSF, vis, 'Versão AnteriorSF - ' +  ano, false)
    Map.addLayer(versao_anteCF, vis, 'Versão AnteriorCF - ' +  ano, false)
  
  

//Classificação atual  
    Map.addLayer(classified, vis, 'RF Teste ' + ano,false)

// agrega a classificacao random forest nova com a classificacao estável das col anteriores
    Map.addLayer(classified.mask(estabilidadeMask.unmask(0).eq(0)).blend(img.select('mode').mask(estabilidadeMask)), vis, 'Blend ' + ano,false)
    
    var img_dif = diferenca(colecao_ante_CF,classified,classe_diferenca, false)
    Map.addLayer(img_dif,vischange,'Dif clas col 8 CF' + String(classe_diferenca) + ' ' + String(ano),false)
    
    var img_dif = diferenca(colecao_ante_SF,classified,classe_diferenca, false)
    Map.addLayer(img_dif,vischange,'Dif clas col 8 SF ' + String(classe_diferenca) + ' ' + String(ano),false)
    
    var img_dif = diferenca(versao_anteSF,classified,classe_diferenca, false)
    Map.addLayer(img_dif,vischange,'Dif clas col 9 SF ' + String(classe_diferenca) + ' ' + String(ano),false)
    
    var img_dif = diferenca(versao_anteCF,classified,classe_diferenca, false)
    Map.addLayer(img_dif,vischange,'Dif clas col 9 CF ' + String(classe_diferenca) + ' ' + String(ano),false)

    var imageVisParam = {"opacity":1,"min":1,"max":5,"palette":["555555","d9d9d9","dbed55","ff5050","990033"]};
    Map.addLayer(estabilidadeMask,imageVisParam,'Estabilidade ' + ano, false)
    
  }
//fecha loop dos anos
} 
//
//print('classified_serie', classified_serie)
print('deficit de amostras',deficit_amostras)

classified_serie = classified_serie.mask(limite_reg_raster)
  
classified_serie = classified_serie
    .set('collection', collection_out)
    .set('version', version_out)
    .set('biome', bioma)


Export.image.toAsset({
  'image': classified_serie.toInt8(),
  'description': regiao + '-'+'RF_col' + collection_out + '_v' + version_out,
  'assetId': dirout + '0'+ regiao + '_' + 'RF_col' + collection_out + '_v' + version_out,
  'scale': 30,
  'pyramidingPolicy': {
      '.default': 'mode'
  },
  'maxPixels': 1e13,
  'region': limite
});

classified_max_prob_serie = classified_max_prob_serie    
        .set('collection', collection_out)
        .set('version', version_out)
        .set('biome', bioma)
if (exporta_prob == 1){        
  Export.image.toAsset({
    'image': classified_max_prob_serie.toInt8(),
    'description': regiao + '-'+'RF_PROB_col' + collection_out + '_v' + version_out,
    'assetId': dirout + '_prob' + '0'+ regiao + '_' + 'RF_PROB_col' + collection_out + '_v' + version_out,
    'scale': 30,
    'pyramidingPolicy': {
        '.default': 'mode'
    },
    'maxPixels': 1e13,
    'region': limite
  });
}


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
	
	var acc = acura_region(classified_serie, '2017',regiao,version_out,calcula_confusao);
  }
  //print(classified_serie)
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
    var areas = calculateArea(classified_serie.select('classification_' + ano_calcula_area).selfMask(), limite2)
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
//    print('Área da classe 29 ano: ' + ano_calcula_area +  ' ' , areas.filterMetadata('classe','equals',29).first().get('area'))
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

 
