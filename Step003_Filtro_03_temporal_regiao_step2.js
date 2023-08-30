
var vesion_in = '07_inci'
var versao_out = '07_ext';
var descricao = 'Área de Transicao Minima'
var col = '8'
var dirout = 'projects/mapbiomas-workspace/AMOSTRAS/col8/PAMPA/class_col_8_filtros/';


//'01_RF_col8_v05_esp'
var regioes = [1,2,3,4,5,6,7]

for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
    var regiao = regioes[i_regiao];
    
var col7 =  ee.Image(dirout+ '0' + String(regiao) +'_RF_col' + col + '_v' +vesion_in)
//Map.addLayer(col7, {}, 'col7', false);


var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = {
    'min': 0,
    'max': 45,
    'palette': palettes.get('classification5')
};var vis2 = {
    'bands': 'classification_2021',
    'min': 0,
    'max': 45,
    'palette': palettes.get('classification5')
};


var anos = [1985,1986,1987,1988,1989,1990,
            1991,1992,1993,1994,1995,1996,
            1997,1998,1999,2000,2001,2002,
            2003,2004,2005,2006,2007,2008,
            2009,2010,2011,2012,2013,2014,
            2015,2016,2017,2018,2019,2020,
            2021,2022];
for (var i_ano=0;i_ano<anos.length; i_ano++){
  var ano = anos[i_ano];
  
  var class_ano = col7.select('classification_'+ano)
  var class_nivel0_ano = class_ano.remap([3,11,12,29, 21,22],
                                         [1, 1, 1, 1, 10,10]).rename('classification_'+ano)

  if (i_ano == 0){ var class_nivel0 = class_nivel0_ano }  
  else {class_nivel0 = class_nivel0.addBands(class_nivel0_ano); }
}

//var nChanges = class_nivel0.reduce(ee.Reducer.countRuns()).subtract(1);
//Map.addLayer(nChanges, {'min': 0,'max': 6, 'palette': ["#ffffff","#fee0d2","#fcbba1",
//            "#fb6a4a","#ef3b2c","#a50f15","#67000d"],'format': 'png'}, 'nChanges',false)


var nivel0_2022 = class_nivel0.select('classification_2022')
var nivel0_2021 = class_nivel0.select('classification_2021')

// corrige desmatamentos pequenos no último ano
var desmat = nivel0_2022.eq(10).and(nivel0_2021.eq(1))
// CUIDADO limite do conected deve ser maior ou igual ao teste seguinte
var conectedDesmat = desmat.selfMask().connectedPixelCount(30,true).reproject('epsg:4326', null, 30);
var desmat1ha = conectedDesmat.lte(22)
var ruido_desmat21 = col7.select('classification_2021').updateMask(desmat1ha)

// corrige REGEN pequenos no último ano
var regen = nivel0_2022.eq(1).and(nivel0_2021.eq(10))
var conectedRegen = regen.selfMask().connectedPixelCount(30,true).reproject('epsg:4326', null, 30);
var regen1ha = conectedRegen.lte(22)
var ruido_regen21 = col7.select('classification_2021').updateMask(regen1ha)


var nivel0_1985 = class_nivel0.select('classification_1985')
var nivel0_1986 = class_nivel0.select('classification_1986')

// corrige desmatamentos pequenos no primeiro ano
var desmat = nivel0_1985.eq(1).and(nivel0_1986.eq(10))
var conectedDesmat = desmat.selfMask().connectedPixelCount(30,true).reproject('epsg:4326', null, 30);
var desmat1ha = conectedDesmat.lte(22)
var ruido_desmat85 = col7.select('classification_1986').updateMask(desmat1ha)


// corrige REGEN pequenos no primeiro ano
var regen = nivel0_1985.eq(10).and(nivel0_1986.eq(1))
var conectedregen = regen.selfMask().connectedPixelCount(30,true).reproject('epsg:4326', null, 30);
var regen1ha = conectedregen.lte(22)
var ruido_regen85 = col7.select('classification_1986').updateMask(regen1ha)


for (var i_ano=0;i_ano<anos.length; i_ano++){
  var ano = anos[i_ano];
  
  var class_ano = col7.select('classification_'+ano)

  if (ano == 1985) {  var class_corr = class_ano.blend(ruido_desmat85).blend(ruido_regen85)}
  else if (ano == 2022) {  
    class_corr = class_ano.blend(ruido_desmat21).blend(ruido_regen21)  }
  else {class_corr = class_ano}

  if (i_ano == 0){ var class_final = class_corr}  
  else {class_final = class_final.addBands(class_corr)}

}

Map.addLayer(col7, vis2, 'col7', true);
Map.addLayer(class_final, vis2, 'class_final', true);

//Map.addLayer(class_final.eq(col7).selfMask(), {
//    'bands': ['classification_2021'],
//    'min': 0,
//    'max': 1,
//    'palette': ['#ffffff', '#000000'],
//    'format': 'png',
//    'opacity': 0.8
//}, 'changes');


Export.image.toAsset({
    "image": class_final.toInt8(),
    'description':  '0' + String(regiao) +'_RF_col' + col + '_v' + versao_out,
    'assetId': dirout + '0' + String(regiao) +'_RF_col' + col + '_v' + versao_out,
    "scale": 30,
    "pyramidingPolicy": {
        '.default': 'mode'
    },
    "maxPixels": 1e13,
    "region": geometryPampa
});      

}
