"use client";

import { useEffect,useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase=createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function PublicProfile({params}){

const [profile,setProfile]=useState(null);
const [blocks,setBlocks]=useState([]);
const [appearance,setAppearance]=useState({});

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

setAppearance(prof.profile_settings || {});

const {data:blockData}=await supabase
.from("blocks")
.select("*")
.eq("user_id",prof.id)
.order("position",{ascending:true});

setBlocks(blockData || []);

}

if(!profile) return null;

const header=appearance?.header || {};

return(

<div style={{
minHeight:"100vh",
background:"#0b0b12",
color:"#fff",
display:"flex",
flexDirection:"column",
alignItems:"center",
paddingTop:40
}}>

{/* HERO */}

{header.layout==="hero" ? (

<div style={{
width:"100%",
height:220,
backgroundImage:`url(${profile.avatar})`,
backgroundSize:"cover",
backgroundPosition:"center"
}}/>

) : (

<div style={{
width:110,
height:110,
borderRadius:"50%",
overflow:"hidden",
marginBottom:20
}}>
<img
src={profile.avatar}
style={{width:"100%",height:"100%",objectFit:"cover"}}
/>
</div>

)}

{header.showDisplayName !== false && (
<h1 style={{
fontFamily: header.displayFont || "Poppins",
fontSize: header.displaySize || 22
}}>
{profile.display_name}
</h1>
)}

{header.showUsername !== false && (
<div style={{
fontFamily: header.usernameFont || "Roboto",
fontSize: header.usernameSize || 14,
opacity:.7
}}>
@{profile.username}
</div>
)}

<p style={{
fontFamily: header.bioFont || "Lora",
fontSize: header.bioSize || 15,
opacity:.7
}}>
{profile.bio}
</p>

<div style={{marginTop:40,width:320}}>

{blocks.map(block=>(

<a
key={block.id}
href={block.data_json?.url}
target="_blank"
style={{
display:"block",
background:"rgba(255,255,255,.08)",
padding:14,
borderRadius:10,
marginBottom:10,
textDecoration:"none",
color:"#fff"
}}
>
{block.data_json?.title}
</a>

))}

</div>

</div>

);

}
