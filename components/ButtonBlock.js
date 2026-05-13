"use client";

export default function ButtonBlock({
block,
theme,
appearance
}){

const buttons =
appearance?.buttons ||
theme?.buttons ||
{};

const isCTA =
block?.data_json?.type === "cta";


/* ================================================= */
/* TITLE */
/* ================================================= */

function formatTitle(title){

if(!title) return "Link";

return title;

}


/* ================================================= */
/* RADIUS SYSTEM */
/* ================================================= */

function getRadius(){

switch(buttons?.radius){

case "square":
return 0;

case "round":
return 16;

case "rounder":
return 24;

case "full":
return 999;

default:
return 16;

}

}


/* ================================================= */
/* SIZE SYSTEM */
/* ================================================= */

function getPadding(){

switch(buttons?.size){

case "small":
return "10px 14px";

case "large":
return "30px 36px";

default:
return "18px 24px";

}

}

function getFontSize(){

switch(buttons?.size){

case "small":
return 14;

case "large":
return 21;

default:
return 17;

}

}


/* ================================================= */
/* SHADOW SYSTEM */
/* ================================================= */

function getShadow(){

if(buttons?.shadowLift){

return "0 10px 30px rgba(0,0,0,.14)";

}

if(buttons?.depthEffect){

return "0 6px 0 rgba(0,0,0,.22)";

}

return "none";

}


/* ================================================= */
/* BACKGROUND */
/* ================================================= */

function getBackground(){

if(isCTA){
return "#e3a9a9";
}

if(buttons?.style === "outline"){
return "transparent";
}

if(buttons?.style === "glass"){
return "rgba(255,255,255,.38)";
}

return buttons?.bg || "#000000";

}


/* ================================================= */
/* BORDER */
/* ================================================= */

function getBorder(){

if(buttons?.style === "outline"){

return "1.5px solid rgba(0,0,0,.18)";

}

if(buttons?.style === "glass"){

return "1px solid rgba(255,255,255,.7)";

}

return "none";

}


/* ================================================= */
/* TEXT COLOR */
/* ================================================= */

function getTextColor(){

if(buttons?.style === "outline"){

return "#111111";

}

return buttons?.text || "#ffffff";

}


return(

<a
href={block?.data_json?.url || "#"}
target="_blank"
rel="noopener noreferrer"

onMouseEnter={(e)=>{

if(buttons?.hoverEffect){

e.currentTarget.style.transform =
"translateY(-3px)";

}

}}

onMouseLeave={(e)=>{

e.currentTarget.style.transform =
"translateY(0)";

}}

onMouseDown={(e)=>{

if(buttons?.pressEffect){

e.currentTarget.style.transform =
buttons?.depthEffect
? "translateY(3px) scale(.985)"
: "scale(.98)";

}

}}

onMouseUp={(e)=>{

e.currentTarget.style.transform =
"translateY(0) scale(1)";

}}

onTouchStart={(e)=>{

if(buttons?.pressEffect){

e.currentTarget.style.transform =
buttons?.depthEffect
? "translateY(3px) scale(.985)"
: "scale(.98)";

}

}}

onTouchEnd={(e)=>{

e.currentTarget.style.transform =
"translateY(0) scale(1)";

}}

style={{

display:"block",

padding:getPadding(),

marginTop:14,

textDecoration:"none",

transition:
"all .18s ease",

transform:"translateY(0)",

background:getBackground(),

border:getBorder(),

backdropFilter:
buttons?.style === "glass"
? "blur(24px)"
: "none",

WebkitBackdropFilter:
buttons?.style === "glass"
? "blur(24px)"
: "none",

borderRadius:getRadius(),

color:getTextColor(),

fontFamily:
theme?.fonts?.buttons || "Inter",

fontWeight:700,

fontSize:getFontSize(),

letterSpacing:"-.02em",

boxShadow:getShadow(),

overflow:"hidden"

}}
>

<div
style={{

display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center"

}}
>

<div>

{formatTitle(
block?.data_json?.title || "Link"
)}

</div>

{block?.data_json?.subtitle && (

<div
style={{

fontSize:12,
opacity:.72,
marginTop:4,
fontWeight:500

}}
>

{block.data_json.subtitle}

</div>

)}

</div>

</a>

);

}
