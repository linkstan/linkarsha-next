"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { blockSuggestions } from "../lib/blockSuggestions";

import Links from "./links";
import Analytics from "./analytics";
import ThemeEditor from "./theme-editor";
import Blocks from "./blocks";

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

/* redirect new users to setup */
if(!prof.user_type || !prof.industry){
window.location="/setup";
return;
}

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

const ids=data.map(l=>l.id);

const {data:clickData}=await supabase
.from("clicks")
.select("link_id")
.in("link_id",ids);

if(clickData){

const counts={};

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

async function uploadAvatar(e){

const file=e.target.files[0];
if(!file) return;

const path=`${user.id}`;

await supabase.storage
.from("avatars")
.upload(path,file,{upsert:true});

const {data}=supabase.storage
.from("avatars")
.getPublicUrl(path);

await supabase
.from("profiles")
.update({avatar:data.publicUrl})
.eq("id",user.id);

setProfile({...profile,avatar:data.publicUrl});

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

function shareProfile(){

const url=`https://linkarsha-next.vercel.app/${profile.username}`;

navigator.clipboard.writeText(url);
alert("Link copied");

}

async function createBlock(type){

await fetch("/api/blocks/create",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user_id:user.id,
type:type,
data_json:{title:type,url:""}
})
});

alert(type+" block created");

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

<label className="avatar-upload">

+

<input
type="file"
accept="image/*"
onChange={uploadAvatar}
hidden
/>

</label>

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
<div onClick={()=>setSection("links")}>My Links</div>
<div onClick={()=>setSection("blocks")}>Blocks</div>
</div>
)}

<div onClick={()=>setOpenMenu(openMenu==="analytics"?null:"analytics")}>
Analytics ▼
</div>

{openMenu==="analytics" && (
<div className="submenu">
<div onClick={()=>setSection("analytics")}>Overview</div>
</div>
)}

<div onClick={()=>setOpenMenu(openMenu==="theme"?null:"theme")}>
Theme Editor ▼
</div>

{openMenu==="theme" && (
<div className="submenu">
<div onClick={()=>setSection("theme")}>Themes</div>
</div>
)}

</div>

</div>

<div className="main">

<div className="mobile-header">

<div className="avatar big">
<img src={profile?.avatar || "/default-avatar.png"} />
</div>

<div className="username">@{profile?.username}</div>

<div className="public-url">

linkarsha-next.vercel.app/{profile?.username}

<button className="share-btn" onClick={shareProfile}>
Share
</button>

</div>

</div>

{/* Recommended Blocks */}

{profile && blockSuggestions[profile.industry] && (

<div style={{marginBottom:30}}>

<h3>Recommended for you</h3>

<div style={{
display:"flex",
gap:"10px",
flexWrap:"wrap",
marginTop:"10px"
}}>

{blockSuggestions[profile.industry].map((b,i)=>(

<button key={i} onClick={()=>createBlock(b.type)}>
{b.label}
</button>

))}

</div>

</div>

)}

<div style={{marginBottom:40}}>

<h2>Add Block</h2>

<div style={{
display:"flex",
gap:"10px",
flexWrap:"wrap",
marginTop:"10px"
}}>

<button onClick={()=>createBlock("link")}>Link</button>
<button onClick={()=>createBlock("video")}>Video</button>
<button onClick={()=>createBlock("music")}>Music</button>
<button onClick={()=>createBlock("image")}>Image</button>
<button onClick={()=>createBlock("text")}>Text</button>
<button onClick={()=>createBlock("product")}>Product</button>

</div>

</div>

{section==="links" && (

<Links
links={links}
clicks={clicks}
title={title}
url={url}
editing={editing}
setTitle={setTitle}
setUrl={setUrl}
addLink={addLink}
updateLink={updateLink}
deleteLink={deleteLink}
startEdit={startEdit}
handleDragStart={handleDragStart}
handleDrop={handleDrop}
/>

)}

{section==="blocks" && (

<Blocks user={user} />

)}

{section==="analytics" && (

<Analytics
links={links}
clicks={clicks}
/>

)}

{section==="theme" && (

<ThemeEditor/>

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

.avatar-wrapper{
position:relative;
width:70px;
height:70px;
margin:auto;
}

.avatar{
width:70px;
height:70px;
border-radius:50%;
background:#222;
overflow:hidden;
}

.avatar img{
width:100%;
height:100%;
object-fit:cover;
}

.avatar-upload{
position:absolute;
top:-5px;
right:-5px;
width:26px;
height:26px;
border-radius:50%;
background:white;
color:black;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
}

.main{
flex:1;
padding:40px;
max-width:700px;
margin:auto;
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
animation:floatPhone 6s ease-in-out infinite;
}

@keyframes floatPhone{
0%{transform:translateY(0px)}
50%{transform:translateY(-12px)}
100%{transform:translateY(0px)}
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
