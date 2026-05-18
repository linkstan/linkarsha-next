"use client";

export default function HeroAsymmetricLayout({

children,
asymmetry

}){

if(!asymmetry?.enabled){
return children;
}

return(

<div
style={{

display:"grid",

gridTemplateColumns:
asymmetry.columns,

gap:
asymmetry.heroGap,

alignItems:"start",

width:"100%"

}}
>

{children}

</div>

);

}
