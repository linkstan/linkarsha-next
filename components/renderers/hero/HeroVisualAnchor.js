"use client";

export default function HeroVisualAnchor({

anchor

}){

if(!anchor?.show){

return null;

}

return(

<div
style={{

position:"absolute",

width:anchor.width,
height:anchor.height,

left:anchor.x,
top:anchor.y,

transform:"translateX(-50%)",

borderRadius:"50%",

background:anchor.gradient,

filter:`blur(${anchor.blur}px)`,

opacity:anchor.opacity,

pointerEvents:"none",

zIndex:0

}}
/>

);

}
