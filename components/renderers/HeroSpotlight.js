"use client";

export default function HeroSpotlight({

spotlight,
background

}){

if(!spotlight?.enabled){

return null;

}

return(

<div
style={{

position:"absolute",

top:spotlight.y,

left:"50%",

transform:"translateX(-50%)",

width:spotlight.size,

height:spotlight.size,

borderRadius:"50%",

pointerEvents:"none",

zIndex:0,

background:`
radial-gradient(
circle,
rgba(255,255,255,${spotlight.opacity}),
transparent 72%
)
`,

filter:`blur(${spotlight.blur}px)`,

mixBlendMode:

background?.type === "ambient"
? "screen"
: "normal"

}}
/>

);

}
