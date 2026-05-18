"use client";

import {
useState
} from "react";

export default function PremiumMediaShell({

children,
presentation,
background

}){

const [hovered,setHovered] =
useState(false);

return(

<div

onMouseEnter={()=>{
setHovered(true);
}}

onMouseLeave={()=>{
setHovered(false);
}}

style={{

position:"relative",

overflow:"hidden",

borderRadius:
presentation.radius,

minHeight:
presentation.minHeight,

padding:
presentation.padding,

transform:

hovered

? `scale(${presentation.hoverScale})`

: "scale(1)",

transition:
"all 700ms cubic-bezier(.22,1,.36,1)",

background:
`
linear-gradient(
180deg,
rgba(255,255,255,.12),
rgba(255,255,255,.04)
)
`,

backdropFilter:
`blur(${
background?.glassBlur || 26
}px)`,

WebkitBackdropFilter:
`blur(${
background?.glassBlur || 26
}px)`,

border:
"1px solid rgba(255,255,255,.12)",

boxShadow:
`
0 30px ${
90 * presentation.shadowIntensity
}px rgba(0,0,0,.18)
`,

isolation:"isolate"

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
rgba(255,255,255,${
presentation.overlayOpacity
}),
transparent 60%
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
