// MAPBIOMAS PAMPA
// COLLECTION 02
// AUTHOR: Juliano Schirmbeck
// UPDATED: Oct 2024

// Versões:
var version = '07'
var bioma = "PAMPA"

var versionIn = 'PAMPA_'+ version+ '_CF'

var versionOut = 'PAMPA_'+ version+ '_CF_reclass'

// Parâmetros de visualização
var imageVisParam = {"opacity":1,"min":0,"max":50,"palette":["ffffff","129912","1f4423","006400","00ff00","687537","76a5af","29eee4","77a605","ad4413","bbfcac","45c2a5","b8af4f","f1c232","ffffb2","ffd966","f6b26b","f99f40","e974ed","d5a6bd","c27ba0","fff3bf","ea9999","dd7e6b","aa0000","ff3d3d","0000ff","d5d5e5","dd497f","665a3a","af2a2a","1f0478","968c46","0000ff","4fd3ff","645617","f3b4f1","02106f","02106f","e075ad","982c9e","e787f8","cca0d4","d082de","cd49e4","e04cfa","cca0d4","d082de","cd49e4","6b9932","9dff00"]};
var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = {'min': 0, 'max': 62,  'palette': palettes.get('classification8')};
 

var asset = 'projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/class_s2_col_01_mosaic/'+versionIn
var img = ee.Image(asset)

var biomeCode2019 = 'Pampa';
var biomas = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas_IBGE_250mil')
   .filterMetadata('Bioma', 'equals', biomeCode2019);
   
var solos = ee.FeatureCollection("projects/mapbiomas-workspace/AUXILIAR/RESTINGA/SolosIBGE_SCostMarinhoBR")

var solos_arborea = solos.filterBounds(biomas)//toda floresta na zona costeira inependente do tipo de solo

var solos_herbacea = solos.filterBounds(biomas)//todo campo na zona costeira, somente em solos quartzênicos
                              .filter(ee.Filter.or(ee.Filter.eq('value_ord', 4),
                              ee.Filter.eq('value_ord', 8),
                              ee.Filter.eq('value_ord', 14)))
                              .filter(ee.Filter.neq('id',114621))
  
var herbacea_raster = ee.Image().uint32().paint({
    featureCollection: solos_herbacea,
    color: 50
}).rename(['herbacea']);
                              
var arborea_raster = ee.Image().uint32().paint({
    featureCollection: solos_arborea,
    color: 49
}).rename(['arborea']);

var herbacea = herbacea_raster.eq(50).and(img.eq(12)).multiply(50).selfMask()
var arborea = arborea_raster.eq(49).and(img.eq(3)).multiply(49).selfMask()

var nao_veg = img.eq(22).multiply(25).selfMask()

var ano = 2020
Map.addLayer(img.select('classification_' + ano), vis, 'IN ' + ano)

img = img.blend(herbacea).blend(arborea).blend(nao_veg)
 
var lPeixe = ee.FeatureCollection('users/evelezmartin/shp/bLPeixe_col8')
var banhados_R6 = ee.FeatureCollection('projects/ee-geokarten/assets/banhados_R6')

var pol_remap = lPeixe.merge(banhados_R6)
print(pol_remap)
var pol_remap_raster = ee.Image().uint32().paint({
    featureCollection: pol_remap,
    color: 1
}).rename(['peixe']);

Map.addLayer(pol_remap_raster, {}, "remapped")

var lpx = pol_remap_raster.eq(1).and(img.eq(21)).multiply(11).selfMask()
img = img.blend(lpx)
  
var ano = 2020
Map.addLayer(img.select('classification_' + ano), vis, 'OUT ' + ano)

// Map.addLayer(herbacea,vis,'herbacea')
// Map.addLayer(arborea,vis,'arborea')


var out = 'projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/class_s2_col_01_mosaic/'     

print(img)
//Map.addLayer(image.select(30), vis, 'imagem' );

Export.image.toAsset({
  'image': img,
  'description': versionOut,
  'assetId': out + versionOut,
  'pyramidingPolicy': {
      '.default': 'mode'
  },
  'region': geometryPampa,
  'scale': 10,
  'maxPixels': 1e13
});



   