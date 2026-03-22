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

useEffect(()=>{
loadSettings();
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
setSettings({
...settings,
...data.profile_settings.header
});
}

}

async function updateSetting(key,value){

const newSettings={
...settings,
[key]:value
};

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

return(

<div style={{maxWidth:650}}>

<h2 style={{marginBottom:20}}>Header</h2>

{/* LAYOUT */}

<div style={{marginBottom:20}}>

<div style={{marginBottom:6}}>Layout</div>

<select
value={settings.layout}
onChange={(e)=>updateSetting("layout",e.target.value)}
>

<option value="classic">Classic</option>
<option value="hero">Hero</option>

</select>

</div>

{/* BACKGROUND */}

<div style={{marginBottom:20}}>

<div style={{marginBottom:6}}>Header Background</div>

<select
value={settings.backgroundType}
onChange={(e)=>updateSetting("backgroundType",e.target.value)}
>

<option value="transparent">Transparent</option>
<option value="solid">Solid Color</option>
<option value="gradient">Gradient</option>
<option value="image">Image</option>

</select>

</div>

{/* SOLID COLOR */}

{settings.backgroundType==="solid" && (

<div style={{marginBottom:20}}>

<div>Background Color</div>

<input
type="color"
value={settings.backgroundColor}
onChange={(e)=>updateSetting("backgroundColor",e.target.value)}
/>

</div>

)}

{/* GRADIENT */}

{settings.backgroundType==="gradient" && (

<div style={{marginBottom:20}}>

<div>Gradient Color 1</div>

<input
type="color"
value={settings.backgroundGradient[0]}
onChange={(e)=>{

const g=[...settings.backgroundGradient];
g[0]=e.target.value;
updateSetting("backgroundGradient",g);

}}
/>

<div style={{marginTop:10}}>Gradient Color 2</div>

<input
type="color"
value={settings.backgroundGradient[1]}
onChange={(e)=>{

const g=[...settings.backgroundGradient];
g[1]=e.target.value;
updateSetting("backgroundGradient",g);

}}
/>

</div>

)}

{/* DISPLAY NAME */}

<div style={{marginBottom:20}}>

<label>

<input
type="checkbox"
checked={settings.showDisplayName}
onChange={(e)=>updateSetting("showDisplayName",e.target.checked)}
/>

 Show Display Name

</label>

</div>

{/* USERNAME */}

<div style={{marginBottom:20}}>

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

{/* FONT WEIGHT */}

<div style={{marginBottom:20}}>

<div>Font Weight</div>

<select
value={settings.fontWeight}
onChange={(e)=>updateSetting("fontWeight",e.target.value)}
>

<option value="normal">Normal</option>
<option value="600">Semi Bold</option>
<option value="bold">Bold</option>

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

<div>

<div>Alignment</div>

<select
value={settings.alignment}
onChange={(e)=>updateSetting("alignment",e.target.value)}
>

<option value="left">Left</option>
<option value="center">Center</option>
<option value="right">Right</option>

</select>

</div>

</div>

);

}
