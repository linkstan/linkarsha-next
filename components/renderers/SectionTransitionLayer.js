"use client";

export default function SectionTransitionLayer({

transition,
background

}){

if(!transition){
return null;
}

return(

<div
style={{

position:"absolute",

left:0,
right:0,
bottom:0,

height:
transition.transitionHeight,

pointerEvents:"none",

zIndex:2,

background:`

linear-gradient(
to bottom,

rgba(0,0,0,0) 0%,

rgba(
0,
0,
0,
${transition.opacity * .08}
) 40%,

rgba(
0,
0,
0,
${transition.opacity * .18}
) 100%
)

`,

filter:`
blur(${transition.blur}px)
`,

transform:"translateY(55%)"

}}
/>

);

}
