"use client";

import { useState,useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default function WallpaperPage(){

const [active,setActive]=useState(null);
const [blur,setBlur]=useState(0);
const [loading,setLoading]=useState(false);

const wallpapers=[

{
name:"None",
value:null,
type:"none"
},

{
name:"Upload Image",
type:"upload"
},

{
name:"Sunset",
value:"linear-gradient(135deg,#ff7a18,#ffb347)"
},

{
name:"Ocean",
value:"linear-gradient(135deg,#2193b0,#6dd5ed)"
},

{
name:"Neon",
value:"linear-gradient(135deg,#00f2fe,#7c5cff)"
},

{
name:"Pastel",
value:"linear-gradient(135deg,#fbc2eb,#a6c1ee)"
},

{
name:"Aurora",
value:"linear-gradient(135deg,#00c6ff,#0072ff)"
},

{
name:"Galaxy",
value:"linear-gradient(135deg,#654ea3,#eaafc8)"
},

{
name:"Royal",
value:"linear-gradient(135deg,#141e30,#243b55)"
},

{
name:"Midnight",
value:"linear-gradient(135deg,#232526,#414345)"
},

{
name:"Forest",
value:"linear-gradient(135deg,#134e5e,#71b280)"
},

{
name:"Fire",
value:"linear-gradient(135deg,#f12711,#f5af19)"
}

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

}

async function applyWallpaper(value){

setActive(value);

window.dispatchEvent(
new CustomEvent("wallpaper-change",{detail:value})
);

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const {data} = await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

const settings=data?.profile_settings || {};

settings.wallpaper=value;
settings.wallpaperBlur=blur;

await supabase
.from("profiles")
.update({profile_settings:settings})
.eq("id",session.user.id);

}

async function uploadImage(e){

const file=e.target.files?.[0];
if(!file) return;

setLoading(true);

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const filePath=`${session.user.id}-${Date.now()}`;

await supabase.storage
.from("wallpapers")
.upload(filePath,file);

const {data}=supabase.storage
.from("wallpapers")
.getPublicUrl(filePath);

applyWallpaper(`url(${data.publicUrl})`);

setLoading(false);

}

function updateBlur(value){

setBlur(value);

window.dispatchEvent(
new CustomEvent("wallpaper-blur",{detail:value})
);

}

return(

<div style={{
padding:"24px",
maxWidth:900
}}>

{/* HEADER */}

<div style={{
display:"flex",
alignItems:"center",
gap:12,
marginBottom:24
}}>

<Link href="/dashboard/appearance">

<button style={{
border:"none",
background:"transparent",
fontSize:22,
cursor:"pointer"
}}>
←
</button>

</Link>

<h2 style={{margin:0}}>
Select Wallpaper
</h2>

</div>

{/* BLUR CONTROL */}

<div style={{
marginBottom:24
}}>

<div style={{
marginBottom:6,
fontWeight:500
}}>
Blur intensity
</div>

<input
type="range"
min="0"
max="20"
value={blur}
onChange={(e)=>updateBlur(e.target.value)}
style={{width:"100%"}}
/>

</div>

{/* GRID */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",
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

{/* PREVIEW */}

<div style={{
height:90,
borderRadius:12,
background:wall.value || "#ddd",
display:"flex",
alignItems:"center",
justifyContent:"center",
overflow:"hidden"
}}>

{wall.type==="upload" && (

<label style={{
cursor:"pointer",
fontSize:13
}}>

Upload

<input
type="file"
accept="image/*"
style={{display:"none"}}
onChange={uploadImage}
/>

</label>

)}

{wall.type==="none" && (
<span style={{fontSize:13}}>
None
</span>
)}

</div>

{/* NAME */}

<div style={{
fontSize:14,
fontWeight:500
}}>
{wall.name}
</div>

{/* BUTTON */}

{wall.type!=="upload" && (

<button
onClick={()=>applyWallpaper(wall.value)}
style={{
padding:"8px",
borderRadius:10,
border:"none",
background: applied ? "#22c55e" : "#111",
color:"#fff",
cursor:"pointer",
fontSize:13
}}
>

{applied ? "Applied" : "Apply"}

</button>

)}

</div>

);

})}

</div>

</div>

);

}
