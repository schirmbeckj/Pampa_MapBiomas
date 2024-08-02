// MAPBIOMAS PAMPA
// COLLECTION 09
// AUTHOR: Juliano Schirmbeck 
// UPDATE: May 2020

// ***************************************************************************************
// Define as variáveis referentes a versão da coleção ou dos filtros
var version = '12'
var col = '9'
var versionOut = version + '_pre_incidentes'
var versionIn = version + '_gap'

// Define as regiões: [1,2,3,4,5,6,7]
var regioes = [1,2,3,4,5,6,7]

// ***************************************************************************************


var anos = [                            '1985','1986','1987','1988','1989','1990',
            '1991','1992','1993','1994','1995','1996','1997','1998','1999','2000',
            '2001','2002','2003','2004','2005','2006','2007','2008','2009','2010',
            '2011','2012','2013','2014','2015','2016','2017','2018','2019','2020',
            '2021','2022','2023'];

var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/col' + col + '/PAMPA/class_col_' + col + '_filtros/'
var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col09_buff')

var palettes = require('users/mapbiomas/modules:Palettes.js');

var vis = {
    'min': 0,
    'max': 62,
    'palette': palettes.get('classification8')
};
var visParMedian = {'bands':['median_swir1','median_nir','median_red'], 'gain':[0.08, 0.06,0.2],'gamma':0.5 };

//editar os parametros
var classeIds =    [3,11,12,21,22,29,33]
var newClasseIds = [3,11,12,21,22,29,33]


for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
    var regiao = regioes[i_regiao];
  
  
  var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);
  
  var image_in =  ee.Image(dir_filtros+ '0' + String(regiao) +'_RF_col'+col+'_v' + versionIn);
  

  
  
  var colList = ee.List([])
  for (var i_ano=0;i_ano<anos.length; i_ano++){
    var ano = anos[i_ano];
    var colList = colList.add(image_in.select(['classification_'+ano],['classification']))
  }
  var imc_carta = ee.ImageCollection(colList)
  //print('imc_carta',imc_carta)
  var img1 =  ee.Image(imc_carta.first());
  
  var imc_carta4 = imc_carta.map(function(image) {
      image = image.remap(classeIds, newClasseIds, 21)
      image = image.mask(image.neq(27));
      return image.rename('classification');
  });
  
  var image_moda = imc_carta4.reduce(ee.Reducer.mode());
  var image_incidence = imc_carta.reduce(ee.Reducer.countRuns()).subtract(1).rename('incidence');
  var states = imc_carta.reduce(ee.Reducer.countDistinctNonNull());
  
  
  // ******* incidence **********
  
  var vis2 = {
      'bands': '1987',
      'min': 0,
      'max': 62,
      'palette': palettes.get('classification8')
  };
  
  var palette_incidence = ["#C8C8C8","#FED266","#FBA713","#cb701b", "#cb701b", "#a95512", "#a95512", "#662000",  "#662000", "#cb181d"]
  image_in = image_in.select(['classification_1985', 'classification_1986', 'classification_1987', 'classification_1988', 'classification_1989', 
                                  'classification_1990', 'classification_1991', 'classification_1992', 'classification_1993', 'classification_1994', 
                                  'classification_1995', 'classification_1996', 'classification_1997', 'classification_1998', 'classification_1999',
                                  'classification_2000', 'classification_2001', 'classification_2002', 'classification_2003', 'classification_2004', 
                                  'classification_2005', 'classification_2006', 'classification_2007', 'classification_2008', 'classification_2009', 
                                  'classification_2010', 'classification_2011', 'classification_2012', 'classification_2013', 'classification_2014',
                                  'classification_2015', 'classification_2016', 'classification_2017', 'classification_2018', 'classification_2019',
                                  'classification_2020','classification_2021','classification_2022','classification_2023'],
                                 ['1985', '1986', '1987','1988', '1989', '1990','1991', '1992', '1993','1994', '1995', '1996','1997', '1998', '1999',
                                  '2000', '2001', '2002','2003', '2004', '2005','2006', '2007', '2008','2009', '2010', '2011','2012', '2013', '2014',
                                  '2015', '2016', '2017', '2018','2019','2020','2021','2022','2023'])
  Map.addLayer(image_in, vis2, 'MapBiomas');
  
  Map.addLayer(image_incidence, {}, "incidents original");
  
  image_incidence = image_incidence.addBands(image_incidence.mask(image_incidence.gt(6)).where(image_incidence.gt(6),1).rename('valor1'))
  image_incidence = image_incidence.addBands(image_incidence.select('valor1').connectedPixelCount(100,false).rename('connect'))
  image_incidence = image_incidence.addBands(image_moda)
  image_incidence = image_incidence.addBands(states.rename('states'))
  
  print('image_incidence',image_incidence)
  Map.addLayer(image_incidence, {}, "incidents final");
  Map.addLayer(image_incidence.select('classification_mode'),vis,'moda' + regiao)
  
  
  Export.image.toAsset({
      'image': image_incidence,
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
//prepara_incidente_outros
