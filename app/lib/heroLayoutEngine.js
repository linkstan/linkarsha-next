export function getHeroLayout({

layout,
heroPreset,
isMobile

}){

const preset =
layout?.heroLayout
||
heroPreset?.layout
||
"centered";


/* ================================================= */
/* CENTERED */
/* ================================================= */

if(
preset === "centered"
){

return {

contentAlign:"center",

introWidth:
isMobile
? "100%"
: 760,

contentGap:
isMobile
? 48
: 72,

heroColumns:"1fr",

ctaAlign:"center"

};

}


/* ================================================= */
/* EDITORIAL */
/* ================================================= */

if(
preset === "editorial"
){

return {

contentAlign:"flex-start",

introWidth:
isMobile
? "100%"
: 680,

contentGap:
isMobile
? 60
: 120,

heroColumns:

isMobile
? "1fr"
: "minmax(420px,680px) minmax(320px,1fr)",

ctaAlign:"flex-start"

};

}


/* ================================================= */
/* CINEMATIC SPLIT */
/* ================================================= */

if(
preset === "cinematicSplit"
){

return {

contentAlign:"flex-start",

introWidth:
isMobile
? "100%"
: 720,

contentGap:
isMobile
? 50
: 140,

heroColumns:

isMobile
? "1fr"
: "minmax(520px,760px) minmax(280px,1fr)",

ctaAlign:"flex-start"

};

}


/* ================================================= */
/* LUXURY */
/* ================================================= */

if(
preset === "luxury"
){

return {

contentAlign:"flex-start",

introWidth:
isMobile
? "100%"
: 820,

contentGap:
isMobile
? 60
: 180,

heroColumns:

isMobile
? "1fr"
: "minmax(560px,860px) minmax(260px,1fr)",

ctaAlign:"flex-start"

};

}


/* ================================================= */
/* DEFAULT */
/* ================================================= */

return {

contentAlign:"center",

introWidth:760,

contentGap:72,

heroColumns:"1fr",

ctaAlign:"center"

};

}
