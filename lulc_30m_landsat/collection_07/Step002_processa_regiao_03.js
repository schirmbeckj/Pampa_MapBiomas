/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var controles = ee.FeatureCollection("users/evelezmartin/shp/Controles_regiao_cel_3km"),
    anv = /* color: #ea9999 */ee.FeatureCollection([]),
    arocho = /* color: #ff8c00 */ee.FeatureCollection([]),
    agua = /* color: #0000ff */ee.FeatureCollection([]),
    floresta = /* color: #006400 */ee.FeatureCollection([]),
    aumi = /* color: #45c2a5 */ee.FeatureCollection([]),
    campo = /* color: #b8af4f */ee.FeatureCollection([]),
    agric = /* color: #ffefc3 */ee.FeatureCollection([]),
    geom_limite = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-56.882427922398676, -29.644269555713176],
          [-56.90199731937133, -29.660977800433923],
          [-56.932896367222895, -29.677683270868858],
          [-57.012547246129145, -29.697964753870924],
          [-57.026280156285395, -29.74388121115491],
          [-57.05786584964477, -29.776665814578195],
          [-57.07503198734008, -29.804673246343803],
          [-57.00224756351196, -29.85709160780115],
          [-56.99469446292602, -29.927931763428777],
          [-57.02490686526977, -29.958871310784346],
          [-57.05031274905883, -29.9915853558148],
          [-57.04413293948852, -30.029044564715218],
          [-57.00636743655883, -30.102138417372455],
          [-56.930149785191645, -30.124115433881112],
          [-56.850498906285395, -30.110454620212934],
          [-56.80998682132446, -30.151431391774203],
          [-56.77153467288696, -30.17695903529126],
          [-56.68227075687133, -30.22621462281223],
          [-56.64862512698852, -30.267143269824928],
          [-56.63557886234008, -30.306869258629],
          [-56.56691431155883, -30.361392153944905],
          [-56.44812463870727, -30.450223025970455],
          [-56.39868616214477, -30.507623930994463],
          [-56.22084497562133, -30.61996052882603],
          [-56.19475244632446, -30.642412232255513],
          [-56.169346562535395, -30.703832348078087],
          [-56.14050745120727, -30.746921207715864],
          [-56.10754846683227, -30.762263272329307],
          [-56.04781030765258, -30.792940066188415],
          [-56.029270878941645, -30.824196729060603],
          [-56.01141809573852, -30.86546352491297],
          [-56.03064416995727, -30.933809401388732],
          [-56.03957056155883, -31.030941388904214],
          [-56.02721094241821, -31.095053099147083],
          [-55.878208867222895, -31.093289135068197],
          [-55.84868311038696, -31.061532182072664],
          [-55.78001855960571, -31.030353008076613],
          [-55.70929407230102, -30.971496575705913],
          [-55.65710901370727, -30.965020150745122],
          [-55.64406274905883, -30.939699002303104],
          [-55.62483667484008, -30.910836491276715],
          [-55.64420901891684, -30.871341649084798],
          [-55.62841617223715, -30.856311721690663],
          [-55.58893405553793, -30.852480186896972],
          [-55.543958774776215, -30.853953872240197],
          [-55.5103131448934, -30.846879976095337],
          [-55.500013462276215, -30.821527565158448],
          [-55.53159915563559, -30.809143721826718],
          [-55.541212192744965, -30.765197688552504],
          [-55.50138675329184, -30.75251154289253],
          [-55.478040806026215, -30.699388608326256],
          [-55.43443881628012, -30.665728947162865],
          [-55.43262498732191, -30.644660913823415],
          [-55.38730638380628, -30.619846146931298],
          [-55.33512132521253, -30.595025017470647],
          [-55.31864183302503, -30.565467762160132],
          [-55.32001512404066, -30.527621331828446],
          [-55.34885423536878, -30.503959823133776],
          [-55.31177537794691, -30.496860247560907],
          [-55.29804246779066, -30.438860991559793],
          [-55.32962816115003, -30.421099214380643],
          [-55.37357347365003, -30.39741181469311],
          [-55.42438524122816, -30.258725479075014],
          [-55.47107713575941, -30.194650222631328],
          [-55.50128953810316, -30.15666000843326],
          [-55.63037889357191, -30.192276263383715],
          [-55.63312547560316, -30.2468628411279],
          [-55.67707078810316, -30.244490141648402],
          [-55.66333787794691, -30.14716016682223],
          [-55.69355028029066, -30.097270992662125],
          [-55.69904344435316, -30.023579035060838],
          [-55.74573533888441, -29.92127042732982],
          [-55.75122850294691, -29.785489852563895],
          [-55.83362596388441, -29.656685495585513],
          [-55.84461229200941, -29.558779317564557],
          [-55.92700975294691, -29.508595458443626],
          [-56.04511278029066, -29.558779317564557],
          [-56.12751024122816, -29.506205129834445],
          [-56.242180041032846, -29.484091915159055],
          [-56.39118211622816, -29.582667637765795],
          [-56.39667528029066, -29.63520204108125],
          [-56.470146349626596, -29.697849297430313],
          [-56.47770335100988, -29.586802347442536],
          [-56.53263109083753, -29.524131218585648],
          [-56.73175828810316, -29.616101789041274],
          [-56.81587236281019, -29.658475576497572]]]);
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
var classe_diferenca = 3

var desvio = 0
var nSamplesMin = 200;
var nSamplesMax = 2000;

var regiao = 3
var collection_out = 7
var versaocomplementares = '01' 

var bioma = 'PAMPA'
//print('pontos_exp1_' + sufixName + '_' + versao_amostra + ' RFtrees = ' + RFtrees)

//conjunto de flags para ativar e desativar recursos de processamento
//*****************************************
//definir com 1 para usar e como zero para não usar
var importar_estaveis = 1    //definir com 1 para importar e como zero para gerar a partir de pontos estaveis
var usar_complementares = 0

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
    var anos = [1990,2000,2010,2020]
    limite = limite.geometry()
}

var biomes = ee.Image('projects/mapbiomas-workspace/AUXILIAR/biomas-raster-41')
var bioma250mil_PA = biomes.mask(biomes.eq(6))

var palettes = require('users/mapbiomas/modules:Palettes.js');
//vis coll 05
var vis = { 'min': 0, 'max': 45,  'palette': palettes.get('classification5')};

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
    var percent_Flo = -34.57 + desvio + ano * 0.01985
    var percent_Umi =  -2.06 + desvio + ano * 0.00125
    var percent_Cam = 416.10 + desvio + ano *-0.16821
    var percent_Agr =-236.11 + desvio + ano * 0.12384
    var percent_Anv =   0.64 + desvio + ano *-0.00003
    var percent_Afr =   1.05 + desvio + ano *-0.00015
    var percent_Agu = -45.08 + desvio + ano * 0.02347
 }
 
 if (ano > 1994 && ano <= 2004){// ajustar para período 2
    var percent_Flo = -34.57 + desvio + ano * 0.01985
    var percent_Umi =  -2.06 + desvio + ano * 0.00125
    var percent_Cam = 416.10 + desvio + ano *-0.16821
    var percent_Agr =-236.11 + desvio + ano * 0.12384
    var percent_Anv =   0.64 + desvio + ano *-0.00003
    var percent_Afr =   1.05 + desvio + ano *-0.00015
    var percent_Agu = -45.08 + desvio + ano * 0.02347
 }
 if (ano > 2004){ // ajustar para período 3
    var percent_Flo = -34.57 + desvio + ano * 0.01985
    var percent_Umi =  -2.06 + desvio + ano * 0.00125
    var percent_Cam = 416.10 + desvio + ano *-0.16821
    var percent_Agr =-236.11 + desvio + ano * 0.12384
    var percent_Anv =   0.64 + desvio + ano *-0.00003
    var percent_Afr =   1.05 + desvio + ano *-0.00015
    var percent_Agu = -45.08 + desvio + ano * 0.02347
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

 