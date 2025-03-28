
var col = '7'

var bioma = "PAMPA"
var versionIn = '06' 
var versionOut = '06_filters'
//projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/class_Sentinel_Filtros/02_RF16a20_v05_freq 
//var col_in =      'projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/class_Sentinel/'
var col_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/class_Sentinel_Filtros/'

var biomes = ee.Image('projects/mapbiomas-workspace/AUXILIAR/biomas-raster-41')
var limBioma = biomes.mask(biomes.eq(6)); //bioma 6 igual a Pampa

var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = {'min': 0, 'max': 45,  'palette': palettes.get('classification5')};

var versions = ['_freq']//,'_freq'
                     //]
var regioes = [1,2,3,4,5,6,7]

  var anos = [2016,2017,2018,2019,2020,2021,2022];
            
//var anos = [2017]
        var kernel = ee.Kernel.square(3)


//var img_out = ee.Image('')

for (var i_ver=0;i_ver<versions.length; i_ver++){
  var version = versions[i_ver];
  //print(version)
  //var out_list = ee.Image
  var colList = ee.List([])
  for (var i_ano=0;i_ano<anos.length; i_ano++){
  var ano = anos[i_ano];
  //print(ano)
  var colList = ee.List([])
    for (var i_reg=0;i_reg<regioes.length; i_reg++){
        //var i_reg = 3
        var regiao = regioes[i_reg];
        //print(regiao)
        var nome =col_filtros + '0' + String(regiao) +'_RF16a20_v' + versionIn + version
        print(nome)
        var img = ee.Image(nome).select('classification_' + String(ano)).byte();
        //Map.addLayer(img,vis,'img_reg'+ String(regiao))
        //print(img)
      var colList = colList.add(img)
    }
    //print(colList)
    var img_coll = ee.ImageCollection(colList)
    var image = img_coll
              .min().rename('classification_' + String(ano))
    print(image)
    //Map.addLayer(image,vis,'img'+ String(ano))
    //          //.updateMask(limBioma);
    if (version == '_gap' || version == '_inci'){
      image = image.select(ee.List.sequence(0, 5, 1))
    }          
    
    if (i_ano == 0){ var img_out = image}
    else{
      img_out = img_out.addBands(image)
    }
    //out_list = out_list.add(image)            
  }
  

  //var img_out = ee.ImageCollection(out_list).toBands()    
  print(img_out)
  
  Map.addLayer(img_out.select(0),vis)
  
  //col = '6'
  var out = 'projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/class_Sentinel_mosaic/'       
   var reg = ee.Image('projects/mapbiomas-workspace/AUXILIAR/PAMPA/Pampa_regions_col5_raster_buff')
   //Map.addLayer(reg);
   
   //Map.addLayer(image.select(30), vis, 'imagem' );
   Export.image.toAsset({
      'image': img_out,
      'description': bioma +  '_' + versionOut,
      'assetId': out + bioma +  '_' + versionOut,
      'pyramidingPolicy': {
          '.default': 'mode'
      },
      'region': geometryPampa,
      'scale': 10,
      'maxPixels': 1e13
    });
}

/*
var col6 = ee.ImageCollection('projects/mapbiomas-workspace/AMOSTRAS/col6/PAMPA/class_col6')
.filterMetadata('version', 'equals', '02')
var image = col6.min()

var regioes = [1,2,3,4,5,6,7]
for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
    var regiao = regioes[i_regiao];
}
*/