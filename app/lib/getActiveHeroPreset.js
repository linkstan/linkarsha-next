export function getActiveHeroPreset({

layout,
background

}){

const preset =
layout?.heroPreset || "cinematic";


/* ======================================== */
/* CINEMATIC */
/* ======================================== */

if(preset === "cinematic"){

return{

heroWidth:1280,

topSpacingDesktop:180,
topSpacingMobile:110,

titleScale:1.28,

contentGap:120,

introWidth:720,

heroColumns:
"minmax(460px,680px) minmax(320px,1fr)",

contentAlign:"start"

};

}


/* ======================================== */
/* EDITORIAL */
/* ======================================== */

if(preset === "editorial"){

return{

heroWidth:1180,

topSpacingDesktop:160,
topSpacingMobile:90,

titleScale:1.18,

contentGap:90,

introWidth:620,

heroColumns:
"minmax(520px,760px) minmax(260px,1fr)",

contentAlign:"start"

};

}


/* ======================================== */
/* CENTERED */
/* ======================================== */

if(preset === "centered"){

return{

heroWidth:980,

topSpacingDesktop:140,
topSpacingMobile:80,

titleScale:1.08,

contentGap:60,

introWidth:680,

heroColumns:"1fr",

contentAlign:"center"

};

}


/* ======================================== */
/* MINIMAL */
/* ======================================== */

return{

heroWidth:980,

topSpacingDesktop:120,
topSpacingMobile:70,

titleScale:1,

contentGap:50,

introWidth:560,

heroColumns:"1fr",

contentAlign:"center"

};

}
