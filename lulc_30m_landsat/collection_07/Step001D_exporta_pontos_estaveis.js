/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var limite_PAMPA = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-58.002325738520554, -30.3690718412503],
          [-56.72007815870479, -30.499295222564232],
          [-56.16245902390205, -31.200415614034142],
          [-55.15701247951905, -31.52056495976992],
          [-53.76394503847297, -32.62416660786271],
          [-53.58289929760831, -34.03358717080886],
          [-52.591745055671666, -33.39158320323276],
          [-51.9671866879957, -32.37302487360386],
          [-50.559119353770484, -31.32147088991393],
          [-49.71259257697394, -29.72257756616197],
          [-51.70483040130221, -29.481090891765277],
          [-53.1059501744738, -29.453420604840932],
          [-52.73163486370493, -28.69257522584727],
          [-51.92477114990625, -28.237323479340276],
          [-52.395449754990395, -27.385623119662082],
          [-53.09345232874166, -27.29073889388881],
          [-53.8796175313376, -27.426126162000646],
          [-55.18794051531749, -27.65496334385179],
          [-56.463382710195006, -28.589060140835674]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// MAPBIOMAS PAMPA
// COLLECTION 05 
// AUTHOR: Juliano Schirmbeck
// DATE: August 2020
 
var bioma = "PAMPA";
var nSamples = 2000
var sufix = '_05_20_LabGeo'
//var sufix = '_85_94'
//var sufix = '_95_04' 

var dir = 'projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/'
var outname = 'samples_col7_PAMPA' + sufix

var img_samples = ee.Image(dir + 'Pampa_amostras_estaveis_85a20_col6' + sufix).rename('reference')

var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')

var palettes = require('users/mapbiomas/modules:Palettes.js');
//vis coll 05
var vis = { 'bands': ['reference'], 'min': 0, 'max': 45,  'palette': palettes.get('classification5')};


Map.addLayer(img_samples, vis, 'Classes persistentes 85 a 19', true);

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
  
