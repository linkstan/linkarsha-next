"use client";

import { useState,useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Buttons(){

const router = useRouter();

const [settings,setSettings]=useState({
style:"solid",
radius:"round",
colorMode:"theme",
color:"#ffffff",
textMode:"theme",
textColor:"#ffffff",
hoverEffect:true,
pressEffect:true,
shadowLift:true,
depthEffect:true
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

if(data?.profile_settings?.buttons){
setSettings({
shadowLift:true,
depthEffect:true,
...data.profile_settings.buttons
});
}

}

async function updateSetting(key,value){

const newSettings={
...settings,
[key]:value
};

setSettings(newSettings);

window.dispatchEvent(
new CustomEvent("appearance-update",{detail:{buttons:newSettings}})
);

const {data:{session}}=await supabase.auth.getSession();
if(!session) return;

const {data:profile}=await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

const allSettings=profile?.profile_settings || {};
allSettings.buttons=newSettings;

await supabase
.from("profiles")
.update({profile_settings:allSettings})
.eq("id",session.user.id);

}

const section={
background:"var(--card)",
border:"1px solid var(--border)",
borderRadius:14,
padding:20,
marginBottom:20
};

const btn=(active)=>({
padding:"6px 14px",
borderRadius:20,
border:"1px solid var(--border)",
background:active?"var(--text)":"var(--card)",
color:active?"#fff":"var(--text)",
cursor:"pointer",
marginRight:8
});

return(

<div style={{maxWidth:650,padding:20}}>

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

<h2>Buttons</h2>

</div>

<div style={section}>

<h3>Style</h3>

<button
style={btn(settings.style==="solid")}
onClick={()=>updateSetting("style","solid")}
>
Solid
</button>

<button
style={btn(settings.style==="glass")}
onClick={()=>updateSetting("style","glass")}
>
Glass
</button>

<button
style={btn(settings.style==="outline")}
onClick={()=>updateSetting("style","outline")}
>
Outline
</button>

</div>

<div style={section}>

<h3>Radius</h3>

<button
style={btn(settings.radius==="square")}
onClick={()=>updateSetting("radius","square")}
>
Square
</button>

<button
style={btn(settings.radius==="round")}
onClick={()=>updateSetting("radius","round")}
>
Round
</button>

<button
style={btn(settings.radius==="rounder")}
onClick={()=>updateSetting("radius","rounder")}
>
Rounder
</button>

<button
style={btn(settings.radius==="full")}
onClick={()=>updateSetting("radius","full")}
>
Full
</button>

<h3 style={{marginTop:25}}>Effects</h3>

<label style={{display:"block",marginTop:10}}>
<input
type="checkbox"
checked={settings.hoverEffect}
onChange={(e)=>updateSetting("hoverEffect",e.target.checked)}
/>
 Hover effect
</label>

<label style={{display:"block",marginTop:6}}>
<input
type="checkbox"
checked={settings.pressEffect}
onChange={(e)=>updateSetting("pressEffect",e.target.checked)}
/>
 Press effect
</label>

<label style={{display:"block",marginTop:6}}>
<input
type="checkbox"
checked={settings.shadowLift}
onChange={(e)=>updateSetting("shadowLift",e.target.checked)}
/>
 Shadow lift
</label>

<label style={{display:"block",marginTop:6}}>
<input
type="checkbox"
checked={settings.depthEffect}
onChange={(e)=>updateSetting("depthEffect",e.target.checked)}
/>
 Depth effect
</label>

</div>

</div>

);

}
