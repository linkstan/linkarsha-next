export function getAtmosphere({

background,
theme,
isHero,
isMobile

}){

const intensity =
background?.atmosphereIntensity || 1;

const glow =
background?.glowOpacity || .18;

const cinematic =
background?.motionPreset === "cinematic";

const ambient =
background?.type === "ambient";


/* ================================================= */
/* OVERLAY */
/* ================================================= */

const overlayOpacity =

ambient

? (
cinematic
? .42 * intensity
: .26 * intensity
)

: .08;


/* ================================================= */
/* NOISE */
/* ================================================= */

const noiseOpacity =

ambient

? .04 * intensity

: .015;


/* ================================================= */
/* LIGHTING */
/* ================================================= */

const radialOpacity =

ambient

? (
isHero
? .30 * intensity
: .18 * intensity
)

: .08;


/* ================================================= */
/* BLUR */
/* ================================================= */

const blur =

isHero

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
/* RETURN */
/* ================================================= */

return{

overlayOpacity,
noiseOpacity,
radialOpacity,
blur,

ambient,
cinematic,
glow

};

}
