"use client";

export default function AmbientLightLayer({

ambient

}){

if(!ambient?.enabled){

return null;

}

return(

<div
style={{

position:"absolute",

top:"50%",
left:"50%",

width:ambient.size,
height:ambient.size,

transform:
"translate(-50%,-50%)",

background:
ambient.gradient,

opacity:
ambient.opacity,

filter:
`blur(${ambient.blur}px)`,

pointerEvents:"none",

zIndex:0

}}
/>

);

}
