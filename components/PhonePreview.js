"use client";

import { useEffect,useState } from "react";

export default function PhonePreview(){

const [wallpaper,setWallpaper]=useState(null);
const [blur,setBlur]=useState(0);
const [overlay,setOverlay]=useState(true);
const [theme,setTheme]=useState("Minimal");

const themes={

Minimal:{ bg:"#ffffff", text:"#111" },
Paper:{ bg:"#fafafa", text:"#111" },
Clean:{ bg:"#f4f4f4", text:"#111" },

Midnight:{ bg:"#0b0b12", text:"#ffffff" },
"Dark Pro":{ bg:"#121212", text:"#ffffff" },
Mono:{ bg:"#111111", text:"#ffffff" },

Ocean:{ bg:"linear-gradient(135deg,#2193b0,#6dd5ed)", text:"#ffffff" },
Sunset:{ bg:"linear-gradient(135deg,#ff7a18,#ffb347)", text:"#ffffff" },
Neon:{ bg:"linear-gradient(135deg,#00f2fe,#7c5cff)", text:"#ffffff" },
Pastel:{ bg:"linear-gradient(135deg,#fbc2eb,#a6c1ee)", text:"#111" },

Royal:{ bg:"linear-gradient(135deg,#141e30,#243b55)", text:"#ffffff" },
Luxury:{ bg:"#000000", text:"#d4af37" }

};

useEffect(()=>{

function handleThemeChange(e){
setTheme(e.detail);
}

function handleWallpaperChange(e){
setWallpaper(e.detail);
}

function handleBlurChange(e){
setBlur(e.detail);
}

function handleOverlayChange(e){
setOverlay(e.detail);
}

window.addEventListener("theme-change",handleThemeChange);
window.addEventListener("wallpaper-change",handleWallpaperChange);
window.addEventListener("wallpaper-blur",handleBlurChange);
window.addEventListener("wallpaper-overlay",handleOverlayChange);

return ()=>{
window.removeEventListener("theme-change",handleThemeChange);
window.removeEventListener("wallpaper-change",handleWallpaperChange);
window.removeEventListener("wallpaper-blur",handleBlurChange);
window.removeEventListener("wallpaper-overlay",handleOverlayChange);
};

},[]);

const active=themes[theme] || themes.Minimal;

return(

<div style={{
width:260,
height:520,
borderRadius:30,
border:"10px solid #111",
overflow:"hidden",
position:"relative",
background: wallpaper ? wallpaper : active.bg,
backgroundSize:"cover",
backgroundPosition:"center",
display:"flex",
flexDirection:"column",
alignItems:"center",
padding:"20px",
fontFamily:"sans-serif",
boxShadow:"0 25px 60px rgba(0,0,0,.35)"
}}>

{wallpaper && blur>0 && (
<div style={{
position:"absolute",
top:0,
left:0,
right:0,
bottom:0,
backdropFilter:`blur(${blur}px)`,
WebkitBackdropFilter:`blur(${blur}px)`
}}/>
)}

{wallpaper && overlay && (
<div style={{
position:"absolute",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.25)"
}}/>
)}

<div style={{
position:"relative",
zIndex:2,
width:"100%",
display:"flex",
flexDirection:"column",
alignItems:"center"
}}>

<div style={{
width:80,
height:80,
borderRadius:"50%",
background:"#ccc",
marginBottom:12
}}/>

<h3 style={{color:active.text}}>
@username
</h3>

<p style={{
opacity:.7,
fontSize:13,
marginBottom:20,
color:active.text
}}>
Creator bio preview
</p>

<div style={{
width:"100%",
display:"flex",
flexDirection:"column",
gap:10
}}>

<button style={btn(active.text)}>My Website</button>
<button style={btn(active.text)}>Instagram</button>
<button style={btn(active.text)}>YouTube</button>

</div>

</div>

</div>

);

}

function btn(color){

return{
padding:"12px",
borderRadius:12,
border:"none",
cursor:"pointer",
background:"rgba(255,255,255,.15)",
color:color,
backdropFilter:"blur(8px)"
};

}
