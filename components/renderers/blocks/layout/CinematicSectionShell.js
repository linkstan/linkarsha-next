"use client";

export default function CinematicSectionShell({

children,
cinematic,
background

}){

if(!cinematic){
return children;
}

return(

<div
style={{

position:"relative",

width:"100%",

maxWidth:
cinematic.contentWidth,

margin:"0 auto",

paddingTop:
cinematic.verticalPadding,

paddingBottom:
cinematic.verticalPadding,

transform:`
translateX(${cinematic.cinematicOffset}px)
`,

transition:
"all 900ms cubic-bezier(.22,1,.36,1)"

}}
>

<div
style={{

position:"relative",

borderRadius:
cinematic.borderRadius,

overflow:"hidden"

}}
>

{children}

</div>

</div>

);

}
