"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LinksDashboard(){

const [user,setUser]=useState(null);
const [profile,setProfile]=useState(null);
const [blocks,setBlocks]=useState([]);
const [title,setTitle]=useState("");
const [url,setUrl]=useState("");
const [dragIndex,setDragIndex]=useState(null);

useEffect(()=>{
init();
},[]);

async function init(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

setUser(session.user);

const {data:prof} = await supabase
.from("profiles")
.select("*")
.eq("id",session.user.id)
.single();

setProfile(prof);

loadBlocks(session.user.id);

}

async function loadBlocks(uid){

const {data} = await supabase
.from("blocks")
.select("*")
.eq("user_id",uid)
.eq("type","link")
.order("position",{ascending:true});

if(data) setBlocks(data);

}

async function addLink(){

if(!title || !url){
alert("Enter title and URL");
return;
}

await supabase.from("blocks").insert({
user_id:user.id,
type:"link",
position:Date.now(),
data_json:{
title:title,
url:url.startsWith("http") ? url : "https://"+url
}
});

setTitle("");
setUrl("");

loadBlocks(user.id);

}

async function deleteLink(id){

await supabase
.from("blocks")
.delete()
.eq("id",id);

loadBlocks(user.id);

}

function handleDragStart(index){
setDragIndex(index);
}

async function handleDrop(index){

if(dragIndex===null) return;

const updated=[...blocks];
const dragged=updated[dragIndex];

updated.splice(dragIndex,1);
updated.splice(index,0,dragged);

setBlocks(updated);

for(let i=0;i<updated.length;i++){

await supabase
.from("blocks")
.update({position:i})
.eq("id",updated[i].id);

}

setDragIndex(null);

}

return(

<div style={{display:"flex",gap:40}}>

<div style={{width:360}}>

<h2>Your Links</h2>

<div style={{marginTop:20}}>

<input
placeholder="Title (Instagram, Website)"
value={title}
onChange={(e)=>setTitle(e.target.value)}
style={{
width:"100%",
padding:12,
background:"#111",
border:"1px solid #333",
color:"white"
}}
/>

<input
placeholder="URL"
value={url}
onChange={(e)=>setUrl(e.target.value)}
style={{
width:"100%",
padding:12,
marginTop:10,
background:"#111",
border:"1px solid #333",
color:"white"
}}
/>

<button
onClick={addLink}
style={{
marginTop:10,
padding:"10px 16px",
background:"#00d26a",
borderRadius:8,
border:"none"
}}
>
Add Link
</button>

</div>

<div style={{marginTop:30}}>

{blocks.map((block,index)=>(

<div
key={block.id}
draggable
onDragStart={()=>handleDragStart(index)}
onDragOver={(e)=>e.preventDefault()}
onDrop={()=>handleDrop(index)}
style={{
background:"#15151f",
padding:14,
borderRadius:10,
marginTop:10,
display:"flex",
justifyContent:"space-between",
alignItems:"center",
cursor:"grab"
}}
>

<div>

<div style={{fontWeight:600}}>
{block.data_json?.title}
</div>

<div style={{opacity:0.6,fontSize:12}}>
{block.data_json?.url}
</div>

</div>

<button
onClick={()=>deleteLink(block.id)}
style={{
background:"#ff4d4d",
border:"none",
color:"white",
padding:"6px 10px",
borderRadius:6
}}
>
Delete
</button>

</div>

))}

</div>

</div>

<div style={{flex:1,display:"flex",justifyContent:"center"}}>

<div style={{
width:280,
height:520,
background:"#000",
borderRadius:30,
padding:18,
boxShadow:"0 0 30px rgba(0,0,0,0.6)"
}}>

<div style={{
width:"100%",
height:"100%",
background:"#0b0b12",
borderRadius:20,
padding:20,
overflow:"auto"
}}>

<div style={{
width:70,
height:70,
borderRadius:"50%",
overflow:"hidden",
margin:"auto",
background:"#222"
}}>

<img
src={profile?.avatar || "/default-avatar.png"}
style={{width:"100%",height:"100%",objectFit:"cover"}}
/>

</div>

<div style={{
marginTop:10,
textAlign:"center",
fontWeight:600
}}>
{profile?.display_name}
</div>

<div style={{
textAlign:"center",
opacity:0.7,
fontSize:14
}}>
{profile?.bio}
</div>

{blocks.map(block=>(

<a
key={block.id}
href={block.data_json?.url}
target="_blank"
style={{
display:"block",
background:"#1a1a25",
padding:12,
borderRadius:10,
marginTop:10,
textAlign:"center",
textDecoration:"none",
color:"white"
}}
>

{block.data_json?.title}

</a>

))}

</div>

</div>

</div>

</div>

);

}
