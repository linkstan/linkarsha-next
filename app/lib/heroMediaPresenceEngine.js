export function getHeroMediaPresence({

layout,
isMobile

}){

const heroStyle =
layout?.heroStyle || "minimal";


if(heroStyle === "cinematic"){

return{

mediaWidth:
isMobile ? "100%" : 420,

mediaHeight:
isMobile ? 280 : 560,

mediaRadius:42,

mediaReveal:true

};

}


if(heroStyle === "asymmetric"){

return{

mediaWidth:
isMobile ? "100%" : 520,

mediaHeight:
isMobile ? 320 : 640,

mediaRadius:48,

mediaReveal:true

};

}


if(heroStyle === "editorial"){

return{

mediaWidth:
isMobile ? "100%" : 360,

mediaHeight:
isMobile ? 260 : 520,

mediaRadius:24,

mediaReveal:true

};

}


return{

mediaWidth:
isMobile ? "100%" : 320,

mediaHeight:
isMobile ? 220 : 420,

mediaRadius:24,

mediaReveal:false

};

}
