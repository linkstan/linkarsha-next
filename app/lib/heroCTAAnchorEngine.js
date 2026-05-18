export function getHeroCTAAnchor({

layout,
isMobile

}){

const cinematic =
layout?.heroStyle === "cinematic";

return{

enabled:
cinematic,

offset:

isMobile
? 0
: 32,

maxWidth:

isMobile
? "100%"
: 420,

sticky:
cinematic && !isMobile

};

}
