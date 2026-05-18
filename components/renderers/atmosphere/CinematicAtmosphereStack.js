"use client";

export default function CinematicAtmosphereStack({

children

}){

return(

<div
style={{

position:"relative",

isolation:"isolate",

overflow:"hidden"

}}
>

{children}

</div>

);

}
