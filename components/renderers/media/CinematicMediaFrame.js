"use client";

export default function CinematicMediaFrame({

children,
cinematic,
background

}){

if(!cinematic?.enabled){
return children;
}

return(

<div
style={{

position:"relative",

padding:
cinematic.padding,

borderRadius:
cinematic.radius,

overflow:"hidden",

boxShadow:
cinematic.shadow,

transform:`
translateY(${cinematic.offset}px)
scale(${cinematic.scale})
`,

transition:
"all 900ms cubic-bezier(.22,1,.36,1)"

}}
>

{children}

</div>

);

}
