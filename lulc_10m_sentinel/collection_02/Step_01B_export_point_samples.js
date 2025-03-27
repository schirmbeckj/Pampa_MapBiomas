// MAPBIOMAS PAMPA
// COLLECTION 02
// AUTHOR: Juliano Schirmbeck
// UPDATED: Oct 2024
  
var bioma = "PAMPA";
var nSamples = 1000
var sufix = '_99_23' 

var dir = 'projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/'
          
var outname = 'samples_col9_PAMPA_sentinel' + sufix

var img_samples = ee.Image(dir + 'Pampa_amostras_estaveis_col9' + sufix).rename('reference')

var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')

var palettes = require('users/mapbiomas/modules:Palettes.js');
//vis coll 05
var vis = { 'bands': ['reference'], 'min': 0, 'max': 62,  'palette': palettes.get('classification8')};


Map.addLayer(img_samples, vis, 'Classes persistentes_'+sufix , true);

print(regioesCollection.size())

////////////////////////////////////////////////////////
var getTrainingSamples = function (feature) {
  var regiao = feature.get('ID');

  var clippedGrid = ee.Feature(feature).geometry()
  var referenceMap =  img_samples.clip(clippedGrid);
                      
  var training = referenceMap.stratifiedSample({scale:30, classBand: 'reference', numPoints: 0, region: feature.geometry(), seed: 1, geometries: true,
           classValues: [3,11,12,21,22,29,33], 
           classPoints: [nSamples,nSamples,nSamples,nSamples,nSamples,nSamples,nSamples]
  });

  training = training.map(function(feat) {return feat.set({'ID': regiao})});
  return training;
 };

//regioesCollection = regioesCollection.filterMetadata('ID','equals',3)
var mySamples = regioesCollection.map(getTrainingSamples).flatten();

// Adiciona as amostras estáveis no mapa com as respectivas cores
var dictClass = {
  3: "Floresta",
  11: "Area Úmida",
  12: "Campo",
  21: "Mosaico de Uso",
  22: "Área não vegetada",
  29: "Afloramento Rochoso",
  33: "Água",
}   

var listClass = mySamples.distinct(['reference']).reduceColumns(ee.Reducer.toList(), ['reference']).get('list') 
listClass.evaluate(function (item) {
  item.forEach(function (value) {
    var mySamp = mySamples.filter(ee.Filter.eq('reference', value))
    print('Samples ' + dictClass[value], mySamp.size())
    Map.addLayer(mySamp, { "color": palettes.get('classification5')[value] }, 'Samples ' + dictClass[value])
    print(dictClass[value],mySamp.filter(ee.Filter.eq('reference',value)).limit(1))
  })
}) 

// Map.addLayer(mySamples, {'color':'ff0000'},'Amostras')
// print(mySamples.size())

Export.table.toAsset(mySamples,
  outname,
  dir + outname)
  
