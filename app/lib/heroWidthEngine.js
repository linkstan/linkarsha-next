export function getHeroWidths({

layout,
isHero,
isMobile

}){

if(!isHero){

return{

introWidth:640,
bioWidth:540

};

}


/* ======================================== */
/* CINEMATIC */
/* ======================================== */

if(layout?.heroStyle === "cinematic"){

return{

introWidth:

isMobile
? "100%"
: 860,

bioWidth:

isMobile
? "100%"
: 640

};

}


/* ======================================== */
/* EDITORIAL */
/* ======================================== */

if(layout?.heroStyle === "editorial"){

return{

introWidth:

isMobile
? "100%"
: 760,

bioWidth:

isMobile
? "100%"
: 560

};

}


/* ======================================== */
/* ASYMMETRIC */
/* ======================================== */

if(layout?.heroStyle === "asymmetric"){

return{

introWidth:

isMobile
? "100%"
: 920,

bioWidth:

isMobile
? "100%"
: 620

};

}


/* ======================================== */
/* DEFAULT */
/* ======================================== */

return{

introWidth:

isMobile
? "100%"
: 700,

bioWidth:

isMobile
? "100%"
: 520

};

}
