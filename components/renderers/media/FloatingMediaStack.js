"use client";

export default function FloatingMediaStack({

children,
stack

}){

if(!stack?.enabled){

return children;

}

return(

<div
style={{

position:"relative",

transform:
`
translateY(-${stack.floatingDepth || 0}px)
scale(${stack.mediaScale || 1})
`,

transition:
"all 900ms cubic-bezier(.22,1,.36,1)",

willChange:
"transform"

}}
>

<div
style={{

position:"relative",

zIndex:3

}}
>

{children}

</div>

<div
style={{

position:"absolute",

inset:0,

borderRadius:32,

transform:
`
translate(
${stack.stackOffset || 0}px,
${stack.stackOffset || 0}px
)
rotate(-${stack.stackRotation || 0}deg)
`,

background:
"rgba(255,255,255,.04)",

border:
"1px solid rgba(255,255,255,.06)",

zIndex:1

}}
/>

</div>

);

}
