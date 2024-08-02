// MAPBIOMAS PAMPA
// COLLECTION 09 
// AUTHOR: Juliano Schirmbeck
// UPDATE: May 2024

// *********************************************************************************************************************************
// Define um ano para visualização no mapa apenas
var ano = '2021'

// Define a ersão do mosaico
var version = '20'

// Define a versão da classificação de cada região indivivual
var version_sete = '07'
var version_oito = '08'
var version_nove = '09'
var version_dez = '10'
var version_onze = '11'
var version_doze = '12'

var col = '9'
var bioma = "PAMPA"

// Define os assets de entrada, se são classificações ou saídas de filtros
var step = '_final'
var stepOut = 'com_filtro'

// var step = ''
// var stepOut = '_final'

/*opções
'' = 'sem_filtro'
'_gap'
'_esp'
'_temp'
'_temp2'
'_freq'
'_inci'
'_ext'
'_umid'
'_esp_pos_inci'
'_final'

*/
//Define o local dos arquivos sem filtro
// var dir = 'projects/mapbiomas-workspace/AMOSTRAS/col' + col + '/PAMPA/class_col_' + col

//Define o local local dos arquivos com filtro
var dir = 'projects/mapbiomas-workspace/AMOSTRAS/col' + col + '/PAMPA/class_col_' + col + '_filtros'

// **************************************************************************************************************************
var collection = ee.ImageCollection([
                 ee.Image(dir + '/01_RF_col'+ col +'_v' + version_onze + step),
                 ee.Image(dir + '/02_RF_col'+ col +'_v' + version_oito + step),
                 ee.Image(dir + '/03_RF_col'+ col +'_v' + version_doze + step),
                 ee.Image(dir + '/04_RF_col'+ col +'_v' + version_dez + step),
                 ee.Image(dir + '/05_RF_col'+ col +'_v' + version_onze + step),
                 ee.Image(dir + '/06_RF_col'+ col +'_v' + version_dez + step),
                 ee.Image(dir + '/07_RF_col'+ col +'_v' + version_dez + step)])
//              .filter(ee.Filter.eq('version', version))/
print(collection)

var image = collection.min()
var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = { 'bands': ['classification_'+ ano], 'min': 0, 'max': 62,  'palette': palettes.get('classification8')};
Map.addLayer(image, vis, 'Colecao 9 - ')


var out = 'projects/mapbiomas-workspace/AMOSTRAS/col' + col + '/PAMPA/class_col_' + col + '_mosaic/'       
image = image.set('version',1)
print(image)
//Map.addLayer(image.select(30), vis, 'imagem' );
Export.image.toAsset({
  'image': image,
  'description': bioma + '_' + version + '_' + stepOut,
  'assetId': out + bioma + '_' + version + '_' + stepOut,
  'pyramidingPolicy': {
      '.default': 'mode'
  },
  'region': geometryPampa,
  'scale': 30,
  'maxPixels': 1e13
});
