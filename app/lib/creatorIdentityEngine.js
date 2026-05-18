export function getCreatorIdentity({

profile,
layout

}){

const heroStyle =
layout?.heroStyle || "minimal";


const displayName =
profile?.display_name
||
profile?.username
||
"Creator";


/* ======================================== */
/* CINEMATIC */
/* ======================================== */

if(heroStyle === "cinematic"){

return{

identityScale:1.18,

identityWeight:900,

identitySpacing:-0.06,

identityTransform:
displayName.length > 14
? .92
: 1

};

}


/* ======================================== */
/* ASYMMETRIC */
/* ======================================== */

if(heroStyle === "asymmetric"){

return{

identityScale:1.24,

identityWeight:900,

identitySpacing:-0.07,

identityTransform:
displayName.length > 14
? .88
: 1

};

}


/* ======================================== */
/* EDITORIAL */
/* ======================================== */

if(heroStyle === "editorial"){

return{

identityScale:1.08,

identityWeight:800,

identitySpacing:-0.05,

identityTransform:1

};

}


/* ======================================== */
/* DEFAULT */
/* ======================================== */

return{

identityScale:1,

identityWeight:700,

identitySpacing:-0.04,

identityTransform:1

};

}
