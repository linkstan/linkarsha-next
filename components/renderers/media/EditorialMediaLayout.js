"use client";

export default function EditorialMediaLayout({

children,
rhythm

}){

return(

<div
style={{

width:
rhythm?.width || "100%",

marginLeft:
rhythm?.alignment === "right"
? "auto"
: 0,

marginRight:
rhythm?.alignment === "left"
? "auto"
: 0,

marginTop:
rhythm?.marginTop || 0,

transition:
"all 900ms cubic-bezier(.22,1,.36,1)"

}}
>

{children}

</div>

);

}
