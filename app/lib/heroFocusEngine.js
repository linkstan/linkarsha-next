export function getHeroFocus({

layout,
isHero,
isMobile

}){

if(!isHero){

return{

titleWidth:1,
ctaScale:1,
heroBreathing:1

};

}


const heroStyle =
layout?.heroStyle || "minimal";


/* ======================================== */
/* CINEMATIC */
/* ======================================== */

if(heroStyle === "cinematic"){

return{

titleWidth:
isMobile ? .92 : .78,

ctaScale:1.12,

heroBreathing:1.24

};

}


/* ======================================== */
/* ASYMMETRIC */
/* ======================================== */

if(heroStyle === "asymmetric"){

return{

titleWidth:
isMobile ? .92 : .72,

ctaScale:1.18,

heroBreathing:1.34

};

}


/* ======================================== */
/* EDITORIAL */
/* ======================================== */

if(heroStyle === "editorial"){

return{

titleWidth:
isMobile ? .82 : .62,

ctaScale:1.04,

heroBreathing:1.16

};

}


/* ======================================== */
/* MINIMAL */
/* ======================================== */

return{

titleWidth:1,
ctaScale:1,
heroBreathing:1

};

}
