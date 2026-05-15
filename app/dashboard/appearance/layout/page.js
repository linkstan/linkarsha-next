"use client";

import {
useState,
useEffect
} from "react";

import { supabase }
from "../../../lib/supabase";

import { useRouter }
from "next/navigation";

export default function LayoutAppearancePage(){

const router = useRouter();

const [settings,setSettings] = useState({

type:"centered"

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

if(data?.profile_settings?.layout){

setSettings(prev=>({

...prev,
...data.profile_settings.layout

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
layout:newSettings
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

allSettings.layout = newSettings;

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

padding:"12px 18px",

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
Layout
</h1>

</div>


{/* ================================================= */}
{/* LAYOUT TYPE */}
{/* ================================================= */}

<div style={section}>

<h3>Layout Style</h3>

{[
"centered",
"editorial",
"hero",
"card",
"split"
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

</div>

);

}
