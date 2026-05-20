"use client";

export default function PriorityAccentBar({

priority

}){

if(!priority?.accent){

return null;

}

return(

<div
style={{

position:"absolute",

top:-14,
left:0,

width:120,
height:2,

borderRadius:999,

background:
"linear-gradient(90deg, rgba(255,255,255,.95), rgba(255,255,255,0))",

opacity:.8,

pointerEvents:"none"

}}
/>

);

}
