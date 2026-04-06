"use client";

import { useEffect,useState } from "react";
import { supabase } from "../app/lib/supabase";
import ButtonBlock from "./ButtonBlock";
import { socialIcons } from "../app/lib/socialIcons";

export default function PhonePreview(){

const [profile,setProfile]=useState(null);
const [blocks,setBlocks]=useState([]);
const [appearance,setAppearance]=useState({});
const header = appearance?.header || {};
const socialLinks = appearance?.social_links || {};
const activeSocial = Object.entries(socialLinks || {})
.filter(([k,v]) => v && socialIcons[k]);
  
/* LOAD DATA */

useEffect(()=>{

loadPreview();

async function loadPreview(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const uid=session.user.id;

/* PROFILE */

const {data:prof}=await supabase
.from("profiles")
.select("*")
.eq("id",uid)
.single();

setProfile(prof);
setAppearance(prof?.profile_settings || {});

/* BLOCKS */

const {data:blockData}=await supabase
.from("blocks")
.select("*")
.eq("user_id",uid)
.order("position",{ascending:true});

setBlocks(blockData || []);

}

},[]);


/* INSTANT PREVIEW LISTENERS */

useEffect(()=>{

function updateAppearance(e){
setAppearance(prev=>({...prev,...e.detail}));
}

function updateBlocks(e){
setBlocks(e.detail);
}

function updateWallpaper(e){
setAppearance(prev=>({...prev, wallpaper:e.detail}));
}

function updateBlur(e){
setAppearance(prev=>({...prev, wallpaperBlur:Number(e.detail)}));
}

function updateOverlay(e){
setAppearance(prev=>({...prev, wallpaperOverlay:Number(e.detail)}));
}

window.addEventListener("appearance-update",updateAppearance);
window.addEventListener("blocks-update",updateBlocks);
window.addEventListener("wallpaper-change",updateWallpaper);
window.addEventListener("wallpaper-blur",updateBlur);
window.addEventListener("wallpaper-overlay",updateOverlay);

return ()=>{
window.removeEventListener("appearance-update",updateAppearance);
window.removeEventListener("blocks-update",updateBlocks);
window.removeEventListener("wallpaper-change",updateWallpaper);
window.removeEventListener("wallpaper-blur",updateBlur);
window.removeEventListener("wallpaper-overlay",updateOverlay);
};

},[]);


/* THEME MAP */

const themeMap={

Minimal:"#ffffff",
Paper:"#fafafa",
Clean:"#f4f4f4",

Midnight:"#0b0b12",
"Dark Pro":"#121212",
Mono:"#111111",

Ocean:"linear-gradient(135deg,#2193b0,#6dd5ed)",
Sunset:"linear-gradient(135deg,#ff7a18,#ffb347)",
Neon:"linear-gradient(135deg,#00f2fe,#7c5cff)",
Pastel:"linear-gradient(135deg,#fbc2eb,#a6c1ee)",

Royal:"linear-gradient(135deg,#141e30,#243b55)",
Luxury:"#000000"

};

const wallpaper = appearance?.wallpaper || null;
const blur = appearance?.wallpaperBlur || 0;
const overlay = appearance?.wallpaperOverlay ?? 0.25;

const background = wallpaper || themeMap[profile?.theme] || "#0b0b12";

if(!profile) return null;


/* UI */

return(

<div
style={{
width:260,
height:520,
borderRadius:30,
border:"10px solid #111",
overflow:"hidden",
position:"relative",
background:background,
backgroundSize:"cover",
backgroundPosition:"center",
display:"flex",
flexDirection:"column",
alignItems:"center",
padding:"20px",
fontFamily:"sans-serif",
boxShadow:"0 25px 60px rgba(0,0,0,.35)"
}}
>

{/* BLUR LAYER */}

{wallpaper && blur>0 && (

<div
style={{
position:"absolute",
top:0,
left:0,
right:0,
bottom:0,
backdropFilter:`blur(${blur}px)`,
WebkitBackdropFilter:`blur(${blur}px)`
}}
/>

)}


{/* DARK OVERLAY */}

{wallpaper && overlay>0 && (

<div
style={{
position:"absolute",
top:0,
left:0,
right:0,
bottom:0,
background:`rgba(0,0,0,${overlay})`
}}
/>

)}


{/* CONTENT */}

<div
style={{
position:"relative",
zIndex:2,
width:"100%",
display:"flex",
flexDirection:"column",
alignItems:"center"
}}
>


{/* AVATAR */}

<div
style={{
width:80,
height:80,
borderRadius:"50%",
overflow:"hidden",
marginBottom:12
}}
>

<img
src={profile?.avatar || ""}
style={{
width:"100%",
height:"100%",
objectFit:"cover"
}}
/>

</div>


{/* NAME */}

<h3>
{profile?.display_name || profile?.username}
</h3>


{/* USERNAME */}

<div style={{opacity:.7,fontSize:13}}>
@{profile?.username}
</div>


{/* BIO */}

<p
style={{
opacity:.7,
fontSize:13,
marginBottom:20,
textAlign:"center"
}}
>
{profile?.bio}
</p>


{/* BLOCKS */}

<div
style={{
width:"100%",
display:"flex",
flexDirection:"column",
gap:10
}}
>

{blocks.map((block)=>(
<ButtonBlock
key={block.id}
block={block}
buttons={appearance?.buttons || {}}
themeBackground={background}
/>
))}

</div>


</div>

</div>

);

}
