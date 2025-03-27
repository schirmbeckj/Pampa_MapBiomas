// MAPBIOMAS PAMPA
// COLLECTION 02
// AUTHOR: Juliano Schirmbeck
// UPDATED: Oct 2024

// Parâmetros para usar na exportação das amostras
var versao_out = 'SENTINEL2_v2'
// var sufix = '_13_23'
var sufix = '_99_23'
var dirout = 'projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/SAMPLES/';
 
// Define os parâmetros de visualização
var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = {
    'min': 0,
    'max': 62,
    'palette': palettes.get('classification8')
};

// Região de estudo
var bioma250mil = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas_IBGE_250mil')
// Map.addLayer(bioma250mil_MA)
var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
  // .filterBounds(geometry)
// Map.addLayer(regioesCollection)

// Pontos estáveis durante o último período da coleção 9
var pts = ee.FeatureCollection('projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/samples_col9_PAMPA_sentinel' + sufix)
// Map.addLayer(pts, {}, 'pt', false)
// print('pts',pts.limit(100))

// Asset contendo os mosaicos de Sentinel-2
var asset = 'projects/mapbiomas-mosaics/assets/SENTINEL/BRAZIL/mosaics-3';

// Asset mosaicos com clusters

var cluster_evi_80 = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/S2_clusters_2016_2023_evi_80')

var cluster_ndvi_20 = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/S2_2024/PAMPA/S2_clusters_2016_2023_ndvi_20')

// ===========================================================================================================
// Inspecionar mosaicos para um ano específico 
var ano_v = 2020
var collection_v = ee.ImageCollection(asset)
    .filterMetadata('year', 'equals', ano_v)
    .filterMetadata('version', 'equals', '3')
    .filterMetadata('biome','equals','PAMPA');
print(collection_v)
var mosaicoTotal_v = collection_v.mosaic()

// print(mosaicoTotal, "mosaicoTotal")
Map.addLayer(mosaicoTotal_v, {'bands': ['swir1_median', 'nir_median', 'red_median'],
    'gain': [0.08, 0.07, 0.2],'gamma': 0.85}, 'Sentinel 2', false);

// Adiciona bandas calculadas pela Caatinga e variáveis complementares, no total ficam 141 bandas
var addIndexComplem = require('users/evelezmartin/Sentinel_Col1:Amostras/CalculateIndices.js');
// var mosaicoTotal2 = addIndexComplem.getIndices(mosaicoTotal_v)

// // Adiciona as bandas calculadas para os clusters - Marcos Rosa
// mosaicoTotal2 = mosaicoTotal2
//   .addBands(cluster_evi_80
//     .select(['clusters_'+ano_v, 'evi_median_'+ano_v])
//     .rename(['clusters_80_'+ano_v, 'evi_median_'+ano_v])
//   )
// mosaicoTotal2 = mosaicoTotal2
//   .addBands(cluster_ndvi_20
//     .select(['clusters_'+ano_v, 'ndvi_median_'+ano_v])
//     .rename(['clusters_20_'+ano_v, 'ndvi_median_'+ano_v])
//   )
// print(mosaicoTotal2, "mosaicoTotal2")

// =====================================================================================================================

// ====================================================================================================================
// Gerar as amostras de treinamento para cada ano e cada região
// Lista de anos a serem classificados
var anos = [2016,2017,2018,2019,2020,2021,2022,2023];
var ndvi_color = '0f330f, 005000, 4B9300, 92df42, bff0bf, FFFFFF, eee4c7, ecb168, f90000'
var visParNDFI_amp = {'min':0, 'max':300, 'palette':ndvi_color};

// Itera sobre a lista de anos
for (var i_ano=0;i_ano<anos.length; i_ano++){
  var ano = anos[i_ano];
  var col_mosaicos = ee.ImageCollection(asset)
    .filterMetadata('year', 'equals', ano) // Filtra para ano
    .filterMetadata('version', 'equals', '3')
    .filterMetadata('biome','equals','PAMPA');
  
  // Itera sobre a lista de regiões
  var regioes_lista = [1,2,3,4,5,6,7]
  for (var i_regiao=0;i_regiao<regioes_lista.length; i_regiao++){
    var regiao = regioes_lista[i_regiao];
    var limite = regioesCollection.filterMetadata('ID', "equals", regiao);
  // print(limite)
  
    // Filtra os mosaicos para a região e mosaica as imagens
    var mosaico_43 = col_mosaicos.filterBounds(limite.geometry().bounds()).mosaic()
    
    // Adiciona os índices calculados pelos Marcos Rosa
    var mosaico_138 = addIndexComplem.getIndices(mosaico_43)
    
    // Adiciona as bandas calculadas para os clusters - Marcos Rosa
    var mosaico_clusEVI = mosaico_138
      .addBands(cluster_evi_80
        .select(['clusters_'+ano, 'evi_median_'+ano])
        .rename(['clusters_80_'+ano, 'evi_median_'+ano])
      )
    var mosaico_clusNDVI = mosaico_clusEVI
      .addBands(cluster_ndvi_20
        .select(['clusters_'+ano, 'ndvi_median_'+ano])
        .rename(['clusters_20_'+ano, 'ndvi_median_'+ano])
      )
    
    // Selelciona os pontos para região filtrada
    var pts_reg = pts.filterMetadata('ID', 'equals', regiao)
    // print(pts_reg.size())
    
    // Extrai as amostras do mosaico para os pontos filtrados (ano e região)
    var training = mosaico_clusNDVI.sampleRegions({
        'collection': pts_reg,
        'scale': 10,
        'tileScale': 4,
        'geometries': true
    });
    
    // Mergeia as regiões daquele ano
    if (i_regiao == 0){ var training_reg = training }  
    else {training_reg = training_reg.merge(training); }
  }    
  print(training_reg.limit(1), "train")
  
  // Map.addLayer(training_reg.limit(1))
  // print(training_reg.size())
  
  Export.table.toAsset(training_reg, 'pontos_train_'+versao_out+'_'+ano, dirout + 'pontos_train_'+versao_out+'_'+ano);  
}

// ========================================================================================================================

// Testa os assets da coleção antiga
// var amostras_2020 = ee.FeatureCollection(
//   'projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/SAMPLES/SENTINEL/pontos_train_SENTINEL2_v1_2020')
// print(amostras_2020.limit(10), "amostras_2020")

// var amostras_2016 = ee.FeatureCollection(
//   'projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/SAMPLES/SENTINEL/pontos_train_SENTINEL2_v1_2016')
// print(amostras_2016.limit(10), "amostras_2016")







