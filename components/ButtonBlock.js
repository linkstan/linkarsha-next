"use client";
import buttonPresets
from "../app/lib/buttonPresets";

import {
useState
} from "react";

export default function ButtonBlock({
block,
theme,
appearance
}){

const [hovered,setHovered] =
useState(false);

const rawButtons =

appearance?.buttons ||
theme?.buttons ||
{};

const presetButtons = {

...(buttonPresets?.[
rawButtons?.preset
] || {})

};

const buttons = {

...presetButtons,
...rawButtons

};

const layout =
appearance?.layout || {};

const background =
appearance?.background || {};

const isCTA =
block?.data_json?.type === "cta";

const isHero =
layout?.type === "hero";

const isCard =
layout?.type === "card";

const isAmbient =
background?.type === "ambient";


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
return isHero ? 28 : 18;

}

}


/* ================================================= */
/* SIZE SYSTEM */
/* ================================================= */

function getPadding(){

if(isHero){

return "26px 34px";

}

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

if(isHero){

return 20;

}

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

if(hovered){

if(isAmbient){

return "0 25px 60px rgba(0,0,0,.28)";

}

return "0 20px 45px rgba(0,0,0,.18)";

}

if(isAmbient){

return "0 10px 28px rgba(0,0,0,.18)";

}

if(buttons?.shadowLift){

return buttons?.style === "glass"

? "0 12px 40px rgba(0,0,0,.18)"

: "0 14px 34px rgba(0,0,0,.16)";

}

if(buttons?.depthEffect){

return "0 6px 0 rgba(0,0,0,.22)";

}

return "0 6px 16px rgba(0,0,0,.08)";

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

if(
buttons?.style === "glass"
||

isCard
||

isAmbient
){

return hovered

? "rgba(255,255,255,.28)"

: "rgba(255,255,255,.18)";

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

if(
buttons?.style === "glass"
||

isCard
||

isAmbient
){

return hovered

? "1px solid rgba(255,255,255,.45)"

: "1px solid rgba(255,255,255,.25)";

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


/* ================================================= */
/* TRANSFORM */
/* ================================================= */

function getTransform(){

if(hovered){

return "translateY(-4px) scale(1.01)";

}

return "translateY(0px) scale(1)";

}


return(

<a
href={block?.data_json?.url || "#"}
target="_blank"
rel="noopener noreferrer"

onMouseEnter={()=>{
setHovered(true);
}}

onMouseLeave={()=>{
setHovered(false);
}}

onMouseDown={(e)=>{

if(buttons?.pressEffect){

e.currentTarget.style.transform =

buttons?.depthEffect

? "translateY(3px) scale(.985)"

: "scale(.985)";

}

}}

onMouseUp={(e)=>{

e.currentTarget.style.transform =
getTransform();

}}

onTouchStart={(e)=>{

if(buttons?.pressEffect){

e.currentTarget.style.transform =

buttons?.depthEffect

? "translateY(3px) scale(.985)"

: "scale(.985)";

}

}}

onTouchEnd={(e)=>{

e.currentTarget.style.transform =
getTransform();

}}

style={{

display:"block",

padding:getPadding(),

marginTop:
appearance?.text?.buttonSpacing || 18,

textDecoration:"none",

transition:
"all 220ms cubic-bezier(.22,1,.36,1)",

transform:
getTransform(),

background:
getBackground(),

border:
getBorder(),

backdropFilter:

(
buttons?.style === "glass"
||

isCard
||

isAmbient
)

? "blur(26px)"

: "none",

WebkitBackdropFilter:

(
buttons?.style === "glass"
||

isCard
||

isAmbient
)

? "blur(26px)"

: "none",

borderRadius:
getRadius(),

color:
getTextColor(),

fontFamily:
theme?.fonts?.buttons || "Inter",

fontWeight:700,

fontSize:
getFontSize(),

letterSpacing:"-.02em",

boxShadow:
getShadow(),

overflow:"hidden",

position:"relative",

isolation:"isolate"

position:"relative",

willChange:
"transform, box-shadow, background"

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

fontSize:
isHero ? 13 : 12,

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
