/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var controles = ee.FeatureCollection("users/evelezmartin/shp/Controles_regiao_cel_3km"),
    anv = /* color: #ea9999 */ee.FeatureCollection([]),
    arocho = /* color: #ff8c00 */ee.FeatureCollection([]),
    agua = /* color: #0000ff */ee.FeatureCollection([]),
    floresta = /* color: #006400 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.944170377033046, -29.938349696747366],
                  [-51.94382705427914, -29.93775467344358],
                  [-51.9438914272955, -29.93710386263022],
                  [-51.94432058073788, -29.93779186250432]]]),
            {
              "reference": 3,
              "system:index": "0"
            })]),
    aumi = /* color: #45c2a5 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.68719930515462, -29.972050513435605],
                  [-50.69018192157918, -29.973797781406148],
                  [-50.69013900623494, -29.974485527391515],
                  [-50.68631954059774, -29.97238509904281]]]),
            {
              "reference": 11,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.69500989780599, -29.973537551953864],
                  [-50.695374678232014, -29.974894455179708],
                  [-50.693357657052815, -29.973407436972096]]]),
            {
              "reference": 11,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.70118547951422, -29.964353193784344],
                  [-50.70345999275885, -29.965505739855445],
                  [-50.70084215676032, -29.96554291853843],
                  [-50.699855103842836, -29.964687805311]]]),
            {
              "reference": 11,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.850953882226, -30.05035144309974],
                  [-50.85275632668401, -30.054066064133707],
                  [-50.849580591210376, -30.05443751857358],
                  [-50.84915143776799, -30.051094378453236]]]),
            {
              "reference": 11,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.933920673766316, -29.938498924796896],
                  [-51.93482189599532, -29.93823860292985],
                  [-51.93399577561873, -29.939112537931152]]]),
            {
              "reference": 11,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.92996045090028, -29.94018277053099],
                  [-51.93107624985048, -29.94016417644923],
                  [-51.93092604614564, -29.94137278453427],
                  [-51.92974587417909, -29.940889343062363]]]),
            {
              "reference": 11,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.96024759429845, -29.9424519445963],
                  [-51.96024759429845, -29.943493183874665],
                  [-51.95968969482335, -29.943493183874665],
                  [-51.95977552551183, -29.9424333509387]]]),
            {
              "reference": 11,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.95572002548131, -29.943418810001972],
                  [-51.955419618071645, -29.943158501009602],
                  [-51.95625646728429, -29.94289819133599],
                  [-51.95625646728429, -29.943400216525106]]]),
            {
              "reference": 11,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.94936855453405, -29.9426564746005],
                  [-51.94878919738683, -29.942842410603006],
                  [-51.94921835082921, -29.942340382598577]]]),
            {
              "reference": 11,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.373002142753414, -29.939813238848455],
                  [-51.37351712688427, -29.952307722233837],
                  [-51.36579236492138, -29.94011074478901]]]),
            {
              "reference": 11,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.24152461351199, -30.015759392374854],
                  [-51.239915288103056, -30.016391108236462],
                  [-51.241159833085966, -30.01410576415558]]]),
            {
              "reference": 11,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.245901978624296, -30.013046684408295],
                  [-51.247189438951445, -30.01434730707564],
                  [-51.245408452165556, -30.015313472873412],
                  [-51.244957841051054, -30.01339971224724]]]),
            {
              "reference": 11,
              "system:index": "11"
            })]),
    campo = /* color: #b8af4f */ee.FeatureCollection([]),
    agric = /* color: #ffefc3 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.68757598081105, -29.9112920563132],
                  [-50.685601874976086, -29.91441671955761],
                  [-50.68122450986378, -29.912780003418497]]]),
            {
              "reference": 21,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.68706099668019, -29.904521616309644],
                  [-50.68894927182667, -29.908018494432056],
                  [-50.684400245337415, -29.90645607469691]]]),
            {
              "reference": 21,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.669122382788586, -29.90660487763229],
                  [-50.675130530981946, -29.908167295033458],
                  [-50.66852156796925, -29.909878485972403]]]),
            {
              "reference": 21,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.70791785397999, -29.903107949886643],
                  [-50.71049277463429, -29.90586086073257],
                  [-50.70894782224171, -29.9067536803454],
                  [-50.705342933325696, -29.90243831142173]]]),
            {
              "reference": 21,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.82552896080553, -30.003101507259924],
                  [-50.83565698204576, -30.00718953088383],
                  [-50.83127961693346, -30.012615192992904],
                  [-50.82106576500475, -30.00778413846996]]]),
            {
              "reference": 21,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.62417730487459, -29.956612033007257],
                  [-50.625550608729846, -29.95356301707608],
                  [-50.62503561175936, -29.950662732327046],
                  [-50.62958464999746, -29.95229872225836],
                  [-50.6245206276285, -29.95973527335164]]]),
            {
              "reference": 21,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.70683270534089, -29.864756951635623],
                  [-50.70975094874909, -29.86527797881424],
                  [-50.70923596461823, -29.86914838125173],
                  [-50.70657521327546, -29.867883073896934]]]),
            {
              "reference": 21,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.66704912337488, -29.88438467398431],
                  [-50.664216710655154, -29.8844590919593],
                  [-50.66464586409754, -29.878393844796108],
                  [-50.66739244612879, -29.879659018826604]]]),
            {
              "reference": 21,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.72093807474556, -30.066045187567017],
                  [-50.72115265146675, -30.067345114704057],
                  [-50.71894251123848, -30.067215122758665],
                  [-50.718813765205766, -30.065803770647463]]]),
            {
              "reference": 21,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.722810521707366, -30.068543270254228],
                  [-50.72540690003378, -30.06980602497909],
                  [-50.72392632065756, -30.07008457164631],
                  [-50.72216679154379, -30.06910036991317]]]),
            {
              "reference": 21,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.72278906403525, -30.067039085510633],
                  [-50.72302509842856, -30.065702013213095],
                  [-50.72575022278769, -30.066741959894394]]]),
            {
              "reference": 21,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.69612817235375, -30.070029322648505],
                  [-50.69402532048608, -30.069917904013497],
                  [-50.69415406651879, -30.068432310226463],
                  [-50.69621400304223, -30.06915653998354]]]),
            {
              "reference": 21,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.70175008244897, -30.07249907018065],
                  [-50.70074157185937, -30.072183391601207],
                  [-50.70168570943261, -30.070345008099782],
                  [-50.70247964330102, -30.070994945563754]]]),
            {
              "reference": 21,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.75105136360421, -30.076667588426115],
                  [-50.7518238398005, -30.077633146559457],
                  [-50.74954932655587, -30.079230010483677],
                  [-50.74839061226144, -30.078264467936]]]),
            {
              "reference": 21,
              "system:index": "13"
            })]),
    geom_limite = /* color: #00ffff */ee.Geometry.Polygon(
        [[[-54.436990599473475, -29.50044418405526],
          [-54.480935911973475, -29.3473372003158],
          [-54.810525755723475, -29.27069726644914],
          [-55.123636107285975, -29.50044418405526],
          [-55.310403685410975, -29.853617593379905],
          [-55.486184935410975, -29.681958465914906],
          [-55.793802122910975, -29.701046221839807],
          [-55.854226927598475, -29.815496549721807],
          [-55.804788451035975, -30.091543982338468],
          [-55.865213255723475, -30.262497475954387],
          [-55.876199583848475, -30.390517680140285],
          [-55.546609740098475, -30.333640470462637],
          [-55.486184935410975, -30.399993998601285],
          [-55.563089232285975, -30.513638054553784],
          [-55.656473021348475, -30.716918282178188],
          [-55.650979857285975, -30.863203974109837],
          [-55.326883177598475, -31.310108262771582],
          [-55.046731810410975, -31.394547585380934],
          [-54.947854857285975, -31.258469151751306],
          [-54.997293333848475, -31.15980692434044],
          [-55.052224974473475, -30.981013998794033],
          [-54.969827513535975, -30.749969983854527],
          [-54.848977904160975, -30.70747285710552],
          [-54.667703490098475, -30.4378900762508],
          [-54.524881224473475, -30.319416001408495],
          [-54.019510130723475, -30.60351217375263],
          [-54.019510130723475, -30.48523946915366],
          [-53.959085326035975, -30.41894387700458],
          [-53.838235716660975, -30.281473987492404],
          [-53.684427122910975, -30.328899210313686],
          [-53.607522826035975, -30.253007844640514],
          [-53.426248411973475, -30.333640470462637],
          [-53.481180052598475, -30.570410340827642],
          [-53.343850951035975, -30.650780889342965],
          [-53.074685911973475, -30.636602698986827],
          [-52.981302122910975, -30.45209731042225],
          [-52.684671263535975, -30.46156764942685],
          [-52.629739622910975, -30.38104044239972],
          [-52.377054076035975, -30.513638054553784],
          [-52.157327513535975, -30.328899210313686],
          [-51.948587279160975, -30.343122302046503],
          [-51.794778685410975, -30.300446829767296],
          [-51.608011107285975, -30.23877167872155],
          [-51.509134154160975, -30.414206752271696],
          [-51.712381224473475, -30.54202834662728],
          [-51.547586302598475, -30.636602698986827],
          [-51.393777708848475, -30.69330298533878],
          [-51.316873411973475, -30.594055660734607],
          [-50.943338255723475, -30.390517680140285],
          [-50.657693724473475, -30.129559271339616],
          [-50.38563534054228, -29.91776892967322],
          [-50.498391966660975, -29.763056375273283],
          [-50.712625365098475, -29.71535965893161],
          [-51.014749388535975, -29.77736096567085],
          [-51.448709349473475, -29.634223219289826],
          [-51.811258177598475, -29.600795077689305],
          [-52.426492552598475, -29.638997762882433],
          [-52.805520872910975, -29.681958465914906],
          [-53.349344115098475, -29.6246734530868],
          [-53.843728880723475, -29.548242751093383],
          [-54.277688841660975, -29.438272305775005]]]);
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

var desvio = 0
var nSamplesMin = 200;
var nSamplesMax = 2000;

var regiao = 6
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
    var percent_Flo =-160.94    + desvio + ano *  0.08710
    var percent_Umi = -18.67	  + desvio + ano *  0.00977
    var percent_Cam =1047.10	  + desvio + ano * -0.49695
    var percent_Agr =-739.03    + desvio + ano *  0.38306
    var percent_Anv = -16.71 	  + desvio + ano *  0.00932
    var percent_Afr =   0.04177 + desvio + ano * -0.00002
    var percent_Agu = -11.74	  + desvio + ano *  0.00770
 }
 if (ano > 1994 && ano <= 2004){// ajustar para período 2
    var percent_Flo =-160.94    + desvio + ano *  0.08710
    var percent_Umi = -18.67	  + desvio + ano *  0.00977
    var percent_Cam =1047.10	  + desvio + ano * -0.49695
    var percent_Agr =-739.03    + desvio + ano *  0.38306
    var percent_Anv = -16.71 	  + desvio + ano *  0.00932
    var percent_Afr =   0.04177 + desvio + ano * -0.00002
    var percent_Agu = -11.74	  + desvio + ano *  0.00770
 }
 if (ano > 2004){ // ajustar para período 3
    var percent_Flo =-160.94    + desvio + ano *  0.08710
    var percent_Umi = -18.67	  + desvio + ano *  0.00977
    var percent_Cam =1047.10	  + desvio + ano * -0.49695
    var percent_Agr =-739.03    + desvio + ano *  0.38306
    var percent_Anv = -16.71 	  + desvio + ano *  0.00932
    var percent_Afr =   0.04177 + desvio + ano * -0.00002
    var percent_Agu = -11.74	  + desvio + ano *  0.00770
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
//    print('SS_Flo',SS_Flo)
//    Map.addLayer(SS_Flo,{color:'0000ff'},'todos')
//    Map.addLayer(SS_Flo_samples,{color:'ff0000'},'selecao')
    
    //cria variavel com todas as amostras estáveis
    var SS_amostras = SS_Flo_samples
            .merge(SS_Umi_samples)
            .merge(SS_Cam_samples)
            .merge(SS_Agr_samples)
            .merge(SS_Anv_samples)
            //.merge(SS_Afr_samples)
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
}

//***************************************************************
//***************************************************************
//***************************************************************

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

 