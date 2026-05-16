"use client";

import {
useState,
useEffect
} from "react";

import { supabase }
from "../../../lib/supabase";

import { useRouter }
from "next/navigation";

import buttonPresets
from "../../../lib/buttonPresets";

export default function Buttons(){

const router = useRouter();

const [settings,setSettings] = useState({

/* PRESET */

preset:"minimal",

/* STYLE */

style:"solid",

/* RADIUS */

radius:"round",
radiusValue:18,

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

/* ADVANCED */

depth:14,

/* SPACING */

spacing:14,
padding:18

});


/* ================================================= */
/* PRESET LIST */
/* ================================================= */

const presets = [

{
id:"minimal",
title:"Minimal",
desc:"Clean modern simplicity"
},

{
id:"glass",
title:"Glass",
desc:"Premium glassmorphism"
},

{
id:"luxury",
title:"Luxury",
desc:"Elegant cinematic depth"
},

{
id:"soft",
title:"Soft",
desc:"Warm creator softness"
},

{
id:"editorial",
title:"Editorial",
desc:"Magazine aesthetic"
},

{
id:"neon",
title:"Neon",
desc:"Bright modern energy"
},

{
id:"floating",
title:"Floating",
desc:"Layered atmosphere"
},

{
id:"bold",
title:"Bold",
desc:"Strong visual impact"
}

];


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
/* SAVE */
/* ================================================= */

async function saveSettings(newSettings){

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

await saveSettings(newSettings);

}


/* ================================================= */
/* APPLY PRESET */
/* ================================================= */

async function applyPreset(id){

const preset =
buttonPresets?.[id] || {};

const newSettings = {

...settings,

preset:id,

...preset

};

setSettings(newSettings);

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

await saveSettings(newSettings);

}


/* ================================================= */
/* UI */
/* ================================================= */

const section = {

background:"var(--card)",

border:"1px solid var(--border)",

borderRadius:24,

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
fontWeight:500,

transition:"all .2s ease"

});


/* ================================================= */
/* RENDER */
/* ================================================= */

return(

<div
style={{
maxWidth:760,
padding:20
}}
>

{/* ================================================= */}
{/* HEADER */}
{/* ================================================= */}

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
{/* PRESETS */}
{/* ================================================= */}

<div style={section}>

<h3>Button Presets</h3>

<div
style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",

gap:18,

marginTop:20

}}
>

{presets.map((item)=>{

const preset =
buttonPresets?.[item.id] || {};

return(

<div

key={item.id}

onClick={()=>
applyPreset(item.id)
}

style={{

cursor:"pointer",

border:

settings?.preset === item.id

? "2px solid #000"

: "1px solid var(--border)",

borderRadius:28,

padding:20,

background:"var(--card)",

transition:"all .25s ease",

boxShadow:

settings?.preset === item.id

? "0 18px 40px rgba(0,0,0,.12)"

: "0 4px 12px rgba(0,0,0,.05)"

}}
>

<div
style={{

height:90,

borderRadius:24,

background:

preset?.style === "glass"

? "rgba(255,255,255,.22)"

: (
preset?.bg ||
"#111"
),

border:

preset?.style === "glass"

? "1px solid rgba(255,255,255,.4)"

: "none",

display:"flex",
alignItems:"center",
justifyContent:"center",

fontWeight:700,

fontSize:18,

color:
preset?.text || "#fff"

}}
>

Button

</div>

<div
style={{
marginTop:16
}}
>

<div
style={{
fontWeight:700,
marginBottom:6
}}
>
{item.title}
</div>

<div
style={{
fontSize:14,
opacity:.68,
lineHeight:1.5
}}
>
{item.desc}
</div>

</div>

</div>

);

})}

</div>

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


{/* ================================================= */}
{/* ADVANCED */}
{/* ================================================= */}

<div style={section}>

<h3>Depth</h3>

<input
type="range"

min="0"
max="40"

value={settings.depth || 14}

onChange={(e)=>
updateSetting(
"depth",
Number(e.target.value)
)
}

style={{
width:"100%"
}}
/>


<h3 style={{marginTop:30}}>
Custom Radius
</h3>

<input
type="range"

min="0"
max="999"

value={settings.radiusValue || 18}

onChange={(e)=>
updateSetting(
"radiusValue",
Number(e.target.value)
)
}

style={{
width:"100%"
}}
/>

</div>

</div>

);

}
