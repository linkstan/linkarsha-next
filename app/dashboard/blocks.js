"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Blocks({ user }) {

const [blocks,setBlocks]=useState([]);
const [loading,setLoading]=useState(true);
const [editing,setEditing]=useState(null);
const [title,setTitle]=useState("");
const [url,setUrl]=useState("");

useEffect(()=>{
loadBlocks();
},[]);

async function loadBlocks(){

const {data}=await supabase
.from("blocks")
.select("*")
.eq("user_id",user.id)
.order("created_at",{ascending:true});

if(data){
setBlocks(data);
}

setLoading(false);

}

function startEdit(block){

setEditing(block.id);

const data=block.data_json || {};

setTitle(data.title || "");
setUrl(data.url || "");

}

async function saveEdit(){

await supabase
.from("blocks")
.update({
data_json:{
title:title,
url:url
}
})
.eq("id",editing);

setEditing(null);
setTitle("");
setUrl("");

loadBlocks();

}

async function deleteBlock(id){

await supabase
.from("blocks")
.delete()
.eq("id",id);

loadBlocks();

}

if(loading){
return <div style={{opacity:0.6}}>Loading blocks...</div>
}

return(

<div>

<h2>Your Blocks</h2>

{blocks.length===0 && (
<div style={{opacity:0.5}}>No blocks yet</div>
)}

{blocks.map(block=>{

const data=block.data_json || {};
const titleText=data.title || block.type;

return(

<div
key={block.id}
style={{
background:"#15151f",
padding:"14px",
borderRadius:"10px",
marginTop:"10px"
}}
>

<div style={{fontWeight:"600"}}>
{titleText}
</div>

<div style={{opacity:0.5,fontSize:"12px"}}>
Type: {block.type}
</div>

<div style={{marginTop:"10px",display:"flex",gap:"10px"}}>

<button onClick={()=>startEdit(block)}>
Edit
</button>

<button
onClick={()=>deleteBlock(block.id)}
style={{background:"#ff4d4d",color:"white"}}
>
Delete
</button>

</div>

</div>

)

})}

{editing && (

<div style={{
marginTop:"30px",
padding:"20px",
background:"#111",
borderRadius:"10px"
}}>

<h3>Edit Block</h3>

<input
placeholder="Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
style={{display:"block",marginTop:"10px",padding:"8px"}}
/>

<input
placeholder="URL"
value={url}
onChange={(e)=>setUrl(e.target.value)}
style={{display:"block",marginTop:"10px",padding:"8px"}}
/>

<button
onClick={saveEdit}
style={{marginTop:"10px"}}
>
Save
</button>

</div>

)}

</div>

)

}
