"use client";

export default function PremiumInteractionSurface({

children,
interaction

}){

return(

<div
style={{

position:"relative",

transition:
`
transform ${
interaction?.motionSmoothness || .32
}s cubic-bezier(.22,1,.36,1),
box-shadow ${
interaction?.motionSmoothness || .32
}s cubic-bezier(.22,1,.36,1)
`,

willChange:
"transform, box-shadow"

}}
>

{children}

</div>

);

}
