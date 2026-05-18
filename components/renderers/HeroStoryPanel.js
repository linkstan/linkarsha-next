"use client";

export default function HeroStoryPanel({

panel,
background,
children

}){

if(!panel?.enabled){

return children;

}

return(

<div
style={{

display:"grid",

gridTemplateColumns:

typeof panel?.width === "number"

? `minmax(0,1fr) ${panel.width}px`

: "1fr",

gap:60,

alignItems:"center",

width:"100%",

position:"relative"

}}
>

<div>

{children}

</div>

<div
style={{

position:"relative",

padding:panel?.padding,

borderRadius:panel?.radius,

background:`
rgba(
255,
255,
255,
${panel?.opacity}
)
`,

backdropFilter:
`blur(${panel?.blur}px)`,

WebkitBackdropFilter:
`blur(${panel?.blur}px)`,

border:`
1px solid rgba(
255,
255,
255,
.14
)
`,

boxShadow:`
0 30px 90px rgba(
0,
0,
0,
${.18 * panel?.shadow}
)
`,

transform:`
translate(
${panel?.offsetX}px,
${panel?.offsetY}px
)
`,

zIndex:3,

overflow:"hidden"

}}
>

<div
style={{

fontSize:13,
letterSpacing:".18em",
textTransform:"uppercase",
opacity:.55,
marginBottom:18,
fontWeight:700

}}
>

Creator Story

</div>

<div
style={{

fontSize:26,
fontWeight:700,
lineHeight:1.2,
marginBottom:18

}}
>

Designed for modern creator identity.

</div>

<div
style={{

fontSize:15,
lineHeight:1.7,
opacity:.78

}}
>

Premium cinematic presentation system engineered for modern digital presence and creator storytelling.

</div>

</div>

</div>

);

}
