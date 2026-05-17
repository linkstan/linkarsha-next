"use client";

import buttonPresets
from "../app/lib/buttonPresets";

import {
useState
} from "react";

export default function ButtonBlock({
block,
theme,
appearance,
index
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

const motionDuration =
background?.motionDuration || 1;

const staggerIntensity =
background?.staggerIntensity || 1;

const entranceAnimation =
background?.entranceAnimation !== false;

const isCTA =
block?.data_json?.type === "cta";

const isHero =
layout?.type === "hero";

const isFeaturedCTA =

layout?.type === "split"
&&
index === 0;

const isSecondaryCTA =
index === 1;


/* ================================================= */
/* BLOCK SIZE ENGINE */
/* ================================================= */

const blockSize =
block?.data_json?.size || "normal";

const isWide =
blockSize === "wide";

const isFeature =
blockSize === "feature";

const isHeroBlock =
blockSize === "hero";


const isCard =
layout?.type === "card";

const isAmbient =
background?.type === "ambient";

const isDarkBackground =

background?.background
?

(
background.background === "#050505"
||
background.background === "#0d1117"
||
background.background === "#071b2b"
)

: false;

const surfaceDepth =
background?.surfaceDepth || 1;


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

return buttons?.radiusValue ||
(isHero ? 28 : 18);

}

}


/* ================================================= */
/* SIZE SYSTEM */
/* ================================================= */

function getPadding(){

if(isHeroBlock){

return "42px 42px";

}

if(isFeature){

return "36px 36px";

}

if(isFeaturedCTA){

return "32px 38px";

}

if(isSecondaryCTA){

return "24px 28px";

}

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

if(isHeroBlock){

return 28;

}

if(isFeature){

return 24;

}

if(isFeaturedCTA){

return 22;

}

if(isSecondaryCTA){

return 18;

}

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

if(isHeroBlock){

return `
0 ${
46 * surfaceDepth
}px ${
120 * surfaceDepth
}px rgba(
0,
0,
0,
${
isDarkBackground ? .44 : .24
}
)
`;

}

const intensity =
surfaceDepth *
(background?.atmosphereIntensity || 1);

if(isFeaturedCTA){

return `
0 ${
36 * surfaceDepth
}px ${
90 * surfaceDepth
}px rgba(
0,
0,
0,
${
isDarkBackground ? .38 : .22
}
)
`;

}

if(hovered){

if(isAmbient){

return `
0 ${
25 * intensity
}px ${
60 * intensity
}px rgba(0,0,0,${
isDarkBackground ? .42 : .28
})
`;

}

return `
0 ${
20 * intensity
}px ${
45 * intensity
}px rgba(0,0,0,.18)
`;

}

if(isAmbient){

return `
0 ${
10 * intensity
}px ${
28 * intensity
}px rgba(0,0,0,${
isDarkBackground ? .34 : .18
})
`;

}

if(buttons?.shadowLift){

return buttons?.style === "glass"

? `0 ${
(buttons?.depth || 14)
*
intensity
}px ${
(buttons?.depth || 14)
*
2.4
*
intensity
}px rgba(0,0,0,${
isDarkBackground ? .28 : .18
})`

: `0 ${
(buttons?.depth || 14)
*
intensity
}px ${
(buttons?.depth || 14)
*
2.4
*
intensity
}px rgba(0,0,0,${
isDarkBackground ? .24 : .16
})`;

}

if(buttons?.depthEffect){

return `
0 ${
6 * intensity
}px 0 rgba(0,0,0,.22)
`;

}

return `
0 ${
6 * intensity
}px ${
16 * intensity
}px rgba(0,0,0,${
isDarkBackground ? .20 : .08
})
`;

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

if(isHeroBlock){

return hovered

? `rgba(
255,
255,
255,
${
isDarkBackground ? .28 : .42
}
)`

: `rgba(
255,
255,
255,
${
isDarkBackground ? .18 : .30
}
)`;

}

if(isFeaturedCTA){

return hovered

? `rgba(
255,
255,
255,
${
isDarkBackground ? .24 : .38
}
)`

: `rgba(
255,
255,
255,
${
isDarkBackground ? .16 : .26
}
)`;

}

return hovered

? `rgba(
255,
255,
255,
${
isDarkBackground
? .18
: .28
}
)`

: `rgba(
255,
255,
255,
${
isDarkBackground
? .10
: .18
}
)`;

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

? `1px solid rgba(
255,
255,
255,
${
isDarkBackground
? .22
: .45
}
)`

: `1px solid rgba(
255,
255,
255,
${
isDarkBackground
? .12
: .25
}
)`;

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

return `translateY(-${
(
isHeroBlock
? 10

: isFeaturedCTA
? 7

: 4
)
*
(background?.animationIntensity || 1)
}px) scale(${
1 + (
0.01 *
(background?.animationIntensity || 1)
)
})`;

}

return "translateY(0px) scale(1)";

}


/* ================================================= */
/* COMPONENT */
/* ================================================= */

return(

<>

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

gridColumn:

isWide
? "span 2"
: "span 1",

minHeight:

isHeroBlock
? 220

: isFeature
? 170

: undefined,

padding:getPadding(),

marginTop:
appearance?.text?.buttonSpacing || 18,

textDecoration:"none",

opacity:
entranceAnimation
? 0
: 1,

animation:

entranceAnimation

? `buttonEntrance ${
0.7 * motionDuration
}s cubic-bezier(.22,1,.36,1) ${
index * 0.08 * staggerIntensity
}s both`

: "none",

transition:
`
transform .32s cubic-bezier(.22,1,.36,1),
box-shadow .32s cubic-bezier(.22,1,.36,1),
background .5s ease,
border .5s ease,
backdrop-filter .5s ease
`,

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

? `blur(${
background?.glassBlur || 26
}px)`

: "none",

WebkitBackdropFilter:

(
buttons?.style === "glass"
||
isCard
||
isAmbient
)

? `blur(${
background?.glassBlur || 26
}px)`

: "none",

borderRadius:
getRadius(),

color:
getTextColor(),

fontFamily:
theme?.fonts?.buttons || "Inter",

fontWeight:

isHeroBlock
? 900

: isFeaturedCTA
? 800

: 700,

fontSize:
getFontSize(),

letterSpacing:"-.02em",

boxShadow:
getShadow(),

overflow:"hidden",

position:"relative",

isolation:"isolate",

willChange:
"transform, box-shadow, background"

}}
>

{/* ================================================= */}
{/* GLASS ATMOSPHERE */}
{/* ================================================= */}

{buttons?.style === "glass" && (

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

)}


<div
style={{

display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",

position:"relative",
zIndex:2,

minHeight:

isHeroBlock
? 130
: undefined

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

isHeroBlock
? 15

: isHero
? 13
: 12,

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


<style jsx global>{`

@keyframes buttonEntrance {

0%{

opacity:0;

transform:
translateY(18px)
scale(.98);

}

100%{

opacity:1;

transform:
translateY(0px)
scale(1);

}

}

`}</style>

</>

);

}
