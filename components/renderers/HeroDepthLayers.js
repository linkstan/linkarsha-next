"use client";

export default function HeroDepthLayers({

background,
isHero,
isMobile,
layout

}){

if(!isHero){
return null;
}

const intensity =
background?.heroIntensity || 1;

const blur =
background?.glassBlur || 26;

const heroStyle =
layout?.heroStyle || "minimal";

const isAsymmetric =
heroStyle === "asymmetric";

return(

<>

{/* ===================================== */}
{/* PRIMARY GLOW */}
{/* ===================================== */}

<div
style={{

position:"absolute",

top:
isMobile
? -120
: -180,

left:
isAsymmetric
? "-10%"
: "50%",

transform:

isAsymmetric
? "none"
: "translateX(-50%)",

width:
isMobile
? 320
: 620,

height:
isMobile
? 320
: 620,

borderRadius:"50%",

background:
`radial-gradient(
circle,
rgba(255,255,255,.12),
transparent 72%
)`,

filter:
`blur(${blur * 2.2}px)`,

opacity:
0.55 * intensity,

pointerEvents:"none",

zIndex:0

}}
/>


{/* ===================================== */}
{/* SECONDARY DEPTH */}
{/* ===================================== */}

<div
style={{

position:"absolute",

top:
isMobile
? 180
: 240,

right:
isAsymmetric
? "-8%"
: "10%",

width:
isMobile
? 220
: 440,

height:
isMobile
? 220
: 440,

borderRadius:"50%",

background:
`radial-gradient(
circle,
rgba(255,255,255,.08),
transparent 75%
)`,

filter:
`blur(${blur * 2.4}px)`,

opacity:
0.42 * intensity,

pointerEvents:"none",

zIndex:0

}}
/>


{/* ===================================== */}
{/* ATMOSPHERE OVERLAY */}
{/* ===================================== */}

<div
style={{

position:"absolute",
inset:0,

background:
`
linear-gradient(
180deg,
rgba(255,255,255,.03),
transparent 30%,
transparent 70%,
rgba(255,255,255,.02)
)
`,

mixBlendMode:"soft-light",

pointerEvents:"none",

zIndex:0

}}
/>

</>

);

}
