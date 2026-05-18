export function getCinematicCTA({

block,
index,
isHero,
isMobile

}){

const type =
block?.data_json?.type;

const size =
block?.data_json?.size;


/* ======================================== */
/* DEFAULT */
/* ======================================== */

const config = {

featured:false,

scale:1,

minHeight:undefined,

paddingMultiplier:1,

shadowIntensity:1,

hoverLift:1,

priority:"normal"

};


/* ======================================== */
/* HERO PRIMARY */
/* ======================================== */

if(
isHero
&&
index === 0
){

config.featured = true;

config.scale =
isMobile
? 1.02
: 1.06;

config.minHeight =
isMobile
? 170
: 240;

config.paddingMultiplier = 1.2;

config.shadowIntensity = 1.4;

config.hoverLift = 1.2;

config.priority = "hero";

}


/* ======================================== */
/* FEATURE */
/* ======================================== */

if(
size === "feature"
||
type === "cta"
){

config.featured = true;

config.scale =
isMobile
? 1.01
: 1.04;

config.minHeight =
isMobile
? 150
: 210;

config.paddingMultiplier = 1.1;

config.shadowIntensity = 1.2;

config.hoverLift = 1.1;

config.priority = "feature";

}


return config;

}
