export function getPremiumComposition({

layout,
isHero,
isMobile

}){

/* ======================================== */
/* DEFAULT */
/* ======================================== */

const composition = {

contentColumns:"1fr",

heroColumns:"1fr",

contentGap:60,

heroGap:100,

heroAlignment:"center",

contentAlignment:"center",

introWidth:720,

blockWidth:"100%"

};


/* ======================================== */
/* HERO */
/* ======================================== */

if(isHero){

composition.heroGap =
isMobile
? 70
: 140;

composition.introWidth =
isMobile
? 640
: 760;

}


/* ======================================== */
/* SPLIT */
/* ======================================== */

if(
layout?.type === "split"
&&
!isMobile
){

composition.contentColumns =
`
minmax(420px,620px)
minmax(320px,1fr)
`;

composition.contentGap = 140;

composition.contentAlignment =
"start";

}


/* ======================================== */
/* EDITORIAL */
/* ======================================== */

if(
layout?.type === "editorial"
&&
!isMobile
){

composition.introWidth = 860;

composition.contentGap = 110;

composition.contentAlignment =
"start";

}


/* ======================================== */
/* HERO LEFT */
/* ======================================== */

if(
layout?.heroAlignment === "left"
&&
!isMobile
){

composition.heroColumns =
`
minmax(520px,760px)
minmax(260px,1fr)
`;

composition.heroAlignment =
"start";

}


/* ======================================== */
/* CENTERED */
/* ======================================== */

if(
layout?.heroAlignment === "center"
){

composition.heroAlignment =
"center";

}


return composition;

}
