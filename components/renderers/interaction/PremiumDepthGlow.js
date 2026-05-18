"use client";

export default function PremiumDepthGlow({

interaction

}){

return(

<div
style={{

position:"absolute",
inset:-40,

pointerEvents:"none",

background:`
radial-gradient(
circle at center,
rgba(255,255,255,${
interaction?.ambientShift || .08
}),
transparent 70%
)
`,

filter:"blur(40px)",

opacity:.8,

zIndex:0

}}
/>

);

}
