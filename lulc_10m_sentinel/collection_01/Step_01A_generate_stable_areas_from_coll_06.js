 
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


var year = 2017
var palettes = require('users/mapbiomas/modules:Palettes.js');
//vis coll 05
var vis = { 'bands':'classification_'+ String(year),'min': 0, 'max': 45,  'palette': palettes.get('classification5')};

Map.addLayer(colecao_In, vis, 'Classes ORIGINAIS', true);
print(colecao_In)

var colList = ee.List([])
var col_remap_85 = colecao_In.select('classification_1985').remap(
    [3, 9, 11, 12, 15, 19, 21, 23, 24, 25, 29, 30, 33, 39, 40, 41],
    [3, 9, 11, 12, 21, 21, 21, 22, 22, 22, 29, 22, 33, 21, 21, 21])
    

colList = colList.add(col_remap_85.int8())

var anos = ['1986','1987','1988','1989','1990','1991','1992','1993','1994',
            '1995','1996','1997','1998','1999','2000','2001','2002','2003','2004',
            '2005','2006','2007','2008','2009','2010','2011','2012','2013','2014',
            '2015','2016','2017','2018','2019','2020'];

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
var classFrequency = {"3": 36, "9": 36, "11": 36, "12": 36, "21": 36, "22": 36, "29": 36, "33": 36}

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
var erode_reference = referenceMap.eq( 3).selfMask().unmask().focalMin({radius:20,kernelType:'square'}).selfMask().multiply( 3)
               .blend(referenceMap.eq( 9).selfMask().unmask().focalMin({radius:20,kernelType:'square'}).selfMask().multiply( 9))
               .blend(referenceMap.eq(11).selfMask().unmask().focalMin({radius:20,kernelType:'square'}).selfMask().multiply(11))
               .blend(referenceMap.eq(12).selfMask().unmask().focalMin({radius:20,kernelType:'square'}).selfMask().multiply(12))
               .blend(referenceMap.eq(21).selfMask().unmask().focalMin({radius:20,kernelType:'square'}).selfMask().multiply(21))
               .blend(referenceMap.eq(22).selfMask().unmask().focalMin({radius:20,kernelType:'square'}).selfMask().multiply(22))
               .blend(referenceMap.eq(29).selfMask().unmask().focalMin({radius:20,kernelType:'square'}).selfMask().multiply(29))
               .blend(referenceMap.eq(33).selfMask().unmask().focalMin({radius:20,kernelType:'square'}).selfMask().multiply(33))

Map.addLayer(erode_reference, vis, 'Classes Erode Persistentes', true);


Export.image.toAsset({
    "image": referenceMap.toInt8(),
    "description": 'Pampa_amostras_estaveis_85a20_col6',
    "assetId": dirout + 'Pampa_amostras_estaveis_85a20_col6',
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