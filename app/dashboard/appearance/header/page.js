"use client";

import { themes } from "../../../lib/themes";
import { useState,useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";
import HeroCropModal from "../../../../components/HeroCropModal";

export default function HeaderEditor(){

const router = useRouter();

const [themeName,setThemeName]=useState("minimal");
const [theme,setTheme]=useState(null);
const themeFeatures = theme?.features || {};

const [settings,setSettings]=useState({
layout:"classic",

showDisplayName:true,
showUsername:true,
showBio:true,

showSocialIcons:false,
socialPosition:"header",

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
bioSize:15,

subtitle:"",

/* HERO SETTINGS */

heroText:"",
heroImage:null,
heroOpacity:100

});

const [avatar,setAvatar]=useState(null);
const [cropImage,setCropImage]=useState(null);

useEffect(()=>{
loadSettings();
loadProfile();
},[]);

async function loadSettings(){

const {data:{session}}=await supabase.auth.getSession();
if(!session) return;

const {data}=await supabase
.from("profiles")
.select("profile_settings, theme")
.eq("id",session.user.id)
.single();

if(data?.theme){
setThemeName(data.theme);
setTheme(themes[data.theme] || themes.minimal);
}
if(data?.profile_settings?.header){

setSettings(prev=>({
...prev,
displayAdvanced:false,
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

const newSettings={
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

/* UPDATE LOCAL STATE FIRST */

setSettings(newSettings);

/* LIVE PREVIEW */

window.dispatchEvent(
new CustomEvent("appearance-update",{detail:{header:newSettings}})
);

/* SAVE TO DATABASE */

const {data:{session}}=await supabase.auth.getSession();
if(!session) return;

const {data:profile}=await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

const allSettings = profile?.profile_settings || {};

if(!allSettings.header){
allSettings.header = {};
}

allSettings.header = newSettings;

await supabase
.from("profiles")
.update({profile_settings:allSettings})
.eq("id",session.user.id);

}

/* ALIGNMENT MOVE */

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

/* HOLD ARROW MOVEMENT */

let holdTimer=null;

function startMove(type,dir){

move(type,dir);

holdTimer=setInterval(()=>{
move(type,dir);
},80);

}

function stopMove(){
clearInterval(holdTimer);
}

/* AVATAR UPLOAD */

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
async function uploadHero(e){

const file=e.target.files[0];
if(!file) return;

const reader = new FileReader();

reader.onload = ()=>{
setCropImage(reader.result);
};

reader.readAsDataURL(file);

}

/* ADD THIS DIRECTLY BELOW */

async function saveCroppedHero(crop,zoom){

const { default: getCroppedImg } = await import("../../../lib/cropImage");

const blob = await getCroppedImg(cropImage,crop,zoom);

const {data:{session}}=await supabase.auth.getSession();

const path=`hero/${session.user.id}_${Date.now()}.jpg`;

await supabase.storage
.from("hero")
.upload(path,blob);

const {data}=supabase.storage
.from("hero")
.getPublicUrl(path);

updateSetting("heroImage",data.publicUrl);

setCropImage(null);

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
{themeFeatures.hero && (

<div style={section}>

<h3>Hero</h3>
{/* HERO IMAGE */}

<div style={{marginBottom:20}}>

<div style={{marginBottom:6}}>Hero Image</div>

<label style={{
padding:"8px 14px",
border:"1px solid var(--border)",
borderRadius:20,
cursor:"pointer"
}}>
Upload Image

<input
type="file"
accept="image/*"
onChange={uploadHero}
style={{display:"none"}}
/>

</label>

{settings.heroImage && (

<div style={{marginTop:10}}>

<img
src={settings.heroImage}
style={{
width:"100%",
borderRadius:10
}}
/>

</div>

)}

</div>
{/* Hero Text */}

{themeFeatures.heroText && (

<>
<div style={{marginBottom:6}}>Hero Text</div>

<input
type="text"
value={settings.heroText || ""}
onChange={(e)=>updateSetting("heroText",e.target.value)}
style={{
width:"100%",
padding:"10px",
borderRadius:"10px",
border:"1px solid var(--border)"
}}
/>

</>

)}

{/* Hero Opacity */}

{themeFeatures.heroOpacity && (

<div style={{marginTop:20}}>

<div>Hero Opacity ({settings.heroOpacity || 100}%)</div>

<input
type="range"
min="0"
max="100"
value={settings.heroOpacity || 100}
onChange={(e)=>updateSetting("heroOpacity",Number(e.target.value))}
style={{width:"100%"}}
/>

</div>

)}

</div>

)}

{/* LAYOUT (only if theme allows layout change) */}

{!theme?.layout?.hero && (

<div style={section}>

<h3>Layout</h3>

<div style={{display:"flex",gap:10}}>

<button
onClick={()=>updateSetting("layout","classic")}
style={btn(settings.layout==="classic")}
>
Classic
</button>

</div>

</div>

)}

{/* SOCIAL ICONS */}

{themeFeatures.socialIcons && (

<div style={section}>

<h3>Social Icons</h3>

<label>
<input
type="checkbox"
checked={settings.showSocialIcons}
onChange={(e)=>updateSetting("showSocialIcons",e.target.checked)}
/>
 Show Social Icons
</label>

{settings.showSocialIcons && (

<div style={{marginTop:12}}>

<div style={{fontSize:14,marginBottom:6}}>Show in:</div>

<label style={{marginRight:12}}>
<input
type="radio"
checked={settings.socialPosition==="header"}
onChange={()=>updateSetting("socialPosition","header")}
/>
 Header
</label>

<label>
<input
type="radio"
checked={settings.socialPosition==="bottom"}
onChange={()=>updateSetting("socialPosition","bottom")}
/>
 Bottom of Links
</label>

</div>

)}

</div>

)}

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

<br/>

{themeFeatures.username && (
<label>
<input
type="checkbox"
checked={settings.showUsername}
onChange={(e)=>updateSetting("showUsername",e.target.checked)}
/>
 Show Username
</label>
)}
{themeFeatures.bio && (
<label>
<input
type="checkbox"
checked={settings.showBio}
onChange={(e)=>updateSetting("showBio",e.target.checked)}
/>
 Show Bio
</label>
)}
{themeFeatures.subtitle && (

<>

<label>
<input
type="checkbox"
checked={!!settings.subtitle}
onChange={(e)=>updateSetting("subtitle", e.target.checked ? "Example subtitle" : "")}
/>
 Show Subtitle
</label>

{!!settings.subtitle && (

<input
type="text"
placeholder="Example: business coach"
value={settings.subtitle || ""}
onChange={(e)=>updateSetting("subtitle", e.target.value)}
style={{
width:"100%",
padding:"10px",
borderRadius:"10px",
border:"1px solid var(--border)",
marginTop:"6px"
}}
/>

)}

</>

)}

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
type="radio"
name="alignmentMode"
checked={!settings.displayAdvanced}
onChange={()=>{
const newSettings={
...settings,
displayAdvanced:false,
displayAlign:{x:0,y:0},
usernameAlign:{x:0,y:0}
};

setSettings(newSettings);

window.dispatchEvent(
new CustomEvent("appearance-update",{detail:{header:newSettings}})
);

updateSetting("displayAdvanced",false);
}}
/>
 Default
</label>

<br/>

<label>
<input
type="radio"
name="alignmentMode"
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

<button
style={arrow}
disabled={!settings.displayAdvanced}
onClick={()=>move("display","up")}
>
↑
</button>

<div></div>

<button
style={arrow}
disabled={!settings.displayAdvanced}
onClick={()=>move("display","left")}
>
←
</button>

<button style={arrow} disabled>•</button>

<button
style={arrow}
disabled={!settings.displayAdvanced}
onClick={()=>move("display","right")}
>
→
</button>

<div></div>

<button
style={arrow}
disabled={!settings.displayAdvanced}
onClick={()=>move("display","down")}
>
↓
</button>

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

<button
style={arrow}
disabled={!settings.displayAdvanced}
onClick={()=>move("username","up")}
>
↑
</button>

<div></div>

<button
style={arrow}
disabled={!settings.displayAdvanced}
onClick={()=>move("username","left")}
>
←
</button>

<button style={arrow} disabled>•</button>

<button
style={arrow}
disabled={!settings.displayAdvanced}
onClick={()=>move("username","right")}
>
→
</button>

<div></div>

<button
style={arrow}
disabled={!settings.displayAdvanced}
onClick={()=>move("username","down")}
>
↓
</button>

<div></div>

</div>

</div>

)}

</div>

)}

{cropImage && (

<HeroCropModal
image={cropImage}
onCancel={()=>setCropImage(null)}
onComplete={saveCroppedHero}
/>

)}

</div>

);

}
