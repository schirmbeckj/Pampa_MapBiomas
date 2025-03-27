// MAPBIOMAS PAMPA
// COLLECTION 02
// AUTHOR: Juliano Schirmbeck
// UPDATED: Oct 2024

// ***************************************************************************************
// Define as variáveis referentes a versão da coleção ou dos filtros
var version= '06'
var vesion_in = version + '_water_ext'
var versao_out = version + '_ext';
var descricao = 'Área de Transicao Minima'
var col = '9'
var dirout = 'projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/class_s2_col_01_filtros/'

// Define as regiões: [1,2,3,4,5,6,7]
var regioes = [1,2,3,4,5,6,7] 

// ***************************************************************************************


for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
  var regiao = regioes[i_regiao];
    
  var col7 =  ee.Image(dirout + '0' + String(regiao) +'_RF16a23_v' + vesion_in)
  //Map.addLayer(col7, {}, 'col7', false);
  
  
  var palettes = require('users/mapbiomas/modules:Palettes.js');
  var vis = {
      'min': 0,
      'max': 62,
      'palette': palettes.get('classification8')
  };var vis2 = {
      'bands': 'classification_2022',
      'min': 0,
      'max': 62,
      'palette': palettes.get('classification8')
  };
  
  var anos = [2016,2017,2018,2019,2020,
              2021,2022,2023];
  
  for (var i_ano=0;i_ano<anos.length; i_ano++){
    var ano = anos[i_ano];
    
    var class_ano = col7.select('classification_'+ano)
    var class_nivel0_ano = class_ano.remap([3,11,12,29, 21,22],
                                           [1, 1, 1, 1, 10,10]).rename('classification_'+ano)
  
    if (i_ano == 0){ var class_nivel0 = class_nivel0_ano }  
    else {class_nivel0 = class_nivel0.addBands(class_nivel0_ano); }
  }
  
  //var nChanges = class_nivel0.reduce(ee.Reducer.countRuns()).subtract(1);
  //Map.addLayer(nChanges, {'min': 0,'max': 6, 'palette': ["#ffffff","#fee0d2","#fcbba1",
  //            "#fb6a4a","#ef3b2c","#a50f15","#67000d"],'format': 'png'}, 'nChanges',false)
  
  
  var nivel0_2022 = class_nivel0.select('classification_2023')
  var nivel0_2021 = class_nivel0.select('classification_2022')
  
  // corrige desmatamentos pequenos no último ano
  var desmat = nivel0_2022.eq(10).and(nivel0_2021.eq(1))
  
  // CUIDADO limite do conected deve ser maior ou igual ao teste seguinte
  var conectedDesmat = desmat.selfMask().connectedPixelCount(150,true).reproject('epsg:4326', null, 10);
  var desmat1ha = conectedDesmat.lte(144)
  var ruido_desmat21 = col7.select('classification_2022').updateMask(desmat1ha)
  
  // corrige REGEN pequenos no último ano
  var regen = nivel0_2022.eq(1).and(nivel0_2021.eq(10))
  var conectedRegen = regen.selfMask().connectedPixelCount(150,true).reproject('epsg:4326', null, 10);
  var regen1ha = conectedRegen.lte(144)
  var ruido_regen21 = col7.select('classification_2022').updateMask(regen1ha)
  
  
  //var nivel0_1985 = class_nivel0.select('classification_2016')
  //var nivel0_1986 = class_nivel0.select('classification_2017')
  //
  //// corrige desmatamentos pequenos no primeiro ano
  //var desmat = nivel0_1985.eq(1).and(nivel0_1986.eq(10))
  //var conectedDesmat = desmat.selfMask().connectedPixelCount(210,true).reproject('epsg:4326', null, 10);
  //var desmat1ha = conectedDesmat.lte(200)
  //var ruido_desmat85 = col7.select('classification_2016').updateMask(desmat1ha)
  //
  //
  //// corrige REGEN pequenos no primeiro ano
  //var regen = nivel0_1985.eq(10).and(nivel0_1986.eq(1))
  //var conectedregen = regen.selfMask().connectedPixelCount(210,true).reproject('epsg:4326', null, 10);
  //var regen1ha = conectedregen.lte(200)
  //var ruido_regen85 = col7.select('classification_2017').updateMask(regen1ha)
  
  
  for (var i_ano=0;i_ano<anos.length; i_ano++){
    var ano = anos[i_ano];
    
    var class_ano = col7.select('classification_'+ano)
  
    if (ano == 2016) {  var class_corr = class_ano}
    else if (ano == 2023) {  
      class_corr = class_ano.blend(ruido_desmat21).blend(ruido_regen21)  }
    else {class_corr = class_ano}
  
    if (i_ano == 0){ var class_final = class_corr}  
    else {class_final = class_final.addBands(class_corr)}
  
  }
  
  Map.addLayer(class_final, vis2, 'filtrado', true);
  
  Export.image.toAsset({
      "image": class_final.toInt8(),
      'description':  '0' + String(regiao) +'_RF16a23_v' + versao_out,
      'assetId': dirout + '0' + String(regiao) +'_RF16a23_v' + versao_out,
      "scale": 10,
      "pyramidingPolicy": {
          '.default': 'mode'
      },
      "maxPixels": 1e13,
      "region": geometryPampa
  });      

}