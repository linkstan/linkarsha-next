export function getHeroLayers({

layout,
background,
isMobile

}){

const heroStyle =
layout?.heroStyle || "minimal";


/* ======================================== */
/* MINIMAL */
/* ======================================== */

if(heroStyle === "minimal"){

return{

contentZ:3,

mediaZ:2,

atmosphereZ:1,

contentOffsetX:0,
contentOffsetY:0,

mediaOffsetX:0,
mediaOffsetY:0,

mediaScale:1,

spotlightOpacity:.18

};

}


/* ======================================== */
/* CINEMATIC */
/* ======================================== */

if(heroStyle === "cinematic"){

return{

contentZ:5,

mediaZ:3,

atmosphereZ:1,

contentOffsetX:
isMobile ? 0 : -20,

contentOffsetY:0,

mediaOffsetX:
isMobile ? 0 : 40,

mediaOffsetY:-20,

mediaScale:1.08,

spotlightOpacity:.28

};

}


/* ======================================== */
/* ASYMMETRIC */
/* ======================================== */

if(heroStyle === "asymmetric"){

return{

contentZ:5,

mediaZ:4,

atmosphereZ:1,

contentOffsetX:
isMobile ? 0 : -40,

contentOffsetY:0,

mediaOffsetX:
isMobile ? 0 : 80,

mediaOffsetY:-30,

mediaScale:1.12,

spotlightOpacity:.34

};

}


/* ======================================== */
/* EDITORIAL */
/* ======================================== */

if(heroStyle === "editorial"){

return{

contentZ:5,

mediaZ:2,

atmosphereZ:1,

contentOffsetX:0,

contentOffsetY:0,

mediaOffsetX:
isMobile ? 0 : 50,

mediaOffsetY:0,

mediaScale:1.04,

spotlightOpacity:.20

};

}


/* ======================================== */
/* DEFAULT */
/* ======================================== */

return{

contentZ:3,

mediaZ:2,

atmosphereZ:1,

contentOffsetX:0,
contentOffsetY:0,

mediaOffsetX:0,
mediaOffsetY:0,

mediaScale:1,

spotlightOpacity:.18

};

}
