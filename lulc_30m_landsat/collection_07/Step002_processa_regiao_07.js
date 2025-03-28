/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var controles = ee.FeatureCollection("users/evelezmartin/shp/Controles_regiao_cel_3km"),
    anv = /* color: #ea9999 */ee.FeatureCollection([]),
    arocho = /* color: #ff8c00 */ee.FeatureCollection([]),
    agua = /* color: #0000ff */ee.FeatureCollection([]),
    floresta = /* color: #006400 */ee.FeatureCollection([]),
    aumi = /* color: #45c2a5 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-52.55040111114522, -32.13326345931629],
                  [-52.55130778531332, -32.133970132980934],
                  [-52.54909764508505, -32.13467877975781],
                  [-52.549183475773525, -32.13371574561561]]]),
            {
              "reference": 11,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-52.543041753778866, -32.12801832775086],
                  [-52.54302029610675, -32.129035936506654],
                  [-52.54119639397662, -32.129253994049094],
                  [-52.54089598656695, -32.1285634767101]]]),
            {
              "reference": 11,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-52.539566673834166, -32.13183768937183],
                  [-52.54096142252191, -32.132791657974074],
                  [-52.53904096086725, -32.13344580210689],
                  [-52.538558163244566, -32.133082389278904]]]),
            {
              "reference": 11,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-52.21844798818441, -31.88094868092144],
                  [-52.219016616495566, -31.879427237783702],
                  [-52.21957451597066, -31.880010308782207],
                  [-52.218791310938315, -31.880939570558265]]]),
            {
              "reference": 11,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-52.068335252121365, -31.624448043964197],
                  [-52.066618638351834, -31.62985618507342],
                  [-52.06550283940164, -31.625836650732154],
                  [-52.06773443730203, -31.6233517608242]]]),
            {
              "reference": 11,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-52.087953834966655, -31.675903633704323],
                  [-52.09258869214439, -31.680943578788796],
                  [-52.087181358770366, -31.680797497274035]]]),
            {
              "reference": 11,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-52.0733197025814, -31.674990570905393],
                  [-52.07486465497398, -31.679263627491544],
                  [-52.072203903631205, -31.677072340986175]]]),
            {
              "reference": 11,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.15243468898988, -29.74604839827391],
                  [-50.14994559902406, -29.74425987738118],
                  [-50.15440879482484, -29.74180060906317]]]),
            {
              "reference": 11,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.147540771781316, -29.7326559003513],
                  [-50.147776806174626, -29.731808106743607],
                  [-50.149064266501775, -29.732441623522647]]]),
            {
              "reference": 11,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.9327777092382, -31.200300908592833],
                  [-50.93350727009025, -31.202466663762333],
                  [-50.932219809763104, -31.202466663762333],
                  [-50.931704825632245, -31.20085152901423]]]),
            {
              "reference": 11,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.92260677265373, -31.185322804161885],
                  [-50.92505294727531, -31.188370012578545],
                  [-50.92209178852287, -31.188443438077]]]),
            {
              "reference": 11,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.96913491907015, -31.25209656520913],
                  [-50.97162400903597, -31.254921500680062],
                  [-50.96887742700472, -31.255251682425374],
                  [-50.96789037408724, -31.252353381017635]]]),
            {
              "reference": 11,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.9623542946805, -31.258663492835694],
                  [-50.964242569826986, -31.258480065305246],
                  [-50.96613084497347, -31.25994747556792],
                  [-50.96445714654818, -31.26075454148798]]]),
            {
              "reference": 11,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.967378088554646, -31.250785450803303],
                  [-50.96606917055538, -31.250491942090953],
                  [-50.9675497499316, -31.249895749710078]]]),
            {
              "reference": 11,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.02107792055423, -31.286856255437367],
                  [-51.02099208986575, -31.29052363495299],
                  [-51.01876049196536, -31.287883136081945]]]),
            {
              "reference": 11,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-52.60404596226819, -31.919729554458346],
                  [-52.60095605748303, -31.91841820547624],
                  [-52.6018143643678, -31.915649740675686],
                  [-52.604389285022094, -31.917835377705448]]]),
            {
              "reference": 11,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-52.137903235146126, -31.949509740030727],
                  [-52.1379890658346, -31.94433876359637],
                  [-52.14228060025843, -31.948781451098426]]]),
            {
              "reference": 11,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-52.12279703397425, -31.94120690398325],
                  [-52.12331201810511, -31.937637910593462],
                  [-52.12880518216761, -31.941279739139972]]]),
            {
              "reference": 11,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-52.22124483365687, -31.89164264094112],
                  [-52.22399141568812, -31.887488704199594],
                  [-52.22399141568812, -31.894047466039677]]]),
            {
              "reference": 11,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.873580459839616, -30.26328393500331],
                  [-50.86791563440016, -30.260022003782467],
                  [-50.86568403649977, -30.250087273111614],
                  [-50.874610428101334, -30.25542546225425]]]),
            {
              "reference": 11,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-52.50528128101135, -32.16764602428182],
                  [-52.50574262096191, -32.1668740599631],
                  [-52.5064614529779, -32.16731907548658],
                  [-52.50575334979797, -32.16764602428182]]]),
            {
              "reference": 11,
              "system:index": "20"
            })]),
    campo = /* color: #b8af4f */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.431664184822125, -30.518322429502042],
                  [-50.428402618660016, -30.514699287787494],
                  [-50.43260832239537, -30.51255491581339],
                  [-50.436384872688336, -30.516621787963754],
                  [-50.43509741236119, -30.51920970892743]]]),
            {
              "reference": 12,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-52.54575024823446, -32.1325709936924],
                  [-52.54647980908651, -32.13347952814113],
                  [-52.54259597043295, -32.13515120788382],
                  [-52.542188274662685, -32.13453341676524]]]),
            {
              "reference": 12,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-52.548689949314785, -32.13068121305435],
                  [-52.55047093610067, -32.131735134007734],
                  [-52.547938930790615, -32.13231660242522],
                  [-52.547402488987636, -32.13144439840914]]]),
            {
              "reference": 12,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-52.21587223436681, -31.883353831372318],
                  [-52.217288440726676, -31.8806025325813],
                  [-52.2176532211527, -31.88134958210207],
                  [-52.21696657564489, -31.883718235645155],
                  [-52.21615118410436, -31.88404619825808]]]),
            {
              "reference": 12,
              "system:index": "3"
            })]),
    agric = /* color: #ffefc3 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.440625029771425, -30.48944113385657],
                  [-50.43744929429779, -30.49077244526334],
                  [-50.42835124131928, -30.488997359340026],
                  [-50.433157759873964, -30.4854470903534],
                  [-50.43805010911713, -30.488331693770668]]]),
            {
              "reference": 21,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.432385283677675, -30.480861134563842],
                  [-50.43358691331635, -30.483450007133147],
                  [-50.430926161973574, -30.482118595554528],
                  [-50.43058283921967, -30.480491290004576]]]),
            {
              "reference": 21,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.418180304734804, -30.47103766282002],
                  [-50.41753657457123, -30.471592483000965],
                  [-50.414403754441835, -30.471000674695556],
                  [-50.41448958513031, -30.47003897852851],
                  [-50.41732199785004, -30.47000199002472]]]),
            {
              "reference": 21,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.42580779277396, -30.48073829610935],
                  [-50.42177375041556, -30.478038395108502],
                  [-50.42301829539847, -30.47715074006774],
                  [-50.42645152293753, -30.478445234297375]]]),
            {
              "reference": 21,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.75206399419367, -31.814327557378853],
                  [-51.750433211112615, -31.814327557378853],
                  [-51.750433211112615, -31.812066527262925],
                  [-51.75275063970148, -31.81323351746021]]]),
            {
              "reference": 21,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.76159120061457, -31.8094407454097],
                  [-51.75901627996027, -31.81454636380746],
                  [-51.75850129582941, -31.813014707921347],
                  [-51.76056123235285, -31.809076047582245]]]),
            {
              "reference": 21,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.741678480888005, -31.805210162092767],
                  [-51.74013352849543, -31.80761724187431],
                  [-51.73824525334894, -31.806887830381598],
                  [-51.74073434331476, -31.804043070532696]]]),
            {
              "reference": 21,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.75807214238703, -31.809513684802404],
                  [-51.75601220586359, -31.812504150314805],
                  [-51.75446725347101, -31.812066527262925],
                  [-51.75575471379816, -31.8099513199492]]]),
            {
              "reference": 21,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.75609803655207, -31.82074566385874],
                  [-51.7563555286175, -31.82256890819899],
                  [-51.75420976140558, -31.821839614783304],
                  [-51.75403810002863, -31.820162218066013]]]),
            {
              "reference": 21,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.75180650212824, -31.81133715090213],
                  [-51.75060487248957, -31.810972460561896],
                  [-51.75197816350519, -31.809003107843978],
                  [-51.75335145452082, -31.8099513199492]]]),
            {
              "reference": 21,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.7318079517132, -31.80820076692191],
                  [-51.73532700994074, -31.80280301959673],
                  [-51.7373011157757, -31.803532463339312],
                  [-51.732923750663396, -31.809076047582245]]]),
            {
              "reference": 21,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.763651137138005, -31.804772504485392],
                  [-51.76485276677668, -31.806231355114136],
                  [-51.763908629203435, -31.807690182706846]]]),
            {
              "reference": 21,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.75678468205988, -31.80382423922392],
                  [-51.756183867240544, -31.80097938504623],
                  [-51.75755715825617, -31.799155714505194],
                  [-51.75747132756769, -31.80345951922421]]]),
            {
              "reference": 21,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.72785974004328, -31.79025568593906],
                  [-51.724426512504216, -31.796748414284252],
                  [-51.722967390800115, -31.796529565700233],
                  [-51.726486449027654, -31.789453182229572]]]),
            {
              "reference": 21,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.75300813176691, -31.793392679049838],
                  [-51.74854493596613, -31.798280339861986],
                  [-51.75386643865168, -31.79091227470151]]]),
            {
              "reference": 21,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.292959999575906, -30.03300054099834],
                  [-50.29493410541087, -30.034338054848927],
                  [-50.2896984334138, -30.03946502404671],
                  [-50.286007713809305, -30.037756063788425]]]),
            {
              "reference": 21,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.29768068744212, -30.023414496861538],
                  [-50.29587824298411, -30.02950805862241],
                  [-50.29270250751048, -30.02757599422742],
                  [-50.296221565738016, -30.022448409990318]]]),
            {
              "reference": 21,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.263005089297586, -30.041248255499035],
                  [-50.26618082477122, -30.044888920054856],
                  [-50.26343424273997, -30.04578049097942],
                  [-50.26068766070872, -30.04243705863641]]]),
            {
              "reference": 21,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-50.28944094134837, -30.02534664236308],
                  [-50.284720253482156, -30.0246035139341],
                  [-50.28892595721751, -30.016874648080936],
                  [-50.29218752337962, -30.01880692102192]]]),
            {
              "reference": 21,
              "system:index": "18"
            })]),
    geom_limite = /* color: #bf04c2 */ee.Geometry.Polygon(
        [[[-50.076069858944706, -29.74771250288023],
          [-50.177689817313556, -29.677343322889183],
          [-50.22712662368082, -29.671377497533527],
          [-50.22987322490845, -29.721478713106173],
          [-50.25596496155418, -29.759634248280243],
          [-50.29304278361418, -29.85853249682898],
          [-50.3520923280188, -29.870441257274233],
          [-50.41663476429225, -29.839475183474832],
          [-50.504522483430556, -29.871631840163023],
          [-50.50726905195743, -29.9144914240591],
          [-50.66038515551571, -30.032294764156614],
          [-50.726987565761725, -30.07151986553254],
          [-50.7695581425367, -30.075084971808817],
          [-50.85607263077293, -30.148735968977217],
          [-51.033907966222344, -30.34684498359118],
          [-51.15749995066238, -30.398382528572675],
          [-51.23646145454027, -30.39364451573394],
          [-51.36760629543155, -30.503150897736923],
          [-51.42802905010157, -30.57707200316948],
          [-51.459613666832894, -30.6154887287128],
          [-51.52827581875177, -30.597759793052276],
          [-51.555054050303866, -30.570569153761593],
          [-51.601057699146374, -30.567021974130896],
          [-51.61959607159783, -30.629669731016502],
          [-51.681392138458065, -30.652413966700184],
          [-51.68036213942526, -30.608692951986157],
          [-51.72258972688531, -30.547510216279687],
          [-51.8022378403002, -30.55046678353819],
          [-51.81597027563408, -30.583574272839243],
          [-51.785758928831655, -30.630851078135677],
          [-51.760184902641974, -30.637346544241243],
          [-51.74696065775601, -30.679874370666408],
          [-51.783694970253094, -30.711764254991657],
          [-51.82180715206678, -30.69168634743204],
          [-51.88531905623028, -30.708216968662487],
          [-51.901111348180024, -30.759563113012593],
          [-51.92514309709263, -30.785520857209118],
          [-51.940248764144876, -30.82739244213375],
          [-51.91553039215831, -30.849205608685185],
          [-51.97183334158233, -30.872192502733007],
          [-52.024703181538335, -30.891638649225825],
          [-52.06178037238966, -30.883094473351235],
          [-52.08787235031566, -30.873371189055273],
          [-52.120830169371224, -30.889871002399158],
          [-52.16752042268083, -30.8845678171144],
          [-52.16305790756948, -30.86953930614929],
          [-52.177819756875536, -30.852742461806137],
          [-52.20528461326978, -30.84979514414916],
          [-52.249228369642616, -30.87160323512326],
          [-52.24579524707026, -30.90106572124792],
          [-52.21283741146682, -30.92521818373661],
          [-52.22862969605469, -30.935819788828073],
          [-52.354967994913466, -30.96408502747521],
          [-52.43118291542428, -31.014705932236325],
          [-52.450408292629, -31.0352997640373],
          [-52.423630013520864, -31.10175795998327],
          [-52.409210963340385, -31.10998847778954],
          [-52.337802378542534, -31.091174761049956],
          [-52.230689478527246, -31.093526628265703],
          [-52.269140220937544, -31.166407074481185],
          [-52.18674566529267, -31.22514077261618],
          [-52.08237926053936, -31.25801569908498],
          [-52.255407683766926, -31.375332813988525],
          [-52.4311824744845, -31.56507587844466],
          [-52.57399945273164, -31.68902032522373],
          [-52.546534541377504, -31.780119074057104],
          [-52.66737974858964, -31.77778442013355],
          [-52.790971466427926, -31.754433824236465],
          [-52.95301372861237, -31.86879610637575],
          [-52.859633258623205, -31.936412950664927],
          [-53.172731631899424, -32.20173553159407],
          [-53.332027076584716, -32.396742776491166],
          [-53.49132301978385, -32.3410695678564],
          [-53.64512580273293, -32.37355019148058],
          [-53.694562215687675, -32.45701758982158],
          [-53.20568835288731, -32.739302935885185],
          [-53.54075779778598, -33.103561661498354],
          [-53.57920767240407, -33.420481277616425],
          [-53.581989864151225, -33.71684387374902],
          [-53.502305632611964, -33.720258662940616],
          [-53.43360419801349, -33.767732384759015],
          [-53.36486514218515, -33.76721355953684],
          [-53.1837147853746, -33.63798034005475],
          [-52.661885135976505, -33.2047321959197],
          [-52.491603814946686, -32.979235832175725],
          [-52.326815471615674, -32.55429682724444],
          [-52.23343531936628, -32.3132186874899],
          [-52.039354479885766, -32.14355603183673],
          [-51.80773091853532, -31.941073846430832],
          [-51.30237812274273, -31.639929953900996],
          [-50.76681327805835, -31.145254538705927],
          [-50.51825577096785, -30.788471081710323],
          [-50.29441572225099, -30.506110495394086],
          [-50.23666881083668, -30.340218118710634],
          [-50.19279581685783, -30.18613533694897],
          [-50.02869170013813, -29.831768133537253]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Coleção 6
// Script para fazer ajuste fino da classificação das regiões
// Para rodar veja instruções no final do arquivo 
//baseado na versao R0X feita pelo Juliano, customizada para calcular a area pelo limite sem buffer
//customizada para incluir mosaico 2017 com duas versões de bandas RGB falsa cor
 
//var classRegion01 = function (version_out, sufixName, versao_amostra, RFtrees) {
var version_out = '031'//mudar a cada nova versao que for exportada
var version = '2' //versão dos mosaicos
var version_samples = '03'
var ano_base = 2000
var RFtrees = 100//60, 100 
var classe_diferenca = 12 // classe para mapa de diferenças

var desvio = 0
var nSamplesMin = 200;
var nSamplesMax = 2000;

var regiao = 7
var collection_out = 7
var versaocomplementares = '01' 

var bioma = 'PAMPA'

//conjunto de flags para ativar e desativar recursos de processamento
//*****************************************
//definir com 1 para usar e como zero para não usar
var importar_estaveis = 1    //definir com 1 para importar e como zero para gerar a partir de pontos estaveis
var usar_complementares = 1

var debug = 1   //variavel para uso de debug, habilita os prints e os addLayers
var calcula_acuracia = 1
var calcula_area = 1 
var ano_calcula_area = '2017'
var calcula_confusao = 1 //se calcula acuracia igual a zero esse é ignorado
var exporta_colecao = 0//ativar a geometria do bioma antes de dar o Run
//*************************************
//var dirasset =  'projects/nexgenmap/MapBiomas2/LANDSAT/mosaics';
//var dirasset7 = 'projects/nexgenmap/MapBiomas2/LANDSAT/mosaics-landsat-7';

var dirasset =  'projects/nexgenmap/MapBiomas2/LANDSAT/BRAZIL/mosaics-2-pampa';

//pontos estaveis com propriedades
var dirsamples = 'projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/SAMPLES/v' + version_samples + '/training_periodosFO_'
//var dirsamples = 'projects/mapbiomas-workspace/AMOSTRAS/col6/PAMPA/SAMPLES_FO/training_LabGeo_FO_SHP'
var dircomple = 'projects/mapbiomas-workspace/AMOSTRAS/col5/PAMPA/'
var dirout = 'projects/mapbiomas-workspace/AMOSTRAS/col7/PAMPA/class_col7/'

var regioesCollection = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05_buff')
var limite = regioesCollection.filterMetadata('ID', 'equals', regiao);

//limite sem o buffer  
var regioesCollection2 = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/REGIOES/VETOR/PAMPA_regioes_col05')
var limite2 = regioesCollection2.filterMetadata('ID', 'equals', regiao);

var limite_reg_raster = ee.Image('projects/mapbiomas-workspace/AUXILIAR/PAMPA/Pampa_regions_col5_raster_buff')

var diferenca = require('users/schirmbeckj/MapBiomas:Coll07/Passo100_Mapa_Diferencas_Classe_v02.js').diferenca
var vischange = {"min": 0, "max": 3,
        "palette": "ffffff,ff0000,e6f919,aaaaaa",    //amarelo=e6f919    magenta=bb34c0
        "format": "png"
  }
  
if (exporta_colecao == 1){
  debug = 0
  limite = geom_limite
  var anos = [
    1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,
    1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,
    2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021
													 
    ];
}else
{
    var anos = [1990,2000,2010,2017,2020]
    limite = limite.geometry()
}


var biomes = ee.Image('projects/mapbiomas-workspace/AUXILIAR/biomas-raster-41')
var bioma250mil_PA = biomes.mask(biomes.eq(6))

var palettes = require('users/mapbiomas/modules:Palettes.js');

//nomes bandas
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
])}

//vis coll 05
//var vis = { 'bands': ['classification_' + String(ano_base)], 'min': 0, 'max': 45,  'palette': palettes.get('classification5')};
var vis = {'min': 0, 'max': 45,  'palette': palettes.get('classification5')};
var visParMedian = {'bands':['swir1_m','nir_m','red_m'], 'gain':[0.08, 0.06,0.2],'gamma':0.5 };
var visParMedian2 = {'bands':['nir_m','swir1_m','red_m'], 'gain':[0.06, 0.08,0.2],'gamma':0.5 };

var mosaicos1 = ee.ImageCollection(dirasset)
                  .filterMetadata('biome', 'equals', bioma)
                  .filterMetadata('version', 'equals', version)
//var mosaicos2 = ee.ImageCollection(dirasset7)
//                  .filterMetadata('biome', 'equals', bioma)
//                  .filterMetadata('version', 'equals', version)
var mosaicos = mosaicos1//.merge(mosaicos2)
   
//print('mosaicos',mosaicos)
var n_amostas = ee.Feature(ee.Geometry.Point([0, 0]))

for (var i_ano=0;i_ano<anos.length; i_ano++){
  var ano = anos[i_ano];
if (ano <= 1994){ // ajustar para período 1
    var percent_Flo = -67.15    + desvio + ano *  0.03533
    var percent_Umi =   8.23	  + desvio + ano * -0.00086
    var percent_Cam =-168.52    + desvio + ano *  0.09066
    var percent_Agr = 230.34    + desvio + ano * -0.09970
    var percent_Anv =  58.27	  + desvio + ano * -0.02647
    var percent_Afr =   0.00000 + desvio + ano *  0.00000
    var percent_Agu =  38.84	  + desvio + ano *  0.00103
 }
 if (ano > 1994 && ano <= 2004){// ajustar para período 2
    var percent_Flo = -67.15    + desvio + ano *  0.03533
    var percent_Umi =   8.23	  + desvio + ano * -0.00086
    var percent_Cam =-168.52    + desvio + ano *  0.09066
    var percent_Agr = 230.34    + desvio + ano * -0.09970
    var percent_Anv =  58.27	  + desvio + ano * -0.02647
    var percent_Afr =   0.00000 + desvio + ano *  0.00000
    var percent_Agu =  38.84	  + desvio + ano *  0.00103
 }
 if (ano > 2004){ // ajustar para período 3
    var percent_Flo = -67.15    + desvio + ano *  0.03533
    var percent_Umi =   8.23	  + desvio + ano * -0.00086
    var percent_Cam =-168.52    + desvio + ano *  0.09066
    var percent_Agr = 230.34    + desvio + ano * -0.09970
    var percent_Anv =  58.27	  + desvio + ano * -0.02647
    var percent_Afr =   0.00000 + desvio + ano *  0.00000
    var percent_Agu =  38.84	  + desvio + ano *  0.00103
 } 
  var mosaicoTotal =   mosaicos.filterMetadata('year', 'equals', ano)
                      .filterBounds(limite)
                      .mosaic()
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
  //Map.addLayer(ndvi_a_3y, {}, 'ndvi_a_3y', true);
  mosaicoTotal = mosaicoTotal.addBands(ndvi_a_3y)

  var ll = ee.Image.pixelLonLat().mask(bioma250mil_PA);
  
  var long = ll.select('longitude').add(0).multiply(-1).multiply(1000).toInt16()
  var lati = ll.select('latitude').add(0).multiply(-1).multiply(1000).toInt16()

  mosaicoTotal = mosaicoTotal.addBands(long.rename('longitude'))
  mosaicoTotal = mosaicoTotal.addBands(lati.rename('latitude' ))
  //print('mosaico',mosaicoTotal)

  mosaicoTotal = mosaicoTotal.select(bandNames,bandNamesShort)
  
  //if (debug == 1){Map.addLayer(mosaicoTotal, visParMedian, 'Img_Year_'+ano, false)}
  
 if (importar_estaveis == 1){
    var SS_amostras = ee.FeatureCollection(dirsamples + ano)
    //var SS_amostras = ee.FeatureCollection(dirsamples + ano + '_v' + version_samples)
        .filter(ee.Filter.lt('outlier', 20))
    //print(SS_amostras.size())
    var SS_Flo = SS_amostras.filterMetadata('reference', 'equals', 3)
    var SS_Umi = SS_amostras.filterMetadata('reference', 'equals', 11)
    var SS_Cam = SS_amostras.filterMetadata('reference', 'equals', 12)
    var SS_Agr = SS_amostras.filterMetadata('reference', 'equals', 21)
    var SS_Anv = SS_amostras.filterMetadata('reference', 'equals', 22)
    var SS_Afr = SS_amostras.filterMetadata('reference', 'equals', 29)
    var SS_Agu = SS_amostras.filterMetadata('reference', 'equals', 33)

    var n_samples_Flo = ee.Number(ee.Number(nSamplesMax).multiply(percent_Flo).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
    var n_samples_Umi = ee.Number(ee.Number(nSamplesMax).multiply(percent_Umi).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
    var n_samples_Cam = ee.Number(ee.Number(nSamplesMax).multiply(percent_Cam).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
    var n_samples_Agr = ee.Number(ee.Number(nSamplesMax).multiply(percent_Agr).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
    var n_samples_Anv = ee.Number(ee.Number(nSamplesMax).multiply(percent_Anv).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
    var n_samples_Afr = ee.Number(ee.Number(nSamplesMax).multiply(percent_Afr).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)
    var n_samples_Agu = ee.Number(ee.Number(nSamplesMax).multiply(percent_Agu).divide(100)).round().int16().max(nSamplesMin).min(nSamplesMax)

    var SS_Flo_samples = SS_Flo.randomColumn().sort('random').limit(n_samples_Flo)
    var SS_Umi_samples = SS_Umi.randomColumn().sort('random').limit(n_samples_Umi)
    var SS_Cam_samples = SS_Cam.randomColumn().sort('random').limit(n_samples_Cam)
    var SS_Agr_samples = SS_Agr.randomColumn().sort('random').limit(n_samples_Agr)
    var SS_Anv_samples = SS_Anv.randomColumn().sort('random').limit(n_samples_Anv)
    var SS_Afr_samples = SS_Afr.randomColumn().sort('random').limit(n_samples_Afr)
    var SS_Agu_samples = SS_Agu.randomColumn().sort('random').limit(n_samples_Agu)

//    print('SS_Flo_samples',SS_Flo_samples)
//    print('SS_Flo',SS_Flo)
//    Map.addLayer(SS_Flo,{color:'0000ff'},'todos')
//    Map.addLayer(SS_Flo_samples,{color:'ff0000'},'selecao')
    
    //cria variavel com todas as amostras estáveis
    var SS_amostras = SS_Flo_samples
            .merge(SS_Umi_samples)
            .merge(SS_Cam_samples)
            .merge(SS_Agr_samples)
            .merge(SS_Anv_samples)
            //.merge(SS_Afr_samples)
            .merge(SS_Agu_samples)
   
    n_amostas = n_amostas.set(String(ano),[
      SS_Flo_samples.size().subtract(n_samples_Flo),
      SS_Umi_samples.size().subtract(n_samples_Umi),
      SS_Cam_samples.size().subtract(n_samples_Cam),
      SS_Agr_samples.size().subtract(n_samples_Agr),
      SS_Anv_samples.size().subtract(n_samples_Anv),
      SS_Afr_samples.size().subtract(n_samples_Afr),
      SS_Agu_samples.size().subtract(n_samples_Agu)])
    //print('primeiro elemento estaveis',training.first())
  }
  // Amostras complementares
  //var complementares = ee.FeatureCollection('')
  
  if(usar_complementares == 1){
  
    var pontos_complementares = floresta
                .merge(aumi)
                .merge(campo)
                .merge(agric)
                .merge(anv)
                .merge(arocho)
                .merge(agua)
                
    // Samples 
    var trainingComp = mosaicoTotal.sampleRegions({
        'collection': pontos_complementares,
        'properties': ['reference'],
        'scale': 30
    });
    var complementares = trainingComp.map(function (feature) {return feature.set('comp_coll', '7')});
  }

   
  if (usar_complementares == 0){
    var training = SS_amostras//.merge(complementares)
  }else{
    var training = SS_amostras.merge(complementares)
    //var training = complementares
  }  
  
  //classificador sem informações de importÂncia e arvores 
  
  //print(training.first())
  var classifier = ee.Classifier.smileRandomForest({numberOfTrees: RFtrees, variablesPerSplit:1}).train(training, 'reference', bandNamesShort);
  
  //classificador com informações de importÂncia e arvores
  //var classifier = ee.Classifier.smileRandomForest({numberOfTrees: RFtrees, variablesPerSplit:1}).train(training, 'reference', bandNames);
  //if (debug == 1){print('importância',classifier.explain())}
  
  var classified = mosaicoTotal.classify(classifier).mask(mosaicoTotal.select('red_m'));
  classified = classified.select(['classification'],['classification_'+ano]).clip(limite).toInt8()
  //if (debug == 1){print('classified',classified)}

    if(debug == 1){
    //camadas usadas para o processo de coleta de amostras
    //ajsutar para coleção preliminar da versao 5
    var colecao6 = ee.Image('projects/mapbiomas-workspace/AMOSTRAS/col6/PAMPA/class_col6_mosaic/PAMPA_03')
        colecao6 = colecao6.select('classification_'+ano)
        .clip(limite)
        
    Map.addLayer(mosaicoTotal, visParMedian, 'Img_Year_' + String(ano), false)  
    Map.addLayer(colecao6, vis, 'Colecao 6 - ' +  ano, false)
    Map.addLayer(classified, vis, 'RF Teste ' + ano)
    var img_dif = diferenca(colecao6,classified,classe_diferenca, false)
    Map.addLayer(img_dif,vischange,'Diferença classe ' + String(classe_diferenca) + ' ' + String(ano),false)
  }
  
  if (i_ano == 0){ var classified85a21 = classified }  
  else {classified85a21 = classified85a21.addBands(classified); }
}


//print('classified85a21', classified85a21)
print('diponibilidade de amostras x balanceamento',n_amostas)

classified85a21 = classified85a21.mask(limite_reg_raster.eq(regiao))
  
classified85a21 = classified85a21
    .set('collection', collection_out)
    .set('version', version_out)
    .set('biome', bioma)

Export.image.toAsset({
  'image': classified85a21.toInt8(),
  'description': regiao+'-'+'RF85a21_v'+version_out,
  'assetId': dirout + '0'+ regiao + '_' + 'RF85a21_v'+version_out,
  'scale': 30,
  'pyramidingPolicy': {
      '.default': 'mode'
  },
  'maxPixels': 1e13,
  'region': limite
});    

//***************************************************************
//Funções de cálculo de area
//***************************************************************
//***************************************************************
//***************************************************************


if (debug == 1){
      //calculo da acuracia
  if (calcula_acuracia == 1){
    var acura_region = require('users/schirmbeckj/MapBiomas:Coll05_final/Coll05/Passo008_acuracia_class_2017_Pampa_Regioes_function.js').acura_region;
    // o 'calcula_confusao' como ultimo parâmetro da função de acuracia é usado para
   //ativar ou desativar o cáculo da Matriz de Confusão    
	
	var acc = acura_region(classified85a21, '2017',regiao,version_out,calcula_confusao);
  }
  //print(classified85a21)
  //cálculo da area de cada classe
  
  if (calcula_area == 1){
        // get raster with area km2
    var pixelArea = ee.Image.pixelArea().divide(1000000);
    /**
     * Helper function
     * @param item 
     */
    var convert2featCollection = function (item) {
        item = ee.Dictionary(item);
        var feature = ee.Feature(ee.Geometry.Point([0, 0]))
            .set('classe', item.get('classe'))
            .set('area', item.get('sum'));
        return feature;
    };
    
    /**
     * Calculate area crossing a cover map (deforestation, mapbiomas)
     * and a region map (states, biomes, municipalites)
     * @param image 
     * @param geometry
     */ 
    var calculateArea = function (image, geometry) {
        var reducer = ee.Reducer.sum().group(1, 'classe');
        var areas = pixelArea.addBands(image)
            .reduceRegion({
                reducer: reducer,
                geometry: geometry,
                scale: 120,
                maxPixels: 1e12,
                tileScale:4
            });
        var year = ee.Number(image.get('year'));
        areas = ee.List(areas.get('groups')).map(convert2featCollection);
        areas = ee.FeatureCollection(areas);
        return areas;
    };
    
    // get raster with area km2
    var areas = calculateArea(classified85a21.select('classification_' + ano_calcula_area).selfMask(), limite2)
        .map(
            function(feature){
                return feature.set('year', String(ano_calcula_area));
            }
        );
    //print(areas);
    
    print('Área da classe 03 ano: ' + ano_calcula_area +  ' ' , areas.filterMetadata('classe','equals', 3).first().get('area'))
    print('Área da classe 11 ano: ' + ano_calcula_area +  ' ' , areas.filterMetadata('classe','equals',11).first().get('area'))
    print('Área da classe 12 ano: ' + ano_calcula_area +  ' ' , areas.filterMetadata('classe','equals',12).first().get('area'))
    print('Área da classe 21 ano: ' + ano_calcula_area +  ' ' , areas.filterMetadata('classe','equals',21).first().get('area'))
    print('Área da classe 22 ano: ' + ano_calcula_area +  ' ' , areas.filterMetadata('classe','equals',22).first().get('area'))
    print('Área da classe 29 ano: ' + ano_calcula_area +  ' ' , areas.filterMetadata('classe','equals',29).first().get('area'))
    print('Área da classe 33 ano: ' + ano_calcula_area +  ' ' , areas.filterMetadata('classe','equals',33).first().get('area'))
  }
}

//***************************************************************
//***************************************************************
//***************************************************************

var controles = ee.FeatureCollection("users/evelezmartin/shp/Controles_regiao_cel_3km");
var blank = ee.Image(0).mask(0);
var outline = blank.paint(controles, 'AA0000', 2); 
var visPar = {'palette':'000000','opacity': 0.6};
if (debug == 1){Map.addLayer(outline, visPar, 'Áreas controle', false)}

var biomeCode2019 = 'Pampa';
var biomas = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas_IBGE_250mil')
   .filterMetadata('Bioma', 'equals', biomeCode2019);
    
var blank = ee.Image(0).mask(0);
var outline = blank.paint(biomas, 'AA0000', 2); 
var visPar = {'palette':'000000','opacity': 0.6};
if (debug == 1){Map.addLayer(outline, visPar, 'Bioma', false)}

var blank = ee.Image(0).mask(0);
var outline = blank.paint(limite, 'AA0000', 2); 
var visPar = {'palette':'000000','opacity': 0.6};
if (debug == 1){Map.addLayer(outline, visPar, 'Limite região 0' + String(regiao), false)}
Map.centerObject(limite)

 