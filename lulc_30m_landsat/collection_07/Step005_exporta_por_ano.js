/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometryPampa = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-58.235066877772624, -30.60692415433937],
          [-55.3812292750718, -31.536184439107085],
          [-53.357137190272624, -34.05923401863392],
          [-49.577840315272624, -30.17098716535918],
          [-49.865449044187244, -29.047801031923346],
          [-50.496256143190635, -28.306864654328834],
          [-52.082723127772624, -27.242150238166413],
          [-53.84697511154161, -27.06728423431273],
          [-55.620320784022624, -27.807229402344642]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var dirout = 'projects/mapbiomas-workspace/COLECAO7/classificacao' 

var image = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/class_col7_mosaic/PAMPA_031_final_com_filtro_restinga')

var biomes = ee.Image('projects/mapbiomas-workspace/AUXILIAR/biomas-raster-41')

var limBioma = biomes.mask(biomes.eq(6)); //bioma 6 igual a Pampa
Map.addLayer(limBioma,{},"biome PAMPA",false)


var anos = ['1985','1986','1987','1988','1989','1990',
            '1991','1992','1993','1994','1995','1996',
            //'1997','1998','1999','2000','2001','2002',
            //'2003','2004','2005','2006','2007','2008',
            //'2009','2010','2011','2012','2013','2014',
            //'2015','2016','2017','2018','2019','2020'
            //2021
            ];
//anos = ['2018']


  var palettes = require('users/mapbiomas/modules:Palettes.js');
  var vis = {
      'min': 0,
      'max': 34,
      'palette': palettes.get('classification2')
  };

  print(image)
  Map.addLayer(image.select(15), vis, "imagem de entrada") ;         

var bioma = 'PAMPA'
var versaoout = '1'
var bandout = 'classification'
var source = 'ufrgs'
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
                    .set('collection_id', 7.0)
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

