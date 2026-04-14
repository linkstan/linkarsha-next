"use client";

import { useEffect,useState,useRef } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default function WallpaperPage(){

const [active,setActive]=useState(null);
const [blur,setBlur]=useState(0);
const [customWallpaper,setCustomWallpaper]=useState(null);

const [uploading,setUploading]=useState(false);
const [uploadProgress,setUploadProgress]=useState(0);

const [cropImage,setCropImage]=useState(null);
const fileInputRef = useRef(null);

const wallpapers=[

{ name:"Sunset Sky", value:"linear-gradient(135deg,#ff7a18,#ffb347)" },
{ name:"Ocean Waves", value:"linear-gradient(135deg,#2193b0,#6dd5ed)" },
{ name:"Neon Glow", value:"linear-gradient(135deg,#00f2fe,#7c5cff)" },
{ name:"Pastel Dream", value:"linear-gradient(135deg,#fbc2eb,#a6c1ee)" },
{ name:"Aurora Lights", value:"linear-gradient(135deg,#00c6ff,#0072ff)" },
{ name:"Galaxy Night", value:"linear-gradient(135deg,#654ea3,#eaafc8)" },
{ name:"Royal Blue", value:"linear-gradient(135deg,#141e30,#243b55)" },
{ name:"Midnight Fog", value:"linear-gradient(135deg,#232526,#414345)" },
{ name:"Forest Mist", value:"linear-gradient(135deg,#134e5e,#71b280)" },
{ name:"Fire Energy", value:"linear-gradient(135deg,#f12711,#f5af19)" },
{ name:"Purple Haze", value:"linear-gradient(135deg,#5f2c82,#49a09d)" },
{ name:"Cyber Grid", value:"linear-gradient(135deg,#0f2027,#2c5364)" },
{ name:"Cloud Light", value:"linear-gradient(135deg,#e6dada,#274046)" },
{ name:"Desert Sand", value:"linear-gradient(135deg,#d7d2cc,#304352)" },
{ name:"Arctic Ice", value:"linear-gradient(135deg,#83a4d4,#b6fbff)" },
{ name:"Pink Flame", value:"linear-gradient(135deg,#ff9966,#ff5e62)" },
{ name:"Green Field", value:"linear-gradient(135deg,#56ab2f,#a8e063)" },
{ name:"Deep Ocean", value:"linear-gradient(135deg,#373b44,#4286f4)" },
{ name:"Cosmic Dust", value:"linear-gradient(135deg,#3a1c71,#d76d77,#ffaf7b)" },
{ name:"Dark Space", value:"linear-gradient(135deg,#000000,#434343)" }

];

useEffect(()=>{
loadCurrent();
},[]);

async function loadCurrent(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const {data} = await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

const settings=data?.profile_settings || {};

setActive(settings.wallpaper || null);
setBlur(settings.wallpaperBlur || 0);

window.dispatchEvent(
new CustomEvent("appearance-update",{detail:{
...settings,
wallpaper:settings.wallpaper || null,
wallpaperBlur:settings.wallpaperBlur || 0
}})
);

}

async function applyWallpaper(url){

/* instant preview */

window.dispatchEvent(
new CustomEvent("appearance-update",{detail:{wallpaper:url}})
);

/* local state */

setActive(url);

/* save */

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const {data} = await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

const settings=data?.profile_settings || {};
settings.wallpaper=url;

await supabase
.from("profiles")
.update({profile_settings:settings})
.eq("id",session.user.id);

}

async function uploadImage(e){

const file=e.target.files?.[0];
if(!file) return;

setCropImage(URL.createObjectURL(file));

}

async function confirmUpload(){

if(!cropImage) return;

setUploading(true);
setUploadProgress(0);

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const filePath=`${session.user.id}-${Date.now()}`;

const blob = await fetch(cropImage).then(r=>r.blob());

await supabase.storage
.from("wallpapers")
.upload(filePath,blob);

const {data}=supabase.storage
.from("wallpapers")
.getPublicUrl(filePath);

setUploading(false);
setUploadProgress(0);

setCustomWallpaper(data.publicUrl);

}

async function updateBlur(value){

const newBlur = Number(value);

setBlur(newBlur);

window.dispatchEvent(
new CustomEvent("appearance-update",{detail:{
wallpaper:active,
wallpaperBlur:newBlur
}})
);

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const {data} = await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

const settings = data?.profile_settings || {};

settings.wallpaper = active;
settings.wallpaperBlur = newBlur;

await supabase
.from("profiles")
.update({profile_settings:settings})
.eq("id",session.user.id);

}

return(

<div style={{
padding:"24px",
maxWidth:900
}}>

<div style={{
display:"flex",
alignItems:"center",
gap:12,
marginBottom:24
}}>

<Link href="/dashboard/appearance" style={{textDecoration:"none"}}>

<div style={{
width:36,
height:36,
borderRadius:"50%",
background:"var(--card)",
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer",
border:"1px solid var(--border)",
fontSize:18
}}>
←
</div>

</Link>

<h2 style={{margin:0}}>
Select Wallpaper
</h2>

</div>

<div style={{marginBottom:24}}>

<div style={{marginBottom:6,fontWeight:500}}>
Blur intensity
</div>

<div style={{display:"flex",alignItems:"center",gap:10}}>

<input
type="range"
min="0"
max="20"
value={blur}
onChange={(e)=>updateBlur(e.target.value)}
style={{flex:1}}
/>

<span>{blur}</span>

</div>

</div>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
gap:18,
marginBottom:30
}}>

{/* NONE */}

<div style={{
borderRadius:16,
padding:14,
border: active===null ? "2px solid #22c55e" : "1px solid var(--border)",
background:"var(--card)"
}}>

<div style={{
height:90,
borderRadius:12,
background:"#ddd",
display:"flex",
alignItems:"center",
justifyContent:"center"
}}>
None
</div>

<div style={{marginTop:10,fontWeight:500}}>
None
</div>

<button
onClick={()=>applyWallpaper(null)}
style={{
marginTop:8,
width:"100%",
padding:"8px",
borderRadius:10,
border:"none",
background: active===null ? "#22c55e" : "#111",
color:"#fff"
}}
>
{active===null ? "Applied" : "Apply"}
</button>

</div>

{/* CUSTOM WALLPAPER */}

<div style={{
borderRadius:16,
padding:14,
border: active===`url(${customWallpaper})` ? "2px solid #22c55e" : "1px solid var(--border)",
background:"var(--card)"
}}>

<div style={{
height:90,
borderRadius:12,
overflow:"hidden",
background:"#111",
position:"relative",
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer"
}}>

<input
ref={fileInputRef}
type="file"
accept="image/png,image/jpeg,image/webp"
style={{display:"none"}}
onChange={uploadImage}
/>

<div
onClick={()=>fileInputRef.current.click()}
style={{
position:"absolute",
top:0,
left:0,
right:0,
bottom:0
}}
/>

{customWallpaper && !uploading && (
<img
src={customWallpaper}
style={{
width:"100%",
height:"100%",
objectFit:"cover"
}}
/>
)}

{!customWallpaper && !uploading && (
<div style={{opacity:0.6}}>Tap to upload</div>
)}

{uploading && (
<div style={{
position:"absolute",
bottom:0,
left:0,
height:4,
width:`${uploadProgress}%`,
background:"#22c55e"
}}/>
)}

<div style={{
position:"absolute",
bottom:6,
right:6,
width:30,
height:30,
borderRadius:"50%",
background:"linear-gradient(145deg,#22c55e,#16a34a)",
display:"flex",
alignItems:"center",
justifyContent:"center",
color:"#fff",
fontWeight:700
}}>
+
</div>

</div>

<div style={{marginTop:8,fontSize:13,opacity:0.8}}>
Add Custom Wallpaper
</div>

<button
onClick={()=>customWallpaper && applyWallpaper(`url(${customWallpaper})`)}
style={{
marginTop:8,
width:"100%",
padding:"8px",
borderRadius:10,
border:"none",
background: active===`url(${customWallpaper})` ? "#22c55e" : "#111",
color:"#fff"
}}
>
{active===`url(${customWallpaper})` ? "Applied ✓" : "Apply"}
</button>

</div>

</div>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
gap:18
}}>

{wallpapers.map((wall,i)=>{

const applied=active===wall.value;

return(

<div
key={i}
style={{
borderRadius:16,
padding:14,
border: applied ? "2px solid #22c55e" : "1px solid var(--border)",
background:"var(--card)",
display:"flex",
flexDirection:"column",
gap:10
}}
>

<div style={{
height:90,
borderRadius:12,
background:wall.value
}}/>

<div style={{
fontSize:14,
fontWeight:500
}}>
{wall.name}
</div>

<button
onClick={()=>applyWallpaper(wall.value)}
style={{
padding:"8px",
borderRadius:10,
border:"none",
background: applied ? "#22c55e" : "#111",
color:"#fff"
}}
>
{applied ? "Applied" : "Apply"}
</button>

</div>

);

})}

</div>

{cropImage && (

<div style={{
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.7)",
display:"flex",
alignItems:"center",
justifyContent:"center",
zIndex:1000
}}>

<div style={{
background:"#111",
padding:20,
borderRadius:12,
maxWidth:400,
width:"90%"
}}>

<img
src={cropImage}
style={{
width:"100%",
borderRadius:8
}}
/>

<div style={{
display:"flex",
gap:10,
marginTop:12
}}>

<button
onClick={()=>setCropImage(null)}
style={{
flex:1,
padding:10,
borderRadius:8,
border:"none",
background:"#444",
color:"#fff"
}}
>
Cancel
</button>

<button
onClick={()=>{
confirmUpload();
setCropImage(null);
}}
style={{
flex:1,
padding:10,
borderRadius:8,
border:"none",
background:"#22c55e",
color:"#fff"
}}
>
Upload
</button>

</div>

</div>

</div>

)}

</div>

);

}
