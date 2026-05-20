"use client";

export default function MobileDensityWrapper({

density,
children

}){

return(

<div
style={{

width:"100%",

paddingLeft:
density?.paddingX || 0,

paddingRight:
density?.paddingX || 0,

marginTop:
density?.spacingTop || 0,

marginBottom:
density?.spacingBottom || 0,

transition:
"all 700ms cubic-bezier(.22,1,.36,1)"

}}
>

<div
style={{

width:"100%",

maxWidth:
density?.maxWidth || "100%",

margin:"0 auto"

}}
>

{children}

</div>

</div>

);

}
