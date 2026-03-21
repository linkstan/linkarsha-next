"use client";

import { useEffect,useState } from "react";
import { createClient } from "@supabase/supabase-js";
import BlockRenderer from "../../components/BlockRenderer";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function PublicProfile({ params }) {

const [profile,setProfile]=useState(null);
const [blocks,setBlocks]=useState([]);

useEffect(()=>{
load();
},[]);

async function load(){

const username=params.username;

const {data:prof}=await supabase
.from("profiles")
.select("*")
.eq("username",username)
.single();

if(!prof) return;

setProfile(prof);

await supabase.from("events").insert({
user_id:prof.id,
event_type:"view"
});

const {data:blockData}=await supabase
.from("blocks")
.select("*")
.eq("user_id",prof.id)
.order("position",{ascending:true})
.limit(100);

setBlocks(blockData||[]);

}

if(!profile){

return(
<div style={{
minHeight:"100vh",
background:"#0b0b12",
color:"white",
display:"flex",
alignItems:"center",
justifyContent:"center"
}}>
Loading...
</div>
);

}

/* THEME ENGINE */

const themes={

Minimal:{
bg:"#ffffff",
text:"#111111"
},

Midnight:{
bg:"#0b0b12",
text:"#ffffff"
},

Ocean:{
bg:"linear-gradient(135deg,#2193b0,#6dd5ed)",
text:"#ffffff"
},

Sunset:{
bg:"linear-gradient(135deg,#ff7a18,#ffb347)",
text:"#ffffff"
},

Luxury:{
bg:"#000000",
text:"#d4af37"
},

Pastel:{
bg:"linear-gradient(135deg,#fbc2eb,#a6c1ee)",
text:"#111"
},

Neon:{
bg:"linear-gradient(135deg,#00f2fe,#7c5cff)",
text:"#ffffff"
},

Mono:{
bg:"#111111",
text:"#ffffff"
}

};

const theme=themes[profile.theme] || themes.Midnight;

return(

<div style={{
minHeight:"100vh",
background:theme.bg,
color:theme.text,
display:"flex",
alignItems:"center",
justifyContent:"center",
flexDirection:"column",
fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif",
transition:"all .4s ease"
}}>

<div style={{
width:110,
height:110,
borderRadius:"50%",
overflow:"hidden",
background:"#222",
marginBottom:20
}}>
<img
src={profile.avatar || "/default-avatar.png"}
style={{
width:"100%",
height:"100%",
objectFit:"cover"
}}
/>
</div>

<h1 style={{display:"flex",alignItems:"center",gap:6}}>
@{profile.username}

{profile.verified && (

<svg
xmlns="http://www.w3.org/2000/svg"
width="18"
height="18"
viewBox="0 0 24 24"
fill="#1DA1F2"
>

<path d="M22.5 12l-2.3 2.1.5 3-2.9 1.2-1.6 2.6-3.2-.6-3.2.6-1.6-2.6-2.9-1.2.5-3L1.5 12l2.3-2.1-.5-3 2.9-1.2 1.6-2.6 3.2.6 3.2-.6 1.6 2.6 2.9 1.2-.5 3L22.5 12z"/>

<path
d="M10 13.5l-1.5-1.5-1 1L10 15.5 16 9.5l-1-1z"
fill="white"
/>

</svg>

)}

</h1>

<p style={{opacity:0.7, marginTop:10}}>
{profile.bio}
</p>

<div style={{marginTop:40,width:320}}>

{blocks.map(block=>(
<BlockRenderer key={block.id} block={block} />
))}

</div>

</div>

);

}
