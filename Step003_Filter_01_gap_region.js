// MAPBIOMAS PAMPA
// COLLECTION 09
// AUTHOR: Juliano Schirmbeck
// UPDATE: May 2024

// Apply correction to no data values
// Calcula a camada de mesma classe conectados para uso em filtros de correção espacial


// ***************************************************************************************
// Define as variáveis de entrada e saída referentes a versão da coleção ou dos filtros
var col = '9'
var versionIn = '12'
var bioma = "PAMPA"
var versionOut = versionIn + '_gap'
// var versionOut = '07' + '_gap'

//Define as regiões: [1,2,3,4,5,6,7]
var regioes = [3]

// ***************************************************************************************


for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
    var regiao = regioes[i_regiao];
  
  var anos = ['1985','1986','1987','1988','1989','1990',
              '1991','1992','1993','1994','1995','1996','1997','1998','1999','2000',
              '2001','2002','2003','2004','2005','2006','2007','2008','2009','2010',
              '2011','2012','2013','2014','2015','2016','2017','2018','2019','2020',
              '2021','2022','2023'];
  
  
  var dircol_in = 'projects/mapbiomas-workspace/AMOSTRAS/col' + col + '/PAMPA/class_col_' + col + '/'
  var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/col' + col + '/PAMPA/class_col_' + col + '_filtros/'
  
  var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col09_buff')
  var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);
  
  var image = ee.Image(dircol_in +  '0' + String(regiao) +'_RF_col'+ col +'_v' + versionIn);
  image = image.mask(image.neq(0))
  print(image)
  //sempre usa um ano a menos, o primeiro
  var bandNames = ee.List([
    'classification_1986','classification_1987',
    'classification_1988','classification_1989',
    'classification_1990','classification_1991',
    'classification_1992','classification_1993',
    'classification_1994','classification_1995',
    'classification_1996','classification_1997',
    'classification_1998','classification_1999',
    'classification_2000','classification_2001',
    'classification_2002','classification_2003',
    'classification_2004','classification_2005',
    'classification_2006','classification_2007',
    'classification_2008','classification_2009',
    'classification_2010','classification_2011',
    'classification_2012','classification_2013',
    'classification_2014','classification_2015',
    'classification_2016','classification_2017',
    'classification_2018','classification_2019',
    'classification_2020','classification_2021',
    'classification_2022','classification_2023'
  ]);
  
  var filtered = bandNames.iterate(
    function (bandName, previousImage) {
      var currentImage = image.select(ee.String(bandName));
      previousImage = ee.Image(previousImage);
      currentImage = currentImage.unmask(previousImage.select([0]));
      return currentImage.addBands(previousImage);
    },
    ee.Image(image.select(['classification_1985']))
  );
  filtered = ee.Image(filtered);
  
  var bandNames = ee.List([
    'classification_1985','classification_1986',
    'classification_1987','classification_1988',
    'classification_1989','classification_1990',
    'classification_1991','classification_1992',
    'classification_1993','classification_1994',
    'classification_1995','classification_1996',
    'classification_1997','classification_1998',
    'classification_1999','classification_2000',
    'classification_2001','classification_2002',
    'classification_2003','classification_2004',
    'classification_2005','classification_2006',
    'classification_2007','classification_2008',
    'classification_2009','classification_2010',
    'classification_2011','classification_2012',
    'classification_2013','classification_2014',
    'classification_2015','classification_2016',
    'classification_2017','classification_2018',
    'classification_2019','classification_2020',
    'classification_2021','classification_2022'
  ]);
  
  var filtered2 = bandNames.iterate(
    function (bandName, previousImage) {
      var currentImage = filtered.select(ee.String(bandName));
      previousImage = ee.Image(previousImage);
      currentImage = currentImage.unmask(previousImage.select(previousImage.bandNames().length().subtract(1)));
      return previousImage.addBands(currentImage);
    }, 
    ee.Image(filtered.select(["classification_2023"]))
  );
  filtered2 = ee.Image(filtered2)
  
  var palettes = require('users/mapbiomas/modules:Palettes.js');
  var vis = { 'bands': ['classification_2017'], 'min': 0, 'max': 62,  'palette': palettes.get('classification8')};
  
  Map.addLayer(filtered2, vis, 'filtered');
  
  filtered2 = filtered2.set('vesion', versionIn);
  
  for (var i_ano=0;i_ano<anos.length; i_ano++){  
    var ano = anos[i_ano]; 
    filtered2 = filtered2.addBands(filtered2.select('classification_'+ano).connectedPixelCount(100,false).rename('connect_'+ano))
  }
  
  print(filtered2)
  
  Export.image.toAsset({
    'image': filtered2,
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

var blank = ee.Image(0).mask(0);
var outline = blank.paint(limite, 'AA0000', 2); 
var visPar = {'palette':'000000','opacity': 0.6};
Map.addLayer(outline, visPar, 'regioes', false);

 

