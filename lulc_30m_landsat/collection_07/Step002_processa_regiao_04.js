/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var controles = ee.FeatureCollection("users/evelezmartin/shp/Controles_regiao_cel_3km"),
    anv = /* color: #ea9999 */ee.FeatureCollection([]),
    arocho = /* color: #ff8c00 */ee.FeatureCollection([]),
    agua = /* color: #0000ff */ee.FeatureCollection([]),
    floresta = /* color: #006400 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-55.705441031090174, -28.239795717062545],
                  [-55.70651391469613, -28.239606680163444],
                  [-55.707157644859706, -28.240287211432474],
                  [-55.70501187764779, -28.240929931422492]]]),
            {
              "reference": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-55.70063451253549, -28.238169988783408],
                  [-55.70179322682992, -28.23696012840425],
                  [-55.70235112630502, -28.237262594785285],
                  [-55.70072034322396, -28.238737106113156]]]),
            {
              "reference": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-55.709947142235194, -28.23733821124657],
                  [-55.71011880361215, -28.238321220366107],
                  [-55.70857385121957, -28.238926144553133]]]),
            {
              "reference": 3,
              "system:index": "2"
            })]),
    aumi = /* color: #45c2a5 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-55.53025896673751, -28.359494793113242],
                  [-55.529743982606654, -28.361383018409217],
                  [-55.52781279211593, -28.36194947944769],
                  [-55.528714014344935, -28.359910205560453]]]),
            {
              "reference": 11,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-55.52107508307052, -28.365272656642965],
                  [-55.52013094549728, -28.367462875626188],
                  [-55.51931555395675, -28.366065672185222],
                  [-55.5206030142839, -28.364781739289903]]]),
            {
              "reference": 11,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-55.515496088319544, -28.370483793145883],
                  [-55.51232035284591, -28.369350959155287],
                  [-55.51562483435226, -28.36791601873723],
                  [-55.516483141237025, -28.369086629483768]]]),
            {
              "reference": 11,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-55.506955217892425, -28.45814660038713],
                  [-55.50840361076047, -28.456194071043097],
                  [-55.50904734092404, -28.457127893924383],
                  [-55.50755603271176, -28.458137167964924]]]),
            {
              "reference": 11,
              "system:index": "3"
            })]),
    campo = /* color: #b8af4f */ee.FeatureCollection([]),
    agric = /* color: #ffefc3 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-55.46351553712399, -29.761074098598623],
                  [-55.459395664077114, -29.75958389014367],
                  [-55.46403052125485, -29.756603406750003],
                  [-55.46626211915524, -29.757646586020915]]]),
            {
              "reference": 21,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-55.47141196046383, -29.702343127172316],
                  [-55.46729208741696, -29.706518036497748],
                  [-55.46832205567868, -29.702044912722556]]]),
            {
              "reference": 21,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-55.495101230483364, -29.73126571959459],
                  [-55.495101230483364, -29.728433462703084],
                  [-55.49922110353024, -29.729626001665622],
                  [-55.497847812514614, -29.73305447222476]]]),
            {
              "reference": 21,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-55.47995809393879, -29.753993355335393],
                  [-55.48047307806965, -29.757011172802635],
                  [-55.478327310857736, -29.757234711222416],
                  [-55.47755483466145, -29.754477702531936]]]),
            {
              "reference": 21,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-55.54872885604647, -29.761588723971137],
                  [-55.55074587722567, -29.763302427494608],
                  [-55.54812804122714, -29.765910180964916]]]),
            {
              "reference": 21,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-55.51465407272128, -29.762147543557997],
                  [-55.519460591275966, -29.762333816061055],
                  [-55.519503506620204, -29.764606312714328],
                  [-55.514997395475184, -29.766543482278042]]]),
            {
              "reference": 21,
              "system:index": "5"
            })]),
    geom_limite = /* color: #0b4a8b */ee.Geometry.Polygon(
        [[[-52.885708449539926, -27.41341405536019],
          [-52.965359328446176, -27.557171832169132],
          [-52.957119582352426, -27.705605102616218],
          [-52.932400344071176, -27.89025613442972],
          [-53.034023879227426, -28.021264565544552],
          [-53.215298293289926, -27.899965912234578],
          [-53.234524367508676, -27.683717776273465],
          [-53.251003859696176, -27.591256277027615],
          [-53.426785109696176, -27.484098106597997],
          [-53.610806105789926, -27.55960678648443],
          [-53.731655715164926, -27.771240733410945],
          [-53.866238234696176, -27.84655135903658],
          [-53.989834426102426, -27.69101403933739],
          [-54.107937453446176, -27.749366583494425],
          [-54.215054152664926, -27.66912378772526],
          [-54.374355910477426, -27.654527849855317],
          [-54.412808058914926, -27.742074223530338],
          [-54.418301222977426, -27.887828553882628],
          [-54.662747023758676, -27.834408016092944],
          [-54.855007765946176, -27.924236544965034],
          [-54.618801711258676, -28.16906402271587],
          [-54.912685988602426, -28.224738794769603],
          [-54.967617629227426, -28.047931963250626],
          [-55.107693312821176, -27.977612755930778],
          [-55.327419875321176, -27.887828553882628],
          [-55.464748976883676, -27.999440871062045],
          [-55.629543898758676, -28.064898683485087],
          [-55.678982375321176, -28.13273877044411],
          [-55.786099074539926, -28.17874867495374],
          [-55.838284133133676, -28.285221931890774],
          [-55.758633254227426, -28.343253439167768],
          [-55.772366164383676, -28.427825907370217],
          [-55.604824660477426, -28.534049766919782],
          [-55.799831984696176, -28.589533318907183],
          [-55.684475539383676, -28.775069402278554],
          [-55.475735305008676, -28.90739360022109],
          [-55.558132765946176, -29.022738826210755],
          [-55.662502883133676, -29.10436385074485],
          [-55.703701613602426, -29.1619425773206],
          [-55.681728957352426, -29.296167375662097],
          [-55.764126418289926, -29.391934384476905],
          [-55.786099074539926, -29.559309785148635],
          [-55.714687941727426, -29.731178511058637],
          [-55.791592238602426, -29.83129959454933],
          [-55.604824660477426, -29.931320453376234],
          [-55.423550246414926, -30.055016637173914],
          [-55.176357863602426, -29.993187812537652],
          [-55.055508254227426, -29.73594845134057],
          [-54.896206496414926, -29.487611313150943],
          [-54.775356887039926, -29.363213731944],
          [-54.522671340164926, -29.324906925856233],
          [-54.500698683914926, -29.482829608932068],
          [-54.385342238602426, -29.482829608932068],
          [-54.302944777664926, -29.415862068780743],
          [-54.077725051102426, -29.478047679080724],
          [-54.083218215164926, -29.59275167517244],
          [-53.742642043289926, -29.650054843938197],
          [-53.550381301102426, -29.66437554316925],
          [-53.594326613602426, -29.49717404460064],
          [-53.352627394852426, -29.415862068780743],
          [-52.990078566727426, -29.21948903383809],
          [-53.039517043289926, -28.883347176650183],
          [-53.132900832352426, -28.6377560984467],
          [-53.110928176102426, -28.35292227741544],
          [-53.017544387039926, -28.478536985915067],
          [-52.792324660477426, -28.49784909221619],
          [-52.506680129227426, -28.53646270331907],
          [-52.237515090164926, -28.377090520789174],
          [-52.034268019852426, -28.173906458433017],
          [-52.199062941727426, -28.062475030263602],
          [-52.226528762039926, -27.946075456550147],
          [-52.248501418289926, -27.6837177762735],
          [-52.462734816727426, -27.65939337902758],
          [-52.687954543289926, -27.41585219024954]]]);
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

var desvio = 0 // desvio para calculo de balanceamento de amostras	
var nSamplesMin = 200;
var nSamplesMax = 2000;

var regiao = 4
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
    var anos = [1990,2000,2010,2017,2020]
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
    var percent_Flo =  -60.14	    + desvio + ano *  0.03597
    var percent_Umi =   -7.63	    + desvio + ano *  0.00400
    var percent_Cam = 1245.50	    + desvio + ano * -0.60527
    var percent_Agr =-1069.87	    + desvio + ano *  0.56000
    var percent_Anv =    4.00	    + desvio + ano * -0.00128
    var percent_Afr =    0.00000	+ desvio + ano *  0.00000
    var percent_Agu =  -11.87	    + desvio + ano *  0.00659
 }
 if (ano > 1994 && ano <= 2004){// ajustar para período 2
    var percent_Flo =  -60.14	    + desvio + ano *  0.03597
    var percent_Umi =   -7.63	    + desvio + ano *  0.00400
    var percent_Cam = 1245.50	    + desvio + ano * -0.60527
    var percent_Agr =-1069.87	    + desvio + ano *  0.56000
    var percent_Anv =    4.00	    + desvio + ano * -0.00128
    var percent_Afr =    0.00000	+ desvio + ano *  0.00000
    var percent_Agu =  -11.87	    + desvio + ano *  0.00659
 }
 if (ano > 2004){ // ajustar para período 3
    var percent_Flo =  -60.14	    + desvio + ano *  0.03597
    var percent_Umi =   -7.63	    + desvio + ano *  0.00400
    var percent_Cam = 1245.50	    + desvio + ano * -0.60527
    var percent_Agr =-1069.87	    + desvio + ano *  0.56000
    var percent_Anv =    4.00	    + desvio + ano * -0.00128
    var percent_Afr =    0.00000	+ desvio + ano *  0.00000
    var percent_Agu =  -11.87	    + desvio + ano *  0.00659
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
    
    //print('falta amostras SS_Flo',SS_Flo_samples.size().subtract(n_samples_Flo))
    //print('falta amostras SS_Umi',SS_Umi_samples.size().subtract(n_samples_Umi))
    //print('falta amostras SS_Cam',SS_Cam_samples.size().subtract(n_samples_Cam))
    //print('falta amostras SS_Agr',SS_Agr_samples.size().subtract(n_samples_Agr))
    //print('falta amostras SS_Anv',SS_Anv_samples.size().subtract(n_samples_Anv))
    //print('falta amostras SS_Afr',SS_Afr_samples.size().subtract(n_samples_Afr))
    //print('falta amostras SS_Agu',SS_Agu_samples.size().subtract(n_samples_Agu))
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
  
//if (debug == 1){
print('classified85a21', classified85a21)
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

 