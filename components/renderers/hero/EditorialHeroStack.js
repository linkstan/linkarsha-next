"use client";

export default function EditorialHeroStack({

children,
cinematic

}){

return(

<div
style={{

position:"relative",

width:"100%",

display:"flex",
justifyContent:"center",

paddingTop:24,

paddingBottom:

cinematic?.bottomSpacing
||
0

}}
>

<div
style={{

position:"relative",

width:"100%"

}}
>

{children}

</div>

</div>

);

}
