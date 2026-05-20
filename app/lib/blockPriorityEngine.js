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

const isHero =
layout?.type === "hero";

/* ======================================= */
/* DEFAULT */
/* ======================================= */

const priority = {

tier:"normal",

scale:1,

spacingTop:
isMobile
? 22
: 30,

spacingBottom:
isMobile
? 22
: 30,

highlight:false,

accent:false,

elevated:false,

maxWidth:"100%"

};


/* ======================================= */
/* HERO PRIMARY CTA */
/* ======================================= */

if(
(type === "cta" || type === "button")
&&
index === 0
){

priority.tier = "primary";

priority.scale =
isMobile
? 1.02
: 1.04;

priority.spacingTop =
isMobile
? 34
: 52;

priority.spacingBottom =
isMobile
? 30
: 44;

priority.highlight = true;

priority.elevated = true;

priority.maxWidth =
isMobile
? "100%"
: "min(760px,100%)";

}


/* ======================================= */
/* FEATURE BLOCK */
/* ======================================= */

if(
size === "feature"
||
type === "pricing"
){

priority.tier = "feature";

priority.scale =
isMobile
? 1.03
: 1.06;

priority.spacingTop =
isMobile
? 42
: 70;

priority.spacingBottom =
isMobile
? 34
: 60;

priority.highlight = true;

priority.accent = true;

priority.elevated = true;

priority.maxWidth =
isMobile
? "100%"
: "min(920px,100%)";

}


/* ======================================= */
/* MEDIA */
/* ======================================= */

if(
type === "video"
||
type === "gallery"
){

priority.tier = "media";

priority.spacingTop =
isMobile
? 36
: 56;

priority.spacingBottom =
isMobile
? 30
: 46;

priority.maxWidth =
isMobile
? "100%"
: "min(980px,100%)";

}


/* ======================================= */
/* TRUST */
/* ======================================= */

if(
type === "testimonials"
||
type === "faq"
){

priority.tier = "trust";

priority.spacingTop =
isMobile
? 44
: 72;

priority.spacingBottom =
isMobile
? 38
: 64;

priority.maxWidth =
isMobile
? "100%"
: "min(860px,100%)";

}


/* ======================================= */
/* HERO ADJUSTMENT */
/* ======================================= */

if(
isHero
&&
priority.tier === "normal"
){

priority.spacingTop += 8;
priority.spacingBottom += 8;

}


return priority;

}
