/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var pampa = 
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
  
var biomas = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas_IBGE_250mil')
var region = biomas.filterMetadata('Bioma','equals', 'Pampa')

var blank = ee.Image(0).mask(0);
var outline = blank.paint(region, 'AA0000', 2); 
var visPar = {'palette':'000000','opacity': 0.6};
Map.addLayer(outline, visPar, 'bimoa250mil', false);

var biomes = ee.Image('projects/mapbiomas-workspace/AUXILIAR/biomas-raster-41')
var biome = biomes.mask(biomes.eq(6))

var dirCol = 'projects/mapbiomas-workspace/public/collection6/mapbiomas_collection60_integration_v1';
var colecao_In = ee.Image(dirCol).updateMask(biome)

print(colecao_In)
var dirout = 'projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/'
var version_out = 'V01'

var freq_lim = 10, 
    anos = ['1985','1986','1987','1988','1989','1990','1991','1992','1993','1994'], 
    bandas_anos = ['classification_1985','classification_1986','classification_1987','classification_1988',
            'classification_1989','classification_1990','classification_1991',
            'classification_1992','classification_1993','classification_1994'], 
    sufix = '_85_94';
//var freq_lim = 10, 
//        anos = ['1995','1996','1997','1998','1999','2000','2001','2002','2003','2004'], 
//        bandas_anos = ['classification_1995','classification_1996','classification_1997','classification_1998',
//                'classification_1999','classification_2000','classification_2001','classification_2002',
//                'classification_2003','classification_2004'], 
//        sufix = '_95_04';
//var freq_lim = 16,
//            bandas_anos = ['classification_2005','classification_2006','classification_2007','classification_2008','classification_2009',
//                           'classification_2010','classification_2011','classification_2012','classification_2013','classification_2014',
//                           'classification_2015','classification_2016','classification_2017','classification_2018','classification_2019',
//                           'classification_2020'],
//            anos = ['2005','2006','2007','2008','2009',
//                           '2010','2011','2012','2013','2014',
//                           '2015','2016','2017','2018','2019',
//                           '2020'],               
//        sufix = '_05_20';



var year = 2017
var palettes = require('users/mapbiomas/modules:Palettes.js');
//vis coll 05
var vis = { 'bands':'classification_'+ String(year),'min': 0, 'max': 45,  'palette': palettes.get('classification5')};

Map.addLayer(colecao_In, vis, 'Classes ORIGINAIS', true);
print(colecao_In)


colecao_In = colecao_In.select(bandas_anos)

var colList = ee.List([])
//var col_remap_85 = colecao_In.select('classification_1985').remap(
//    [3, 9, 11, 12, 15, 19, 21, 23, 24, 25, 29, 30, 33, 39, 40, 41],
//    [3, 9, 11, 12, 21, 21, 21, 22, 22, 22, 29, 22, 33, 21, 21, 21])
//colList = colList.add(col_remap_85.int8())

for (var i_ano=0;i_ano<anos.length; i_ano++){
  var ano = anos[i_ano];

  var col_remap = colecao_In.select('classification_'+ano).remap(
        [3, 9, 11, 12, 15, 19, 21, 23, 24, 25, 29, 30, 33, 39, 40, 41],
        [3, 9, 11, 12, 21, 21, 21, 22, 22, 22, 29, 22, 33, 21, 21, 21])

  colList = colList.add(col_remap.int8())
};

var collection = ee.ImageCollection(colList)
print(collection)

var unique = function(arr) {
    var u = {},
        a = [];
    for (var i = 0, l = arr.length; i < l; ++i) {
        if (!u.hasOwnProperty(arr[i])) {
            a.push(arr[i]);
            u[arr[i]] = 1;
        }
    }
    return a;
};

var getFrenquencyMask = function(collection, classId) {
    var classIdInt = parseInt(classId, 10);
    var maskCollection = collection.map(function(image) {
        return image.eq(classIdInt);
    });
    var frequency = maskCollection.reduce(ee.Reducer.sum());
    var frequencyMask = frequency.gte(classFrequency[classId])
        .multiply(classIdInt)
        .toByte();
    frequencyMask = frequencyMask.mask(frequencyMask.eq(classIdInt));
    return frequencyMask.rename('frequency').set('class_id', classId);
};

var lista_image = ee.List([]);
var classFrequency = { "3": freq_lim, "9": freq_lim, "11": freq_lim, "12": freq_lim, 
                      "21": freq_lim, "22": freq_lim, "29": freq_lim, "33": freq_lim}

var frequencyMasks = Object.keys(classFrequency).map(function(classId) {
    return getFrenquencyMask(collection, classId);
});

frequencyMasks = ee.ImageCollection.fromImages(frequencyMasks);
var referenceMap = frequencyMasks.reduce(ee.Reducer.firstNonNull()).clip(pampa);
referenceMap = referenceMap.mask(referenceMap.neq(27)).rename("reference");

var vis = {
    'bands': ['reference'],
    'min': 0,
    'max': 34,
    'palette': palettes.get('classification2')
};

Map.addLayer(referenceMap, vis, 'Classes Persistentes', true);

Export.image.toAsset({
    "image": referenceMap.toInt8(),
    "description": 'Pampa_amostras_estaveis_85a20_col6' + sufix,
    "assetId": dirout + 'Pampa_amostras_estaveis_85a20_col6' + sufix,
    "scale": 30,
    "pyramidingPolicy": {
        '.default': 'mode'
    },
    "maxPixels": 1e13,
    "region": pampa
});  


var regioesCollection = ee.FeatureCollection("users/evelezmartin/shp/Regioes_Pampa_coll05");
var blank = ee.Image(0).mask(0);
var outline = blank.paint(regioesCollection, 'AA0000', 2); 
var visPar = {'palette':'000000','opacity': 0.6};
Map.addLayer(outline, visPar, 'Regiao', true);