"use client";

import { useState,useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function HeaderEditor(){

const [settings,setSettings]=useState({
layout:"classic",
showDisplayName:true,
showUsername:true,
font:"Inter",
fontWeight:"bold",
fontSize:22,
alignment:"center",
backgroundType:"transparent",
backgroundColor:"#000000",
backgroundGradient:["#141e30","#243b55"],
backgroundImage:""
});

const [avatar,setAvatar]=useState(null);

useEffect(()=>{
loadSettings();
loadProfile();
},[]);

async function loadSettings(){

const {data:{session}}=await supabase.auth.getSession();
if(!session) return;

const {data}=await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

if(data?.profile_settings?.header){
setSettings(prev=>({
...prev,
...data.profile_settings.header
}));
}

}

async function loadProfile(){

const {data:{session}}=await supabase.auth.getSession();
if(!session) return;

const {data}=await supabase
.from("profiles")
.select("avatar")
.eq("id",session.user.id)
.single();

if(data?.avatar){
setAvatar(data.avatar);
}

}

/* UPDATE HEADER SETTINGS */

async function updateSetting(key,value){

const newSettings={
...settings,
[key]:value
};

setSettings(newSettings);

window.dispatchEvent(
new CustomEvent("appearance-update",{detail:{header:newSettings}})
);

const {data:{session}}=await supabase.auth.getSession();

const {data:profile}=await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

const allSettings=profile?.profile_settings || {};

allSettings.header=newSettings;

await supabase
.from("profiles")
.update({profile_settings:allSettings})
.eq("id",session.user.id);

}

/* AVATAR UPLOAD */

async function uploadAvatar(e){

const file=e.target.files[0];
if(!file) return;

const {data:{session}}=await supabase.auth.getSession();

const filePath=`avatars/${session.user.id}_${Date.now()}`;

await supabase.storage
.from("avatars")
.upload(filePath,file);

const {data}=supabase.storage
.from("avatars")
.getPublicUrl(filePath);

await supabase
.from("profiles")
.update({avatar:data.publicUrl})
.eq("id",session.user.id);

setAvatar(data.publicUrl);

window.dispatchEvent(
new CustomEvent("appearance-update",{detail:{avatar:data.publicUrl}})
);

}

/* REMOVE AVATAR */

async function removeAvatar(){

const {data:{session}}=await supabase.auth.getSession();

await supabase
.from("profiles")
.update({avatar:null})
.eq("id",session.user.id);

setAvatar(null);

window.dispatchEvent(
new CustomEvent("appearance-update",{detail:{avatar:null}})
);

}

return(

<div style={{maxWidth:600}}>

<h2 style={{marginBottom:20}}>Header</h2>

{/* PROFILE IMAGE */}

<h3 style={{marginBottom:10}}>Profile Image</h3>

<div style={{
display:"flex",
alignItems:"center",
gap:20,
marginBottom:20
}}>

<div style={{
width:70,
height:70,
borderRadius:"50%",
background:"#ccc",
overflow:"hidden"
}}>

<img
src={avatar || "/default-avatar.png"}
style={{
width:"100%",
height:"100%",
objectFit:"cover"
}}
/>

</div>

<div style={{display:"flex",flexDirection:"column",gap:10}}>

<label style={{
padding:"8px 14px",
border:"1px solid var(--border)",
borderRadius:20,
cursor:"pointer"
}}>
Upload
<input
type="file"
accept="image/*"
onChange={uploadAvatar}
style={{display:"none"}}
/>
</label>

<button
onClick={removeAvatar}
style={{
padding:"8px 14px",
border:"1px solid var(--border)",
borderRadius:20,
cursor:"pointer"
}}
>
Remove
</button>

</div>

</div>

{/* LAYOUT */}

<div style={{marginBottom:20}}>

<div style={{marginBottom:8}}>Layout</div>

<div style={{display:"flex",gap:10}}>

<button
onClick={()=>updateSetting("layout","classic")}
style={{
padding:"8px 16px",
borderRadius:20,
border:"1px solid var(--border)",
background:settings.layout==="classic"?"var(--text)":"var(--card)",
color:settings.layout==="classic"?"#fff":"var(--text)",
cursor:"pointer"
}}
>
Classic
</button>

<button
onClick={()=>updateSetting("layout","hero")}
style={{
padding:"8px 16px",
borderRadius:20,
border:"1px solid var(--border)",
background:settings.layout==="hero"?"var(--text)":"var(--card)",
color:settings.layout==="hero"?"#fff":"var(--text)",
cursor:"pointer"
}}
>
Hero
</button>

</div>

</div>

{/* DISPLAY NAME */}

<label style={{display:"block",marginBottom:10}}>

<input
type="checkbox"
checked={settings.showDisplayName}
onChange={(e)=>updateSetting("showDisplayName",e.target.checked)}
/>

 Show Display Name

</label>

<label style={{display:"block",marginBottom:20}}>

<input
type="checkbox"
checked={settings.showUsername}
onChange={(e)=>updateSetting("showUsername",e.target.checked)}
/>

 Show Username

</label>

{/* FONT */}

<div style={{marginBottom:20}}>

<div>Font</div>

<select
value={settings.font}
onChange={(e)=>updateSetting("font",e.target.value)}
>

<option>Inter</option>
<option>Poppins</option>
<option>Montserrat</option>
<option>Playfair Display</option>
<option>Oswald</option>
<option>Manrope</option>

</select>

</div>

{/* FONT SIZE */}

<div style={{marginBottom:20}}>

<div>Font Size</div>

<input
type="range"
min="16"
max="40"
value={settings.fontSize}
onChange={(e)=>updateSetting("fontSize",Number(e.target.value))}
/>

</div>

{/* ALIGNMENT */}

<div style={{marginBottom:20}}>

<div style={{marginBottom:8}}>Alignment</div>

<div style={{display:"flex",gap:10}}>

<button
onClick={()=>updateSetting("alignment","left")}
style={{
padding:"8px 14px",
borderRadius:20,
border:"1px solid var(--border)",
background:settings.alignment==="left"?"var(--text)":"var(--card)",
color:settings.alignment==="left"?"#fff":"var(--text)"
}}
>
⬅ Left
</button>

<button
onClick={()=>updateSetting("alignment","center")}
style={{
padding:"8px 14px",
borderRadius:20,
border:"1px solid var(--border)",
background:settings.alignment==="center"?"var(--text)":"var(--card)",
color:settings.alignment==="center"?"#fff":"var(--text)"
}}
>
⬤ Center
</button>

<button
onClick={()=>updateSetting("alignment","right")}
style={{
padding:"8px 14px",
borderRadius:20,
border:"1px solid var(--border)",
background:settings.alignment==="right"?"var(--text)":"var(--card)",
color:settings.alignment==="right"?"#fff":"var(--text)"
}}
>
➡ Right
</button>

</div>

</div>

{/* HEADER BACKGROUND */}

<h3>Header Background</h3>

<select
value={settings.backgroundType}
onChange={(e)=>updateSetting("backgroundType",e.target.value)}
>

<option value="transparent">Transparent</option>
<option value="solid">Solid</option>
<option value="gradient">Gradient</option>
<option value="image">Image</option>

</select>

</div>

);

}
