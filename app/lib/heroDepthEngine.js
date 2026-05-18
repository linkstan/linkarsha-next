export function getHeroDepth({

background,
layout

}){

const depth = {

avatarShadow:
"0 14px 34px rgba(0,0,0,.18)",

heroGlow:1,

surfaceDepth:1

};


/* ======================================== */
/* AMBIENT */
/* ======================================== */

if(background?.type === "ambient"){

depth.avatarShadow =
"0 20px 60px rgba(0,0,0,.34)";

depth.heroGlow = 1.3;

depth.surfaceDepth = 1.2;

}


/* ======================================== */
/* LUXURY */
/* ======================================== */

if(layout?.density === "luxury"){

depth.avatarShadow =
"0 24px 80px rgba(0,0,0,.24)";

depth.surfaceDepth = 1.28;

}


return depth;

}
