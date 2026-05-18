export function getDepthFog({

background,
isHero,
isMobile

}){

return{

enabled:true,

opacity:

isHero
? .22
: .12,

blur:

isMobile
? 80
: 140,

height:

isMobile
? 260
: 480

};

}
