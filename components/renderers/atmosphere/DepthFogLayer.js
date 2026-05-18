"use client";

export default function DepthFogLayer({

fog

}){

if(!fog?.enabled){

return null;

}

return(

<div
style={{

position:"absolute",

left:0,
right:0,
bottom:-120,

height:fog.height,

background:
`
linear-gradient(
to bottom,
rgba(255,255,255,0),
rgba(255,255,255,.06)
)
`,

opacity:fog.opacity,

filter:
`blur(${fog.blur}px)`,

pointerEvents:"none",

zIndex:0

}}
/>

);

}
