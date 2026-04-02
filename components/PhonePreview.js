"use client";

import { useEffect,useState } from "react";

export default function PhonePreview(){
const [wallpaper,setWallpaper]=useState(null);
const [theme,setTheme]=useState("Minimal");

const themes={

Minimal:{
bg:"#ffffff",
text:"#111"
},

Paper:{
bg:"#fafafa",
text:"#111"
},

Clean:{
bg:"#f4f4f4",
text:"#111"
},

Midnight:{
bg:"#0b0b12",
text:"#ffffff"
},

"Dark Pro":{
bg:"#121212",
text:"#ffffff"
},

Mono:{
bg:"#111111",
text:"#ffffff"
},

Ocean:{
bg:"linear-gradient(135deg,#2193b0,#6dd5ed)",
text:"#ffffff"
},

Sunset:{
bg:"linear-gradient(135deg,#ff7a18,#ffb347)",
text:"#ffffff"
},

Neon:{
bg:"linear-gradient(135deg,#00f2fe,#7c5cff)",
text:"#ffffff"
},

Pastel:{
bg:"linear-gradient(135deg,#fbc2eb,#a6c1ee)",
text:"#111"
},

Royal:{
bg:"linear-gradient(135deg,#141e30,#243b55)",
text:"#ffffff"
},

Luxury:{
bg:"#000000",
text:"#d4af37"
}

};

useEffect(()=>{

function handleThemeChange(e){
setTheme(e.detail);
}

window.addEventListener("theme-change",handleThemeChange);
useEffect(()=>{

function handleWallpaperChange(e){
setWallpaper(e.detail);
}

window.addEventListener("wallpaper-change",handleWallpaperChange);

return ()=>window.removeEventListener("wallpaper-change",handleWallpaperChange);

},[]);

return ()=>window.removeEventListener("theme-change",handleThemeChange);

},[]);

const active=themes[theme] || themes.Minimal;

return(

<div style={{
width:260,
height:520,
borderRadius:30,
border:"10px solid #111",
overflow:"hidden",
background: wallpaper ? wallpaper : active.bg,
backgroundSize:"cover",
backgroundPosition:"center",
color:active.text,
display:"flex",
flexDirection:"column",
alignItems:"center",
padding:"20px",
fontFamily:"sans-serif",
boxShadow:"0 25px 60px rgba(0,0,0,.35)"
}}>

<div style={{
width:80,
height:80,
borderRadius:"50%",
background:"#ccc",
marginBottom:12
}}/>

<h3>@username</h3>

<p style={{
opacity:.7,
fontSize:13,
marginBottom:20
}}>
Creator bio preview
</p>

<div style={{
width:"100%",
display:"flex",
flexDirection:"column",
gap:10
}}>

<button style={btn(active.text)}>
My Website</button>

<button style={btn(active.text)}>
Instagram
</button>

<button style={btn(active.text)}>
YouTube
</button>

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
