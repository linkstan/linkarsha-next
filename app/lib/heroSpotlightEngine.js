export function getHeroSpotlight({

background,
layout,
isMobile

}){

const isAmbient =
background?.type === "ambient";

const cinematic =
layout?.heroStyle === "cinematic";

const editorial =
layout?.heroStyle === "editorial";

let intensity =
isAmbient
? .9
: .6;

if(cinematic){

intensity *= 1.35;

}

if(editorial){

intensity *= 1.15;

}

return{

enabled:true,

blur:

isMobile
? 120
: 220,

size:

isMobile
? 280
: 520,

opacity:

isMobile
? intensity * .16
: intensity * .22,

y:

isMobile
? -40
: -80

};

}
