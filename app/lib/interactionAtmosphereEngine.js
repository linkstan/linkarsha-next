export function getInteractionAtmosphere({

background,
isHero,
isMobile

}){

const config = {

hoverLift:1,
hoverScale:1,
ambientShift:0,
magneticStrength:0,
depthResponse:1,
motionSmoothness:.32

};


/* ======================================== */
/* HERO */
/* ======================================== */

if(isHero){

config.hoverLift =
isMobile
? 4
: 10;

config.hoverScale = 1.015;

config.ambientShift = .12;

config.magneticStrength = .18;

config.depthResponse = 1.2;

config.motionSmoothness = .5;

}


/* ======================================== */
/* AMBIENT */
/* ======================================== */

if(
background?.type === "ambient"
){

config.hoverLift += 4;

config.hoverScale += .01;

config.ambientShift += .08;

config.depthResponse += .12;

}


/* ======================================== */
/* MOBILE */
/* ======================================== */

if(isMobile){

config.hoverLift *= .55;

config.magneticStrength *= .45;

}


return config;

}
