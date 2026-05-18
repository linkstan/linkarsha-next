export function getAmbientLight({

background,
isHero,
isMobile

}){

const intensity =
background?.atmosphereIntensity || 1;

return{

enabled:true,

blur:

isMobile
? 140
: 260,

opacity:

isHero
? (
0.16 * intensity
)
: (
0.10 * intensity
),

size:

isMobile
? 420
: 760,

gradient:

background?.ambientGradient

||

`
radial-gradient(
circle at center,
rgba(255,255,255,.18),
transparent 72%
)
`

};

}
