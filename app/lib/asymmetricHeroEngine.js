export function getAsymmetricHero({

layout,
isMobile

}){

const cinematic =
layout?.heroStyle === "cinematic";

return{

enabled:
cinematic && !isMobile,

columns:

cinematic
? "minmax(0,1.15fr) minmax(320px,.85fr)"
: "1fr",

contentOffset:
cinematic
? 40
: 0,

mediaOffset:
cinematic
? 80
: 0,

heroGap:

cinematic
? 120
: 72

};

}
