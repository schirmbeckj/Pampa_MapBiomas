// MAPBIOMAS PAMPA
// COLLECTION 08
// AUTHOR: Juliano Schirmbeck
// DATE: Maio 2021
//


var col = '8'

var versionIn = '07'
var bioma = "PAMPA"

var versionOut = versionIn + '_umid'
var versionIn = versionIn + '_ext'

var regioes = [1,2,3,4,5,6,
                    7]

for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
    var regiao = regioes[i_regiao];

// 1985 é processado a parte
var anos = ['1985','1986','1987','1988','1989','1990',
            '1991','1992','1993','1994','1995','1996','1997','1998','1999','2000',
            '2001','2002','2003','2004','2005','2006','2007','2008','2009','2010',
            '2011','2012','2013','2014','2015','2016','2017','2018','2019','2020',
            '2021','2022'];
            
            
            

var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/col' + col + '/PAMPA/class_col_' + col + '_filtros/'
var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);

var imgIn =  ee.Image(dir_filtros+ '0' + String(regiao) +'_RF_col' + col + '_v' + versionIn);

var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = { 'bands': ['classification_1990'], 'min': 0, 'max': 45,  'palette': palettes.get('classification5')};
var vis2 = {'min': 0, 'max': 45,  'palette': palettes.get('classification5')};



var dirCol7 = 'projects/mapbiomas-workspace/public/collection7_1/mapbiomas_collection71_integration_v1'
var imgCol7 = ee.Image(dirCol7)
var mask_reflo = imgCol7.select('classification_2013','classification_2014','classification_2015','classification_2016',
                             'classification_2017','classification_2018','classification_2019','classification_2020',
                             'classification_2021').eq(9).selfMask()
                              .reduce(ee.Reducer.count()).gte(1)
                              .unmask().eq(0)//.multiply(11)


var mask_umid = imgIn.select('classification_2013','classification_2014','classification_2015','classification_2016',
                             'classification_2017','classification_2018','classification_2019','classification_2020',
                             'classification_2021','classification_2022').eq(11).selfMask().reduce(ee.Reducer.count()).gt(7)//.selfMask().multiply(11)

Map.addLayer(mask_umid.selfMask(), vis2, 'mask_umid');
Map.addLayer(mask_reflo.selfMask(), {}, 'mask_reflo');
var mask_umid =mask_umid.multiply(mask_reflo).selfMask().multiply(11)                             
Map.addLayer(mask_umid, {}, 'mask_umid x reflo');
                             

for (var i_ano=0;i_ano<anos.length; i_ano++){  
  var ano = anos[i_ano]; 
  
   var blend_umid = imgIn.select('classification_' + ano).blend(mask_umid)
   if (i_ano == 0){ var class_out = blend_umid }  
   else {class_out = class_out.addBands(blend_umid); } 
}

//class_out = class_out.addBands(imgIn.select('classification_2013','classification_2014','classification_2015','classification_2016',
//                             'classification_2017','classification_2018','classification_2019','classification_2020',
//                             'classification_2021','classification_2022'))

for (var i_ano=0;i_ano<anos.length; i_ano++){  
  var ano = anos[i_ano]; 
  class_out = class_out.addBands(class_out.select('classification_'+ano).connectedPixelCount(20,false).rename('connect_'+ano))
}
  
print(class_out)

//Map.addLayer(mask_umid, {}, 'mask_umid');
//Map.addLayer(class_out, vis, 'out');

Export.image.toAsset({
    'image': class_out,
      'description': '0' + String(regiao) + '_RF_col' + col + '_v' + versionOut,
      'assetId': dir_filtros +  '0' + String(regiao) + '_RF_col' + col + '_v'  + versionOut,
    'pyramidingPolicy': {
        '.default': 'mode'
    },
    'region': limite.geometry().bounds(),
    'scale': 30,
    'maxPixels': 1e13
  });
}