export function getCTACinematic({

block,
layout,
isMobile

}){

const type =
block?.data_json?.type;

const featured =
block?.featuredBlock;

const isCTA =
type === "cta";

const cinematic =
featured || isCTA;

return{

surface:

cinematic

? "cinematic"

: "default",

padding:

cinematic

? (
isMobile
? "20px 22px"
: "26px 30px"
)

: (
isMobile
? "14px 18px"
: "18px 22px"
),

radius:

cinematic

? 30
: 18,

scale:

cinematic
? 1.03
: 1,

shadow:

cinematic

? (
isMobile

? `
0 18px 40px rgba(
0,
0,
0,
0.18
)
`

: `
0 30px 70px rgba(
0,
0,
0,
0.22
)
`
)

: `
0 10px 30px rgba(
0,
0,
0,
0.12
)
`,

borderOpacity:

cinematic
? 0.18
: 0.08,

glowOpacity:

cinematic
? 0.16
: 0.05

};

}
