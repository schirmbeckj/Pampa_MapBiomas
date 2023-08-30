// MAPBIOMAS PAMPA
// AUTHOR: Juliano Schirmbeck
// DATE: maio 2023

var out_collection = 8

var dir = 'projects/mapbiomas-workspace/AMOSTRAS/col' + out_collection + '/PAMPA/'
var outname = 'Pampa_amostras_estaveis_to_col' + out_collection + '_LabGeo'

var estaveis_col = ee.Image(dir + 'Pampa_amostras_estaveis_to_col8_05_21')

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

