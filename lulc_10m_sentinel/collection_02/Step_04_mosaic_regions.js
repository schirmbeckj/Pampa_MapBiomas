// MAPBIOMAS PAMPA
// COLLECTION 02
// AUTHOR: Juliano Schirmbeck
// UPDATED: Oct 2024

var ano = '2016' // para visualização apenas

var version = '07'
// versões de classificações da regiões
var version_quatro = '04'
var version_cinco = '05'
var version_seis = '06'

var col = '1'
var bioma = "PAMPA"

  
// //--------------------------------------------------------------------------------------------------------
// // Definições para assets sem filtro
// var step = ''
// var stepOut = 'PAMPA_'+ version+ '_SF'
// // Local dos arquivos com filtro
// var dir = 'projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/class_s2_col_01/'

//--------------------------------------------------------------------------------------------------------
// Definições para assets com filtro
var step = '_esp_fim'
var stepOut = 'PAMPA_'+ version+ '_CF'
// Local dos arquivos com filtro
var dir = 'projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/class_s2_col_01_filtros/'

//--------------------------------------------------------------------------------------------------------

var collection = ee.ImageCollection([
                 ee.Image(dir + '01_RF16a23_v' + version_quatro + step),
                 ee.Image(dir + '02_RF16a23_v' + version_cinco + step),
                 ee.Image(dir + '03_RF16a23_v' + version_cinco + step),
                 ee.Image(dir + '04_RF16a23_v' + version_seis + step),
                 ee.Image(dir + '05_RF16a23_v' + version_seis + step),
                 ee.Image(dir + '06_RF16a23_v' + version_cinco + step),
                 ee.Image(dir + '07_RF16a23_v' + version_cinco + step)])
//              .filter(ee.Filter.eq('version', version))/
print(collection)
 
var image = collection.min()
var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = { 'bands': ['classification_'+ ano], 'min': 0, 'max': 62,  'palette': palettes.get('classification8')};
Map.addLayer(image, vis, 'Colecao 01 - S2')

var bandnames = ['classification_2016', 'classification_2017', 'classification_2018',
                 'classification_2019', 'classification_2020', 'classification_2021',
                 'classification_2022', 'classification_2023'
]

var out = 'projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/class_s2_col_01_mosaic/'       
   
image = image.set('version', version).select(bandnames)
print(image)

Export.image.toAsset({
  'image': image,
  'description': stepOut,
  'assetId': out + stepOut,
  'pyramidingPolicy': {
      '.default': 'mode'
  },
  'region': geometryPampa,
  'scale': 10,
  'maxPixels': 1e13
});
