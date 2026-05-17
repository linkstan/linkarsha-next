"use client";

export default function AtmosphereOverlay({

atmosphere,
background

}){

return(

<>

<div
style={{

position:"absolute",
inset:0,

background:

`
linear-gradient(
180deg,
rgba(255,255,255,${
atmosphere.overlayOpacity * .35
}),
rgba(0,0,0,${
atmosphere.overlayOpacity
})
)
`,

pointerEvents:"none",

mixBlendMode:"soft-light",

zIndex:0

}}
/>


<div
style={{

position:"absolute",

top:"-20%",
left:"50%",

transform:"translateX(-50%)",

width:"140vw",
height:"140vw",

borderRadius:"50%",

background:

`radial-gradient(
circle,
${background?.glowColor || "#7c7cff"}55 0%,
transparent 70%
)`,

opacity:
atmosphere.radialOpacity,

filter:
`blur(${atmosphere.blur}px)`,

pointerEvents:"none",

zIndex:0

}}
/>


<div
style={{

position:"absolute",
inset:0,

opacity:
atmosphere.noiseOpacity,

backgroundImage:
`
radial-gradient(circle at 20% 20%,rgba(255,255,255,.7) 1px,transparent 1px),
radial-gradient(circle at 80% 40%,rgba(255,255,255,.6) 1px,transparent 1px),
radial-gradient(circle at 40% 80%,rgba(255,255,255,.5) 1px,transparent 1px)
`,

backgroundSize:
"240px 240px",

pointerEvents:"none",

zIndex:0

}}
/>

</>

);

}
