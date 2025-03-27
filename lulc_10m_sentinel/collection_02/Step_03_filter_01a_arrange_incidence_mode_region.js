// MAPBIOMAS PAMPA
// COLLECTION 02
// AUTHOR: Juliano Schirmbeck
// UPDATED: Oct 2024
  
var version = '06'
//var col = '6'

var versionOut = version + '_pre_incidentes'
var versionIn = version + '_gap'

var regioes = [1,2,3,4,5,6,7]
for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
    var regiao = regioes[i_regiao];
    
  var anos = ['2016','2017','2018','2019','2020','2021','2022','2023'];
  
  var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/class_s2_col_01_filtros/'
  var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
  var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);
  
  var image_in =  ee.Image(dir_filtros+ '0' + String(regiao) +'_RF16a23_v' + versionIn);
  
  var palettes = require('users/mapbiomas/modules:Palettes.js');
  
  var vis = {
      'min': 0,
      'max': 34,
      'palette': palettes.get('classification2')
  };
  var visParMedian = {'bands':['median_swir1','median_nir','median_red'], 'gain':[0.08, 0.06,0.2],'gamma':0.5 };
  
  //editar os parametros
  var classeIds =    [3,11,12,21,22,29,33]
  var newClasseIds = [3,11,12,21,22,29,33]
  
  var colList = ee.List([])
  for (var i_ano=0;i_ano<anos.length; i_ano++){
    var ano = anos[i_ano];
    var colList = colList.add(image_in.select(['classification_'+ano],['classification']))
  }
  var imc_carta = ee.ImageCollection(colList)
  //print('imc_carta',imc_carta)
  var img1 =  ee.Image(imc_carta.first());
  
  var image_moda = imc_carta.reduce(ee.Reducer.mode());
  
  // ******* incidence **********
  var imagefirst = img1.addBands(ee.Image(0)).rename(["classification", "incidence"]);
  
  var incidence = function(imgActual, imgPrevious){
    
    imgActual = ee.Image(imgActual);
    imgPrevious = ee.Image(imgPrevious);
    
    var imgincidence = imgPrevious.select(["incidence"]);
    
    var classification0 = imgPrevious.select(["classification"]);
    var classification1 = imgActual.select(["classification"]);
    
    
    var change  = ee.Image(0);
    change = change.where(classification0.neq(classification1), 1);
    imgincidence = imgincidence.where(change.eq(1), imgincidence.add(1));
    
    return imgActual.addBands(imgincidence);
    
  };
  
  var imc_carta4 = imc_carta.map(function(image) {
      image = image.remap(classeIds, newClasseIds, 21)
      image = image.mask(image.neq(27));
      return image.rename('classification');
  });
  
  Map.addLayer(imc_carta4, vis, 'imc_carta4');
  
  var image_incidence = ee.Image(imc_carta4.iterate(incidence, imagefirst)).select(["incidence"]);
  //image_incidence = image_incidence.clip(geometry);
  
  var vis2 = {
      'bands': '2018',
      'min': 0,
      'max': 34,
      'palette': palettes.get('classification2')
  };
  
  var palette_incidence = ["#C8C8C8","#FED266","#FBA713","#cb701b", "#cb701b", "#a95512", "#a95512", "#662000",  "#662000", "#cb181d"]
  image_in = image_in.select(['classification_2016', 'classification_2017', 'classification_2018', 'classification_2019',
                                  'classification_2020',
                                  'classification_2021',
                                  'classification_2022',
                                  'classification_2023'],
                                 [ '2016', '2017', '2018','2019','2020','2021','2022','2023'])
  Map.addLayer(image_in, vis2, 'MapBiomas');
  
  Map.addLayer(image_incidence, {}, "incidents original");
  
  //image_incidence = image_incidence.mask(image_incidence.gt(0))
  
  Map.addLayer(image_incidence, {}, "incidents modificado");
  image_incidence = image_incidence.addBands(image_incidence.mask(image_incidence.gt(3)).where(image_incidence.gt(3),1).rename('valor1'))
  image_incidence = image_incidence.addBands(image_incidence.select('valor1').connectedPixelCount(100,false).rename('connect'))
  image_incidence = image_incidence.addBands(image_moda)
  print(image_incidence)
  Map.addLayer(image_incidence, {}, "incidents final");
  Map.addLayer(image_incidence.select('valor1'))
  
  
  Export.image.toAsset({
      'image': image_incidence,
      'description': '0' + String(regiao) + '_RF16a23_v' + versionOut,
      'assetId': dir_filtros + '0' + String(regiao) + '_RF16a23_v' + versionOut,
      'pyramidingPolicy': {
          '.default': 'mode'
      },
      'region': limite.geometry().bounds(),
      'scale': 10,
      'maxPixels': 1e13
  });
}
