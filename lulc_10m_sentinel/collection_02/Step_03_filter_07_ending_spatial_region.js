// MAPBIOMAS PAMPA
// COLLECTION 02
// AUTHOR: Juliano Schirmbeck
// UPDATED: Oct 2024

// ***************************************************************************************
// Define as variáveis referentes a versão da coleção ou dos filtros
var col = '1'
var versionIn = '06'
var bioma = "PAMPA"
var versionOut = versionIn + '_esp_fim'
var versionIn = versionIn + '_ext'

// Define as regiões: [1,2,3,4,5,6,7]
var regioes = [1,2,3,4,5,6,7] 

// ***************************************************************************************

for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
  var regiao = regioes[i_regiao];

  // 1985 é processado a parte
  var anos = ['2016','2017','2018','2019','2020','2021','2022','2023'];

  var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/class_s2_col_01_filtros/'
  var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col09_buff')
  var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);
  
  var img_in =  ee.Image(dir_filtros + '0' + String(regiao) +'_RF16a23_v' + versionIn);
  
  var palettes = require('users/mapbiomas/modules:Palettes.js');
  var vis = {'bands': ['classification_2022'], 'min': 0, 'max': 62,  'palette': palettes.get('classification8')};
  var vis2 = {'min': 0, 'max': 62,  'palette': palettes.get('classification8')};
  
  Map.addLayer(img_in, vis, 'img_in');
  
  var ano = '2016'
  //var mask_85 = img_in.select('connect_'+ano)
  var moda_85 = img_in.select('classification_'+ano).focal_mode(1, 'square', 'pixels')
  // Map.addLayer(moda_85, vis, 'moda_85_1');
  moda_85 = moda_85.mask(img_in.select('classification_'+ano).connectedPixelCount(10,true).lte(6))
  // Map.addLayer(moda_85, vis, 'moda_85_2');
  var class_outTotal = img_in.select('classification_'+ano).blend(moda_85)
  
  // Map.addLayer(class_outTotal, vis, 'class4 MODA');
  
  var i_init = 1
  
  for (var i_ano=i_init;i_ano<anos.length; i_ano++){  
    var ano = anos[i_ano]; 
    var moda = img_in.select('classification_'+ano).focal_mode(1, 'square', 'pixels')
    moda = moda.mask(img_in.select('classification_'+ano).connectedPixelCount(10,true).lte(6))
    var class_out = img_in.select('classification_'+ano).blend(moda)
    class_outTotal = class_outTotal.addBands(class_out)
  }
  
  print("class_outTotal", class_outTotal, "img_in", img_in)
  
  Export.image.toAsset({
      'image': class_outTotal,
      'description': '0' + String(regiao) +'_RF16a23_v'+versionOut,
      'assetId': dir_filtros + '0' + String(regiao) +'_RF16a23_v'+versionOut,
      'pyramidingPolicy': {
          '.default': 'mode'
      },
      'region': limite.geometry().bounds(),
      'scale': 10,
      'maxPixels': 1e13
  });
}
