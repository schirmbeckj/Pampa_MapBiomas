// MAPBIOMAS PAMPA
// COLLECTION 02
// UPDATED: Oct 2024

var dirout = 'projects/earthengine-legacy/assets/projects/mapbiomas-workspace/COLECAO9-S2/classificacao' 
 
var image = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/class_s2_col_01_mosaic/PAMPA_07_CF_reclass' )

var biomes = ee.Image('projects/mapbiomas-workspace/AUXILIAR/biomas-raster-41')

var limBioma = biomes.mask(biomes.eq(6)); // bioma 6 igual a Pampa
Map.addLayer(limBioma,{},"biome PAMPA",false)

var anos = ['2016','2017','2018','2019','2020',
            '2021','2022', '2023'
            ];
//anos = ['2018']
 
// Params de visualização
var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = {
    'min': 0,
    'max': 62,
    'palette': palettes.get('classification8')
};

print(image)
Map.addLayer(image.select(5), vis, "imagem de entrada") ;         

var bioma = 'PAMPA'
var versaoout = '3'
var bandout = 'classification'
var source = 'geokarten-ufrgs'
var territory = 'BRAZIL' 

//var classeIds =    [3,11,12,21,22,29,33]
//var newClasseIds = [3,11,12,21,25,29,33,49,50]

for (var i_ano=0;i_ano<anos.length; i_ano++){  
  var ano = anos[i_ano];
  var img_out = image.select('classification_'+ano)
  
  //img_out = img_out.remap(classeIds, newClasseIds)
  
  img_out = img_out.set('biome', bioma)
                    .set('year', parseInt(ano,10))
                    .set('version', versaoout)
                    .set('collection_id', 2.0)
                    .set('source', source)
                    .set('territory', territory)
                    .rename(bandout)
                    
  Export.image.toAsset({
    'image': img_out.toByte(),
    'description': bioma+'-'+ano+'-'+versaoout,
    'assetId': dirout+'/'+bioma+'-'+ano+'-'+versaoout,
    'pyramidingPolicy': {
        '.default': 'mode'
    },
    'region': geometryPampa,
    'scale': 10,
    'maxPixels': 1e13
  });

}