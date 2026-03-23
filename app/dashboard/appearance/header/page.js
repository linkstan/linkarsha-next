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

/* UPDATE SETTINGS */

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

/* UI STYLES */

const section={
background:"var(--card)",
border:"1px solid var(--border)",
borderRadius:14,
padding:20,
marginBottom:20
};

const optionButton=(active)=>({
padding:"8px 16px",
borderRadius:20,
border:"1px solid var(--border)",
background:active ? "var(--text)" : "var(--card)",
color:active ? "#fff" : "var(--text)",
cursor:"pointer"
});

return(

<div style={{maxWidth:650}}>

<h2 style={{marginBottom:20}}>Header</h2>

{/* PROFILE IMAGE */}

<div style={section}>

<h3 style={{marginBottom:10}}>Profile Image</h3>

<div style={{
display:"flex",
alignItems:"center",
gap:20
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

</div>

{/* LAYOUT */}

<div style={section}>

<h3 style={{marginBottom:10}}>Layout</h3>

<div style={{display:"flex",gap:10}}>

<button
onClick={()=>updateSetting("layout","classic")}
style={optionButton(settings.layout==="classic")}
>
Classic
</button>

<button
onClick={()=>updateSetting("layout","hero")}
style={optionButton(settings.layout==="hero")}
>
Hero
</button>

</div>

</div>

{/* DISPLAY OPTIONS */}

<div style={section}>

<h3 style={{marginBottom:10}}>Display</h3>

<label style={{display:"block",marginBottom:10}}>

<input
type="checkbox"
checked={settings.showDisplayName}
onChange={(e)=>updateSetting("showDisplayName",e.target.checked)}
/>

 Show Display Name

</label>

<label>

<input
type="checkbox"
checked={settings.showUsername}
onChange={(e)=>updateSetting("showUsername",e.target.checked)}
/>

 Show Username

</label>

</div>

{/* FONT */}

<div style={section}>

<h3 style={{marginBottom:10}}>Font</h3>

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

<div style={section}>

<h3 style={{marginBottom:10}}>Font Size</h3>

<input
type="range"
min="16"
max="40"
value={settings.fontSize}
onChange={(e)=>updateSetting("fontSize",Number(e.target.value))}
/>

</div>

{/* ALIGNMENT */}

<div style={section}>

<h3 style={{marginBottom:10}}>Alignment</h3>

<div style={{display:"flex",gap:10}}>

<button
onClick={()=>updateSetting("alignment","left")}
style={optionButton(settings.alignment==="left")}
>
⬅ Left
</button>

<button
onClick={()=>updateSetting("alignment","center")}
style={optionButton(settings.alignment==="center")}
>
⬤ Center
</button>

<button
onClick={()=>updateSetting("alignment","right")}
style={optionButton(settings.alignment==="right")}
>
➡ Right
</button>

</div>

</div>

{/* HEADER BACKGROUND */}

<div style={section}>

<h3 style={{marginBottom:10}}>Header Background</h3>

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

</div>

);

}
