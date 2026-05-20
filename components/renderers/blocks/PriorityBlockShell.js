"use client";

export default function PriorityBlockShell({

priority,
children

}){

return(

<div
style={{

width:"100%",

display:"flex",
justifyContent:"center",

position:"relative",

marginTop:
priority?.spacingTop || 0,

marginBottom:
priority?.spacingBottom || 0,

transform:
`scale(${
priority?.scale || 1
})`,

transition:
"all 700ms cubic-bezier(.22,1,.36,1)"

}}
>

<div
style={{

width:"100%",

maxWidth:
priority?.contentWidth || "100%",

position:"relative",

zIndex:
priority?.elevated
? 3
: 1

}}
>

{children}

</div>

</div>

);

}
