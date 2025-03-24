// MAPBIOMAS PAMPA
// COLLECTION 09
// AUTHOR: Juliano Schirmbeck
// UPDATE: May 2021


// ***************************************************************************************
// Define as variáveis referentes a versão da coleção ou dos filtros
print('aa')
var col = 9
var version = '10'
print('aa') 
var bioma = "PAMPA"
var versionOut = version + '_final'
var versionIn = version + '_esp_pos_inci'

// Define as regiões: [1,2,3,4,5,6,7]
var regioes = [1,2,3,4,5,6,7]

// ***************************************************************************************


var anos3 = ['1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999',
'2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015'
,'2016','2017','2018','2019','2020','2021','2022'];
var anos4 = ['1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999',
'2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015',
'2016','2017','2018','2019','2020','2021'];
var anos5 = ['1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999',
'2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015',
'2016','2017','2018','2019','2020'];

var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/col' + col + '/PAMPA/class_col_' + col + '_filtros/'
var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col09_buff')

var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = {'min': 0, 'max': 62,  'palette': palettes.get('classification8')};


for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
    var regiao = regioes[i_regiao];
    
  var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);
  
  var image_in = ee.Image(dir_filtros+ '0' + String(regiao) +'_RF_col'+col+'_v' + versionIn);
  print(image_in)

  
  var mask3 = function(valor, ano, imagem){
    var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
          .and(imagem.select('classification_'+ (ano)              ).neq(valor))
          .and(imagem.select('classification_'+ (parseInt(ano) + 1)).eq (valor))
    var muda_img = imagem.select('classification_'+ (ano)    ).mask(mask.eq(1)).where(mask.eq(1), valor);  
    var img_out = imagem.select('classification_'+ano).blend(muda_img)
    return img_out;
  }
  
  var mask4 = function(valor, ano, imagem){
    var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
          .and(imagem.select('classification_'+ (ano)              ).neq(valor))
          .and(imagem.select('classification_'+ (parseInt(ano) + 1)).neq(valor))
          .and(imagem.select('classification_'+ (parseInt(ano) + 2)).eq (valor))
    var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
    var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor); 
    var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1)
    return img_out;
  }
  
  var mask5 = function(valor, ano, imagem){
    var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
          .and(imagem.select('classification_'+ (ano)              ).neq(valor))
          .and(imagem.select('classification_'+ (parseInt(ano) + 1)).neq(valor))
          .and(imagem.select('classification_'+ (parseInt(ano) + 2)).neq(valor))
          .and(imagem.select('classification_'+ (parseInt(ano) + 3)).eq (valor))
    var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
    var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
    var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);  
    var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2)
    return img_out;
  }
  
  var window5years = function(imagem, valor){
     var img_out = imagem.select('classification_1985')
     for (var i_ano=0;i_ano<anos5.length; i_ano++){  
       var ano = anos5[i_ano];  
       img_out = img_out.addBands(mask5(valor,ano, imagem)) 
     }
       img_out = img_out.addBands(imagem.select('classification_2021'))
       img_out = img_out.addBands(imagem.select('classification_2022'))
       img_out = img_out.addBands(imagem.select('classification_2023'))
     return img_out
  }
  
  var window4years = function(imagem, valor){
     var img_out = imagem.select('classification_1985')
     for (var i_ano=0;i_ano<anos4.length; i_ano++){  
       var ano = anos4[i_ano];  
       img_out = img_out.addBands(mask4(valor,ano, imagem)) }
       img_out = img_out.addBands(imagem.select('classification_2022'))
       img_out = img_out.addBands(imagem.select('classification_2023'))
     return img_out
  }
  
  var window3years = function(imagem, valor){
     var img_out = imagem.select('classification_1985')
     for (var i_ano=0;i_ano<anos3.length; i_ano++){  
       var ano = anos3[i_ano];   
       img_out = img_out.addBands(mask3(valor,ano, imagem)) }
       img_out = img_out.addBands(imagem.select('classification_2023'))
     return img_out
  }
  
  //put "classification_2019 in the end of bands after gap fill
  var original = image_in.select('classification_1985')
  for (var i_ano=0;i_ano<anos3.length; i_ano++){  
    var ano = anos3[i_ano]; 
    original = original.addBands(image_in.select('classification_'+ano)) 
  }
  original = original.addBands(image_in.select('classification_2023'))
  
  var filtered = original
  
  var mask3first = function(valor, imagem){
    var mask = imagem.select('classification_1985').neq (valor)
          .and(imagem.select('classification_1986').eq(valor))
          .and(imagem.select('classification_1987').eq (valor))
    var muda_img = imagem.select('classification_1985').mask(mask.eq(1)).where(mask.eq(1), valor);  
    var img_out = imagem.select('classification_1985').blend(muda_img)
    img_out = img_out.addBands([imagem.select('classification_1986'),
                                imagem.select('classification_1987'),
                                imagem.select('classification_1988'),
                                imagem.select('classification_1989'),
                                imagem.select('classification_1990'),
                                imagem.select('classification_1991'),
                                imagem.select('classification_1992'),
                                imagem.select('classification_1993'),
                                imagem.select('classification_1994'),
                                imagem.select('classification_1995'),
                                imagem.select('classification_1996'),
                                imagem.select('classification_1997'),
                                imagem.select('classification_1998'),
                                imagem.select('classification_1999'),
                                imagem.select('classification_2000'),
                                imagem.select('classification_2001'),
                                imagem.select('classification_2002'),
                                imagem.select('classification_2003'),
                                imagem.select('classification_2004'),
                                imagem.select('classification_2005'),
                                imagem.select('classification_2006'),
                                imagem.select('classification_2007'),
                                imagem.select('classification_2008'),
                                imagem.select('classification_2009'),
                                imagem.select('classification_2010'),
                                imagem.select('classification_2011'),
                                imagem.select('classification_2012'),
                                imagem.select('classification_2013'),
                                imagem.select('classification_2014'),
                                imagem.select('classification_2015'),
                                imagem.select('classification_2016'),
                                imagem.select('classification_2017'),
                                imagem.select('classification_2018'),
                                imagem.select('classification_2019'),
                                imagem.select('classification_2020'),
                                imagem.select('classification_2021'),
                                imagem.select('classification_2022'),
                                imagem.select('classification_2023')])
    return img_out;
  }
  
  //print(filtered)
  var mask3last = function(valor, imagem){
    var mask = imagem.select('classification_2021').eq (valor)
          .and(imagem.select('classification_2022').eq(valor))
          .and(imagem.select('classification_2023').neq (valor))
    var muda_img = imagem.select('classification_2023').mask(mask.eq(1)).where(mask.eq(1), valor);  
    var img_out = imagem.select('classification_1985')
    img_out = img_out.addBands([imagem.select('classification_1986'),
                                imagem.select('classification_1987'),
                                imagem.select('classification_1988'),
                                imagem.select('classification_1989'),
                                imagem.select('classification_1990'),
                                imagem.select('classification_1991'),
                                imagem.select('classification_1992'),
                                imagem.select('classification_1993'),
                                imagem.select('classification_1994'),
                                imagem.select('classification_1995'),
                                imagem.select('classification_1996'),
                                imagem.select('classification_1997'),
                                imagem.select('classification_1998'),
                                imagem.select('classification_1999'),
                                imagem.select('classification_2000'),
                                imagem.select('classification_2001'),
                                imagem.select('classification_2002'),
                                imagem.select('classification_2003'),
                                imagem.select('classification_2004'),
                                imagem.select('classification_2005'),
                                imagem.select('classification_2006'),
                                imagem.select('classification_2007'),
                                imagem.select('classification_2008'),
                                imagem.select('classification_2009'),
                                imagem.select('classification_2010'),
                                imagem.select('classification_2011'),
                                imagem.select('classification_2012'),
                                imagem.select('classification_2013'),
                                imagem.select('classification_2014'),
                                imagem.select('classification_2015'),
                                imagem.select('classification_2016'),
                                imagem.select('classification_2017'),
                                imagem.select('classification_2018'),
                                imagem.select('classification_2019'),
                                imagem.select('classification_2020'),
                                imagem.select('classification_2021'),
                                imagem.select('classification_2022')])
    var img_out = img_out.addBands(imagem.select('classification_2023').blend(muda_img))
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
  
  var vis = {'bands': 'classification_2017','min': 0, 'max': 62,  'palette': palettes.get('classification8')};
  
  filtered = filtered.set('version', versionOut)
  Map.addLayer(image_in,vis,'image_in')
  Map.addLayer(filtered,vis,'filtered')
  Export.image.toAsset({
      'image': filtered,
      'description': + '0' + String(regiao) +'_RF_col'+col+'_v'+versionOut,
      'assetId': dir_filtros + '0' + String(regiao) +'_RF_col'+col+'_v'+versionOut,
      'pyramidingPolicy': {
          '.default': 'mode'
      },
      'region': limite.geometry().bounds(),
      'scale': 30,
      'maxPixels': 1e13
  });
}
