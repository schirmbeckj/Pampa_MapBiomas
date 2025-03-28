/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.MultiPoint();
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// MAPBIOMAS PAMPA
// COLLECTION 05 
// AUTHOR: Juliano Schirmbeck
// DATE: August 2020
//prepara_incidentes_3_e_21
//prepara_incidentes_multiclasses


var version = '033'
var col = '7'

var bioma = "PAMPA"

var versionOut = version +  '_inci'

var versionIn = version + '_freq'
var versionIncidentes = version +  '_pre_incidentes'

var anos3 = [                                   '1986','1987','1988','1989','1990',
             '1991','1992','1993','1994','1995','1996','1997','1998','1999','2000',
             '2001','2002','2003','2004','2005','2006','2007','2008','2009','2010',
             '2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021'];       
             
var anos = [                            '1985','1986','1987','1988','1989','1990',
            '1991','1992','1993','1994','1995','1996','1997','1998','1999','2000',
            '2001','2002','2003','2004','2005','2006','2007','2008','2009','2010',
            '2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021'];

var dircol_in = 'projects/mapbiomas-workspace/AMOSTRAS/col' + col + '/PAMPA/class_col' + col + '/'
var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/col' + col + '/PAMPA/class_col' + col + '_filtros/'
var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')

var palette_incidence = ["#C8C8C8","#FED266","#FBA713","#cb701b", "#cb701b", "#a95512", "#a95512", "#662000",  "#662000", "#cb181d"]
var palettes = require('users/mapbiomas/modules:Palettes.js');
var pal = palettes.get('classification2');
var vis = {
      bands: 'classification_2018',
      min:0,
      max:34,
      palette: pal,
      format: 'png' 
    };
var vis2 = {
      min:0,
      max:34,
      palette: pal,
      format: 'png'
    };

var regioes = [1,2,3,4,5,6,7]

for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
    var regiao = regioes[i_regiao];

  var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);
  
  var image_in =  ee.Image(dir_filtros+ '0' + String(regiao) +'_RF85a21_v' + versionIn);
  var image_incidence_outros = ee.Image(dir_filtros+ '0' + String(regiao) +'_RF85a21_v' +  versionIncidentes);
  var image_pre_gap = ee.Image(dir_filtros +  '0' + String(regiao) +'_RF85a21_v' + versionIn);
  
  
  Map.addLayer(image_in, vis, 'image_in');
  Map.addLayer(image_pre_gap,vis,'MapBio pre GAP')
  
  
  var image_in_corrigida = image_in
  
  // a) mascara e corrige bordas instaveis para todas as classes
  var maskIncid_borda2 = image_incidence_outros.select('connect').lte(6)
                .and(image_incidence_outros.select('incidence').gt(6))
  //              .and((image_incidence_outros.select('mode').eq(3)).or(image_incidence_outros.select('mode').eq(21)))
  maskIncid_borda2 = maskIncid_borda2.mask(maskIncid_borda2.eq(1))              
  var corrige_borda2 = image_incidence_outros.select('classification_mode').mask(maskIncid_borda2)
  Map.addLayer(image_incidence_outros, {}, 'image_incidence_outros', false);
  Map.addLayer(corrige_borda2, vis2, 'corrige_borda2', false);
  print('image_incidence_outros',image_incidence_outros)
  
  var windowCorrecao = function(imagem, correcao, ano_alterar){
     var img_out = imagem.select('classification_1985')
     for (var i_ano=0;i_ano<anos3.length; i_ano++){  
       var ano = anos3[i_ano];
       if (ano < ano_alterar) {
         img_out = img_out.addBands(imagem.select('classification_'+ano))
       } else {
         img_out = img_out.addBands(imagem.select('classification_'+ano).blend(correcao))
       }
     }
     return img_out
  }
  
  var class_out = 21
  image_in_corrigida = image_in_corrigida.blend(corrige_borda2) //a
  
  Map.addLayer(image_in_corrigida, vis, 'image_in corrigida');
      
  for (var i_ano=0;i_ano<anos.length; i_ano++){  
    var ano = anos[i_ano]; 
    image_in_corrigida = image_in_corrigida.addBands(image_in_corrigida.select('classification_'+ano).connectedPixelCount(100,false).rename('connect_'+ano))
  }
  image_in_corrigida=image_in_corrigida.toByte()
  
  //print(image_in_corrigida)
  
  Export.image.toAsset({
      'image': image_in_corrigida,
      'description': '0' + String(regiao) + '_RF85a21_v' + versionOut,
      'assetId': dir_filtros + '0' + String(regiao) + '_RF85a21_v' + versionOut,
      'pyramidingPolicy': {
          '.default': 'mode'
      },
      'region': limite.geometry().bounds(),
      'scale': 30,
      'maxPixels': 1e13
  });

}