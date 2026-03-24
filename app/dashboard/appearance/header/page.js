"use client";

import { useState,useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function HeaderEditor(){

const router = useRouter();

const [settings,setSettings]=useState({
layout:"classic",

showDisplayName:true,
showUsername:true,
showBio:true,

displayAlign:{x:0,y:0},
usernameAlign:{x:0,y:0},
bioAlign:{x:0,y:0},

displayAdvanced:false,
usernameAdvanced:false,
bioAdvanced:false,

useDefaultFonts:true,
advancedFonts:false,

displayFont:"Poppins",
usernameFont:"Roboto",
bioFont:"Lora",

displaySize:22,
usernameSize:14,
bioSize:15
});

const [dragDisplay,setDragDisplay]=useState(false);
const [dragUsername,setDragUsername]=useState(false);
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

/* SAVE SETTINGS */

async function updateSetting(key,value){

let newSettings={
...settings,
[key]:value
};

/* DEFAULT FONT LOGIC */

if(key==="useDefaultFonts" && value===true){
newSettings.displayFont="Poppins";
newSettings.usernameFont="Roboto";
newSettings.bioFont="Lora";
newSettings.advancedFonts=false;
}

if(key==="advancedFonts" && value===true){
newSettings.useDefaultFonts=false;
}

setSettings(newSettings);

/* LIVE PREVIEW */

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
function move(type,dir){

let align={...(settings[type+"Align"] || {x:0,y:0})};

if(dir==="up") align.y -= 5;
if(dir==="down") align.y += 5;
if(dir==="left") align.x -= 5;
if(dir==="right") align.x += 5;

const newSettings={
...settings,
[type+"Align"]:align
};

setSettings(newSettings);

window.dispatchEvent(
new CustomEvent("appearance-update",{detail:{header:newSettings}})
);

updateSetting(type+"Align",align);

}
async function uploadAvatar(e){

const file=e.target.files[0];
if(!file) return;

const {data:{session}}=await supabase.auth.getSession();

const path=`avatars/${session.user.id}_${Date.now()}`;

await supabase.storage
.from("avatars")
.upload(path,file);

const {data}=supabase.storage
.from("avatars")
.getPublicUrl(path);

await supabase
.from("profiles")
.update({avatar:data.publicUrl})
.eq("id",session.user.id);

setAvatar(data.publicUrl);

window.dispatchEvent(
new CustomEvent("appearance-update",{detail:{avatar:data.publicUrl}})
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
const arrow={
width:40,
height:40,
borderRadius:10,
border:"1px solid var(--border)",
background:"var(--card)",
cursor:"pointer",
fontSize:16
};
const btn=(active)=>({
padding:"8px 16px",
borderRadius:20,
border:"1px solid var(--border)",
background:active?"var(--text)":"var(--card)",
color:active?"#fff":"var(--text)",
cursor:"pointer"
});

return(

<div style={{maxWidth:650}}>

{/* HEADER TITLE */}

<div style={{
display:"flex",
alignItems:"center",
gap:12,
marginBottom:20
}}>

<div
onClick={()=>router.back()}
style={{
width:36,
height:36,
borderRadius:"50%",
border:"1px solid var(--border)",
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer"
}}
>
←
</div>

<h2>Header</h2>

</div>

{/* PROFILE IMAGE */}

<div style={section}>

<h3>Profile Image</h3>

<div style={{display:"flex",gap:20,alignItems:"center"}}>

<div style={{
width:70,
height:70,
borderRadius:"50%",
overflow:"hidden"
}}>
<img
src={avatar || "/default-avatar.png"}
style={{width:"100%",height:"100%",objectFit:"cover"}}
/>
</div>

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

</div>

</div>

{/* LAYOUT */}

<div style={section}>

<h3>Layout</h3>

<div style={{display:"flex",gap:10}}>

<button
onClick={()=>updateSetting("layout","classic")}
style={btn(settings.layout==="classic")}
>
Classic
</button>

<button
onClick={()=>updateSetting("layout","hero")}
style={btn(settings.layout==="hero")}
>
Hero
</button>

</div>

</div>

{/* DISPLAY OPTIONS */}

<div style={section}>

<label>
<input
type="checkbox"
checked={settings.showDisplayName}
onChange={(e)=>updateSetting("showDisplayName",e.target.checked)}
/>
 Show Display Name
</label>
<br/>

<label>
<input
type="checkbox"
checked={settings.showBio}
onChange={(e)=>updateSetting("showBio",e.target.checked)}
/>
 Show Bio
</label>
<br/>

<label>
<input
type="checkbox"
checked={settings.showUsername}
onChange={(e)=>updateSetting("showUsername",e.target.checked)}
/>
 Show Username
</label>

</div>

{/* FONT SYSTEM */}

<div style={section}>

<h3>Fonts</h3>

<label>
<input
type="checkbox"
checked={settings.useDefaultFonts}
onChange={(e)=>updateSetting("useDefaultFonts",e.target.checked)}
/>
 Default Fonts
</label>

<div style={{fontSize:13,opacity:.7,marginBottom:10}}>
Display Name → Poppins<br/>
Username → Roboto<br/>
Bio → Lora
</div>

<label>
<input
type="checkbox"
checked={settings.advancedFonts}
onChange={(e)=>updateSetting("advancedFonts",e.target.checked)}
/>
 Show advanced font options
</label>

{settings.advancedFonts && (

<div style={{marginTop:15}}>

<h4>Display Name Font</h4>

<select
value={settings.displayFont}
onChange={(e)=>updateSetting("displayFont",e.target.value)}
>

<option>Montserrat</option>
<option>Poppins</option>
<option>Playfair Display</option>
<option>Raleway</option>
<option>Rubik</option>
<option>Josefin Sans</option>
<option>Oswald</option>
<option>Spectral</option>
<option>Lora</option>
<option>Bitter</option>
<option>Source Code Pro</option>
<option>Inconsolata</option>
<option>Roboto Condensed</option>
<option>Encode Sans Semi Condensed</option>
<option>Asap Condensed</option>
<option>Allura</option>
<option>Great Vibes</option>
<option>Pinyon Script</option>
<option>Dancing Script</option>
<option>Pacifico</option>
<option>Sacramento</option>

</select>

<h4 style={{marginTop:15}}>Username Font</h4>

<select
value={settings.usernameFont}
onChange={(e)=>updateSetting("usernameFont",e.target.value)}
>

<option>Roboto</option>
<option>Open Sans</option>
<option>Lato</option>
<option>Nunito</option>
<option>Source Sans 3</option>
<option>Karla</option>
<option>Assistant</option>
<option>Work Sans</option>
<option>Cabin</option>
<option>Rubik</option>

</select>

<h4 style={{marginTop:15}}>Bio Font</h4>

<select
value={settings.bioFont}
onChange={(e)=>updateSetting("bioFont",e.target.value)}
>

<option>Merriweather</option>
<option>Lora</option>
<option>PT Serif</option>
<option>Crimson Text</option>
<option>Libre Baskerville</option>
<option>Spectral</option>
<option>Domine</option>
<option>Gelasio</option>
<option>Alegreya</option>
<option>Bitter</option>
<option>Allura</option>
<option>Great Vibes</option>
<option>Pinyon Script</option>
<option>Dancing Script</option>
<option>Pacifico</option>
<option>Sacramento</option>

</select>

</div>

)}

</div>

{/* FONT SIZE */}

<div style={section}>

<h3>Font Size</h3>

<div>Display Name ({settings.displaySize}px)</div>

<input
type="range"
min="16"
max="40"
value={settings.displaySize}
onChange={(e)=>updateSetting("displaySize",Number(e.target.value))}
/>

<div style={{marginTop:15}}>
Username ({settings.usernameSize}px)
</div>

<input
type="range"
min="10"
max="20"
value={settings.usernameSize}
onChange={(e)=>updateSetting("usernameSize",Number(e.target.value))}
/>

<div style={{marginTop:15}}>
Bio ({settings.bioSize}px)
</div>

<input
type="range"
min="10"
max="20"
value={settings.bioSize}
onChange={(e)=>updateSetting("bioSize",Number(e.target.value))}
/>

</div>

{/* FONT ALIGNMENT */}

{settings.layout === "hero" && (

<div style={section}>

<h3>Font Alignment</h3>

<label>
<input
type="checkbox"
checked={!settings.displayAdvanced}
onChange={()=>updateSetting("displayAdvanced",false)}
/>
 Default
</label>

<br/>

<label>
<input
type="checkbox"
checked={settings.displayAdvanced === true}
onChange={()=>updateSetting("displayAdvanced",true)}
/>
 Advanced Font Alignment
</label>

{settings.displayAdvanced && (

<div style={{marginTop:15}}>

<h4>Display Alignment</h4>

<div style={{
display:"grid",
gridTemplateColumns:"40px 40px 40px",
gap:6,
justifyContent:"center",
marginTop:10
}}>

<div></div>

<button style={arrow} onClick={()=>move("display","up")}>↑</button>

<div></div>

<button style={arrow} onClick={()=>move("display","left")}>←</button>

<button style={arrow} disabled>•</button>

<button style={arrow} onClick={()=>move("display","right")}>→</button>

<div></div>

<button style={arrow} onClick={()=>move("display","down")}>↓</button>

<div></div>

</div>


<h4 style={{marginTop:20}}>Username Alignment</h4>

<div style={{
display:"grid",
gridTemplateColumns:"40px 40px 40px",
gap:6,
justifyContent:"center",
marginTop:10
}}>

<div></div>

<button style={arrow} onClick={()=>move("username","up")}>↑</button>

<div></div>

<button style={arrow} onClick={()=>move("username","left")}>←</button>

<button style={arrow} disabled>•</button>

<button style={arrow} onClick={()=>move("username","right")}>→</button>

<div></div>

<button style={arrow} onClick={()=>move("username","down")}>↓</button>

<div></div>

</div>

</div>

)}

</div>

)}

</div>

);

}
