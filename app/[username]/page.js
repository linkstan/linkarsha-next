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

/* GET PROFILE */

const {data:prof}=await supabase
.from("profiles")
.select("*")
.eq("username",username)
.single();

if(!prof) return;

setProfile(prof);

/* TRACK PROFILE VIEW */

await supabase.from("events").insert({
user_id:prof.id,
event_type:"view"
});

/* GET BLOCKS */

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

return(

<div style={{
minHeight:"100vh",
background:"#0b0b12",
color:"white",
display:"flex",
alignItems:"center",
justifyContent:"center",
flexDirection:"column",
fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"
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

<h1 style={{display:"flex",alignItems:"center",gap:8}}>
@{profile.username}

{profile.verified && (

<span style={{
background:"#1DA1F2",
color:"white",
fontSize:12,
padding:"2px 6px",
borderRadius:6
}}>
✔
</span>

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
