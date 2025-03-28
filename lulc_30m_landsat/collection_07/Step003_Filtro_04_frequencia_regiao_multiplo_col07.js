/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var pol = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.MultiPoint();
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// MAPBIOMAS PAMPA
// COLLECTION 06 
// AUTHOR: Juliano Schirmbeck
// DATE: junho 2021
//
//  Randon Forest to region 06


var version = '033'
var version_hand = '01'
var col = '7'

var bioma = "PAMPA"
  

var versionOut = version + 'b_freq'
var versionIn = version + 'b_temp'
var versionIncidentes = version +  '_pre_incidentes'

var dircol_in = 'projects/mapbiomas-workspace/AMOSTRAS/col' + col + '/PAMPA/class_col' + col + '/'
var dir_filtros = 'projects/mapbiomas-workspace/AMOSTRAS/col' + col + '/PAMPA/class_col' + col + '_filtros/'
var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
var image_hand_class = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/col6/PAMPA/class_col6_filtros/classes_hand01')
                                 //'projects/mapbiomas-workspace/AMOSTRAS/col6/PAMPA/class_col6_filtros/classes_hand01

var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis1 = { 'bands': 'classification_1987','min': 0, 'max': 45,  'palette': palettes.get('classification5')};

var vis = { 'min': 0, 'max': 45,  'palette': palettes.get('classification5')};


//Calculando frequencias
// General rule
var exp = '100*((b( 0)+b( 1)+b( 2)+b( 3)+b( 4)+b( 5)+b( 6)+b( 7)+b( 8)+b( 9)'+
               '+b(10)+b(11)+b(12)+b(13)+b(14)+b(15)+b(16)+b(17)+b(18)+b(19)'+
               '+b(20)+b(21)+b(22)+b(23)+b(24)+b(25)+b(26)+b(27)+b(28)+b(29)'+
               '+b(30)+b(31)+b(32)+b(33)+b(34)+b(35)+b(36))/37)';

var regioes = [1,4,6,7,2,3,5]

for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
    var regiao = regioes[i_regiao];
  
  
  if (regiao == 1)  var aplicar = {freq1: 1, freq2: 0, freq3: 1, freq4: 1}//por água
  if (regiao == 2)  var aplicar = {freq1: 1, freq2: 0, freq3: 0, freq4: 1}
  if (regiao == 3)  var aplicar = {freq1: 1, freq2: 0, freq3: 1, freq4: 1}
  if (regiao == 4)  var aplicar = {freq1: 1, freq2: 0, freq3: 0, freq4: 1}
  if (regiao == 5)  var aplicar = {freq1: 1, freq2: 1, freq3: 0, freq4 :0}//por banhado ()
  if (regiao == 6)  var aplicar = {freq1: 1, freq2: 1, freq3: 0, freq4 :0}
  if (regiao == 7)  var aplicar = {freq1: 1, freq2: 1, freq3: 0, freq4 :0}
  
  var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);
  var image_incidence = ee.Image(dir_filtros+ '0' + String(regiao) +'_RF85a21_v' +  versionIncidentes)
  var image_in = ee.Image(dir_filtros + '0' + String(regiao) +'_RF85a21_v' + versionIn);
  var image_gap = ee.Image(dir_filtros +  '0' + String(regiao) +'_RF85a21_v' + versionIn);
  print(image_incidence)
  
  
  Map.addLayer(image_in,vis1,'MapBio Temporal')
  Map.addLayer(image_gap,vis1,'MapBio GAP')
  
    
  // get frequency
  var florFreq  = image_in.eq( 3).expression(exp);
  var umiFreq   = image_in.eq(11).expression(exp);
  var grassFreq = image_in.eq(12).expression(exp);
  var anvFreq   = image_in.eq(22).expression(exp);
  var arochFreq = image_in.eq(29).expression(exp);
  var aguaFreq  = image_in.eq(33).expression(exp);
  var agricFreq = image_in.eq(21).expression(exp);  
  
  
  
  //**********************************************
  //******** Reras do filtro de frequencia 1
  //**********************************************
  // problemas associados a floresta em area umida
    if (aplicar.freq1){
      
    //trabalha com areas com predominância de banhado > 51%  
    var vegMask51 = ee.Image(0)
                             .where((umiFreq.gt(1)
                             .and((umiFreq.add(grassFreq)
                             .add(aguaFreq).add(florFreq))
                             .gt(80))
                             .and(image_incidence.select('incidence').gt(1))),
                             1)
    var  vegMap51 = ee.Image(0)
                            .where(vegMask51.eq(1).and(umiFreq.gt(70)), 11)
  
    vegMap51 = vegMap51.updateMask(vegMap51.neq(0))
    //Map.addLayer(vegMap51,vis,'vegMap 1 - 51')
    //Map.addLayer(vegMask51,vis,'vegMask carrosel 1 - 51')
    image_in = image_in.where(vegMap51, vegMap51)
    
    //trabalhar com frequencias minoritárias de banhado <20 levando a moda
    var vegMask20 = ee.Image(0)
                             .where((umiFreq.lt(20)
                             .and(umiFreq.gt(1))
                             .and(image_incidence.select('incidence').gt(1))),
                             1)
    var  vegMap20 = ee.Image(0)
                            .where(vegMask20.eq(1),image_incidence.select('classification_mode'))
  
    vegMap20 = vegMap20.updateMask(vegMap20.neq(0))
    image_in = image_in.where(vegMap20.and(image_in.eq(11)), vegMap20)
    
    //Map.addLayer(vegMap20,vis,'vegMap 1 - 20')
    //Map.addLayer(vegMask20,vis,'vegMask carrosel 20')
    
    //trabalhar com frequencias intermediárias de banhado 20% a 70% levando a moda
    var vegMaskx = ee.Image(0)
                             .where(umiFreq.gt(19)
                             .and(umiFreq.lt(71))
                             .and(florFreq.lt(33))
                             .and(florFreq.gt(1))
                             .and((florFreq.add(umiFreq).add(aguaFreq)).gt(75))
                             ,1)
                             
    var  vegMapx = ee.Image(0).where(vegMaskx.eq(1),11)
    vegMapx = vegMapx.updateMask(vegMapx.neq(0))
    
    image_in = image_in.where(vegMapx.and(image_in.eq(3)), vegMapx)
    
    //Map.addLayer(vegMapx,vis,'vegMap 1 - x')
    //Map.addLayer(vegMaskx,vis,'vegMask carrosel x')
    
    
    //var temp = image_in.eq(11)
    //temp = temp.mask(temp).multiply(11)
    Map.addLayer(image_in,vis1,'MapBio filtro umid')
    
  }
  //**********************************************
  //******** Reras do filtro de frequencia 2
  //**********************************************
  // resolve arroz, area unmida e agua
  if(aplicar.freq2){
    var vegMask = ee.Image(0)
                             .where(agricFreq.gt(1)  //adicionado para coll 5 força que tenha ao menos um ano de agricultura //redundante com a regra abaixo, valido se modificar outra classe
                             .and((agricFreq
                             .add(umiFreq)
                             .add(aguaFreq))
                             .gt(75)), 1)
    
    /////Mapa base: 
    var vegMap = ee.Image(0)
                            .where(vegMask.eq(1).and(agricFreq.gt(33)), 21)
    
    vegMap = vegMap.updateMask(vegMap.neq(0))
    
    image_in = image_in.where(vegMap, vegMap)
    Map.addLayer(image_in,vis1,'MapBio filtro arroz')
  }
  
  //**********************************************
  //******** Reras do filtro de frequencia 3
  //**********************************************
  //afloramento rochoso + não vegetado
  if (aplicar.freq3){
    var vegMask = ee.Image(0)
                           .where((arochFreq
                           .add(anvFreq))
                           .gt(80),
                           1)
    /////Mapa base: 
    var vegMap = ee.Image(0)
                          .where(vegMask.eq(1),image_incidence.select('classification_mode'))
                           
    vegMap = vegMap.updateMask(vegMap.neq(0))//.clip(BiomaPA)
    image_in = image_in.where(vegMap, vegMap)
    //***********************************************
    // minoritatio para rochoso
    vegMask = ee.Image(0)
                           .where(arochFreq.lt(20),
                           1)
    /////Mapa base: 
    vegMap = ee.Image(0)
                          .where(vegMask.eq(1),image_incidence.select('classification_mode'))
                           
    vegMap = vegMap.updateMask(vegMap.neq(0))//.clip(BiomaPA)
    image_in = image_in.where(vegMap.and(image_in.eq(29)), vegMap)
    //*************************************************************
    //minoritário para area não vegetada
      vegMask = ee.Image(0)
                           .where(anvFreq.lt(20),
                           1)
    /////Mapa base: 
    vegMap = ee.Image(0)
                          .where(vegMask.eq(1),image_incidence.select('classification_mode'))
                           
    vegMap = vegMap.updateMask(vegMap.neq(0))//.clip(BiomaPA)
    image_in = image_in.where(vegMap.and(image_in.eq(22)), vegMap)
    Map.addLayer(image_in,vis1,'MapBio filtro anv e aroc')
  }
  //**********************************************
  //******** Reras do filtro de frequencia 4
  //**********************************************
  //corrigir agua em sombra de relevo e area umida
    if (aplicar.freq4){
      
    //trabalha com areas com predominância de banhado > 51%  
    var vegMaskAg = ee.Image(0)
                             .where((aguaFreq.gt(1))
                             .and(aguaFreq.lt(95))
                             .or((umiFreq.gt(1))
                             .and(umiFreq.lt(90)))
                             .and(image_hand_class.eq(2)),
                             1)
                             
    var moda_n_agua = image_in.updateMask(image_in.neq(33)).reduce(ee.Reducer.mode());                     
    var moda_n_umi = image_in.updateMask(image_in.neq(11)).reduce(ee.Reducer.mode());                     
    
    var  vegMapAg = vegMaskAg
  
    vegMapAg = vegMapAg.updateMask(vegMapAg.neq(0))
    Map.addLayer(vegMapAg,vis,'vegMap - Ag')
    Map.addLayer(vegMaskAg,vis,'vegMask carrosel - Ag')
    Map.addLayer(image_hand_class,{},'HAND Class')
    image_in = image_in.where(vegMapAg.and(image_in.eq(33)), moda_n_agua)
    image_in = image_in.where(vegMapAg.and(image_in.eq(11)), moda_n_umi)
    Map.addLayer(image_in,vis1,'MapBio filtro hand')
  }
  //image_hand_class
  
  var image_out = image_in
  
  image_out = image_out
    .set('collection', col)
    .set('version', versionOut)
    .set('biome', bioma)
  
  //print(image_in)
  print(image_out)
  
  
  Export.image.toAsset({
      'image': image_out,
      'description': + '0' + String(regiao) +'_RF85a21_v'+versionOut,
      'assetId': dir_filtros + '0' + String(regiao) +'_RF85a21_v'+versionOut,
      'pyramidingPolicy': {
          '.default': 'mode'
      },
      'region': limite.geometry().bounds(),
      'scale': 30,
      'maxPixels': 1e13
  });
}