export function getHeroVisualAnchor({

layout,
background,
isHero,
isMobile

}){

if(!isHero){

return{

show:false

};

}

const dark =
background?.mode === "dark";

return{

show:true,

width:

isMobile
? 240
: 460,

height:

isMobile
? 240
: 460,

blur:
120,

opacity:

dark
? 0.16
: 0.1,

x:

layout === "left"
? "-18%"
: "50%",

y:

isMobile
? "-10%"
: "-4%",

gradient:

dark

? `
radial-gradient(
circle,
rgba(255,255,255,0.14) 0%,
rgba(255,255,255,0.04) 45%,
transparent 72%
)
`

: `
radial-gradient(
circle,
rgba(0,0,0,0.08) 0%,
rgba(0,0,0,0.03) 45%,
transparent 72%
)
`

};

}
