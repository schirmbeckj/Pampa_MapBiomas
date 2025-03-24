// MAPBIOMAS PAMPA
// COLLECTION 09 
// AUTHOR: Juliano Schirmbeck
// UPDATE: May 2024


// ***************************************************************************************
// Define as variáveis referentes a versão da coleção ou dos filtros
var version = '12'
var col = '9'
var bioma = "PAMPA"
var versionOut = version + '_temp2'
var versionIn = version + '_temp'

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

                 
for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
  var regiao = regioes[i_regiao];
  
  var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/col' + col + '/PAMPA/class_col_' + col + '_filtros/'
  var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col09_buff')
  var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);
  
  var image_in = ee.Image(dir_filtros+ '0' + String(regiao) +'_RF_col' + col + '_v' + versionIn);
  print(image_in)
var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = {'min': 0, 'max': 62,  'palette': palettes.get('classification8')};
var vis = {'bands': 'classification_2015','min': 0, 'max': 62,  'palette': palettes.get('classification8')};
  
  //nova função de 5 anos
//  var window5years = function(imagem, valor){
//     for (var i_ano=0;i_ano<anos5.length; i_ano++){  
//        var ano = anos5[i_ano];  
//        var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
//            .and(imagem.select('classification_'+ (ano)              ).neq(valor))
//            .and(imagem.select('classification_'+ (parseInt(ano) + 1)).neq(valor))
//            .and(imagem.select('classification_'+ (parseInt(ano) + 2)).neq(valor))
//            .and(imagem.select('classification_'+ (parseInt(ano) + 3)).eq (valor))
//      imagem = imagem.addBands(imagem.select('classification_'+ (ano)              ).blend(mask.selfMask().multiply(valor)),['classification_'+ (ano)          ],true)
//      imagem = imagem.addBands(imagem.select('classification_'+ (parseInt(ano) + 1)).blend(mask.selfMask().multiply(valor)),['classification_'+ (parseInt(ano)+1)],true)
//      imagem = imagem.addBands(imagem.select('classification_'+ (parseInt(ano) + 2)).blend(mask.selfMask().multiply(valor)),['classification_'+ (parseInt(ano)+2)],true)
//     }
//     return imagem
//  }
  
//  var window4years = function(imagem, valor){
//     for (var i_ano=0;i_ano<anos4.length; i_ano++){  
//       var ano = anos4[i_ano];  
//       var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq(valor)
//            .and(imagem.select('classification_'+ (ano)              ).neq(valor))
//            .and(imagem.select('classification_'+ (parseInt(ano) + 1)).neq(valor))
//            .and(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(valor))
//      imagem = imagem.addBands(imagem.select('classification_'+ (ano)              ).blend(mask.selfMask().multiply(valor)),['classification_'+ (ano)          ],true)
//      imagem = imagem.addBands(imagem.select('classification_'+ (parseInt(ano) + 1)).blend(mask.selfMask().multiply(valor)),['classification_'+ (parseInt(ano)+1)],true)
//     }
//     return imagem
//  }
  
//  var window3years = function(imagem, valor){
//     var img_out = imagem.select('classification_1985')
//     for (var i_ano=0;i_ano<anos3.length; i_ano++){  
//       var ano = anos3[i_ano];   
//       var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
//             .and(imagem.select('classification_'+ (ano)              ).neq(valor))
//             .and(imagem.select('classification_'+ (parseInt(ano) + 1)).eq (valor))
//        imagem = imagem.addBands(imagem.select('classification_'+ (ano)              ).blend(mask.selfMask().multiply(valor)),['classification_'+ (ano)          ],true)
//     }
//     return imagem
//  }

  //put "classification_2019 in the end of bands after gap fill
  var original = image_in.select('classification_1985')
  for (var i_ano=0;i_ano<anos3.length; i_ano++){  
    var ano = anos3[i_ano]; 
    original = original.addBands(image_in.select('classification_'+ano)) 
  }
  original = original.addBands(image_in.select('classification_2023'))
  
  var filtered = original
  
//  var mask3first = function(valor, imagem){
//    var mask = imagem.select('classification_1985').neq (valor)
//          .and(imagem.select('classification_1986').eq(valor))
//          .and(imagem.select('classification_1987').eq (valor))
//    var muda_img = imagem.select('classification_1985').mask(mask.eq(1)).where(mask.eq(1), valor);  
//    var img_out = imagem.select('classification_1985').blend(muda_img)
//    img_out = img_out.addBands([imagem.select('classification_1986'),
//                                imagem.select('classification_1987'),
//                                imagem.select('classification_1988'),
//                                imagem.select('classification_1989'),
//                                imagem.select('classification_1990'),
//                                imagem.select('classification_1991'),
//                                imagem.select('classification_1992'),
//                                imagem.select('classification_1993'),
//                                imagem.select('classification_1994'),
//                                imagem.select('classification_1995'),
//                                imagem.select('classification_1996'),
//                                imagem.select('classification_1997'),
//                                imagem.select('classification_1998'),
//                                imagem.select('classification_1999'),
//                                imagem.select('classification_2000'),
//                                imagem.select('classification_2001'),
//                                imagem.select('classification_2002'),
//                                imagem.select('classification_2003'),
//                                imagem.select('classification_2004'),
//                                imagem.select('classification_2005'),
//                                imagem.select('classification_2006'),
//                                imagem.select('classification_2007'),
//                                imagem.select('classification_2008'),
//                                imagem.select('classification_2009'),
//                                imagem.select('classification_2010'),
//                                imagem.select('classification_2011'),
//                                imagem.select('classification_2012'),
//                                imagem.select('classification_2013'),
//                                imagem.select('classification_2014'),
//                                imagem.select('classification_2015'),
//                                imagem.select('classification_2016'),
//                                imagem.select('classification_2017'),
//                                imagem.select('classification_2018'),
//                                imagem.select('classification_2019'),
//                                imagem.select('classification_2020'),
//                                imagem.select('classification_2021'),
//                                imagem.select('classification_2022')])
//    return img_out;
//  }
//  
//  //print(filtered)
//  var mask3last = function(valor, imagem){
//    var mask = imagem.select('classification_2020').eq (valor)
//          .and(imagem.select('classification_2021').eq(valor))
//          .and(imagem.select('classification_2022').neq (valor))
//    var muda_img = imagem.select('classification_2022').mask(mask.eq(1)).where(mask.eq(1), valor);  
//    var img_out = imagem.select('classification_1985')
//    img_out = img_out.addBands([imagem.select('classification_1986'),
//                                imagem.select('classification_1987'),
//                                imagem.select('classification_1988'),
//                                imagem.select('classification_1989'),
//                                imagem.select('classification_1990'),
//                                imagem.select('classification_1991'),
//                                imagem.select('classification_1992'),
//                                imagem.select('classification_1993'),
//                                imagem.select('classification_1994'),
//                                imagem.select('classification_1995'),
//                                imagem.select('classification_1996'),
//                                imagem.select('classification_1997'),
//                                imagem.select('classification_1998'),
//                                imagem.select('classification_1999'),
//                                imagem.select('classification_2000'),
//                                imagem.select('classification_2001'),
//                                imagem.select('classification_2002'),
//                                imagem.select('classification_2003'),
//                                imagem.select('classification_2004'),
//                                imagem.select('classification_2005'),
//                                imagem.select('classification_2006'),
//                                imagem.select('classification_2007'),
//                                imagem.select('classification_2008'),
//                                imagem.select('classification_2009'),
//                                imagem.select('classification_2010'),
//                                imagem.select('classification_2011'),
//                                imagem.select('classification_2012'),
//                                imagem.select('classification_2013'),
//                                imagem.select('classification_2014'),
//                                imagem.select('classification_2015'),
//                                imagem.select('classification_2016'),
//                                imagem.select('classification_2017'),
//                                imagem.select('classification_2018'),
//                                imagem.select('classification_2019'),
//                                imagem.select('classification_2020'),
//                                imagem.select('classification_2021')])
//    var img_out = img_out.addBands(imagem.select('classification_2022').blend(muda_img))
//    return img_out;
//  }
  
  
//  filtered = mask3first(33, filtered)// agua
//  filtered = mask3first(29, filtered)//  A rochoso
//  filtered = mask3first(22, filtered)// não veg
//  filtered = mask3first(21, filtered)// mosaico
//  filtered = mask3first(11, filtered)// umido 
//  filtered = mask3first(3, filtered)// floresta
//  filtered = mask3first(12, filtered)// campo
//  
//  //executa o ultimo caso
//  filtered = mask3last(21, filtered)
//  filtered = mask3last(29, filtered)
//  filtered = mask3last(33, filtered)
//  
//  print(filtered)
  
  //ordem de execução geral
  
//  if (regiao == 2){
//    print('regiao 2 = ', regiao)
//    var ordem_exec_4y = [29, 11,  12,3];
//    var ordem_exec_3y = [29, 22, 21, 11, 12 , 3, 33];
//  }else{ 
//    if (regiao == 3){
//          print('regiao 3 = ', regiao)
//          var ordem_exec_5y = [12];
//          for (var i_class=0;i_class<ordem_exec_5y.length; i_class++){  
//             var id_class = ordem_exec_5y[i_class]; 
//             filtered = window5years(filtered, id_class)
//          }
//          var ordem_exec_4y = [29, 12, 11, 3];
//          var ordem_exec_3y = [29, 22, 12, 21, 11, 3,  33];
//    }else{ if (regiao == 7){
//         print('regiao 7 = ', regiao)
//         var ordem_exec_4y = [21]
//         var ordem_exec_3y = [29, 22, 21, 11, 3, 12, 33];
//      }else{
//        print('regiao = ',regiao)
//        var ordem_exec_4y = [29, 11, 3, 12];
//        var ordem_exec_3y = [29, 22, 21, 11, 3, 12, 33];
//      }
//    }
//  }
//  
//  var ordem_exec_3y_inv = [29, 22, 21, 11, 3, 12, 33];
//  
//  for (var i_class=0;i_class<ordem_exec_4y.length; i_class++){  
//     var id_class = ordem_exec_4y[i_class]; 
//     filtered = window4years(filtered, id_class)
//  }
  
 // for (var i_class=0;i_class<ordem_exec_3y.length; i_class++){  
 //    var id_class = ordem_exec_3y[i_class]; 
 //    filtered = window3years(filtered, id_class)
 // }
  
//  var exp = '100*((b( 0)+b( 1)+b( 2)+b( 3)+b( 4)+b( 5)+b( 6)+b( 7)+b( 8)+b( 9)'+
//               '+b(10)+b(11)+b(12)+b(13)+b(14)+b(15)+b(16)+b(17)+b(18)+b(19)'+
//               '+b(20)+b(21)+b(22)+b(23)+b(24)+b(25)+b(26)+b(27)+b(28)+b(29)'+
//               '+b(30)+b(31)+b(32)+b(33)+b(34)+b(35)+b(36)+b(37))/38)';
//               
//    // get frequency
//  var freq  = filtered.eq( 3).expression(exp).rename('b3')
//              .addBands(filtered.eq(11).expression(exp).rename('b11'))
//              .addBands(filtered.eq(12).expression(exp).rename('b12'))
//              .addBands(filtered.eq(22).expression(exp).rename('b22'))
//              .addBands(filtered.eq(29).expression(exp).rename('b29'))
//              .addBands(filtered.eq(33).expression(exp).rename('b33'))
//              .addBands(filtered.eq(21).expression(exp).rename('b21'))
// 
//   var window3years_inv = function(imagem, valor){
//     var img_out = imagem.select('classification_1985')
//     for (var i_ano=0;i_ano<anos3.length; i_ano++){  
//       var ano = anos3[i_ano];   
//       var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).neq (valor)
//             .and(imagem.select('classification_'+ (ano)              ).eq(valor).and(freq.select('b'+ String(valor)).lt(10)))
//             .and(imagem.select('classification_'+ (parseInt(ano) + 1)).neq (valor))
//        imagem = imagem.addBands(imagem.select('classification_'+ (ano)              )
//                          .blend(mask.selfMask()
//                          .multiply(imagem.select('classification_' + (parseInt(ano) + 1))))
//                          ,['classification_'+ (ano)          ]
//                          ,true)
//     }
//     return imagem
//  }
 
  var vis = {'bands': 'classification_2003','min': 0, 'max': 62,  'palette': palettes.get('classification8')};
  
  Map.addLayer(original, vis, 'original',false);
//  Map.addLayer(filtered, vis, 'pre inv');


//  for (var i_class=0;i_class<ordem_exec_3y_inv.length; i_class++){  
//     var id_class = ordem_exec_3y_inv[i_class]; 
//     filtered = window3years_inv(filtered, id_class)
//  }             
//*********************************************************
//Absense Filter
//**************************************************************  
  var window5years_abs = function(imagem, valor){
     for (var i_ano=0;i_ano<anos5.length; i_ano++){  
        var ano = anos5[i_ano];  
        var mask = imagem.select('classification_1985').neq (valor).and(imagem.select('classification_2023').neq (valor)) 
            .and(imagem.select('classification_'+ (parseInt(ano) - 1)).neq (valor))
            .and(imagem.select('classification_'+ (ano)              ).eq(valor))
            .and(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(valor))
            .and(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(valor))
            .and(imagem.select('classification_'+ (parseInt(ano) + 3)).neq (valor))
      imagem = imagem.addBands(imagem.select('classification_'+ (ano)              )
                                  .blend(mask.selfMask()
                                  .multiply(imagem.select('classification_' + (parseInt(ano) + 3)))),['classification_'+ (ano)          ],true)
      imagem = imagem.addBands(imagem.select('classification_'+ (parseInt(ano) + 1))
                                  .blend(mask.selfMask()
                                  .multiply(imagem.select('classification_' + (parseInt(ano) + 3)))),['classification_'+ (parseInt(ano)+1)],true)
      imagem = imagem.addBands(imagem.select('classification_'+ (parseInt(ano) + 2))
                                  .blend(mask.selfMask()
                                  .multiply(imagem.select('classification_' + (parseInt(ano) + 3)))),['classification_'+ (parseInt(ano)+2)],true)
     }
     return imagem
  }
  
  var window4years_abs = function(imagem, valor){
     for (var i_ano=0;i_ano<anos4.length; i_ano++){  
       var ano = anos4[i_ano];  
        var mask = imagem.select('classification_1985').neq (valor).and(imagem.select('classification_2023').neq (valor)) 
            .and(imagem.select('classification_'+ (parseInt(ano) - 1)).neq (valor))
            .and(imagem.select('classification_'+ (ano)              ).eq(valor))
            .and(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(valor))
            .and(imagem.select('classification_'+ (parseInt(ano) + 2)).neq(valor))
      imagem = imagem.addBands(imagem.select('classification_'+ (ano)              )
                                  .blend(mask.selfMask()
                                  .multiply(imagem.select('classification_' + (parseInt(ano) + 2)))),['classification_'+ (ano)          ],true)
      imagem = imagem.addBands(imagem.select('classification_'+ (parseInt(ano) + 1))
                                  .blend(mask.selfMask()
                                  .multiply(imagem.select('classification_' + (parseInt(ano) + 2)))),['classification_'+ (parseInt(ano)+1)],true)
      imagem = imagem.addBands(imagem.select('classification_'+ (parseInt(ano) + 2))
                                  .blend(mask.selfMask()
                                  .multiply(imagem.select('classification_' + (parseInt(ano) + 2)))),['classification_'+ (parseInt(ano)+2)],true)
     }
     return imagem
  }


  var window3years_abs = function(imagem, valor){
     for (var i_ano=0;i_ano<anos3.length; i_ano++){  
       var ano = anos3[i_ano];  
        var mask = imagem.select('classification_1985').neq (valor).and(imagem.select('classification_2023').neq (valor)) 
            .and(imagem.select('classification_'+ (parseInt(ano) - 1)).neq (valor))
            .and(imagem.select('classification_'+ (ano)              ).eq(valor))
            .and(imagem.select('classification_'+ (parseInt(ano) + 1)).neq(valor))
      imagem = imagem.addBands(imagem.select('classification_'+ (ano)              )
                                  .blend(mask.selfMask()
                                  .multiply(imagem.select('classification_' + (parseInt(ano) + 1)))),['classification_'+ (ano)          ],true)
     }
     return imagem
  }


  var ordem_exec_5y_abs= [3];
  var ordem_exec_4y_abs = [3];
  var ordem_exec_3y_abs = [3];

  for (var i_class=0;i_class<ordem_exec_5y_abs.length; i_class++){  
     var id_class = ordem_exec_5y_abs[i_class]; 
     filtered = window5years_abs(filtered, id_class)
  }
  for (var i_class=0;i_class<ordem_exec_4y_abs.length; i_class++){  
     var id_class = ordem_exec_4y_abs[i_class]; 
     filtered = window4years_abs(filtered, id_class)
  }
  for (var i_class=0;i_class<ordem_exec_3y_abs.length; i_class++){  
     var id_class = ordem_exec_3y_abs[i_class]; 
     filtered = window3years_abs(filtered, id_class)
  }

  //**************************************************************
  //**************************************************************
  //**************************************************************
  
  //print('filtered_inv',filtered_inv);

  Map.addLayer(filtered, vis, 'filtered',false);
  
  filtered = filtered.set('version', versionOut)
  
  Export.image.toAsset({
      'image': filtered,
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
