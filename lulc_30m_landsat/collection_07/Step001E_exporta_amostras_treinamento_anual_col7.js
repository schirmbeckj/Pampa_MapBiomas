/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-54.453937581812845, -30.058022363732242],
          [-54.453937581812845, -32.16478393689188],
          [-52.256671956812845, -32.16478393689188],
          [-52.256671956812845, -30.058022363732242]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// MAPBIOMAS PAMPA
// COLLECTION 06
// AUTHOR: Juliano Schirmbeck
// DATE: maio 2021

var version = '2' // versão dos mosaicos
var version_amostras = 'v06'

var sufix = '_85_94', anos = [1990]//[1985,1986,1987,1988,1989, 1990,1991,1992,1993,1994];
var sufix = '_95_04', anos = [2000]//[1995,1996,1997,1998,1999, 2000,2001,2002,2003,2004];
var sufix = '_05_20_LabGeo' , anos = [2010,2017,2020]//[2005,2006,2007,2008,2009, 2010,2011,2012,2013,2014, 2015,2016,2017,2018,2019, 2020,2021 ];

//var sufix = '_85_20_LabGeo' , 

//anos = [1985,1986,1987,1988,1989, 1990,1991,1992,1993,1994,1995,1996,1997,1998,1999, 2000,
//                                      2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014, 2015,2016,2017,2018,2019, 2020,2021 ];
//anos = [1990,2000,2010,2017,2020]

var dirout = 'projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/SAMPLES/' + version_amostras+'/';
//local dos mosaicos
var dirasset =  'projects/nexgenmap/MapBiomas2/LANDSAT/BRAZIL/mosaics-2-pampa';  

//pontos de entrada, extraidos do mapa de estáveis
//var pts = ee.FeatureCollection('projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/samples_col7_PAMPA' + sufix)
var pts = ee.FeatureCollection('projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/samples_col7_PAMPA_com_LabGeo')
//Map.addLayer(pts, {}, 'pontos', false)
print('pontos',pts.first())
//var pts_reg = pts.filterMetadata('ID', 'equals', 1)
//print('pontos regiao',pts_reg)

var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
var bioma = "PAMPA";

var biomes = ee.Image('projects/mapbiomas-workspace/AUXILIAR/biomas-raster-41')
var bioma250mil_PA = biomes.mask(biomes.eq(6))
var palettes = require('users/mapbiomas/modules:Palettes.js');

Map.addLayer(bioma250mil_PA,{},"biome PAMPA",false)

{var bandNames = ee.List([
'evi2_amp',
'gv_amp',
'ndfi_amp',
'ndvi_amp',
'ndwi_amp',
'soil_amp',
'wefi_amp',
'blue_median',
'blue_median_dry',
'blue_median_wet',
'cai_median',
'cai_median_dry',
'cloud_median',
'evi2_median',
'evi2_median_dry',
'evi2_median_wet',
'gcvi_median',
'gcvi_median_dry',
'gcvi_median_wet',
'green_median',
'green_median_dry',
'green_median_wet',
'green_median_texture',
'gv_median',
'gvs_median',
'gvs_median_dry',
'gvs_median_wet',
'hallcover_median',
'latitude', //calculada no script
'longitude', //calculada no script
'ndfi_median',
'ndfi_median_dry',
'ndfi_median_wet',
'ndvi_median',
'ndvi_median_dry',
'ndvi_median_wet',
'ndvi_amp_3y', //calculada no script
'ndwi_median',
'ndwi_median_dry',
'ndwi_median_wet',
'nir_median',
'nir_median_dry',
'nir_median_wet',
'npv_median',
'pri_median',
'pri_median_dry',
'pri_median_wet',
'red_median',
'red_median_dry',
'red_median_wet',
'savi_median',
'savi_median_dry',
'savi_median_wet',
'sefi_median',
'sefi_median_dry',
'shade_median',
'soil_median',
'swir1_median',
'swir1_median_dry',
'swir1_median_wet',
'swir2_median',
'swir2_median_dry',
'swir2_median_wet',
'wefi_median',
'wefi_median_wet',
'blue_min',
'green_min',
'nir_min',
'red_min',
'swir1_min',
'swir2_min',
'blue_stdDev',
'cai_stdDev',
'cloud_stdDev',
'evi2_stdDev',
'gcvi_stdDev',
'green_stdDev',
'gv_stdDev',
'gvs_stdDev',
'hallcover_stdDev',
'ndfi_stdDev',
'ndvi_stdDev',
'ndwi_stdDev',
'nir_stdDev',
'red_stdDev',
'savi_stdDev',
'sefi_stdDev',
'shade_stdDev',
'soil_stdDev',
'swir1_stdDev',
'swir2_stdDev',
'wefi_stdDev',
'slope'
]);

var bandNamesShort = ee.List([
'evi2_a',
'gv_a',
'ndfi_a',
'ndvi_a',
'ndwi_a',
'soil_a',
'wefi_a',
'blue_m',
'blue_m_d',
'blue_m_w',
'cai_m',
'cai_m_d',
'cloud_m',
'evi2_m',
'evi2_m_d',
'evi2_m_w',
'gcvi_m',
'gcvi_m_d',
'gcvi_m_w',
'green_m',
'green_m_d',
'green_m_w',
'green_m_t',
'gv_m',
'gvs_m',
'gvs_m_d',
'gvs_m_w',
'hallcov_m',
'lat', //calculada no script
'long', //calculada no script
'ndfi_m',
'ndfi_m_d',
'ndfi_m_w',
'ndvi_m',
'ndvi_m_d',
'ndvi_m_w',
'ndvi_a_3y', //calculada no script
'ndwi_m',
'ndwi_m_d',
'ndwi_m_w',
'nir_m',
'nir_m_d',
'nir_m_w',
'npv_m',
'pri_m',
'pri_m_d',
'pri_m_w',
'red_m',
'red_m_d',
'red_m_w',
'savi_m',
'savi_m_d',
'savi_m_w',
'sefi_m',
'sefi_m_d',
'shade_m',
'soil_m',
'swir1_m',
'swir1_m_d',
'swir1_m_w',
'swir2_m',
'swir2_m_d',
'swir2_m_w',
'wefi_m',
'wefi_m_w',
'blue_min',
'green_min',
'nir_min',
'red_min',
'swir1_min',
'swir2_min',
'blue_sD',
'cai_sD',
'cloud_sD',
'evi2_sD',
'gcvi_sD',
'green_sD',
'gv_sD',
'gvs_sD',
'hallcov_sD',
'ndfi_sD',
'ndvi_sD',
'ndwi_sD',
'nir_sD',
'red_sD',
'savi_sD',
'sefi_sD',
'shade_sD',
'soil_sD',
'swir1_sD',
'swir2_sD',
'wefi_sD',
'slope'
])}//nomes das bandas

var regioes = [1,2,3,4,5,6,7]

var mosaicos1 = ee.ImageCollection(dirasset)
                  .filterMetadata('biome', 'equals', bioma)
                  .filterMetadata('version', 'equals', version)
//var mosaicos2 = ee.ImageCollection(dirasset7)
//                  .filterMetadata('biome', 'equals', bioma)
//                  .filterMetadata('version', 'equals', version)
var mosaicos = mosaicos1//.merge(mosaicos2)
print('mosaicos',mosaicos)

for (var i_ano=0;i_ano<anos.length; i_ano++){
  var ano = anos[i_ano];
  for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
    var regiao = regioes[i_regiao];
    var limite = regioesCollection.filterMetadata('ID', "equals", regiao);
    //Map.addLayer(limite, {}, 'limite regiao', false)
    
    var mosaicoTotal =   mosaicos.filterMetadata('year', 'equals', ano)
                      .filterBounds(limite)
                      .mosaic()
    //print('mosaicoTotal',mosaicoTotal)
    if (ano == 1985){//usa o valor do ano como apmlitude
      //var amp3anos = max3anos.subtract(min3anos).rename('amp_ndvi_3anos')
      var min3anos = mosaicoTotal.select('ndvi_median_dry')
      var max3anos = mosaicoTotal.select('ndvi_median_wet')
    }
    if (ano == 1986){//usa os 2 anos anteriores como amplitude
      //var amp3anos = max3anos.subtract(min3anos).rename('amp_ndvi_3anos')
      var mosaico1ano_antes = mosaicos.filterMetadata('year', 'equals', ( ano - 1))
                      .filterBounds(limite)
                      .mosaic()
      var min3anos = ee.ImageCollection.fromImages([mosaicoTotal.select('ndvi_median_dry'),
                                                  mosaico1ano_antes.select('ndvi_median_dry')]).min()
      var max3anos = ee.ImageCollection.fromImages([mosaicoTotal.select('ndvi_median_wet'),
                                                  mosaico1ano_antes.select('ndvi_median_wet')]).max()
    }
    if (ano > 1986){
      var mosaico1ano_antes = mosaicos.filterMetadata('year', 'equals', ( ano - 1))
                      .filterBounds(limite)
                      .mosaic()
      var mosaico2anos_antes = mosaicos.filterMetadata('year', 'equals', ( ano - 2))
                      .filterBounds(limite)
                      .mosaic()
      var min3anos = ee.ImageCollection.fromImages([mosaicoTotal.select('ndvi_median_dry'),
                                                  mosaico1ano_antes.select('ndvi_median_dry'),
                                                  mosaico2anos_antes.select('ndvi_median_dry')]).min()
      var max3anos = ee.ImageCollection.fromImages([mosaicoTotal.select('ndvi_median_wet'),
                                                  mosaico1ano_antes.select('ndvi_median_wet'),
                                                  mosaico2anos_antes.select('ndvi_median_wet')]).max()
    
    }
    var ndvi_a_3y = max3anos.subtract(min3anos).rename('ndvi_amp_3y')
   // print('ndvi_a_3y',ndvi_a_3y)

    var ndvi_color = '0f330f, 005000, 4B9300, 92df42, bff0bf, FFFFFF, eee4c7, ecb168, f90000'
    var visParNDFI_amp = {'min':0, 'max':60, 'palette':ndvi_color};
    //Map.addLayer(ndvi_a_3y.toUint16(), visParNDFI_amp, 'ndvi_a_3y', true);
    mosaicoTotal = mosaicoTotal.addBands(ndvi_a_3y)

    var ll = ee.Image.pixelLonLat().mask(bioma250mil_PA);
    
    var long = ll.select('longitude').add(0).multiply(-1).multiply(1000).toInt16()
    var lati = ll.select('latitude').add(0).multiply(-1).multiply(1000).toInt16()

    mosaicoTotal = mosaicoTotal.addBands(long.rename('longitude'))
    mosaicoTotal = mosaicoTotal.addBands(lati.rename('latitude' ))
    //print('mosaico',mosaicoTotal)

    mosaicoTotal = mosaicoTotal.select(bandNames,bandNamesShort)
    
    var pts_reg = pts.filterMetadata('ID', 'equals', regiao)
//    print('n pontos',pts_reg.size())

    var training = mosaicoTotal.sampleRegions({
        'collection': pts_reg,
        'scale': 30,
        'tileScale': 4,
        'geometries': true
    });
    
//      var trainingSHP = mosSHP.sampleRegions({
//          'collection': pts_reg,
//          'scale': 30,
//          'tileScale': 4,
//          'geometries': true
//      });
    
    if (i_regiao == 0){ 
      var training_reg = training 
      //var training_regSHP = trainingSHP 
    }  
    else {
      training_reg = training_reg.merge(training);
      //training_regSHP = training_regSHP.merge(trainingSHP);
    }
    //print('regiao ' + String(regiao) + 'tamanho = ' +  String(training.size()))
    
  }    
  
print('training', training.limit(10))
//print('training limite',training.limit(1))
//print('training size',training_reg.size())

//Map.addLayer(training_reg, {}, 'resultado final')
Export.table.toAsset(training_reg, 
                      'training_periodos_' + ano , 
                      dirout + 'training_periodos_' + ano + '_' + version_amostras);
                      
//Export.table.toDrive({
//    collection: training_reg,
//    fileFormat: 'SHP', // 'CSV',//KML,
//    folder:'amostras_coll6',
//    description: 'training_periodos_' + ano + '_' + version_amostras
//    })
    
}
