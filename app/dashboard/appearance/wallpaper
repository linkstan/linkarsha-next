"use client";

import { useState } from "react";

export default function WallpaperPage(){

const [active,setActive]=useState(null);

function applyWallpaper(value){

setActive(value);

window.dispatchEvent(
new CustomEvent("wallpaper-change",{detail:value})
);

}

const item={
padding:"14px 16px",
borderRadius:12,
marginBottom:10,
cursor:"pointer",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
fontSize:15,
background:"var(--card)",
transition:"all .15s ease"
};

const preview={
width:"100%",
height:90,
borderRadius:10,
marginTop:10
};

return(

<div style={{padding:20}}>

<h2 style={{marginBottom:20}}>Wallpaper</h2>

{/* NONE */}

<div
onClick={()=>applyWallpaper(null)}
style={{
...item,
color:active===null ? "#3b82f6" : "var(--text)"
}}
>

<span>None</span>

</div>


{/* SUNSET */}

<div
onClick={()=>applyWallpaper("linear-gradient(135deg,#ff7a18,#ffb347)")}
style={{
...item,
color:active==="sunset" ? "#3b82f6" : "var(--text)"
}}
>

<span>Sunset Gradient</span>

</div>

<div style={{
...preview,
background:"linear-gradient(135deg,#ff7a18,#ffb347)"
}}></div>


{/* OCEAN */}

<div
onClick={()=>applyWallpaper("linear-gradient(135deg,#2193b0,#6dd5ed)")}
style={{
...item,
color:active==="ocean" ? "#3b82f6" : "var(--text)"
}}
>

<span>Ocean Gradient</span>

</div>

<div style={{
...preview,
background:"linear-gradient(135deg,#2193b0,#6dd5ed)"
}}></div>


{/* NEON */}

<div
onClick={()=>applyWallpaper("linear-gradient(135deg,#00f2fe,#7c5cff)")}
style={{
...item,
color:active==="neon" ? "#3b82f6" : "var(--text)"
}}
>

<span>Neon Gradient</span>

</div>

<div style={{
...preview,
background:"linear-gradient(135deg,#00f2fe,#7c5cff)"
}}></div>


{/* PASTEL */}

<div
onClick={()=>applyWallpaper("linear-gradient(135deg,#fbc2eb,#a6c1ee)")}
style={{
...item,
color:active==="pastel" ? "#3b82f6" : "var(--text)"
}}
>

<span>Pastel Gradient</span>

</div>

<div style={{
...preview,
background:"linear-gradient(135deg,#fbc2eb,#a6c1ee)"
}}></div>

</div>

);

}
