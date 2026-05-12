"use client";

export default function ButtonBlock({
block,
theme,
appearance
}){

const buttons =
theme?.buttons || {};

const isCTA =
block?.data_json?.type === "cta";

function formatTitle(title){

if(!title) return "Link";

return title;

}

return(

<a
href={block?.data_json?.url || "#"}
target="_blank"
rel="noopener noreferrer"

onMouseEnter={(e)=>{

if(buttons?.hoverEffect){

e.currentTarget.style.transform =
"translateY(-4px)";

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
? "translateY(3px) scale(0.97)"
: "scale(0.96)";

}

}}

onMouseUp={(e)=>{

if(buttons?.pressEffect){

e.currentTarget.style.transform =
"translateY(0) scale(1)";

}

}}

onTouchStart={(e)=>{

if(buttons?.pressEffect){

e.currentTarget.style.transform =
buttons?.depthEffect
? "translateY(3px) scale(0.97)"
: "scale(0.96)";

}

}}

onTouchEnd={(e)=>{

if(buttons?.pressEffect){

e.currentTarget.style.transform =
"translateY(0) scale(1)";

}

}}

style={{

display:"block",

padding:
isCTA
? 28
: buttons?.padding || 16,

marginTop:
buttons?.spacing || 12,

textDecoration:"none",

transform:"translateY(0)",

transition:
"transform .15s ease, box-shadow .2s ease",

/* ================================================= */
/* BACKGROUND */
/* ================================================= */

background:

isCTA
? "#e3a9a9"

: buttons?.style === "outline"
? "transparent"

: buttons?.style === "glass"
? "rgba(255,255,255,0.12)"

: buttons?.bg || "#000000",

/* ================================================= */
/* BORDER */
/* ================================================= */

border:

buttons?.style === "outline"
? "1px solid rgba(255,255,255,.5)"

: buttons?.style === "glass"
? "1px solid rgba(255,255,255,.18)"

: "none",

/* ================================================= */
/* GLASS */
/* ================================================= */

backdropFilter:

buttons?.style === "glass"
? "blur(12px)"
: "none",

WebkitBackdropFilter:

buttons?.style === "glass"
? "blur(12px)"
: "none",

/* ================================================= */
/* RADIUS */
/* ================================================= */

borderRadius:
buttons?.radius ?? 12,

/* ================================================= */
/* TEXT */
/* ================================================= */

color:
buttons?.text || "#ffffff",

fontFamily:
theme?.fonts?.buttons || "Inter",

fontWeight:
buttons?.fontWeight || 600,

/* ================================================= */
/* SHADOWS */
/* ================================================= */

boxShadow:

isCTA
? "0 10px 30px rgba(0,0,0,.22)"

: buttons?.shadowLift
? "0 10px 25px rgba(0,0,0,.20)"

: buttons?.depthEffect
? "0 6px 0 rgba(0,0,0,.28)"

: "none"

}}
>

<div
style={{
display:"flex",
flexDirection:"column",
alignItems:"center"
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
opacity:.82,
marginTop:4
}}
>

{block.data_json.subtitle}

</div>

)}

</div>

</a>

);

}
