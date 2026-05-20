"use client";

import PriorityAccentBar
from "./PriorityAccentBar";

export default function PriorityBlockShell({

priority,
children

}){

return(

<div
style={{

position:"relative",

width:"100%",

maxWidth:
priority?.maxWidth || "100%",

margin:"0 auto",

marginTop:
priority?.spacingTop || 0,

marginBottom:
priority?.spacingBottom || 0,

transform:
`scale(${priority?.scale || 1})`,

transition:
"all 700ms cubic-bezier(.22,1,.36,1)"

}}
>

<PriorityAccentBar
priority={priority}
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
