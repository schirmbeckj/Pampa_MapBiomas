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
// COLLECTION 06 
// AUTHOR: Juliano Schirmbeck
// DATE: maio 2021

var dir = 'projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/'
var outname = 'Pampa_amostras_estaveis_85a20_col6_05_20_LabGeo'



var estaveis_col = ee.Image(dir + 'Pampa_amostras_estaveis_85a20_col6_05_20')

var estaveisLabGeo = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/Pampa_LabGeo_ss')

var palettes = require('users/mapbiomas/modules:Palettes.js');
//vis coll 05
var vis = {'min': 0, 'max': 45,  'palette': palettes.get('classification5')};

var estaveis_com_LabGeo = estaveis_col.add(estaveisLabGeo.unmask(ee.Image(0)))
                                  
estaveis_com_LabGeo = estaveis_com_LabGeo.remap([  0,   3,  11,  12,  21,  22,  29,  33,
                                                 100, 103, 111, 112, 121, 122, 129, 133,
                                                 200, 203, 211, 212, 221, 222, 229, 233], 
                                                [ 27,   3,  11,  27,  27,  22,  29,  33,
                                                  27,   3,  11,  12,  27,  22,  29,  33,
                                                  27,   3,  11,  27,  21,  22,  29,  33])

Map.addLayer(estaveis_com_LabGeo, vis, 'estaveis_com_LabGeo_preMask', true)
estaveis_com_LabGeo = estaveis_com_LabGeo.mask(estaveis_com_LabGeo.neq(27)).rename("reference")


Map.addLayer(estaveis_col, vis, 'Estaveis_col', false)    
Map.addLayer(estaveisLabGeo.remap([100,200],[12,21]), vis, 'estaveisLabGeo', false)  
Map.addLayer(estaveis_com_LabGeo, vis, 'estaveis_com_LabGeo', true)  
 
 
 
  Export.image.toAsset({
    "image": estaveis_com_LabGeo.toByte(),
    "description": outname,
    "assetId": dir + outname,
    "scale": 30,
    "pyramidingPolicy": {
        '.default': 'mode'
    },
    "maxPixels": 1e13,
    "region": limite_PAMPA
});    

