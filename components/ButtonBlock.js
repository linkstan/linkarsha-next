"use client";

export default function ButtonBlock({ block, buttons, themeBackground }) {
buttons = buttons || {};
  function formatTitle(title){

if(!title) return "Link";

/* emoji support */

const emojiMatch = title.match(/^(\p{Emoji}|\p{Extended_Pictographic})/u);

if(emojiMatch){
return title;
}

/* icon keyword support */

const icons = {
youtube:"▶️",
instagram:"📸",
twitter:"🐦",
x:"🐦",
tiktok:"🎵",
telegram:"✈️",
github:"💻",
website:"🌐",
store:"🛒",
email:"✉️"
};

const lower = title.toLowerCase();

for(const key in icons){
if(lower.includes(key)){
return icons[key] + " " + title;
}
}

return title;

}
return(

<a
key={block.id}
href={block.data_json?.url}
target="_blank"

onMouseEnter={(e)=>{
if(buttons?.hoverEffect){
e.currentTarget.style.transform = "translateY(-4px)";
}
}}

onMouseLeave={(e)=>{
e.currentTarget.style.transform = "translateY(0)";
}}

onMouseDown={(e)=>{
if(buttons?.pressEffect){
e.currentTarget.style.transform =
buttons?.depthEffect
? "translateY(3px) scale(0.97)"
: "scale(0.95)";
}
}}

onMouseUp={(e)=>{
if(buttons?.pressEffect){
e.currentTarget.style.transform = "translateY(0) scale(1)";
}
}}

onTouchStart={(e)=>{
if(buttons?.pressEffect){
e.currentTarget.style.transform =
buttons?.depthEffect
? "translateY(3px) scale(0.97)"
: "scale(0.95)";
}
}}

onTouchEnd={(e)=>{
if(buttons?.pressEffect){
e.currentTarget.style.transform = "translateY(0) scale(1)";
}
}}

style={{
display:"block",
padding:12,
marginTop:10,
textDecoration:"none",
transform:"translateY(0)",

background:
block?.data_json?.title?.toLowerCase().includes("premium")
? "linear-gradient(135deg,#ff9966,#ff5e62)"
: block?.data_json?.title?.toLowerCase().includes("vip")
? "linear-gradient(135deg,#f953c6,#b91d73)"
: buttons?.style==="outline"
? "transparent"
: buttons?.style==="glass"
? "rgba(255,255,255,0.12)"
: buttons?.colorMode==="theme"
? (themeBackground || "rgba(0,0,0,.35)")
: buttons?.color,

border:
buttons?.style==="outline"
? "1px solid rgba(255,255,255,.6)"
: buttons?.style==="glass"
? "1px solid rgba(255,255,255,.25)"
: "none",

backdropFilter:
buttons?.style==="glass"
? "blur(12px)"
: "none",

borderRadius:
buttons?.radius==="square"?4:
buttons?.radius==="round"?10:
buttons?.radius==="rounder"?18:999,

color:
buttons?.textMode==="theme"
? "#ffffff"
: buttons?.textColor,

boxShadow:
buttons?.shadowLift
? "0 10px 25px rgba(0,0,0,0.25)"
: buttons?.depthEffect
? "0 6px 0 rgba(0,0,0,0.35)"
: "none",

transition:"transform .15s ease, box-shadow .2s ease"
}}
>

{formatTitle(block?.data_json?.title || "Link")}

</a>

)

}
