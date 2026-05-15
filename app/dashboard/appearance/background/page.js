"use client";

import {
useState,
useEffect
} from "react";

import { supabase }
from "../../../lib/supabase";

import { useRouter }
from "next/navigation";

import backgroundPresets
from "../../../lib/backgroundPresets";

export default function BackgroundAppearancePage(){

const router = useRouter();

const [settings,setSettings] = useState({


/* ================================================= */
/* PRESETS */}
{/* ================================================= */}

<div style={section}>

<h3>Background Presets</h3>

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
backgroundPresets[item.id];

return(

<div

key={item.id}

onClick={()=>{

const newSettings = {

...settings,

preset:item.id,

...preset

};

setSettings(newSettings);

window.dispatchEvent(

new CustomEvent(
"appearance-update",
{
detail:{
background:newSettings
}
}
)

);

updateSetting(
"preset",
item.id
);

}}

style={{

cursor:"pointer",

border:

settings.preset === item.id

? "2px solid #000"

: "1px solid var(--border)",

borderRadius:28,

overflow:"hidden",

background:"var(--card)",

transition:"all .25s ease",

boxShadow:

settings.preset === item.id

? "0 18px 40px rgba(0,0,0,.12)"

: "0 4px 12px rgba(0,0,0,.05)"

}}
>

{/* PREVIEW */}

<div
style={{

height:120,

background:

preset.type === "gradient"

? `linear-gradient(
${preset.gradientDirection || "135deg"},
${preset.gradient1},
${preset.gradient2}
)`

: preset.background,

position:"relative",

overflow:"hidden"

}}
>

{/* GLOW */}

<div
style={{

position:"absolute",

width:160,
height:160,

borderRadius:"50%",

background:
preset.glowColor || "transparent",

opacity:
preset.glowOpacity || 0,

filter:
`blur(${
preset.blurStrength || 0
}px)`,

top:-40,
right:-40

}}
/>

</div>

{/* TEXT */}

<div
style={{
padding:18
}}
>

<div
style={{
fontSize:17,
fontWeight:700,
marginBottom:6
}}
>
{item.title}
</div>

<div
style={{
fontSize:14,
opacity:.65,
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
/* ================================================= */
/* TYPE */
/* ================================================= */

type:"solid",

/* ================================================= */
/* SOLID */
/* ================================================= */

background:"#ffffff",

/* ================================================= */
/* GRADIENT */
/* ================================================= */

gradient1:"#ffffff",

gradient2:"#e9ecff",

gradientDirection:"135deg",

/* ================================================= */
/* AMBIENT */
/* ================================================= */

glowOpacity:.18,

blurStrength:80,

glowColor:"#7c7cff",

glowPosition:"top-left"

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

if(data?.profile_settings?.background){

setSettings(prev=>({

...prev,
...data.profile_settings.background

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
background:newSettings
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

allSettings.background = newSettings;

await supabase
.from("profiles")
.update({
profile_settings:allSettings
})
.eq("id",session.user.id);

}

/* ================================================= */
/* PRESET LIST */
/* ================================================= */

const presets = [

{
id:"editorialWhite",
title:"Editorial White",
desc:"Minimal clean atmosphere"
},

{
id:"softLavender",
title:"Soft Lavender",
desc:"Pastel luxury glow"
},

{
id:"darkLuxury",
title:"Dark Luxury",
desc:"Cinematic gold atmosphere"
},

{
id:"aurora",
title:"Aurora",
desc:"Modern neon depth"
},

{
id:"midnightGlass",
title:"Midnight Glass",
desc:"Dark glassmorphism"
},

{
id:"sunsetGlow",
title:"Sunset Glow",
desc:"Warm creator energy"
},

{
id:"creatorPink",
title:"Creator Pink",
desc:"Soft creator aesthetic"
},

{
id:"oceanDepth",
title:"Ocean Depth",
desc:"Deep ocean atmosphere"
}

];
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


return(

<div
style={{
maxWidth:700,
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
fontSize:44
}}
>
Background
</h1>

</div>


{/* ================================================= */}
{/* TYPE */}
{/* ================================================= */}

<div style={section}>

<h3>Background Type</h3>

{[
"solid",
"gradient",
"ambient"
].map((item)=>(

<button
key={item}

style={
option(
settings.type === item
)
}

onClick={()=>
updateSetting(
"type",
item
)
}
>

{item}

</button>

))}

</div>


{/* ================================================= */}
{/* SOLID */}
{/* ================================================= */}

{settings.type === "solid" && (

<div style={section}>

<h3>Background Color</h3>

<input
type="color"

value={settings.background}

onChange={(e)=>
updateSetting(
"background",
e.target.value
)
}
/>

</div>

)}


{/* ================================================= */}
{/* GRADIENT */}
{/* ================================================= */}

{settings.type === "gradient" && (

<>

<div style={section}>

<h3>Gradient Color 1</h3>

<input
type="color"

value={settings.gradient1}

onChange={(e)=>
updateSetting(
"gradient1",
e.target.value
)
}
/>

</div>

<div style={section}>

<h3>Gradient Color 2</h3>

<input
type="color"

value={settings.gradient2}

onChange={(e)=>
updateSetting(
"gradient2",
e.target.value
)
}
/>

</div>


<div style={section}>

<h3>Gradient Direction</h3>

{[
"135deg",
"180deg",
"90deg",
"45deg"
].map((item)=>(

<button
key={item}

style={
option(
settings.gradientDirection === item
)
}

onClick={()=>
updateSetting(
"gradientDirection",
item
)
}
>

{item}

</button>

))}

</div>

</>

)}


{/* ================================================= */}
{/* AMBIENT */}
{/* ================================================= */}

{settings.type === "ambient" && (

<>

{/* GLOW OPACITY */}

<div style={section}>

<h3>Glow Opacity</h3>

<input
type="range"

min="0"
max=".6"
step=".02"

value={settings.glowOpacity}

onChange={(e)=>
updateSetting(
"glowOpacity",
Number(e.target.value)
)
}

style={{
width:"100%"
}}
/>

</div>


{/* GLOW COLOR */}

<div style={section}>

<h3>Glow Color</h3>

<input
type="color"

value={settings.glowColor}

onChange={(e)=>
updateSetting(
"glowColor",
e.target.value
)
}
/>

</div>


{/* GLOW POSITION */}

<div style={section}>

<h3>Glow Position</h3>

{[
"top-left",
"top-right",
"center",
"bottom"
].map((item)=>(

<button
key={item}

style={
option(
settings.glowPosition === item
)
}

onClick={()=>
updateSetting(
"glowPosition",
item
)
}
>

{item}

</button>

))}

</div>


{/* BLUR */}

<div style={section}>

<h3>Blur Strength</h3>

<input
type="range"

min="0"
max="160"
step="2"

value={settings.blurStrength}

onChange={(e)=>
updateSetting(
"blurStrength",
Number(e.target.value)
)
}

style={{
width:"100%"
}}
/>

</div>

</>

)}

</div>

);

}
