// MAPBIOMAS PAMPA
// COLLECTION 09
// AUTHOR: Juliano Schirmbeck
// UPDATE: May 2021


// ***************************************************************************************
// Define as variáveis referentes a versão da coleção ou dos filtros
var col = '9'
var versionIn = '10'
var bioma = "PAMPA"
var versionOut = versionIn + '_esp_pos_inci'
var versionIn = versionIn + '_umid'

// Define as regiões: [1,2,3,4,5,6,7]
var regioes = [1,2,3,4,5,6,7]

// ***************************************************************************************

for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
    var regiao = regioes[i_regiao];

  // 1985 é processado a parte
  var anos = ['1986','1987','1988','1989','1990',
            '1991','1992','1993','1994','1995','1996','1997','1998','1999','2000',
            '2001','2002','2003','2004','2005','2006','2007','2008','2009','2010',
            '2011','2012','2013','2014','2015','2016','2017','2018','2019','2020',
            '2021','2022','2023'];
            
            
  
  var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/col' + col + '/PAMPA/class_col_' + col + '_filtros/'
  var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col09_buff')
  var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);
  
  var imgGAP =  ee.Image(dir_filtros+ '0' + String(regiao) +'_RF_col' + col + '_v' + versionIn);
  
  var palettes = require('users/mapbiomas/modules:Palettes.js');
  var vis = { 'bands': ['classification_2002'], 'min': 0, 'max': 62,  'palette': palettes.get('classification8')};
  var vis2 = {'min': 0, 'max': 62,  'palette': palettes.get('classification8')};
  
  Map.addLayer(imgGAP, vis, 'imgGAP');
  
  var ano = '1985'
  //var mask_85 = imgGAP.select('connect_'+ano)
  var moda_85 = imgGAP.select('classification_'+ano).focal_mode(1, 'square', 'pixels')
  // Map.addLayer(moda_85, vis, 'moda_85_1');
  moda_85 = moda_85.mask(imgGAP.select('connect_'+ano).lte(6))
  // Map.addLayer(moda_85, vis, 'moda_85_2');
  var class_outTotal = imgGAP.select('classification_'+ano).blend(moda_85)
  
  
  // Map.addLayer(class_outTotal, vis, 'class4 MODA');
  
  for (var i_ano=0;i_ano<anos.length; i_ano++){  
    var ano = anos[i_ano]; 
    var moda = imgGAP.select('classification_'+ano).focal_mode(1, 'square', 'pixels')
    moda = moda.mask(imgGAP.select('connect_'+ano).lte(6))
    var class_out = imgGAP.select('classification_'+ano).blend(moda)
    class_outTotal = class_outTotal.addBands(class_out)
  }
  // print("class_outTotal", class_outTotal, "imgGAP", imgGAP)
  
  // Manter a classe 29 após o filtro espacial... teste que deu errado...
  // class_outTotal = class_outTotal.blend(imgGAP.select(ee.List.sequence(0,38,1)).eq(29).selfMask().multiply(29))
  // Map.addLayer(class_outTotal, vis, 'class4 MODA');
  // //print(class_outTotal)
  
  Export.image.toAsset({
      'image': class_outTotal,
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
