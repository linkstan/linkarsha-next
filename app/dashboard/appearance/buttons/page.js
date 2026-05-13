"use client";

import { useState,useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Buttons(){

const router = useRouter();

const [settings,setSettings] = useState({

/* STYLE */

style:"solid",

/* RADIUS */

radius:"round",

/* COLORS */

colorMode:"theme",
color:"#111111",

textMode:"theme",
textColor:"#ffffff",

/* SIZE */

size:"md",

/* EFFECTS */

hoverEffect:true,
pressEffect:true,
shadowLift:false,
depthEffect:false,

/* SPACING */

spacing:14,
padding:18

});


/* ================================================= */
/* LOAD */
/* ================================================= */

useEffect(()=>{
loadSettings();
},[]);

async function loadSettings(){

const {data:{session}} =
await supabase.auth.getSession();

if(!session) return;

const {data} = await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

if(data?.profile_settings?.buttons){

setSettings(prev=>({

...prev,
...data.profile_settings.buttons

}));

}

}


/* ================================================= */
/* UPDATE */
/* ================================================= */

async function updateSetting(key,value){

const newSettings = {

...settings,
[key]:value

};

setSettings(newSettings);

/* LIVE PREVIEW */

window.dispatchEvent(

new CustomEvent(
"appearance-update",
{
detail:{
buttons:newSettings
}
}
)

);

/* SAVE */

const {data:{session}} =
await supabase.auth.getSession();

if(!session) return;

const {data:profile} = await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

const allSettings =
profile?.profile_settings || {};

allSettings.buttons = newSettings;

await supabase
.from("profiles")
.update({
profile_settings:allSettings
})
.eq("id",session.user.id);

}


/* ================================================= */
/* UI */
/* ================================================= */

const section = {

background:"var(--card)",

border:"1px solid var(--border)",

borderRadius:18,

padding:24,

marginBottom:22

};

const option = (active)=>({

padding:"10px 16px",

borderRadius:999,

border:"1px solid var(--border)",

background:
active
? "var(--text)"
: "var(--card)",

color:
active
? "#ffffff"
: "var(--text)",

cursor:"pointer",

marginRight:10,
marginBottom:10,

fontSize:15,
fontWeight:500

});


/* ================================================= */
/* RENDER */
/* ================================================= */

return(

<div
style={{
maxWidth:700,
padding:20
}}
>

{/* HEADER */}

<div
style={{
display:"flex",
alignItems:"center",
gap:14,
marginBottom:28
}}
>

<div

onClick={()=>router.back()}

style={{

width:42,
height:42,

borderRadius:"50%",

border:"1px solid var(--border)",

display:"flex",
alignItems:"center",
justifyContent:"center",

cursor:"pointer",

fontSize:18

}}
>

←

</div>

<h1
style={{
margin:0,
fontSize:44,
lineHeight:1
}}
>
Buttons
</h1>

</div>


{/* ================================================= */}
{/* STYLE */}
{/* ================================================= */}

<div style={section}>

<h3>Style</h3>

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


{/* ================================================= */}
{/* RADIUS */}
{/* ================================================= */}

<div style={section}>

<h3>Radius</h3>

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


{/* ================================================= */}
{/* SIZE */}
{/* ================================================= */}

<div style={section}>

<h3>Button Size</h3>

<button
style={option(settings.size==="sm")}
onClick={()=>updateSetting("size","sm")}
>
Small
</button>

<button
style={option(settings.size==="md")}
onClick={()=>updateSetting("size","md")}
>
Medium
</button>

<button
style={option(settings.size==="lg")}
onClick={()=>updateSetting("size","lg")}
>
Large
</button>

</div>


{/* ================================================= */}
{/* EFFECTS */}
{/* ================================================= */}

<div style={section}>

<h3>Effects</h3>

<label
style={{
display:"block",
marginTop:14
}}
>

<input
type="checkbox"
checked={settings.hoverEffect}
onChange={(e)=>
updateSetting(
"hoverEffect",
e.target.checked
)}
/>

{" "}Hover effect

</label>

<label
style={{
display:"block",
marginTop:12
}}
>

<input
type="checkbox"
checked={settings.pressEffect}
onChange={(e)=>
updateSetting(
"pressEffect",
e.target.checked
)}
/>

{" "}Press effect

</label>

<label
style={{
display:"block",
marginTop:12
}}
>

<input
type="checkbox"
checked={settings.shadowLift}
onChange={(e)=>
updateSetting(
"shadowLift",
e.target.checked
)}
/>

{" "}Shadow lift

</label>

<label
style={{
display:"block",
marginTop:12
}}
>

<input
type="checkbox"
checked={settings.depthEffect}
onChange={(e)=>
updateSetting(
"depthEffect",
e.target.checked
)}
/>

{" "}Depth effect

</label>

</div>

</div>

);

}
