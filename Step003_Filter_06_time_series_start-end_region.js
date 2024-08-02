// MAPBIOMAS PAMPA
// COLLECTION 09
// AUTHOR: Juliano Schirmbeck
// UPDATE: May 2024

// ***************************************************************************************
// ATENÇÃO: COMENTAR AGRICULTURA E CAMPO PARA REGIÃO 1 e 5

// ATENÇÃO: COMENTAR RESTINGA ARBÓREA NO FINAL QUANDO NÃO FOR REGIÃO 7

// ***************************************************************************************
// Define as variáveis referentes a versão da coleção ou dos filtros
var version= '10'
var vesion_in = version +'_inci'
var versao_out = version + '_ext';
var descricao = 'Área de Transicao Minima'
var col = '9'
var dirout = 'projects/mapbiomas-workspace/AMOSTRAS/col9/PAMPA/class_col_9_filtros/';

// Define as regiões: [1,2,3,4,5,6,7]
var regioes = [1,2,3,4,5,6]

// ***************************************************************************************


for (var i_regiao=0;i_regiao<regioes.length; i_regiao++){
    var regiao = regioes[i_regiao];
    
var col7 =  ee.Image(dirout+ '0' + String(regiao) +'_RF_col' + col + '_v' +vesion_in)
//Map.addLayer(col7, {}, 'col7', false);


var palettes = require('users/mapbiomas/modules:Palettes.js');
var vis = {
    'min': 0,
    'max': 62,
    'palette': palettes.get('classification8')
};var vis2 = {
    'bands': 'classification_2022',
    'min': 0,
    'max': 62,
    'palette': palettes.get('classification8')
};


var anos = [1985,1986,1987,1988,1989,1990,
            1991,1992,1993,1994,1995,1996,
            1997,1998,1999,2000,2001,2002,
            2003,2004,2005,2006,2007,2008,
            2009,2010,2011,2012,2013,2014,
            2015,2016,2017,2018,2019,2020,
            2021,2022,2023];

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


var nivel0_2022 = class_nivel0.select('classification_2023')
var nivel0_2021 = class_nivel0.select('classification_2022')

// corrige desmatamentos pequenos no último ano
var desmat = nivel0_2022.eq(10).and(nivel0_2021.eq(1))

// CUIDADO limite do conected deve ser maior ou igual ao teste seguinte
var conectedDesmat = desmat.selfMask().connectedPixelCount(30,true).reproject('epsg:4326', null, 30);
var desmat1ha = conectedDesmat.lte(22)
var ruido_desmat21 = col7.select('classification_2022').updateMask(desmat1ha)

// corrige REGEN pequenos no último ano
var regen = nivel0_2022.eq(1).and(nivel0_2021.eq(10))
var conectedRegen = regen.selfMask().connectedPixelCount(30,true).reproject('epsg:4326', null, 30);
var regen1ha = conectedRegen.lte(22)
var ruido_regen21 = col7.select('classification_2022').updateMask(regen1ha)


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
  else if (ano == 2023) {  
    class_corr = class_ano.blend(ruido_desmat21).blend(ruido_regen21)  }
  else {class_corr = class_ano}

  if (i_ano == 0){ var class_final = class_corr}  
  else {class_final = class_final.addBands(class_corr)}

}

//******************************************************
//******************************************************
// Filtro agua ultimo ano
//******************************************************

Map.addLayer(col7, vis2, 'col9', true);
Map.addLayer(class_final, vis2, 'class_final area minima', true);


var class_2022 = class_final.select('classification_2022')
var class_2023 = class_final.select('classification_2023')

var agua_2023 = class_2023.eq(33).selfMask() //mascara de agua em 2023
Map.addLayer(agua_2023, {}, 'agua_2023', true);

var corr_2022 = class_2022.mask(agua_2023) //camada que classificação de 2022 para corrigir 2023
Map.addLayer(corr_2022, vis, 'corr_2022', true);

var class_2023_corr = class_2023.blend(corr_2022) //camada de 2023 corrigida

Map.addLayer(class_2023_corr, vis, 'class_2023_corr', true);
class_final = class_final.addBands(class_2023_corr,['classification_2023'],true)
print(class_final)

Map.addLayer(class_final.select('classification_2023'), vis, 'class_2023_corr_final', true);


//******************************************************
//******************************************************
// Filtro anv ano 2003
//******************************************************

Map.addLayer(class_final, vis2, 'class_final_2003', true);


var class_1998 = class_final.select('classification_1998')
var class_2003 = class_final.select('classification_2003')

var anv_1998 = class_1998.eq(22).selfMask().multiply(22) //mascara de anv em 2001
Map.addLayer(anv_1998, {}, 'anv_1998', true);

var class_2003_corr = class_2003.blend(anv_1998) //camada de 2023 corrigida

Map.addLayer(class_2003_corr, vis, 'class_2003_corr', true);
class_final = class_final.addBands(class_2003_corr,['classification_2003'],true)
print(class_final)

Map.addLayer(class_final.select('classification_2003'), vis, 'class_2003_corr_final', true);

print('class_final',class_final)

var vis3 = {
    'bands': 'classification_2023',
    'min': 0,
    'max': 62,
    'palette': palettes.get('classification8')
};

//******************************************************
//******************************************************
// Filtro campo 2022-2023 (impede regeneração de campo em pousio)
// COMENTAR SE FOR REGIÃO 1 E 5
//******************************************************

var lastYear = 2023
/// 21 para 12 no final da serie
var mask21 = class_final.select('classification_'+ (parseInt(lastYear) - 3)).eq(21)
          .and(class_final.select('classification_'+ (parseInt(lastYear) - 2)).eq(21))
          .and(class_final.select('classification_'+ (parseInt(lastYear) - 1)).eq(12))
          .and(class_final.select('classification_'+ (parseInt(lastYear))).eq(12))

Map.addLayer(class_final, vis3, 'class_final 2023', true);
Map.addLayer(mask21,{},'mask 21')
 
class_final = class_final.addBands(class_final.select('classification_2022').blend(mask21.multiply(21).selfMask()),
                                    ['classification_2022'],
                                    true)
                        .addBands(class_final.select('classification_2023').blend(mask21.multiply(21).selfMask()),
                                    ['classification_2023'],
                                    true)

Map.addLayer(class_final, vis3, '2023 mask 21/12 final', true);

/// 21 para 12 no final da serie parte 2
var mask21 = class_final.select('classification_'+ (parseInt(lastYear) - 2)).eq(21)
          .and(class_final.select('classification_'+ (parseInt(lastYear) - 1)).eq(21))
          .and(class_final.select('classification_'+ (parseInt(lastYear))).eq(12))

Map.addLayer(class_final, vis3, 'class_final 2023 ultimo', true);
Map.addLayer(mask21,{},'mask 21 ultimo')
 
class_final = class_final.addBands(class_final.select('classification_2023').blend(mask21.multiply(21).selfMask()),
                                    ['classification_2023'],
                                    true)

Map.addLayer(class_final, vis3, '2023 mask 21/12 final ultimo', true);

// //******************************************************
// //*********************************************************************
// // Filtro restinga arbórea 2023 (impede regeneração restinga arbórea)
// // RODAR APENAS PARA REGIÃO 7
// //*********************************************************************

// var class_49_2022 = class_final.select('classification_2022')
// var class_49_2023 = class_final.select('classification_2023')

// var rarb_2023 = class_49_2023.eq(3).selfMask() //mascara de arb em 2023
// Map.addLayer(rarb_2023, {}, 'rarb_2023', true);

// var corr_49_2022 = class_49_2022.mask(rarb_2023) //camada de classificação de 2022 para corrigir 2023
// Map.addLayer(corr_49_2022, vis, 'corr_49_2022', true);

// var class_49_2023_corr = class_49_2023.blend(corr_49_2022) //camada de 2023 corrigida

// Map.addLayer(class_49_2023_corr, vis, 'class_49_2023_corr', true);
// class_final = class_final.addBands(class_49_2023_corr,['classification_2023'],true)
// print(class_final)

// Map.addLayer(class_final.select('classification_2023'), vis, 'class_49_2023_corr_final', true);


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
