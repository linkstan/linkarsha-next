"use client";

export default function CinematicCTAGroup({

children,
cinematic,
background

}){

return(

<div
style={{

position:"relative",

display:"flex",

flexDirection:"column",

gap:18,

padding:
cinematic?.padding,

borderRadius:
cinematic?.radius,

transform:
`scale(${cinematic?.scale || 1})`,

background:
`
rgba(
255,
255,
255,
0.06
)
`,

backdropFilter:
"blur(22px)",

border:
`1px solid rgba(
255,
255,
255,
${
cinematic?.borderOpacity || 0.08
}
)`,

boxShadow:
cinematic?.shadow,

overflow:"hidden",

transition:
"all 700ms cubic-bezier(.22,1,.36,1)"

}}
>

<div
style={{

position:"absolute",
inset:0,

background:
`
radial-gradient(
circle at top left,
rgba(
255,
255,
255,
${
cinematic?.glowOpacity || 0.05
}
),
transparent 70%
)
`,

pointerEvents:"none"

}}
/>

<div
style={{

position:"relative",
zIndex:2

}}
>

{children}

</div>

</div>

);

}
