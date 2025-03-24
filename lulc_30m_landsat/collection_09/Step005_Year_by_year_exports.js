// MAPBIOMAS PAMPA
// COLLECTION 09 
// AUTHOR: Juliano Schirmbeck
// UPDATE: May 2024

// ***************************************************************************************
// Define o diretório de saída e a versão final mosaicada da coleção
var dirout = 'projects/mapbiomas-workspace/COLECAO9/classificacao' 

var image = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/col9/PAMPA/class_col_9_mosaic/PAMPA_20_com_filtro_reclass')

//var biomes = ee.Image('projects/mapbiomas-workspace/AUXILIAR/biomas-raster-41')
//var limBioma = biomes.mask(biomes.eq(6)); //bioma 6 igual a Pampa
//Map.addLayer(limBioma,{},"biome PAMPA",false)

var biomes = ee.Image('projects/mapbiomas-workspace/AUXILIAR/ESTATISTICAS/COLECAO7/biome-raster')
var limBioma = biomes.mask(biomes.eq(6)); //bioma 6 igual a Pampa


var anos = ['1985','1986','1987','1988','1989','1990',
            '1991','1992','1993','1994','1995','1996',
            '1997','1998','1999','2000','2001','2002',
            '2003','2004','2005','2006','2007','2008',
            '2009','2010','2011','2012','2013','2014',
            '2015','2016','2017','2018','2019','2020',
            '2021','2022','2023'
            ];
//anos = ['2018']


  var palettes = require('users/mapbiomas/modules:Palettes.js');
  var vis = {
      'min': 0,
      'max': 62,
      'palette': palettes.get('classification8')
  };

  print(image)
  Map.addLayer(image.select(15), vis, "imagem de entrada") ;         

var bioma = 'PAMPA'
var versaoout = '20'
var bandout = 'classification'
var source = 'ufrgs'
var territory = 'BRAZIL' 

var classeIds =    [3,11,12,21,22,25,29,33,49,50]
var newClasseIds = [3,11,12,21,25,25,29,33,49,50]

for (var i_ano=0;i_ano<anos.length; i_ano++){  
  var ano = anos[i_ano];
  var img_out = image.select('classification_'+ano)

  img_out = img_out.remap(classeIds, newClasseIds)
  img_out = img_out.set('biome', bioma)
                    .set('year', parseInt(ano,10))
                    .set('version', versaoout)
                    .set('collection_id', 9.0)
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
    'scale': 30,
    'maxPixels': 1e13
  });

}
  Map.addLayer(img_out, vis, "imagem de saida") ;  
Map.addLayer(limBioma,{},"biome",false)
