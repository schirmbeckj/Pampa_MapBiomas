// MAPBIOMAS PAMPA
// COLLECTION 02
// AUTHOR: Juliano Schirmbeck
// UPDATED: Oct 2024
//
// Filtro aplica a correção de nodata
// calcula a camada de mesma classe conectados para uso em filtros de correção espacial
//
 
var regions = [1,2,3,4,5,6,7]

regions.forEach(function(regiao){
  
  var versionIn = '06'
  var bioma = "PAMPA"
  var versionOut = versionIn + '_gap'
  
  
  var anos = ['2016','2017','2018','2019','2020','2021','2022','2023'];
  
  
  var dircol_in = 'projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/class_s2_col_01/'
                   
  var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/class_s2_col_01_filtros/'
  
  var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
  var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);
  
  var image = ee.Image(dircol_in +  '0' + String(regiao) +'_RF16a23_v' + versionIn);
  image = image.mask(image.neq(0))
  print('image',image)
  //sempre usa um ano a menos, o primeiro
  var bandNames = ee.List([
      'classification_2017',
      'classification_2018','classification_2019',
      'classification_2020','classification_2021',
      'classification_2022','classification_2023'
  ]);
  
  var filtered = bandNames.iterate(function (bandName, previousImage) {
  	var currentImage = image.select(ee.String(bandName));
  	previousImage = ee.Image(previousImage);
  	currentImage = currentImage.unmask(previousImage.select([0]));
  	return currentImage.addBands(previousImage);
  }, ee.Image(image.select(['classification_2016'])));
  
  filtered = ee.Image(filtered);
  
  var bandNames = ee.List([
      'classification_2016',
      'classification_2017','classification_2018',
      'classification_2019','classification_2020'
      ,'classification_2021','classification_2022'
  ]);
  
  var filtered2 = bandNames.iterate(function (bandName, previousImage) {
  	var currentImage = filtered.select(ee.String(bandName));
  	previousImage = ee.Image(previousImage);
  	currentImage = currentImage.unmask(previousImage.select(previousImage.bandNames().length().subtract(1)));
  	return previousImage.addBands(currentImage);
  }, ee.Image(filtered.select(["classification_2023"])));
  
  
  filtered2 = ee.Image(filtered2)
  
  print('filtered2',filtered2)
  
  var palettes = require('users/mapbiomas/modules:Palettes.js');
  
  
  var vis = { 'bands': ['classification_2017'], 'min': 0, 'max': 45,  'palette': palettes.get('classification5')};
  Map.addLayer(image, vis, 'image');
  Map.addLayer(filtered2, vis, 'filtered');
  
  filtered2 = filtered2.set('vesion', versionIn);
  
  for (var i_ano=0;i_ano<anos.length; i_ano++){  
    var ano = anos[i_ano]; 
    filtered2 = filtered2.addBands(filtered2.select('classification_'+ano).connectedPixelCount(100,false).rename('connect_'+ano))
  }
  
  print('filtered2',filtered2)
  
  Export.image.toAsset({
      'image': filtered2,
      'description': '0' + String(regiao) +'_RF16a23_v' + versionOut,
      'assetId': dir_filtros +  '0'+ String(regiao) +'_RF16a23_v'  + versionOut,
      'pyramidingPolicy': {
          '.default': 'mode'
      },
      'region': limite.geometry().bounds(),
      'scale': 10,
      'maxPixels': 1e13
  });
  
  
  var blank = ee.Image(0).mask(0);
  var outline = blank.paint(limite, 'AA0000', 2); 
  var visPar = {'palette':'000000','opacity': 0.6};
  Map.addLayer(outline, visPar, 'regioes', false);

})


