export function getCinematicMedia({

block,
layout,
background,
isMobile

}){

const featured =
block?.featured === true;

const type =
block?.type || "default";

const cinematic =
layout?.heroStyle === "cinematic";

const media =
type === "image"
||
type === "gallery"
||
type === "video";

return{

enabled:
media,

padding:

featured

? (
isMobile ? 12 : 22
)

: (
isMobile ? 8 : 16
),

radius:

featured
? 38
: 28,

shadow:

cinematic

? `
0 30px 90px rgba(0,0,0,.24)
`

: `
0 18px 50px rgba(0,0,0,.16)
`,

glowOpacity:

featured
? .22
: .12,

scale:

featured
? 1.02
: 1,

offset:

featured && !isMobile
? 20
: 0

};

}
