const advancedHeroLayouts = {

minimal:{

heroColumns:"1fr",

heroGap:60,

heroAlignment:"center",

introWidth:680,

visualWidth:0,

layoutStyle:"minimal"

},

cinematic:{

heroColumns:
"minmax(540px,760px) minmax(320px,1fr)",

heroGap:140,

heroAlignment:"start",

introWidth:760,

visualWidth:420,

layoutStyle:"cinematic"

},

editorial:{

heroColumns:
"minmax(520px,720px) minmax(280px,420px)",

heroGap:120,

heroAlignment:"start",

introWidth:720,

visualWidth:360,

layoutStyle:"editorial"

},

split:{

heroColumns:
"minmax(480px,1fr) minmax(480px,1fr)",

heroGap:100,

heroAlignment:"stretch",

introWidth:680,

visualWidth:520,

layoutStyle:"split"

}

};

export default advancedHeroLayouts;
