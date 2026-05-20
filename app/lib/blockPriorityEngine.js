export function getBlockPriority({

block,
index,
layout,
isMobile

}){

const type =
block?.data_json?.type || "button";

const size =
block?.data_json?.size || "normal";

const featured =
block?.featuredBlock?.featured;


/* ======================================== */
/* DEFAULT */
/* ======================================== */

const config = {

priority:"normal",

scale:1,

spacingTop:0,
spacingBottom:0,

paddingMultiplier:1,

accent:false,

elevated:false,

width:"100%",

contentWidth:"100%"

};


/* ======================================== */
/* HERO CTA */
/* ======================================== */

if(
type === "cta"
&&
index === 0
){

config.priority = "hero";

config.scale =
isMobile
? 1.02
: 1.04;

config.spacingTop =
isMobile
? 18
: 40;

config.spacingBottom =
isMobile
? 24
: 56;

config.paddingMultiplier = 1.2;

config.elevated = true;

config.accent = true;

config.contentWidth =
isMobile
? "100%"
: "min(760px,100%)";

}


/* ======================================== */
/* FEATURED */
/* ======================================== */

if(
featured
||
size === "feature"
){

config.priority = "feature";

config.scale =
isMobile
? 1.01
: 1.03;

config.spacingTop +=
isMobile
? 14
: 30;

config.spacingBottom +=
isMobile
? 18
: 40;

config.paddingMultiplier *= 1.12;

config.elevated = true;

config.contentWidth =
isMobile
? "100%"
: "min(820px,100%)";

}


/* ======================================== */
/* VIDEO */
/* ======================================== */

if(type === "video"){

config.spacingTop +=
isMobile
? 20
: 44;

config.spacingBottom +=
isMobile
? 28
: 54;

config.contentWidth =
isMobile
? "100%"
: "min(920px,100%)";

}


/* ======================================== */
/* GALLERY */
/* ======================================== */

if(type === "gallery"){

config.spacingTop +=
isMobile
? 18
: 40;

config.spacingBottom +=
isMobile
? 26
: 50;

config.contentWidth =
isMobile
? "100%"
: "min(980px,100%)";

}


/* ======================================== */
/* TESTIMONIALS */
/* ======================================== */

if(type === "testimonials"){

config.spacingTop +=
isMobile
? 30
: 80;

config.spacingBottom +=
isMobile
? 26
: 60;

config.contentWidth =
isMobile
? "100%"
: "min(760px,100%)";

}


/* ======================================== */
/* PRICING */
/* ======================================== */

if(type === "pricing"){

config.priority = "conversion";

config.spacingTop +=
isMobile
? 34
: 90;

config.spacingBottom +=
isMobile
? 38
: 100;

config.paddingMultiplier *= 1.18;

config.elevated = true;

config.accent = true;

config.contentWidth =
isMobile
? "100%"
: "min(860px,100%)";

}


/* ======================================== */
/* FAQ */
/* ======================================== */

if(type === "faq"){

config.spacingTop +=
isMobile
? 24
: 64;

config.spacingBottom +=
isMobile
? 24
: 64;

config.contentWidth =
isMobile
? "100%"
: "min(760px,100%)";

}


/* ======================================== */
/* MUSIC */
/* ======================================== */

if(type === "music"){

config.spacingTop +=
isMobile
? 14
: 32;

config.spacingBottom +=
isMobile
? 20
: 42;

config.contentWidth =
isMobile
? "100%"
: "min(680px,100%)";

}


return config;

}
