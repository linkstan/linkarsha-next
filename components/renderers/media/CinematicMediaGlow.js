"use client";

export default function CinematicMediaGlow({

cinematic

}){

if(!cinematic?.enabled){
return null;
}

return(

<div
style={{

position:"absolute",

inset:"12%",

borderRadius:
cinematic.radius * 1.2,

background:`
radial-gradient(
circle,
rgba(255,255,255,${cinematic.glowOpacity}),
transparent 72%
)
`,

filter:"blur(40px)",

pointerEvents:"none",

zIndex:0

}}
/>

);

}
