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

top:0,
left:0,

width:4,

height:"100%",

borderRadius:999,

background:
"linear-gradient(to bottom,#ffffff,#8b5cf6)",

opacity:.9

}}
/>

);

}
