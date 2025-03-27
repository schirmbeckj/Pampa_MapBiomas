// MAPBIOMAS PAMPA
// COLLECTION 02
// AUTHOR: Juliano Schirmbeck
// UPDATED: Oct 2024

// ***************************************************************************************
// Define as variáveis referentes a versão da coleção ou dos filtros
var version= '06'
var vesion_in = version +'_freq2'
var versao_out = version + '_water_ext';
var descricao = 'Correção água 2023'
var col = '1'
var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/class_s2_col_01_filtros/';

// Define as regiões: [1,2,3,4,5,6,7]
var regioes = [1,2,3,4,5,6,7]

var bioma = "PAMPA" 

// ***************************************************************************************
var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
var limite = regioesCollection

for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
    var regiao = regioes[i_regiao];
    
  var col1 =ee.Image(dir_filtros + '0' + String(regiao) +'_RF16a23_v' + vesion_in)

  var palettes = require('users/mapbiomas/modules:Palettes.js');
  var vis = {
      'min': 0,
      'max': 62,
      'palette': palettes.get('classification8')
  };var vis2 = {
      // 'bands': 'classification_2022',
      'min': 0,
      'max': 62,
      'palette': palettes.get('classification8')
  };
  
  //******************************************************
  //******************************************************
  // Filtro agua ultimo ano
  //******************************************************
  
  var class_2022 = col1.select('classification_2022')
  Map.addLayer(class_2022, vis2, 'col1_S2 2022 - R'+regiao, true);
  var class_2023 = col1.select('classification_2023')
  Map.addLayer(class_2023, vis2, 'col1_S2 2023 - R'+regiao, true);
  
  var agua_2023 = class_2023.eq(33).selfMask() //mascara de agua em 2023
  Map.addLayer(agua_2023, {}, 'agua_2023 R'+regiao, true);
  
  var corr_2022 = class_2022.mask(agua_2023) //camada que classificação de 2022 para corrigir 2023
  Map.addLayer(corr_2022, vis, 'corr_2022 R'+regiao, true);
  
  var class_2023_corr = class_2023.blend(corr_2022) //camada de 2023 corrigida
  
  Map.addLayer(class_2023_corr, vis, 'class_2023_corr R'+regiao, true);
  
  var image_out = col1.addBands(class_2023_corr,['classification_2023'],true)
  print(image_out, "imagem corrigida")
  
  Map.addLayer(image_out.select('classification_2023'), vis, 'class_2023_corr_final R'+regiao, true);
  
  image_out = image_out
  .set('collection', 1)
  .set('version', versao_out)
  .set('biome', bioma)

  //print(image_in)
  print(image_out, "imagem final")
  
  Export.image.toAsset({
      'image': image_out,
      'description': '0' + String(regiao) +'_RF16a23_v'+versao_out,
      'assetId': dir_filtros + '0' + String(regiao) +'_RF16a23_v'+versao_out,
      'pyramidingPolicy': {
          '.default': 'mode'
      },
      'region': limite.geometry().bounds(),
      'scale': 10,
      'maxPixels': 1e13
  });

}