// MAPBIOMAS PAMPA
// COLLECTION 02
// AUTHOR: Juliano Schirmbeck
// UPDATED: Oct 2024

var version = '06'

var regioes = [1,2,3,4,5,6,7]
for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
  var regiao = regioes[i_regiao];

  var bioma = "PAMPA"
  
  var versionOut = version + '_nat'
  var versionIn = version + '_temp'
  var versionIncidentes = version +  '_pre_incidentes'

  var anos3 = ['2017','2018','2019','2020','2021','2022'];

  var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/class_s2_col_01_filtros/'
  var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
  var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);
  
  var image_in = ee.Image(dir_filtros+ '0' + String(regiao) +'_RF16a23_v' + versionIn);
  print(image_in)
  
  var image_incidence = ee.Image(dir_filtros+ '0' + String(regiao) +'_RF16a23_v' +  versionIncidentes)
  
  var palettes = require('users/mapbiomas/modules:Palettes.js');
  var vis = {'min': 0, 'max': 45,  'palette': palettes.get('classification5')};
  
  
  var mask3natural = function(ano, imagem){
  
    var nivel1antes = imagem.select('classification_'+ (parseInt(ano) - 1)).remap([3,11,12,29, 21,22],
                              [1, 1, 1, 1, 10,10])
    var nivel1ano = imagem.select('classification_'+ (ano)) .remap([3,11,12,29, 21,22],
                              [1, 1, 1, 1, 10,10])
    var nivel1depois = imagem.select('classification_'+ (parseInt(ano) + 1)).remap([3,11,12,29, 21,22],
                              [1, 1, 1, 1, 10,10])
    
    var valor = 1
    var mask = nivel1antes.eq (valor)
          .and(nivel1ano.neq(valor))
          .and(nivel1depois.eq (valor)).selfMask()
          
    Map.addLayer(mask,{}, 'mask' + ano)
    //var muda_img = imagem.select('classification_'+ (ano)).mask(mask.eq(1)).where(mask.eq(1), imagem.select('classification_'+ (parseInt(ano) + 1)));  
    var img_out = imagem.select('classification_'+ano).blend(imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)))
    return img_out;
  }

  var window3years = function(imagem){
     var img_out = imagem.select('classification_2016')
     for (var i_ano=0;i_ano<anos3.length; i_ano++){  
       var ano = anos3[i_ano];   
       img_out = img_out.addBands(mask3natural(ano, imagem)) }
       img_out = img_out.addBands(imagem.select('classification_2023'))
     return img_out
  }
  
  //put "classification_2019 in the end of bands after gap fill
  var original = image_in.select('classification_2016')
  for (var i_ano=0;i_ano<anos3.length; i_ano++){  
      var ano = anos3[i_ano]; 
      original = original.addBands(image_in.select('classification_'+ano)) 
  }
  
  original = original.addBands(image_in.select('classification_2023'))
    
  var filtered = original
  
  filtered = window3years(filtered)
  
  var vis = {'bands': 'classification_2017','min': 0, 'max': 45,  'palette': palettes.get('classification5')};
  
  Map.addLayer(original,vis,'entrada')
  
  Map.addLayer(filtered,vis,'filtrada nat antro nat')

  //Calculando frequencias
  // General rule
  var exp = '100*((b( 0)+b( 1)+b( 2)+b( 3)+b( 4)+b( 5)+b( 6)+b( 7))/8)';
  
  // get frequency
  var florFreq  = filtered.eq( 3).expression(exp);
  var umiFreq   = filtered.eq(11).expression(exp);
  var grassFreq = filtered.eq(12).expression(exp);
  var anvFreq   = filtered.eq(22).expression(exp);
  var arochFreq = filtered.eq(29).expression(exp);
  var aguaFreq  = filtered.eq(33).expression(exp);
  var agricFreq = filtered.eq(21).expression(exp);

  //trabalha com areas com predominância de banhado > 51%  
  var vegMasknat = ee.Image(0)
                           .where(umiFreq
                           .add(grassFreq)
                           .add(aguaFreq)
                           .add(florFreq)
                           .add(arochFreq)
                           .gt(80), 1)

  var  vegMapnat = image_incidence.select('classification_mode').mask(vegMasknat.selfMask())
  Map.addLayer(vegMapnat,{},'vegMapnat')    
  filtered = filtered.blend(vegMapnat)
  
  Map.addLayer(filtered,vis,'filtrada freq nat')
 
                          
  filtered = filtered.set('version', versionOut)
  
  Export.image.toAsset({
      'image': filtered,
      'description': + '0' + String(regiao) +'_RF16a23_v'+versionOut,
      'assetId': dir_filtros + '0' + String(regiao) +'_RF16a23_v'+versionOut,
      'pyramidingPolicy': {
          '.default': 'mode'
      },
      'region': limite.geometry().bounds(),
      'scale': 10,
      'maxPixels': 1e13
  });
}