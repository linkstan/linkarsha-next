"use client";

export default function ButtonAtmosphere({

buttons

}){

if(
buttons?.style !== "glass"
){

return null;

}

return(

<div
style={{

position:"absolute",

inset:0,

background:
"linear-gradient(180deg,rgba(255,255,255,.26),rgba(255,255,255,.05))",

pointerEvents:"none",

zIndex:0

}}
/>

);

}
