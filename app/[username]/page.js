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

setProfile(prof);

const {data:blockData}=await supabase
.from("blocks")
.select("*")
.eq("user_id",prof.id)
.order("position",{ascending:true});

setBlocks(blockData||[]);

}

if(!profile) return <div>Loading...</div>;

const header = profile.profile_settings?.header || {};

return(

<div style={{
minHeight:"100vh",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center"
}}>

{header.layout==="hero" ? (

<div style={{
width:"100%",
height:220,
backgroundImage:`url(${profile.avatar})`,
backgroundSize:"cover"
}}/>

) : (

<div style={{
width:110,
height:110,
borderRadius:"50%",
overflow:"hidden"
}}>
<img src={profile.avatar}/>
</div>

)}

{header.showDisplayName!==false && (
<h1>{profile.display_name}</h1>
)}

{header.showUsername!==false && (
<div>@{profile.username}</div>
)}

<p>{profile.bio}</p>

<div style={{marginTop:40,width:320}}>

{blocks.map(block=>(
<BlockRenderer key={block.id} block={block} />
))}

</div>

</div>

);

}
