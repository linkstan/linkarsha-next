"use client";

export default function CinematicMediaMask({

children

}){

return(

<div
style={{

position:"relative",

overflow:"hidden",

borderRadius:36,

maskImage:
"linear-gradient(to bottom, black 82%, transparent 100%)",

WebkitMaskImage:
"linear-gradient(to bottom, black 82%, transparent 100%)"

}}
>

{children}

</div>

);

}
