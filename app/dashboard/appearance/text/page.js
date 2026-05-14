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

bioSize:15

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

</div>

);

}
