// MAPBIOMAS PAMPA
// COLLECTION 01
// AUTHOR: Juliano Schirmbeck
// DATE: August 2020
// 


var version = '03'

var regioes = [1,2,3,4,5,6,7
                  ]
for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
    var regiao = regioes[i_regiao];

var col = '6'

  var bioma = "PAMPA"
  
  var versionOut = version + '_temp'
  var versionIn = version + '_esp'

  var anos3 = ['2017','2018','2019','2020','2021'];

  var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/class_Sentinel_Filtros/'
  var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
  var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);
  
  var image_in = ee.Image(dir_filtros+ '0' + String(regiao) +'_RF16a20_v' + versionIn);
  print(image_in)
var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = {'min': 0, 'max': 45,  'palette': palettes.get('classification5')};

  
  var mask3 = function(valor, ano, imagem){
    var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
          .and(imagem.select('classification_'+ (ano)              ).neq(valor))
          .and(imagem.select('classification_'+ (parseInt(ano) + 1)).eq (valor))
    var muda_img = imagem.select('classification_'+ (ano)    ).mask(mask.eq(1)).where(mask.eq(1), valor);  
    var img_out = imagem.select('classification_'+ano).blend(muda_img)
    return img_out;
  }
  
  var window3years = function(imagem, valor){
     var img_out = imagem.select('classification_2016')
     for (var i_ano=0;i_ano<anos3.length; i_ano++){  
       var ano = anos3[i_ano];   
       img_out = img_out.addBands(mask3(valor,ano, imagem)) }
       img_out = img_out.addBands(imagem.select('classification_2022'))
     return img_out
  }
  
  //put "classification_2019 in the end of bands after gap fill
  var original = image_in.select('classification_2016')
  for (var i_ano=0;i_ano<anos3.length; i_ano++){  
    var ano = anos3[i_ano]; 
    original = original.addBands(image_in.select('classification_'+ano)) 
  }
  original = original.addBands(image_in.select('classification_2022'))
  
  var filtered = original
  
  var mask3first = function(valor, imagem){
    var mask = imagem.select('classification_2016').neq (valor)
          .and(imagem.select('classification_2017').eq(valor))
          .and(imagem.select('classification_2018').eq (valor))
    var muda_img = imagem.select('classification_2016').mask(mask.eq(1)).where(mask.eq(1), valor);  
    var img_out = imagem.select('classification_2016').blend(muda_img)
    img_out = img_out.addBands([imagem.select('classification_2017'),
                                imagem.select('classification_2018'),
                                imagem.select('classification_2019'),
                                imagem.select('classification_2020'),
                                imagem.select('classification_2021'),
                                imagem.select('classification_2022')])
    return img_out;
  }
  
  //print(filtered)
  var mask3last = function(valor, imagem){
    var mask = imagem.select('classification_2020').eq (valor)
          .and(imagem.select('classification_2021').eq(valor))
          .and(imagem.select('classification_2022').neq (valor))
    var muda_img = imagem.select('classification_2022').mask(mask.eq(1)).where(mask.eq(1), valor);  
    var img_out = imagem.select('classification_2016')
    img_out = img_out.addBands([imagem.select('classification_2017'),
                                imagem.select('classification_2018'),
                                imagem.select('classification_2019'),
                                imagem.select('classification_2020'),
                                imagem.select('classification_2021')])
    var img_out = img_out.addBands(imagem.select('classification_2022').blend(muda_img))
    return img_out;
  }
  
  
  filtered = mask3first(33, filtered)// agua
  filtered = mask3first(29, filtered)//  A rochoso
  filtered = mask3first(22, filtered)// não veg
  filtered = mask3first(21, filtered)// mosaico
  filtered = mask3first(11, filtered)// umido 
  filtered = mask3first(3, filtered)// floresta
  filtered = mask3first(12, filtered)// campo
  
  //executa o ultimo caso
  filtered = mask3last(21, filtered)
  filtered = mask3last(29, filtered)
  filtered = mask3last(33, filtered)
  
  print(filtered)
  
  //ordem de execução geral
  var ordem_exec = [29, 22, 21, 11, 3, 12, 33];
  
  for (var i_class=0;i_class<ordem_exec.length; i_class++){  
     var id_class = ordem_exec[i_class]; 
     filtered = window3years(filtered, id_class)
  }
  
  var vis = {'bands': 'classification_2017','min': 0, 'max': 45,  'palette': palettes.get('classification5')};
  
  filtered = filtered.set('version', versionOut)
  
  Export.image.toAsset({
      'image': filtered,
      'description': + '0' + String(regiao) +'_RF16a20_v'+versionOut,
      'assetId': dir_filtros + '0' + String(regiao) +'_RF16a20_v'+versionOut,
      'pyramidingPolicy': {
          '.default': 'mode'
      },
      'region': limite.geometry().bounds(),
      'scale': 10,
      'maxPixels': 1e13
  });
}