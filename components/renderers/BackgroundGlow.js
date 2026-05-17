"use client";

export default function BackgroundGlow({

background,
isHero,
isMobile,
motionDuration,
floatAnimation

}){

return(

<div
style={{

position:"absolute",

top:

background?.glowPosition === "bottom"
? "auto"
: (
background?.glowPosition === "center"
? "50%"
: -120
),

bottom:
background?.glowPosition === "bottom"
? -120
: "auto",

left:

background?.glowPosition === "top-right"
? "auto"
: (
background?.glowPosition === "center"
? "50%"
: -120
),

right:
background?.glowPosition === "top-right"
? -120
: "auto",

transform:

background?.glowPosition === "center"
? "translate(-50%,-50%)"
: "none",

width:

isHero

? (
isMobile
? 340
: 760
)

: (
isMobile
? 240
: 420
),

height:

isHero

? (
isMobile
? 340
: 760
)

: (
isMobile
? 240
: 420
),

borderRadius:"50%",

background:

background?.type === "ambient"

? `${background?.glowColor || "#7c7cff"}${Math.round(
(background?.glowOpacity || .18) * 255
).toString(16).padStart(2,"0")}`

: "transparent",

filter:
`blur(${
isHero

? (
(background?.blurStrength || 80) + 40
)

: (
(background?.blurStrength || 80)
*
(background?.atmosphereIntensity || 1)
)

}px)`,

opacity:
background?.type === "ambient"
? 1
: 0,

transition:
"all 1200ms cubic-bezier(.22,1,.36,1)",

animation:

floatAnimation
&&
background?.type === "ambient"

? `floatingGlow ${
12 / motionDuration
}s ease-in-out infinite`

: "none",

pointerEvents:"none"

}}
/>

);

}
