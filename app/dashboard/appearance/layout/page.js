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


/* ================================================= */
/* LAYOUTS */
/* ================================================= */

const layouts = [

{
id:"centered",
title:"Centered",
desc:"Classic creator layout"
},

{
id:"editorial",
title:"Editorial",
desc:"Luxury magazine composition"
},

{
id:"hero",
title:"Hero",
desc:"Cinematic creator landing"
},

{
id:"card",
title:"Card",
desc:"Floating glass experience"
},

{
id:"split",
title:"Split",
desc:"Premium desktop composition"
}

];


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
{/* LAYOUT STYLE */}
{/* ================================================= */}

<div style={section}>

<h3>Layout Style</h3>

<div
style={{

display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:18,
marginTop:20

}}
>

{layouts.map((item)=>(

<div

key={item.id}

onClick={()=>
updateSetting(
"type",
item.id
)
}

style={{

border:

settings.type === item.id

? "2px solid var(--text)"

: "1px solid var(--border)",

borderRadius:24,

padding:20,

cursor:"pointer",

background:"var(--card)",

transition:"all .2s ease"

}}
>

{/* ================================================= */}
{/* MINI PREVIEW */}
{/* ================================================= */}

<div
style={{

height:120,

borderRadius:18,

background:"#f4f4f4",

marginBottom:16,

position:"relative",

overflow:"hidden"

}}
>

{/* CENTERED */}

{item.id === "centered" && (

<div
style={{

display:"flex",
flexDirection:"column",
alignItems:"center",
paddingTop:18,
gap:10

}}
>

<div
style={{
width:34,
height:34,
borderRadius:"50%",
background:"#bbb"
}}
/>

<div
style={{
width:80,
height:10,
borderRadius:999,
background:"#bbb"
}}
/>

<div
style={{
width:120,
height:12,
borderRadius:999,
background:"#d4d4d4"
}}
/>

</div>

)}

{/* HERO */}

{item.id === "hero" && (

<div
style={{

display:"flex",
flexDirection:"column",
alignItems:"center",
paddingTop:10,
gap:12

}}
>

<div
style={{
width:46,
height:46,
borderRadius:"50%",
background:"#999"
}}
/>

<div
style={{
width:120,
height:14,
borderRadius:999,
background:"#999"
}}
/>

<div
style={{
width:140,
height:40,
borderRadius:18,
background:"#d0d0d0"
}}
/>

</div>

)}

{/* SPLIT */}

{item.id === "split" && (

<div
style={{

display:"grid",
gridTemplateColumns:"40px 1fr",
gap:12,
padding:16

}}
>

<div
style={{
width:40,
height:40,
borderRadius:"50%",
background:"#bcbcbc"
}}
/>

<div
style={{

display:"flex",
flexDirection:"column",
gap:8

}}
>

<div
style={{
width:"70%",
height:10,
borderRadius:999,
background:"#bcbcbc"
}}
/>

<div
style={{
width:"100%",
height:12,
borderRadius:999,
background:"#d7d7d7"
}}
/>

<div
style={{
width:"100%",
height:12,
borderRadius:999,
background:"#d7d7d7"
}}
/>

</div>

</div>

)}

{/* CARD */}

{item.id === "card" && (

<div
style={{

padding:14

}}
>

<div
style={{

width:"100%",
height:"100%",

borderRadius:20,

background:"rgba(255,255,255,.7)",

border:"1px solid rgba(0,0,0,.08)"

}}
/>

</div>

)}

{/* EDITORIAL */}

{item.id === "editorial" && (

<div
style={{
padding:18
}}
>

<div
style={{
width:"60%",
height:12,
borderRadius:999,
background:"#999",
marginBottom:12
}}
/>

<div
style={{
width:"100%",
height:10,
borderRadius:999,
background:"#d4d4d4",
marginBottom:8
}}
/>

<div
style={{
width:"90%",
height:10,
borderRadius:999,
background:"#d4d4d4"
}}
/>

</div>

)}

</div>

<h4
style={{
margin:"0 0 6px 0"
}}
>
{item.title}
</h4>

<div
style={{
opacity:.7,
fontSize:14,
lineHeight:1.5
}}
>
{item.desc}
</div>

</div>

))}

</div>

</div>

</div>

);

}
