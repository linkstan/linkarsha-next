"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Blocks({ user }) {

const [blocks,setBlocks]=useState([]);
const [loading,setLoading]=useState(true);

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

async function deleteBlock(id){

await supabase
.from("blocks")
.delete()
.eq("id",id);

loadBlocks();

}

if(loading){

return(
<div style={{opacity:0.6}}>Loading blocks...</div>
)

}

return(

<div>

<h2>Your Blocks</h2>

{blocks.length===0 && (
<div style={{opacity:0.5}}>No blocks yet</div>
)}

{blocks.map(block=>{

const data=block.data_json || {};
const title=data.title || block.type;

return(

<div
key={block.id}
style={{
background:"#15151f",
padding:"14px",
borderRadius:"10px",
marginTop:"10px",
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<div>

<div style={{fontWeight:"600"}}>
{title}
</div>

<div style={{opacity:0.5,fontSize:"12px"}}>
Type: {block.type}
</div>

</div>

<button
onClick={()=>deleteBlock(block.id)}
style={{
background:"#ff4d4d",
border:"none",
color:"white",
padding:"6px 10px",
borderRadius:"6px",
cursor:"pointer"
}}
>
Delete
</button>

</div>

)

})}

</div>

)

}
