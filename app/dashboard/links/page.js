"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../lib/supabase";
import { detectPlatform } from "../../lib/detectPlatform";

export default function LinksDashboard(){

const [user,setUser]=useState(null);
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

loadBlocks(session.user.id);

}

async function loadBlocks(uid){

const {data} = await supabase
.from("blocks")
.select("*")
.eq("user_id",uid)
.eq("type","link")
.order("position",{ascending:true})
.limit(100);

if(data) setBlocks(data);

}

async function addLink(){

if(!url){
alert("Enter URL");
return;
}

let finalUrl=url;

if(!finalUrl.startsWith("http")){
finalUrl="https://"+finalUrl;
}

let finalTitle=title;

if(!finalTitle){
finalTitle=detectPlatform(finalUrl);
}

let lastPosition = 0;

if(blocks.length > 0){
lastPosition = blocks[blocks.length-1].position || 0;
}

const newPosition = lastPosition + 1000;

await supabase.from("blocks").insert({
user_id:user.id,
type:"link",
position:newPosition,
data_json:{
title:finalTitle,
url:finalUrl
}
});

await supabase.from("link_history").insert({
user_id:user.id,
action:"added",
title:finalTitle,
url:finalUrl
});

setTitle("");
setUrl("");

loadBlocks(user.id);

}

async function deleteLink(id){

const block = blocks.find(b => b.id === id);

await supabase
.from("blocks")
.delete()
.eq("id",id);

if(block){

await supabase.from("link_history").insert({
user_id:user.id,
action:"deleted",
title:block.data_json?.title,
url:block.data_json?.url
});

}

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
.update({position:(i+1)*1000})
.eq("id",updated[i].id);

}

await supabase.from("link_history").insert({
user_id:user.id,
action:"reordered",
title:"Link order changed",
url:""
});

setDragIndex(null);

}

function getIcon(title){

const t = title?.toLowerCase();

if(t?.includes("instagram")) return "/icons/instagram.png";
if(t?.includes("youtube")) return "/icons/youtube.png";
if(t?.includes("vk")) return "/icons/vk.png";
if(t?.includes("facebook")) return "/icons/facebook.png";
if(t?.includes("tiktok")) return "/icons/tiktok.png";
if(t?.includes("spotify")) return "/icons/spotify.png";
if(t?.includes("soundcloud")) return "/icons/soundcloud.png";
if(t?.includes("snapchat")) return "/icons/snapchat.png";

return "/icons/website.png";

}

return(

<div style={{width:420}}>

<h2>Your Links</h2>

<div style={{marginTop:20}}>

<input
placeholder="Optional title (auto detect)"
value={title}
onChange={(e)=>setTitle(e.target.value)}
style={{
width:"100%",
padding:12,
background:"var(--card)",
border:"1px solid var(--border)",
color:"var(--text)"
}}
/>

<input
placeholder="Paste link"
value={url}
onChange={(e)=>setUrl(e.target.value)}
style={{
width:"100%",
padding:12,
marginTop:10,
background:"var(--card)",
border:"1px solid var(--border)",
color:"var(--text)"
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
background:"var(--card)",
padding:14,
borderRadius:10,
marginTop:10,
display:"flex",
justifyContent:"space-between",
alignItems:"center",
cursor:"grab",
border:"1px solid var(--border)"
}}
>

<div style={{display:"flex",alignItems:"center",gap:10}}>

<img
src={getIcon(block.data_json?.title)}
style={{width:18,height:18}}
/>

<div>

<div style={{fontWeight:600}}>
{block.data_json?.title}
</div>

<div style={{opacity:0.6,fontSize:12}}>
{block.data_json?.url}
</div>

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

);

}
