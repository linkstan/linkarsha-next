"use client";

export default function CinematicSectionSpacing({

density

}){

return(

<div
style={{

width:"100%",

height:
density?.stackGap || 24,

pointerEvents:"none",

flexShrink:0

}}
/>

);

}
