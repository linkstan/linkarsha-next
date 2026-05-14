"use client";

import {
useState,
useEffect
} from "react";

import { supabase }
from "../../../lib/supabase";

import { useRouter }
from "next/navigation";

export default function TextAppearancePage(){

const router = useRouter();

const [settings,setSettings] = useState({

fontFamily:"Inter",

align:"center",

nameSize:56,

usernameSize:18,

bioSize:15,
  
fontWeight:700,

textOpacity:.72,
  
letterSpacing:-0.04,

lineHeight:1.5,
densityMode:"balanced",
sectionSpacing:54,

buttonSpacing:18,

contentWidth:420,
  
headerTopSpacing:42,

nameBottomSpacing:14,

bioBottomSpacing:54

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

if(data?.profile_settings?.text){

setSettings(prev=>({

...prev,
...data.profile_settings.text

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
if(key === "densityMode"){

if(value === "compact"){

newSettings.sectionSpacing = 28;
newSettings.buttonSpacing = 10;
newSettings.contentWidth = 360;
newSettings.headerTopSpacing = 24;
newSettings.nameBottomSpacing = 8;
newSettings.bioBottomSpacing = 30;

}

if(value === "balanced"){

newSettings.sectionSpacing = 54;
newSettings.buttonSpacing = 18;
newSettings.contentWidth = 420;
newSettings.headerTopSpacing = 42;
newSettings.nameBottomSpacing = 14;
newSettings.bioBottomSpacing = 54;

}

if(value === "luxury"){

newSettings.sectionSpacing = 84;
newSettings.buttonSpacing = 28;
newSettings.contentWidth = 520;
newSettings.headerTopSpacing = 70;
newSettings.nameBottomSpacing = 24;
newSettings.bioBottomSpacing = 90;

}

}
setSettings(newSettings);


/* LIVE PREVIEW */

window.dispatchEvent(

new CustomEvent(
"appearance-update",
{
detail:{
text:newSettings
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

allSettings.text = newSettings;

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
Typography
</h1>

</div>


{/* ================================================= */}
{/* FONT */}
{/* ================================================= */}

<div style={section}>

<h3>Font Family</h3>

{[
"Inter",
"Poppins",
"DM Sans",
"Sora",
"Outfit",
"Playfair Display"
].map((item)=>(

<button
key={item}

style={
option(
settings.fontFamily === item
)
}

onClick={()=>
updateSetting(
"fontFamily",
item
)
}
>

{item}

</button>

))}

</div>


{/* ================================================= */}
{/* ALIGNMENT */}
{/* ================================================= */}

<div style={section}>

<h3>Alignment</h3>

{[
"left",
"center",
"right"
].map((item)=>(

<button
key={item}

style={
option(
settings.align === item
)
}

onClick={()=>
updateSetting(
"align",
item
)
}
>

{item}

</button>

))}

</div>


{/* ================================================= */}
{/* NAME SIZE */}
{/* ================================================= */}

<div style={section}>

<h3>Name Size</h3>

<input
type="range"

min="32"
max="90"

value={settings.nameSize}

onChange={(e)=>
updateSetting(
"nameSize",
Number(e.target.value)
)
}

style={{
width:"100%"
}}
/>

<div
style={{
marginTop:12,
opacity:.7
}}
>
{settings.nameSize}px
</div>

</div>

{/* ================================================= */}
{/* USERNAME SIZE */}
{/* ================================================= */}

<div style={section}>

<h3>Username Size</h3>

<input
type="range"

min="12"
max="40"

value={settings.usernameSize}

onChange={(e)=>
updateSetting(
"usernameSize",
Number(e.target.value)
)
}

style={{
width:"100%"
}}
/>

<div
style={{
marginTop:12,
opacity:.7
}}
>
{settings.usernameSize}px
</div>

</div>


{/* ================================================= */}
{/* BIO SIZE */}
{/* ================================================= */}

<div style={section}>

<h3>Bio Size</h3>

<input
type="range"

min="12"
max="32"

value={settings.bioSize}

onChange={(e)=>
updateSetting(
"bioSize",
Number(e.target.value)
)
}

style={{
width:"100%"
}}
/>

<div
style={{
marginTop:12,
opacity:.7
}}
>
{settings.bioSize}px
</div>

</div>

{/* ================================================= */}
{/* FONT WEIGHT */}
{/* ================================================= */}

<div style={section}>

<h3>Font Weight</h3>

{[
400,
500,
600,
700,
800
].map((item)=>(

<button
key={item}

style={
option(
settings.fontWeight === item
)
}

onClick={()=>
updateSetting(
"fontWeight",
item
)
}
>

{item}

</button>

))}

</div>


{/* ================================================= */}
{/* TEXT OPACITY */}
{/* ================================================= */}

<div style={section}>

<h3>Text Opacity</h3>

<input
type="range"

min="0.2"
max="1"
step="0.02"

value={settings.textOpacity}

onChange={(e)=>
updateSetting(
"textOpacity",
Number(e.target.value)
)
}

style={{
width:"100%"
}}
/>

<div
style={{
marginTop:12,
opacity:.7
}}
>
{settings.textOpacity}
</div>

</div>

{/* ================================================= */}
{/* LETTER SPACING */}
{/* ================================================= */}

<div style={section}>

<h3>Letter Spacing</h3>

<input
type="range"

min="-0.12"
max="0.12"
step="0.01"

value={settings.letterSpacing}

onChange={(e)=>
updateSetting(
"letterSpacing",
Number(e.target.value)
)
}

style={{
width:"100%"
}}
/>

<div
style={{
marginTop:12,
opacity:.7
}}
>
{settings.letterSpacing}em
</div>

</div>

{/* ================================================= */}
{/* LINE HEIGHT */}
{/* ================================================= */}

<div style={section}>

<h3>Line Height</h3>

<input
type="range"

min="0.9"
max="2.2"
step="0.05"

value={settings.lineHeight}

onChange={(e)=>
updateSetting(
"lineHeight",
Number(e.target.value)
)
}

style={{
width:"100%"
}}
/>

<div
style={{
marginTop:12,
opacity:.7
}}
>
{settings.lineHeight}
</div>

</div>

{/* ================================================= */}
{/* HEADER TOP SPACING */}
{/* ================================================= */}

<div style={section}>

<h3>Header Top Spacing</h3>

<input
type="range"

min="0"
max="120"

value={settings.headerTopSpacing}

onChange={(e)=>
updateSetting(
"headerTopSpacing",
Number(e.target.value)
)
}

style={{
width:"100%"
}}
/>

<div
style={{
marginTop:12,
opacity:.7
}}
>
{settings.headerTopSpacing}px
</div>

</div>

{/* ================================================= */}
{/* NAME SPACING */}
{/* ================================================= */}

<div style={section}>

<h3>Name Bottom Spacing</h3>

<input
type="range"

min="0"
max="50"

value={settings.nameBottomSpacing}

onChange={(e)=>
updateSetting(
"nameBottomSpacing",
Number(e.target.value)
)
}

style={{
width:"100%"
}}
/>

<div
style={{
marginTop:12,
opacity:.7
}}
>
{settings.nameBottomSpacing}px
</div>

</div>

{/* ================================================= */}
{/* BIO SPACING */}
{/* ================================================= */}

<div style={section}>

<h3>Bio Bottom Spacing</h3>

<input
type="range"

min="10"
max="120"

value={settings.bioBottomSpacing}

onChange={(e)=>
updateSetting(
"bioBottomSpacing",
Number(e.target.value)
)
}

style={{
width:"100%"
}}
/>

<div
style={{
marginTop:12,
opacity:.7
}}
>
{settings.bioBottomSpacing}px
</div>

</div>

{/* ================================================= */}
{/* SECTION SPACING */}
{/* ================================================= */}

<div style={section}>

<h3>Section Spacing</h3>

<input
type="range"

min="20"
max="120"

value={settings.sectionSpacing}

onChange={(e)=>
updateSetting(
"sectionSpacing",
Number(e.target.value)
)
}

style={{
width:"100%"
}}
/>

<div
style={{
marginTop:12,
opacity:.7
}}
>
{settings.sectionSpacing}px
</div>

</div>


{/* ================================================= */}
{/* BUTTON SPACING */}
{/* ================================================= */}

<div style={section}>

<h3>Button Spacing</h3>

<input
type="range"

min="4"
max="40"

value={settings.buttonSpacing}

onChange={(e)=>
updateSetting(
"buttonSpacing",
Number(e.target.value)
)
}

style={{
width:"100%"
}}
/>

<div
style={{
marginTop:12,
opacity:.7
}}
>
{settings.buttonSpacing}px
</div>

</div>


{/* ================================================= */}
{/* CONTENT WIDTH */}
{/* ================================================= */}

<div style={section}>

<h3>Content Width</h3>

<input
type="range"

min="280"
max="520"

value={settings.contentWidth}

onChange={(e)=>
updateSetting(
"contentWidth",
Number(e.target.value)
)
}

style={{
width:"100%"
}}
/>

<div
style={{
marginTop:12,
opacity:.7
}}
>
{settings.contentWidth}px
</div>

</div>

{/* ================================================= */}
{/* DENSITY MODE */}
{/* ================================================= */}

<div style={section}>

<h3>Density Mode</h3>

{[
"compact",
"balanced",
"luxury"
].map((item)=>(

<button
key={item}

style={
option(
settings.densityMode === item
)
}

onClick={()=>{

let preset = {};

if(item === "compact"){

preset = {

sectionSpacing:32,
buttonSpacing:10,
contentWidth:360,
headerTopSpacing:20,
nameBottomSpacing:8,
bioBottomSpacing:28

};

}

if(item === "balanced"){

preset = {

sectionSpacing:54,
buttonSpacing:18,
contentWidth:420,
headerTopSpacing:42,
nameBottomSpacing:14,
bioBottomSpacing:54

};

}

if(item === "luxury"){

preset = {

sectionSpacing:82,
buttonSpacing:28,
contentWidth:480,
headerTopSpacing:72,
nameBottomSpacing:24,
bioBottomSpacing:82

};

}

const newSettings = {

...settings,

densityMode:item,

...preset

};

setSettings(newSettings);

window.dispatchEvent(

new CustomEvent(
"appearance-update",
{
detail:{
text:newSettings
}
}
)

);

updateSetting(
"densityMode",
item
);

}}

>

{item}

</button>

))}

</div>
  
</div>

);

}
