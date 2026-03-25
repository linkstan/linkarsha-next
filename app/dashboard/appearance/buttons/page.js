"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function ButtonsEditor(){

const [settings,setSettings]=useState({
style:"solid",
radius:"round",
colorMode:"theme",
color:"#ffffff",
textMode:"theme",
textColor:"#ffffff"
});

useEffect(()=>{
loadSettings();
},[]);

async function loadSettings(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const {data} = await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

const btn = data?.profile_settings?.buttons;

if(btn){
setSettings(btn);
}

}

async function updateSetting(key,value){

const newSettings={
...settings,
[key]:value
};

/* UPDATE LOCAL STATE /

setSettings(newSettings);

/ LIVE PREVIEW EVENT /

window.dispatchEvent(
new CustomEvent("appearance-update",{
detail:{
buttons:newSettings
}
})
);

/ SAVE TO DATABASE /

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const {data:profile} = await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

const allSettings = profile?.profile_settings || {};

allSettings.buttons = newSettings;

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

const option=(active)=>({
padding:"6px 12px",
borderRadius:20,
border:"1px solid var(--border)",
background:active?"var(--text)":"var(--card)",
color:active?"#fff":"var(--text)",
cursor:"pointer",
marginRight:8
});

return(

<div style={{maxWidth:650}}>

<h2>Buttons</h2>

{/ BUTTON STYLE /}

<div style={section}>

<h3>Button Style</h3>

<button
style={option(settings.style==="solid")}
onClick={()=>updateSetting("style","solid")}
>
Solid
</button>

<button
style={option(settings.style==="glass")}
onClick={()=>updateSetting("style","glass")}
>
Glass
</button>

<button
style={option(settings.style==="outline")}
onClick={()=>updateSetting("style","outline")}
>
Outline
</button>

</div>

{/ CORNER RADIUS /}

<div style={section}>

<h3>Corner Radius</h3>

<button
style={option(settings.radius==="square")}
onClick={()=>updateSetting("radius","square")}
>
Square
</button>

<button
style={option(settings.radius==="round")}
onClick={()=>updateSetting("radius","round")}
>
Round
</button>

<button
style={option(settings.radius==="rounder")}
onClick={()=>updateSetting("radius","rounder")}
>
Rounder
</button>

<button
style={option(settings.radius==="full")}
onClick={()=>updateSetting("radius","full")}
>
Full
</button>

</div>

{/ BUTTON COLOR /}

<div style={section}>

<h3>Button Color</h3>

<label>
<input
type="radio"
checked={settings.colorMode==="theme"}
onChange={()=>updateSetting("colorMode","theme")}
/>
 Default (Theme)
</label>

<br/>

<label>
<input
type="radio"
checked={settings.colorMode==="custom"}
onChange={()=>updateSetting("colorMode","custom")}
/>
 Custom
</label>

{settings.colorMode==="custom" && (

<input
type="color"
value={settings.color}
onChange={(e)=>updateSetting("color",e.target.value)}
style={{marginTop:10}}
/>

)}

</div>

{/ TEXT COLOR */}

<div style={section}>

<h3>Button Text Color</h3>

<label>
<input
type="radio"
checked={settings.textMode==="theme"}
onChange={()=>updateSetting("textMode","theme")}
/>
 Default (Theme)
</label>

<br/>

<label>
<input
type="radio"
checked={settings.textMode==="custom"}
onChange={()=>updateSetting("textMode","custom")}
/>
 Custom
</label>

{settings.textMode==="custom" && (

<input
type="color"
value={settings.textColor}
onChange={(e)=>updateSetting("textColor",e.target.value)}
style={{marginTop:10}}
/>

)}

</div>

</div>

);

}
