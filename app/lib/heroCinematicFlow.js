export function getHeroCinematicFlow({

layout,
isMobile

}){

const cinematic =
layout?.heroStyle === "cinematic";

return{

titleSpacing:

cinematic

? (
isMobile ? 18 : 28
)

: 12,

bioSpacing:

cinematic

? (
isMobile ? 26 : 40
)

: 18,

contentGap:

cinematic

? (
isMobile ? 24 : 42
)

: 20

};

}
