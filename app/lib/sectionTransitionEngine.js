export function getSectionTransition({

layout,
background,
isMobile

}){

const cinematic =
layout?.heroStyle === "cinematic";

const ambient =
background?.type === "ambient";

return{

transitionHeight:

cinematic

? (
isMobile ? 140 : 240
)

: (
isMobile ? 80 : 140
),

blur:

ambient

? (
isMobile ? 80 : 140
)

: (
isMobile ? 40 : 80
),

opacity:

cinematic
? .9
: .55,

gradientStrength:

cinematic
? 1
: .72

};

}
