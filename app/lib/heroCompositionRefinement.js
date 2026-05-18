export function getHeroCompositionRefinement({

layout,
isMobile

}){

const cinematic =
layout?.heroStyle === "cinematic";

const editorial =
layout?.type === "editorial";

return{

contentOffset:

cinematic

? (
isMobile ? 0 : -24
)

: editorial

? (
isMobile ? 0 : -12
)

: 0,

titleMaxWidth:

cinematic

? (
isMobile ? 540 : 820
)

: 720,

bioMaxWidth:

cinematic

? (
isMobile ? 420 : 620
)

: 520,

stackAlignment:

cinematic
? "flex-start"
: "center"

};

}
