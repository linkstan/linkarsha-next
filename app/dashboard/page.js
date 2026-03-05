"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard(){

const [user,setUser]=useState(null);
const [profile,setProfile]=useState(null);
const [links,setLinks]=useState([]);
const [clicks,setClicks]=useState({});
const [loading,setLoading]=useState(true);

const [title,setTitle]=useState("");
const [url,setUrl]=useState("");
const [editing,setEditing]=useState(null);

const [dragIndex,setDragIndex]=useState(null);

/* NEW STATES */

const [openMenu,setOpenMenu]=useState(null);
const [section,setSection]=useState("");

useEffect(()=>{ init(); },[]);

async function init(){

const {data:{session}}=await supabase.auth.getSession();

if(!session){
window.location="/login";
return;
}

setUser(session.user);

const {data:prof}=await supabase
.from("profiles")
.select("*")
.eq("id",session.user.id)
.single();

setProfile(prof);

loadLinks(session.user.id);

setLoading(false);
}

async function loadLinks(uid){

const {data}=await supabase
.from("links")
.select("*")
.eq("user_id",uid)
.order("position",{ascending:true});

if(data){
setLinks(data);

/* load click counts */

const ids = data.map(l => l.id);

const { data: clickData } = await supabase
.from("clicks")
.select("link_id")
.in("link_id", ids);

if(clickData){

const counts = {};

clickData.forEach(c=>{
counts[c.link_id]=(counts[c.link_id]||0)+1;
});

setClicks(counts);

}

}

}

async function addLink(){

if(!title||!url) return;

await supabase.from("links").insert({
user_id:user.id,
title,
url,
position:links.length
});

setTitle("");
setUrl("");

loadLinks(user.id);
}

async function deleteLink(id){

await supabase.from("links").delete().eq("id",id);

loadLinks(user.id);
}

async function startEdit(link){

setEditing(link.id);
setTitle(link.title);
setUrl(link.url);
}

async function updateLink(){

await supabase
.from("links")
.update({title,url})
.eq("id",editing);

setEditing(null);
setTitle("");
setUrl("");

loadLinks(user.id);
}

function handleDragStart(index){
setDragIndex(index);
}

async function handleDrop(index){

if(dragIndex===null) return;

const updated=[...links];
const dragged=updated[dragIndex];

updated.splice(dragIndex,1);
updated.splice(index,0,dragged);

setLinks(updated);

for(let i=0;i<updated.length;i++){

await supabase
.from("links")
.update({position:i})
.eq("id",updated[i].id);

}

setDragIndex(null);
}

if(loading){
return(
<div style={{
background:"#0b0b12",
height:"100vh",
display:"flex",
alignItems:"center",
justifyContent:"center",
color:"white"
}}>
Loading...
</div>
)
}

return(

<div className="app">

<div className="sidebar">

<div className="sidebar-profile">
<div className="avatar-wrapper">

<div className="avatar">
<img src={profile?.avatar || "/default-avatar.png"} />
</div>

</div>

<div>@{profile?.username}</div>
</div>

<div className="menu">

<div onClick={()=>setOpenMenu(openMenu==="links"?null:"links")}>
My Linkarsh ▼
</div>

{openMenu==="links" && (
<div className="submenu">
<div onClick={()=>setSection("links")}>
My Links
</div>
</div>
)}

<div onClick={()=>setOpenMenu(openMenu==="analytics"?null:"analytics")}>
Analytics ▼
</div>

{openMenu==="analytics" && (
<div className="submenu">
<div onClick={()=>setSection("analytics")}>
Overview
</div>
</div>
)}

<div onClick={()=>setOpenMenu(openMenu==="tools"?null:"tools")}>
Tools ▼
</div>

<div onClick={()=>setOpenMenu(openMenu==="verify"?null:"verify")}>
Get Verified ▼
</div>

</div>

</div>

<div className="main">

{section==="links" && (

<>

<div className="card">

<h3>{editing ? "Edit link" : "Add link"}</h3>

<input
placeholder="Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<input
placeholder="URL"
value={url}
onChange={(e)=>setUrl(e.target.value)}
/>

<button onClick={editing ? updateLink : addLink}>
{editing ? "Update" : "Add"}
</button>

</div>

<div className="card">

<h3>Your links</h3>

{links.map((l,index)=>(

<div
key={l.id}
className="link-row"
draggable
onDragStart={()=>handleDragStart(index)}
onDragOver={(e)=>e.preventDefault()}
onDrop={()=>handleDrop(index)}
>

<div>
<div>{l.title}</div>
<div style={{fontSize:12,opacity:0.6}}>
{clicks[l.id]||0} clicks
</div>
</div>

<div className="actions">

<button onClick={()=>startEdit(l)}>
Edit
</button>

<button onClick={()=>deleteLink(l.id)}>
Delete
</button>

</div>

</div>

))}

</div>

</>

)}

{section==="analytics" && (

<div className="card">

<h2>Analytics</h2>

<p>Total Links: {links.length}</p>

<p>
Total Clicks: {
Object.values(clicks).reduce((a,b)=>a+b,0)
}
</p>

</div>

)}

</div>

<div className="preview">

<div className="phone">

<div className="phone-user">

<div className="avatar preview-avatar">
<img src={profile?.avatar || "/default-avatar.png"} />
</div>

@{profile?.username}

</div>

{links.map(l=>(

<a
key={l.id}
className="phone-link"
href={l.url.startsWith("http") ? l.url : `https://${l.url}`}
target="_blank"
>

{l.title}

</a>

))}

</div>

</div>

<style jsx>{`

.app{
display:flex;
min-height:100vh;
background:#0b0b12;
color:white;
font-family:-apple-system;
}

.sidebar{
width:260px;
padding:20px;
border-right:1px solid #1c1c25;
}

.submenu{
margin-left:15px;
opacity:.8;
}

.main{
flex:1;
padding:40px;
max-width:700px;
margin:auto;
}

.card{
background:#111;
padding:25px;
border-radius:16px;
margin-bottom:30px;
}

.link-row{
display:flex;
justify-content:space-between;
padding:10px;
margin-top:10px;
background:#0f0f15;
border-radius:10px;
}

.preview{
width:350px;
padding:40px;
border-left:1px solid #1c1c25;
}

.phone{
width:260px;
height:520px;
background:#111;
border-radius:30px;
padding:20px;
overflow:auto;
margin:auto;
}

.phone-link{
display:block;
background:#1a1a25;
padding:12px;
border-radius:10px;
margin-top:10px;
text-align:center;
color:white;
text-decoration:none;
}

`}</style>

</div>

)

}
