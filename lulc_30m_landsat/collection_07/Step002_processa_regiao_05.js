/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var controles = ee.FeatureCollection("users/evelezmartin/shp/Controles_regiao_cel_3km"),
    anv = /* color: #ea9999 */ee.FeatureCollection([]),
    arocho = /* color: #ff8c00 */ee.FeatureCollection([]),
    agua = /* color: #0000ff */ee.FeatureCollection([]),
    floresta = /* color: #006400 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-55.906685841927015, -28.546075520895897],
                  [-55.90685750330397, -28.55331333797787],
                  [-55.902909291634046, -28.552107069677053]]]),
            {
              "reference": 3,
              "system:index": "0"
            })]),
    aumi = /* color: #45c2a5 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-55.87289043396612, -28.883643219333784],
                  [-55.869285518656056, -28.883887466720672],
                  [-55.8679337117066, -28.880467932809946],
                  [-55.87516494721075, -28.88236560092429]]]),
            {
              "reference": 11,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-55.87932773560186, -28.879396956293064],
                  [-55.877482375799616, -28.877630760374384],
                  [-55.88044353455206, -28.877668339323606]]]),
            {
              "reference": 11,
              "system:index": "1"
            })]),
    campo = /* color: #b8af4f */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-55.63900816694615, -28.83432946354394],
                  [-55.63793528334019, -28.82985560896392],
                  [-55.6411968495023, -28.828126168264863],
                  [-55.64226973310826, -28.830908297930282]]]),
            {
              "reference": 12,
              "system:index": "0"
            })]),
    agric = /* color: #ffefc3 */ee.FeatureCollection([]),
    geom_limite = /* color: #ffc82d */ee.Geometry.Polygon(
        [[[-57.10963363602638, -29.72244733597707],
          [-57.20851058915138, -29.74391214915905],
          [-57.338973235635756, -29.83687322830388],
          [-57.34858627274513, -29.96425612510744],
          [-57.418624114542006, -30.002320288217174],
          [-57.498274993448256, -30.098604944176245],
          [-57.59577865555763, -30.154430872563378],
          [-57.671309661417006, -30.15680574367729],
          [-57.68092269852638, -30.193608930987157],
          [-57.616378020792006, -30.24582210206785],
          [-57.550460052042006, -30.300378950079434],
          [-57.413130950479506, -30.326460632535035],
          [-57.223616790323256, -30.31460618285886],
          [-57.146712493448256, -30.288521345515402],
          [-57.12885971024513, -30.20785163511428],
          [-57.09040756180763, -30.15680574367729],
          [-57.039595794229506, -30.125927959290568],
          [-56.932479095010756, -30.1199888162558],
          [-56.98329086258888, -29.993994999334994],
          [-56.91875682664129, -29.881302092425834],
          [-56.96270213914129, -29.778847210749955],
          [-56.92150340867254, -29.738312834716936],
          [-56.76220165086004, -29.707304900038988],
          [-56.61388622117254, -29.654808118044297],
          [-56.58092723679754, -29.690604352375114],
          [-56.53423534226629, -29.76454283262384],
          [-56.38042674851629, -29.757389877544984],
          [-56.27056346726629, -29.630936884885795],
          [-56.21563182664129, -29.564067338940752],
          [-56.14971385789129, -29.618999146275378],
          [-56.06182323289129, -29.642873208925547],
          [-55.95195995164129, -29.61422365482996],
          [-55.80089793992254, -29.87653907925772],
          [-55.67180858445379, -29.867012370513063],
          [-55.51525340867254, -29.75500544572007],
          [-55.52074657273504, -29.659581685435484],
          [-55.38616405320379, -29.616611428835665],
          [-55.35876418810538, -29.537753375055413],
          [-55.52074657273504, -29.418233960634495],
          [-55.61138377976629, -29.348829786160504],
          [-55.57018504929754, -29.173913468833614],
          [-55.49053417039129, -29.171515278898937],
          [-55.45208202195379, -29.130737478866838],
          [-55.46306835007879, -29.02031646529382],
          [-55.36968456101629, -29.013110986587197],
          [-55.32299266648504, -28.91698994230633],
          [-55.58666454148504, -28.690754855879327],
          [-55.34771190476629, -28.676297657790602],
          [-55.33397899461004, -28.606393081078433],
          [-55.74596629929754, -28.34323265838959],
          [-55.88878856492254, -28.331145370428434],
          [-56.06731639695379, -28.480930438599607],
          [-56.09203563523504, -28.596747416174015],
          [-56.32549510789129, -28.760603161698135],
          [-56.34746776414129, -28.854463438191658],
          [-56.62212596726629, -29.094743629794404],
          [-57.10552440476629, -29.683446124957285]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Coleção 6
// Script para fazer ajuste fino da classificação das regiões
// Para rodar veja instruções no final do arquivo																				
//baseado na versao R0X feita pelo Juliano, customizada para calcular a area pelo limite sem buffer
//customizada para incluir mosaico 2017 com duas versões de bandas RGB falsa cor
   
//var classRegion01 = function (version_out, sufixName, versao_amostra, RFtrees) {
var version_out = '031'//mudar a cada nova versao que for exportada
var version = '2' //versão dos mosaicos
var version_samples = '03'
var ano_base = 2000
var RFtrees = 100//60, 100
var classe_diferenca = 12 // classe para mapa de diferenças


var desvio = 0 // desvio para calculo de balanceamento de amostras																  
var nSamplesMin = 200;
var nSamplesMax = 2000;

var regiao = 5
var collection_out = 7
var versaocomplementares = '01' 

var bioma = 'PAMPA'
 
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
 if (ano <= 1994){ // ajustar para período 1
    var percent_Flo = -34.30	   + desvio + ano *  0.01964
    var percent_Umi = -13.51	   + desvio + ano *  0.00775
    var percent_Cam = 480.44	   + desvio + ano * -0.22508
    var percent_Agr =-293.47	   + desvio + ano *  0.17552
    var percent_Anv =  -3.04	   + desvio + ano *  0.00182
    var percent_Afr =   0.00671  + desvio + ano *  0.00000
    var percent_Agu = -36.14	   + desvio + ano *  0.02037
 }
 if (ano > 1994 && ano <= 2004){// ajustar para período 2
    var percent_Flo = -34.30	   + desvio + ano *  0.01964
    var percent_Umi = -13.51	   + desvio + ano *  0.00775
    var percent_Cam = 480.44	   + desvio + ano * -0.22508
    var percent_Agr =-293.47	   + desvio + ano *  0.17552
    var percent_Anv =  -3.04	   + desvio + ano *  0.00182
    var percent_Afr =   0.00671  + desvio + ano *  0.00000
    var percent_Agu = -36.14	   + desvio + ano *  0.02037
 }
 if (ano > 2004){ // ajustar para período 3
    var percent_Flo = -34.30	   + desvio + ano *  0.01964
    var percent_Umi = -13.51	   + desvio + ano *  0.00775
    var percent_Cam = 480.44	   + desvio + ano * -0.22508
    var percent_Agr =-293.47	   + desvio + ano *  0.17552
    var percent_Anv =  -3.04	   + desvio + ano *  0.00182
    var percent_Afr =   0.00671  + desvio + ano *  0.00000
    var percent_Agu = -36.14	   + desvio + ano *  0.02037
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
        //.filterMetadata('regiao','equals',regiao)
        //.filter(ee.Filter.eq('regiao', regiao))
        //.filterBounds(limite) 
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
//    print('SS_Flo',SS_Flo)
//    Map.addLayer(SS_Flo,{color:'0000ff'},'todos')
//    Map.addLayer(SS_Flo_samples,{color:'ff0000'},'selecao')
    
    //cria variavel com todas as amostras estáveis
    var SS_amostras = SS_Flo_samples
            .merge(SS_Umi_samples)
            .merge(SS_Cam_samples)
            .merge(SS_Agr_samples)
            .merge(SS_Anv_samples)
           // .merge(SS_Afr_samples)
            .merge(SS_Agu_samples)
	
    n_amostas = n_amostas.set(String(ano),[
      SS_Flo_samples.size().subtract(n_samples_Flo),
      SS_Umi_samples.size().subtract(n_samples_Umi),
      SS_Cam_samples.size().subtract(n_samples_Cam),
      SS_Agr_samples.size().subtract(n_samples_Agr),
      SS_Anv_samples.size().subtract(n_samples_Anv),
      SS_Afr_samples.size().subtract(n_samples_Afr),
      SS_Agu_samples.size().subtract(n_samples_Agu)])
    //print('primeiro elemento estaveis',training.first())
  }  
  // Amostras complementares
  //var complementares = ee.FeatureCollection('')
 
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
  //print(training.first())
  var classifier = ee.Classifier.smileRandomForest({numberOfTrees: RFtrees, variablesPerSplit:1}).train(training, 'reference', bandNamesShort);
  
  //classificador com informações de importÂncia e arvores
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
  'description': regiao+'-'+'RF85a21_v'+version_out,
  'assetId': dirout + '0'+ regiao + '_' + 'RF85a21_v'+version_out,
  'scale': 30,
  'pyramidingPolicy': {
      '.default': 'mode'
  },
  'maxPixels': 1e13,
  'region': limite
});    

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

 