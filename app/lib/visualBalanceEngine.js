export function getVisualBalance({

layout,
isHero,
isMobile

}){

/* ======================================== */
/* DEFAULT */
/* ======================================== */

const balance = {

introFlex:1,

contentFlex:1,

introOffset:0,

contentOffset:0

};


/* ======================================== */
/* HERO */
/* ======================================== */

if(isHero){

balance.introFlex = 1.1;

balance.contentFlex = .9;

}


/* ======================================== */
/* ASYMMETRIC */
/* ======================================== */

if(layout?.heroStyle === "asymmetric"){

balance.introFlex = 1.3;

balance.contentFlex = .7;

balance.introOffset =

isMobile
? 0
: -20;

}


/* ======================================== */
/* EDITORIAL */
/* ======================================== */

if(layout?.heroStyle === "editorial"){

balance.introFlex = 1.2;

balance.contentFlex = .8;

balance.contentOffset =

isMobile
? 0
: 20;

}


return balance;

}
