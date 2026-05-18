export function getMediaPresentation({

type,
isHero,
isMobile

}){

/* ======================================== */
/* DEFAULT */
/* ======================================== */

const config = {

radius:34,

padding:
isMobile
? 18
: 26,

minHeight:
isMobile
? 240
: 340,

mediaHeight:
isMobile
? 240
: 420,

hoverScale:1.02,

shadowIntensity:1,

overlayOpacity:.18,

layout:"default"

};


/* ======================================== */
/* VIDEO */
/* ======================================== */

if(type === "video"){

config.radius = 38;

config.mediaHeight =
isMobile
? 280
: 520;

config.minHeight =
isMobile
? 300
: 560;

config.hoverScale = 1.03;

config.shadowIntensity = 1.4;

config.overlayOpacity = .26;

config.layout = "cinematic";

}


/* ======================================== */
/* GALLERY */
/* ======================================== */

if(type === "gallery"){

config.radius = 32;

config.mediaHeight =
isMobile
? 260
: 420;

config.minHeight =
isMobile
? 280
: 460;

config.hoverScale = 1.025;

config.shadowIntensity = 1.2;

config.overlayOpacity = .18;

config.layout = "editorial";

}


return config;

}
