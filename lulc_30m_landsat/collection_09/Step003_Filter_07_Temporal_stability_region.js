// MAPBIOMAS PAMPA
// COLLECTION 09
// AUTHOR: Juliano Schirmbeck
// UPDATE: May 2024

// ***************************************************************************************
// Define as variáveis referentes a versão da coleção ou dos filtros
var col = '9'
var versionIn = '10'
var bioma = "PAMPA"
var versionOut = versionIn + '_umid'
var versionIn = versionIn + '_ext'

// Define as regiões: [1,2,3,4,5,6,7]
var regioes = [1,2,3,4,5,6,7]

// ***************************************************************************************


for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
  var regiao = regioes[i_regiao];
  
  // Define o diretório dos arquivos filtrados e a imagem de entrada para passar o filtro
  var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/col' + col + '/PAMPA/class_col_' + col + '_filtros/'
  var imgIn =  ee.Image(dir_filtros+ '0' + String(regiao) +'_RF_col' + col + '_v' + versionIn);
  
  var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col09_buff')
  var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);

  // Define os parâmetros de visualização
  var palettes = require('users/mapbiomas/modules:Palettes.js');
  var vis = { 'bands': ['classification_2023'], 'min': 0, 'max': 62,  'palette': palettes.get('classification8')};
  var vis2 = {'min': 0, 'max': 62,  'palette': palettes.get('classification8')};
  Map.addLayer(imgIn, vis, 'In');
  
  //-------------------------------------------FILTRO ÁREAS ÚMIDAS-------------------------------------------------------------------

  // Coleção 8 usada para áreas úmidas
  var dirCol = 'projects/mapbiomas-workspace/public/collection8/mapbiomas_collection80_integration_v1'
  var imgCol = ee.Image(dirCol)
  
  var mask_reflo = imgCol.select('classification_2013','classification_2014','classification_2015','classification_2016',
                                 'classification_2017','classification_2018','classification_2019','classification_2020',
                                 'classification_2021', 'classification_2022')
                                 .eq(9).selfMask()
                                 .reduce(ee.Reducer.count())
                                 .gte(1)
                                 .unmask()
                                 .eq(0)//.multiply(11)

  var mask_umid = imgIn.select('classification_2013','classification_2014','classification_2015','classification_2016',
                               'classification_2017','classification_2018','classification_2019','classification_2020',
                               'classification_2021','classification_2022','classification_2023')
                               .eq(11)
                               .selfMask()
                               .reduce(ee.Reducer.count())
                               .gt(7)//.selfMask().multiply(11)
  print("Mas Reflo", mask_reflo)
  print("Mask Umid", mask_umid)
  
  Map.addLayer(mask_umid.selfMask(), vis2, 'Mask_umid');
  //Map.addLayer(mask_umid.selfMask(), {}, 'mask_umid');
  //Map.addLayer(mask_reflo.selfMask(), {}, 'mask_reflo');
  var mask_umid =mask_umid.multiply(mask_reflo).selfMask().multiply(11)                             
  Map.addLayer(mask_umid, {}, 'Mask_umid x reflo');
                             
  
  // ----------------------------------------FILTRO AROC----------------------------------------------------------------------------
  
  // Coleção 9 usada para máscara de aroc
  var dirCol9_aroc ='projects/mapbiomas-workspace/AMOSTRAS/col9/PAMPA/class_col_9_mosaic/PAMPA_12_com_filtro_reclass'
  var imgCol9_aroc = ee.Image(dirCol9_aroc)
  
  var anos = [                            '1985','1986','1987','1988','1989','1990',
              '1991','1992','1993','1994','1995','1996','1997','1998','1999','2000',
              '2001','2002','2003','2004','2005','2006','2007','2008','2009','2010',
              '2011','2012','2013','2014','2015','2016','2017','2018','2019','2020',
              '2021','2022','2023'];
 
  var bandas_anos = ['classification_1985','classification_1986','classification_1987','classification_1988',
                'classification_1989','classification_1990','classification_1991','classification_1992',
                'classification_1993','classification_1994','classification_1995','classification_1996',
                'classification_1997','classification_1998','classification_1999','classification_2000',
                'classification_2001','classification_2002','classification_2003','classification_2004',
                'classification_2005','classification_2006','classification_2007','classification_2008',
                'classification_2009','classification_2010','classification_2011','classification_2012',
                'classification_2013','classification_2014','classification_2015','classification_2016',
                'classification_2017','classification_2018','classification_2019','classification_2020',
                'classification_2021','classification_2022', 'classification_2023'
                ];
  var sufix = '_85_23';
  var freq_lim = 24;

  // Seleciona os anos na coleção de entrada
  var colecao_In = imgCol9_aroc.select(bandas_anos)
  
  var colList = ee.List([])
  //var col_remap_85 = colecao_In.select('classification_1985').remap(
  //    [3, 9, 11, 12, 15, 19, 21, 23, 24, 25, 29, 30, 33, 39, 40, 41],
  //    [3, 9, 11, 12, 21, 21, 21, 22, 22, 22, 29, 22, 33, 21, 21, 21])
  //colList = colList.add(col_remap_85.int8())
  
  for (var i_ano=0;i_ano<anos.length; i_ano++){
    var ano = anos[i_ano];
  
    var col_remap = colecao_In.select('classification_'+ano).remap(
          [3, 9, 11, 12, 15, 19, 21, 23, 24, 25, 29, 30, 33, 39, 40, 41, 49, 50],
          [3, 9, 11, 12, 21, 21, 21, 22, 22, 22, 29, 22, 33, 21, 21, 21,  3, 12]);

    colList = colList.add(col_remap.int8());
  }
  
  var collection = ee.ImageCollection(colList)
  print("Col9 remapped", collection)
  
  // var unique = function(arr) {
  //     var u = {},
  //         a = [];
  //     for (var i = 0, l = arr.length; i < l; ++i) {
  //         if (!u.hasOwnProperty(arr[i])) {
  //             a.push(arr[i]);
  //             u[arr[i]] = 1;
  //         }
  //     }
  //     return a;
  // };
  
  var getFrenquencyMask = function(collection, classId, freq_lim) {
      var classIdInt = parseInt(classId, 10);
      var maskCollection = collection.map(function(image) {
          return image.eq(classIdInt);
      });
      var frequency = maskCollection.reduce(ee.Reducer.sum());
      var frequencyMask = frequency.gte(freq_lim)
          .multiply(classIdInt)
          .toByte();
      frequencyMask = frequencyMask.mask(frequencyMask.eq(classIdInt));
      return frequencyMask.rename('frequency').set('class_id', classId);
  };
  
  // var lista_image = ee.List([]);
  // var freq_aroc = { "3": freq_lim, "9": freq_lim, "11": freq_lim, "12": freq_lim, 
  //                       "21": freq_lim, "22": freq_lim, "29": freq_lim, "33": freq_lim}
  
  // var freq_aroc = {"29": freq_lim}
  // var frequencyMasks = Object.keys(freq_aroc).map(function(classId) {
  //     return getFrenquencyMask(collection, classId, freq_aroc[classId]);
  // });
  // frequencyMasks = ee.ImageCollection.fromImages(frequencyMasks);
  // var aroc_mask = frequencyMasks.reduce(ee.Reducer.firstNonNull()).clip(pampa);
  // aroc_mask = aroc_mask.mask(aroc_mask.neq(27)).rename("reference");
  
  // Cria uma máscara de estabilidade de aroc usando o limiar (freq_limit) com base na C9_v12
  var aroc_mask_est = getFrenquencyMask(collection, "29", freq_lim).clip(pampa);
  Map.addLayer(aroc_mask_est.selfMask(), {palette:["black"]}, 'Mask_aroc_est');
  
  // Cria uma máscara onde existia aroc em 2023
  print("colecao_In", colecao_In)
  var class_2023 = colecao_In.select('classification_2023')
  var aroc_2023 = class_2023.eq(29).selfMask().multiply(29) //mascara de aroc em 2023
  Map.addLayer(aroc_2023, {}, 'aroc_2023', true);
  
  // Máscara de aroc em que as áreas estáveis permanecem em 2023
  var mask_aroc_corr = aroc_mask_est.eq(aroc_2023).selfMask().multiply(29) //camada de 2023 corrigida
  Map.addLayer(mask_aroc_corr, {palette:["red"]}, 'Mas_aroc_corr', true);
  
  
  //-------------------------------BLEND DO FILTRO DE ÁREAS ÚMIDAS E AROC------------------------------------------------------------
  
  // Pra cada ano faz o blend com as máscaras criadas e joga na var class_out
  for (var i_ano=0;i_ano<anos.length; i_ano++){  
    var ano = anos[i_ano]; 
    
    var blend_umid_aroc = imgIn
      .select('classification_' + ano)
      .blend(mask_umid)
      .blend(mask_aroc_corr) // Blend da máscara de aroc adicionada
      
    // Map.addLayer(blend_umid_aroc, vis, 'blend_umid_aroc');
      
    var remove_aroc_resid = blend_umid_aroc.eq(29).and(blend_umid_aroc.neq(mask_aroc_corr.unmask())).selfMask().multiply(22)
    // Map.addLayer(remove_aroc_resid, vis, 'remove_aroc_resid');
      
    blend_umid_aroc = blend_umid_aroc.blend(remove_aroc_resid)
    // Map.addLayer(blend_umid_aroc, vis, 'blend_umid_aroc step 2');
      
    if (i_ano == 0){ var class_out = blend_umid_aroc }  
    else {class_out = class_out.addBands(blend_umid_aroc); } 
  }

  //class_out = class_out.addBands(imgIn.select('classification_2013','classification_2014','classification_2015','classification_2016',
  //                             'classification_2017','classification_2018','classification_2019','classification_2020',
  //                             'classification_2021','classification_2022'))
  
  for (var i_ano=0;i_ano<anos.length; i_ano++){  
    var ano = anos[i_ano]; 
    class_out = class_out.addBands(class_out.select('classification_'+ano).connectedPixelCount(20,false).rename('connect_'+ano))
  }

  print("Out com umid e aroc", class_out) 

  Map.addLayer(class_out, vis, 'Out');
  
  Export.image.toAsset({
    'image': class_out,
    'description': '0' + String(regiao) + '_RF_col' + col + '_v' + versionOut,
    'assetId': dir_filtros +  '0' + String(regiao) + '_RF_col' + col + '_v'  + versionOut,
    'pyramidingPolicy': {
        '.default': 'mode'
    },
    'region': limite.geometry().bounds(),
    'scale': 30,
    'maxPixels': 1e13
  });
}
