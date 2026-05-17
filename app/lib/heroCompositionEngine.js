export function getHeroComposition({

layout,
isMobile,
background,
text

}){

const heroAlignment =
layout?.heroAlignment || "center";

const cinematic =
layout?.cinematicHero;

const atmosphere =
background?.atmosphereIntensity || 1;

const density =
text?.density || "balanced";


/* ================================================= */
/* SPACING */
/* ================================================= */

const topSpacing =

cinematic

? (
isMobile
? 140
: 240
)

: (
isMobile
? 100
: 180
);


const bottomSpacing =

cinematic

? (
isMobile
? 90
: 140
)

: (
isMobile
? 60
: 100
);


/* ================================================= */
/* CONTENT WIDTH */
/* ================================================= */

const contentWidth =

heroAlignment === "left"

? (
isMobile
? 540
: 920
)

: (
isMobile
? 560
: 1200
);


/* ================================================= */
/* TYPOGRAPHY WIDTH */
/* ================================================= */

const textWidth =

cinematic

? (
isMobile
? 420
: 780
)

: (
isMobile
? 340
: 620
);


/* ================================================= */
/* COMPOSITION GAP */
/* ================================================= */

const compositionGap =

density === "compact"

? 24

: density === "luxury"

? 54

: 38;


/* ================================================= */
/* HERO SCALE */
/* ================================================= */

const heroScale =

cinematic

? (
1.08 * atmosphere
)

: 1;


/* ================================================= */
/* RETURN */
/* ================================================= */

return{

topSpacing,
bottomSpacing,

contentWidth,
textWidth,

compositionGap,
heroScale

};

}
