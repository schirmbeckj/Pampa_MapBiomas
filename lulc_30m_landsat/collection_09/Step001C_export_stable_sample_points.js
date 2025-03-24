// MAPBIOMAS PAMPA
// COLLECTION 05 
// AUTHOR: Juliano Schirmbeck
// DATE: August 2020

var out_collection = 9 
 
var bioma = "PAMPA";
var nSamples = 2000
var sufix = '_13_22_com_LabGeo'
var sufix = '_99_12_com_LabGeo'
var sufix = '_85_98' 

var dir = 'projects/mapbiomas-workspace/AMOSTRAS/col' + out_collection + '/PAMPA/'
var outname = 'samples_col' + out_collection + '_PAMPA' + sufix

var img_samples = ee.Image(dir + 'Pampa_amostras_estaveis_to_col' + out_collection + sufix).rename('reference')

var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')

var palettes = require('users/mapbiomas/modules:Palettes.js');
//vis coll 05
var vis = { 'bands': ['reference'], 'min': 0, 'max': 45,  'palette': palettes.get('classification5')};


Map.addLayer(img_samples, vis, 'Classes persistentes', true);

print(regioesCollection.size())

////////////////////////////////////////////////////////
var getTrainingSamples = function (feature) {
  var regiao = feature.get('ID');

  var clippedGrid = ee.Feature(feature).geometry()
  var referenceMap =  img_samples.clip(clippedGrid);
                      
  var training = referenceMap.stratifiedSample({scale:30, classBand: 'reference', numPoints: 0, region: feature.geometry(), seed: 1, geometries: true,
           classValues: [3,9,11,12,21,22,29,33], 
           classPoints: [nSamples,nSamples,nSamples,nSamples,nSamples,nSamples,nSamples,nSamples]
  });

  training = training.map(function(feat) {return feat.set({'ID': regiao})});
  return training;
 };

//regioesCollection = regioesCollection.filterMetadata('ID','equals',3)
var mySamples = regioesCollection.map(getTrainingSamples).flatten();

Map.addLayer(mySamples, {'color':'ff0000'},'Amostras')

print(mySamples.size())

Export.table.toAsset(mySamples,
  outname,
  dir + outname)
  
