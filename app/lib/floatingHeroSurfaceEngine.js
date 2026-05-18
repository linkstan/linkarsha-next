export function getFloatingHeroSurface({

layout,
background,
isMobile

}){

const heroStyle =
layout?.heroStyle || "minimal";

const isAmbient =
background?.type === "ambient";


/* ======================================== */
/* MINIMAL */
/* ======================================== */

if(heroStyle === "minimal"){

return{

enabled:false,

surfaceBlur:0,

surfaceOpacity:.0,

surfaceRadius:0,

surfacePadding:
isMobile
? 0
: 0,

surfaceShadow:"none",

borderOpacity:0,

translateY:0

};

}


/* ======================================== */
/* CINEMATIC */
/* ======================================== */

if(heroStyle === "cinematic"){

return{

enabled:true,

surfaceBlur:
isAmbient ? 36 : 22,

surfaceOpacity:
isAmbient ? .10 : .72,

surfaceRadius:42,

surfacePadding:
isMobile
? 24
: 48,

surfaceShadow:

isAmbient

? `
0 40px 120px rgba(0,0,0,.45)
`

: `
0 40px 120px rgba(0,0,0,.12)
`,

borderOpacity:
isAmbient ? .12 : .32,

translateY:-12

};

}


/* ======================================== */
/* ASYMMETRIC */
/* ======================================== */

if(heroStyle === "asymmetric"){

return{

enabled:true,

surfaceBlur:
isAmbient ? 42 : 28,

surfaceOpacity:
isAmbient ? .12 : .78,

surfaceRadius:52,

surfacePadding:
isMobile
? 24
: 56,

surfaceShadow:

isAmbient

? `
0 60px 140px rgba(0,0,0,.55)
`

: `
0 60px 140px rgba(0,0,0,.14)
`,

borderOpacity:
isAmbient ? .14 : .26,

translateY:-20

};

}


/* ======================================== */
/* EDITORIAL */
/* ======================================== */

if(heroStyle === "editorial"){

return{

enabled:true,

surfaceBlur:
isAmbient ? 18 : 10,

surfaceOpacity:
isAmbient ? .08 : .92,

surfaceRadius:18,

surfacePadding:
isMobile
? 20
: 36,

surfaceShadow:
`
0 24px 60px rgba(0,0,0,.10)
`,

borderOpacity:
isAmbient ? .10 : .18,

translateY:-6

};

}


/* ======================================== */
/* DEFAULT */
/* ======================================== */

return{

enabled:false,

surfaceBlur:0,

surfaceOpacity:.0,

surfaceRadius:0,

surfacePadding:0,

surfaceShadow:"none",

borderOpacity:0,

translateY:0

};

}
