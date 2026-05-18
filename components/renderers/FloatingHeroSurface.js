"use client";

export default function FloatingHeroSurface({

children,
surface,
background

}){

if(!surface?.enabled){

return children;

}

return(

<div
style={{

position:"relative",

width:"100%",

padding:

surface?.padding
|| "40px",

borderRadius:
surface?.radius || 42,

background:

surface?.background ||

(background?.type === "ambient"

? "rgba(255,255,255,.08)"

: "rgba(255,255,255,.72)"),

backdropFilter:
`blur(${surface?.blur || 26}px)`,

border:

surface?.border ||

"1px solid rgba(255,255,255,.12)",

boxShadow:

surface?.shadow ||

"0 30px 90px rgba(0,0,0,.18)",

overflow:"hidden",

isolation:"isolate",

transition:
"all 700ms cubic-bezier(.22,1,.36,1)"

}}
>

<div
style={{

position:"absolute",
inset:0,

background:
surface?.overlay ||

"linear-gradient(to bottom right, rgba(255,255,255,.12), transparent)",

pointerEvents:"none",

zIndex:0

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
