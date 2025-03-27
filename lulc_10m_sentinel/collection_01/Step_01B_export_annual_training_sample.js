//coleçao 07
var versao_out = 'SENTINEL2_v2'
var versao_pt = 'v1'
var dirout = 'projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/SAMPLES/SENTINEL/';

var bioma250mil = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas_IBGE_250mil')

var biomes = ee.Image('projects/mapbiomas-workspace/AUXILIAR/biomas-raster-41')
var bioma250mil_MA = biomes.mask(biomes.eq(6))
//Map.addLayer(bioma250mil_MA)

var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = {
    'min': 0,
    'max': 45,
    'palette': palettes.get('classification5')
};
var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')//.filterBounds(geometry)
//Map.addLayer(regioesCollection)


var col6 = ee.ImageCollection('projects/mapbiomas-workspace/COLECAO6/mapbiomas-collection60-integration-v0-9').min()

//var BandNames = ['set20_B','set20_G','set20_R','set20_N','out20_B','out20_G','out20_R','out20_N','nov20_B','nov20_G','nov20_R','nov20_N','dez20_B','dez20_G','dez20_R','dez20_N','jan21_B','jan21_G','jan21_R','jan21_N','fev21_B','fev21_G','fev21_R','fev21_N','mar21_B','mar21_G','mar21_R','mar21_N','abr21_B','abr21_G','abr21_R','abr21_N','mai21_B','mai21_G','mai21_R','mai21_N','jun21_B','jun21_G','jun21_R','jun21_N','longitude','latitude']
//Map.addLayer(bioma250mil_MA,{},"biome MA",false)

var ano = 2000
var bioma = "PAMPA";

var pts = ee.FeatureCollection('projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/samples_col7_PAMPA_sentinel_erode_05_20_v03')
//var pts = ee.FeatureCollection('projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/samples_col7_PAMPA_com_LabGeo')
//Map.addLayer(pts, {}, 'pt', false)
//print('pts',pts.limit(100))
//var asset = 'projects/nexgenmap/MapBiomas2/SENTINEL/mosaics';
var asset = 'projects/nexgenmap/MapBiomas2/SENTINEL/mosaics-3';

var collection = ee.ImageCollection(asset)
    .filterMetadata('year', 'equals', 2020)
    .filterMetadata('version', 'equals', '3')
    .filterMetadata('biome','equals','PAMPA');

//print(collection)

var mosaicoTotal = collection.mosaic()

Map.addLayer(mosaicoTotal, {'bands': ['swir1_median', 'nir_median', 'red_median'],
    'gain': [0.08, 0.07, 0.2],'gamma': 0.85}, 'Sentinel 2', false);

var ll = ee.Image.pixelLonLat()//.mask(bioma250mil_MA);

var long = ll.select('longitude').add(34.8).multiply(-1).multiply(1000).toInt16()
var lati = ll.select('latitude').add(5).multiply(-1).multiply(1000).toInt16()

mosaicoTotal = mosaicoTotal.addBands(long.rename('longitude'))
mosaicoTotal = mosaicoTotal.addBands(lati.rename('latitude' ))

print(mosaicoTotal)

var anos = [
            // 1985,1986,1987,1988,1989,
            // 1990,1991,1992,1993,1994,
            // 1995,1996,1997,1998,1999,
            // 2000,2001,2002,2003,2004,
            // 2005,2006,2007,2008,2009,
            //2010,2011,2012,2013,2014,
            // 2015,
            2016,2017,2018,2019,
            2020,2021,2022
            ];
    var ndvi_color = '0f330f, 005000, 4B9300, 92df42, bff0bf, FFFFFF, eee4c7, ecb168, f90000'
    var visParNDFI_amp = {'min':0, 'max':300, 'palette':ndvi_color};


for (var i_ano=0;i_ano<anos.length; i_ano++){
  var ano = anos[i_ano];
  var collection = ee.ImageCollection(asset)
    .filterMetadata('year', 'equals', ano)
    .filterMetadata('version', 'equals', '1')
    .filterMetadata('biome','equals','PAMPA');
  var long = ll.select('longitude').add(34.8).multiply(-1).multiply(1000).toInt16()
  var lati = ll.select('latitude').add(5).multiply(-1).multiply(1000).toInt16()
  
  mosaicoTotal = mosaicoTotal.addBands(long.rename('longitude'))
  mosaicoTotal = mosaicoTotal.addBands(lati.rename('latitude' ))
  var regioes_lista = [1,2,3,4,5,6,7]
  
  for (var i_regiao=0;i_regiao<regioes_lista.length; i_regiao++){
    var regiao = regioes_lista[i_regiao];
    var limite = regioesCollection.filterMetadata('ID', "equals", regiao);
   // print(limite)
    

//    mosaicoTotal = mosaicoTotal.select(bandNames)
//    Map.addLayer(mosaicoTotal, {bands: ['swir1_median', 'nir_median', 'red_median'],gain: [0.08, 0.06, 0.2],gamma: 0.85}, 'mosaico', false)
    
    var pts_reg = pts.filterMetadata('ID', 'equals', regiao)
//    print(pts_reg.size())
    
    var training = mosaicoTotal.sampleRegions({
        'collection': pts_reg,
        'scale': 4,
        'tileScale': 4,
        'geometries': true
    });
      
    if (i_regiao == 0){ var training_reg = training }  
    else {training_reg = training_reg.merge(training); }
  }    
print(training_reg.limit(1))

//Map.addLayer(training)
// print(training_reg.size())

Export.table.toAsset(training_reg, 'pontos_train_'+versao_out+'_'+ano, dirout + 'pontos_train_'+versao_out+'_'+ano);  

  
}
