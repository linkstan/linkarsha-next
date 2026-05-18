"use client";

export default function CinematicHeroContainer({

children,
cinematic

}){

return(

<div
style={{

position:"relative",

width:"100%",

overflow:"hidden",

display:"flex",
justifyContent:"center",

paddingLeft:24,
paddingRight:24

}}
>

<div
style={{

position:"relative",

width:"100%",

maxWidth:
cinematic?.heroWidth || "100%"

}}
>

{children}

</div>

</div>

);

}
