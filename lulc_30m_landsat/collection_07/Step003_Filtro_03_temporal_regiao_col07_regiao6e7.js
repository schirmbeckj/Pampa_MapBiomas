/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #d63000 */ee.Geometry.Point([-52.73894839484851, -29.931293816338716]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// MAPBIOMAS PAMPA
// COLLECTION 05 
// AUTHOR: Juliano Schirmbeck
// DATE: August 2020
// 
//  Randon Forest to region 06


var version = '033'
var col = '7'
var bioma = "PAMPA"
  
var versionOut = version + 'b_temp'
var versionIn = version + '_esp'
  

var anos3 = ['1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999',
'2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015'
,'2016','2017','2018','2019','2020'];
var anos4 = ['1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999',
'2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015',
'2016','2017','2018','2019'];
var anos5 = ['1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999',
'2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015',
'2016','2017','2018'];

var regioes = [//1,2,3,4,5,
                6,7
                  ]
                 
for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
  var regiao = regioes[i_regiao];
  
  var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/col' + col + '/PAMPA/class_col' + col + '_filtros/'
  var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
  var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);
  
  var image_in = ee.Image(dir_filtros+ '0' + String(regiao) +'_RF85a21_v' + versionIn);
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
       img_out = img_out.addBands(imagem.select('classification_2019'))
       img_out = img_out.addBands(imagem.select('classification_2021'))
       img_out = img_out.addBands(imagem.select('classification_2021'))
     return img_out
  }
  
  var window4years = function(imagem, valor){
     var img_out = imagem.select('classification_1985')
     for (var i_ano=0;i_ano<anos4.length; i_ano++){  
       var ano = anos4[i_ano];  
       img_out = img_out.addBands(mask4(valor,ano, imagem)) }
       img_out = img_out.addBands(imagem.select('classification_2020'))
       img_out = img_out.addBands(imagem.select('classification_2021'))
     return img_out
  }
  
  var window3years = function(imagem, valor){
     var img_out = imagem.select('classification_1985')
     for (var i_ano=0;i_ano<anos3.length; i_ano++){  
       var ano = anos3[i_ano];   
       img_out = img_out.addBands(mask3(valor,ano, imagem)) }
       img_out = img_out.addBands(imagem.select('classification_2021'))
     return img_out
  }
  
  //put "classification_2019 in the end of bands after gap fill
  var original = image_in.select('classification_1985')
  for (var i_ano=0;i_ano<anos3.length; i_ano++){  
    var ano = anos3[i_ano]; 
    original = original.addBands(image_in.select('classification_'+ano)) 
  }
  original = original.addBands(image_in.select('classification_2021'))
  
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
                                imagem.select('classification_2021')])
    return img_out;
  }
  
  //print(filtered)
  var mask3last = function(valor, imagem){
    var mask = imagem.select('classification_2018').eq (valor)
          .and(imagem.select('classification_2019').eq(valor))
          .and(imagem.select('classification_2020').neq (valor))
    var muda_img = imagem.select('classification_2020').mask(mask.eq(1)).where(mask.eq(1), valor);  
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
                                imagem.select('classification_2020')])
    var img_out = img_out.addBands(imagem.select('classification_2021').blend(muda_img))
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
  var ordem_exec_4y = [21]//29, 11, 3, 21, 12];
  for (var i_class=0;i_class<ordem_exec_4y.length; i_class++){  
     var id_class = ordem_exec_4y[i_class]; 
     filtered = window4years(filtered, id_class)
  }
  
  var ordem_exec_3y = [29, 22, 21, 11, 3, 12, 33];
  for (var i_class=0;i_class<ordem_exec_3y.length; i_class++){  
     var id_class = ordem_exec_3y[i_class]; 
     filtered = window3years(filtered, id_class)
  }
  
  var exp = '100*((b( 0)+b( 1)+b( 2)+b( 3)+b( 4)+b( 5)+b( 6)+b( 7)+b( 8)+b( 9)'+
               '+b(10)+b(11)+b(12)+b(13)+b(14)+b(15)+b(16)+b(17)+b(18)+b(19)'+
               '+b(20)+b(21)+b(22)+b(23)+b(24)+b(25)+b(26)+b(27)+b(28)+b(29)'+
               '+b(30)+b(31)+b(32)+b(33)+b(34)+b(35)+b(36))/37)';
               
    // get frequency
  var freq  = filtered.eq( 3).expression(exp).rename('b3')
              .addBands(filtered.eq(11).expression(exp).rename('b11'))
              .addBands(filtered.eq(12).expression(exp).rename('b12'))
              .addBands(filtered.eq(22).expression(exp).rename('b22'))
              .addBands(filtered.eq(29).expression(exp).rename('b29'))
              .addBands(filtered.eq(33).expression(exp).rename('b33'))
              .addBands(filtered.eq(21).expression(exp).rename('b21'))
               
  var mask3_inv = function (valor, ano, imagem) {
    var mask = imagem.select('classification_' + (parseInt(ano) - 1)).neq(valor)
        .and(imagem.select('classification_' + (ano)).eq(valor).and(freq.select('b'+ String(valor)).lt(10)))
        .and(imagem.select('classification_' + (parseInt(ano) + 1)).neq(valor))
    var muda_img = imagem.select('classification_' + (ano)).mask(mask.eq(1))
                                  .gt(0)
                                  .multiply(imagem.select('classification_' + (parseInt(ano) + 1)));
    var img_out = imagem.select('classification_' + ano).blend(muda_img)
    return img_out;
  }
  var window3years_inv = function (imagem, valor) {
    var img_out = imagem.select('classification_1985')
    for (var i_ano = 0; i_ano < anos3.length; i_ano++) {
        var ano = anos3[i_ano];
        img_out = img_out.addBands(mask3_inv(valor, ano, imagem))
    }
    img_out = img_out.addBands(imagem.select('classification_2021'));
    return img_out
  }   
  
  var vis = {'bands': 'classification_1993','min': 0, 'max': 45,  'palette': palettes.get('classification5')};
  
  Map.addLayer(original, vis, 'original',false);
  Map.addLayer(filtered, vis, 'pre inv');
  var ordem_exec_3y_inv = [29, 22, 12, 21, 11, 3, 12, 33];
  for (var i_class=0;i_class<ordem_exec_3y_inv.length; i_class++){  
     var id_class = ordem_exec_3y_inv[i_class]; 
     filtered = window3years_inv(filtered, id_class)
  }             
  
  
  //print('filtered_inv',filtered_inv);

  Map.addLayer(filtered, vis, 'filtered',false);
  
  filtered = filtered.set('version', versionOut)
  
  Export.image.toAsset({
      'image': filtered,
      'description': + '0' + String(regiao) +'_RF85a21_v'+versionOut,
      'assetId': dir_filtros + '0' + String(regiao) +'_RF85a21_v'+versionOut,
      'pyramidingPolicy': {
          '.default': 'mode'
      },
      'region': limite.geometry().bounds(),
      'scale': 30,
      'maxPixels': 1e13
  });
}