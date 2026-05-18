export function getHeroStoryPanel({

layout,
background,
isMobile

}){

const config = {

enabled:false,

width:320,

blur:28,

opacity:.72,

offsetX:0,

offsetY:0,

padding:28,

radius:34,

shadow:1,

alignment:"right"

};


/* ======================================== */
/* HERO */
/* ======================================== */

if(
layout?.type === "hero"
){

config.enabled = true;

config.offsetX =
isMobile
? 0
: 80;

config.offsetY =
isMobile
? 20
: -20;

config.shadow = 1.3;

}


/* ======================================== */
/* ASYMMETRIC */
/* ======================================== */

if(
layout?.heroStyle === "asymmetric"
){

config.width =
isMobile
? "100%"
: 360;

config.offsetX =
isMobile
? 0
: 120;

config.padding = 34;

config.radius = 42;

}


/* ======================================== */
/* AMBIENT */
/* ======================================== */

if(
background?.type === "ambient"
){

config.blur += 10;

config.opacity += .08;

config.shadow += .2;

}


return config;

}
