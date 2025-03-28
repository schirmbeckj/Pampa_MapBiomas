
var ano = '2021'
var version = '07'


var col = '8'
var bioma = "PAMPA"
var versionOut = 'com_filtro'

var dir = 'projects/mapbiomas-workspace/AMOSTRAS/col' + col + '/PAMPA/class_col_' + col + '_filtros'
//var dir = 'projects/mapbiomas-workspace/AMOSTRAS/col' + col + '/PAMPA/class_col_' + col
//projects/mapbiomas-workspace/AMOSTRAS/col8/PAMPA/class_col_8/07_RF_col8_v04
                   
var collection = ee.ImageCollection([
                 ee.Image(dir + '/01_RF_col'+ col +'_v' + version + '_final'),
                 ee.Image(dir + '/02_RF_col'+ col +'_v' + version + '_final'),
                 ee.Image(dir + '/03_RF_col'+ col +'_v' + version + '_final'),
                 ee.Image(dir + '/04_RF_col'+ col +'_v' + version + '_final'),
                 ee.Image(dir + '/05_RF_col'+ col +'_v' + version + '_final'),
                 ee.Image(dir + '/06_RF_col'+ col +'_v' + version + '_final'),
                 ee.Image(dir + '/07_RF_col'+ col +'_v' + version + '_final')])
//var collection = ee.ImageCollection(dir_filtros
//                .filter(ee.Filter.eq('version', version))
print(collection)

var image = collection.min()
var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = { 'bands': ['classification_'+ ano], 'min': 0, 'max': 45,  'palette': palettes.get('classification5')};
Map.addLayer(image, vis, 'Colecao 7 - ')


var out = 'projects/mapbiomas-workspace/AMOSTRAS/col' + col + '/PAMPA/class_col_' + col + '_mosaic/'       
image = image.set('version',1)
print(image)
//Map.addLayer(image.select(30), vis, 'imagem' );
Export.image.toAsset({
  'image': image,
  'description': bioma + '_' + version + '_' + versionOut,
  'assetId': out + bioma + '_' + version + '_' + versionOut,
  'pyramidingPolicy': {
      '.default': 'mode'
  },
  'region': geometryPampa,
  'scale': 30,
  'maxPixels': 1e13
});

//'projects/mapbiomas-workspace/AMOSTRAS/col8/PAMPA/class_col_8_mosaic/PAMPA_01_final_com_filtro'