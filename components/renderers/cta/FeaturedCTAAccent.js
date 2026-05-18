"use client";

export default function FeaturedCTAAccent({

featured

}){

if(!featured) return null;

return(

<div
style={{

position:"absolute",

top:-40,
right:-40,

width:140,
height:140,

borderRadius:"50%",

background:
`
radial-gradient(
circle,
rgba(255,255,255,0.18),
transparent 72%
)
`,

filter:"blur(30px)",

pointerEvents:"none",

zIndex:0

}}
/>

);

}
