"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard(){

const [user,setUser]=useState(null);
const [profile,setProfile]=useState(null);
const [links,setLinks]=useState([]);
const [loading,setLoading]=useState(true);

const [title,setTitle]=useState("");
const [url,setUrl]=useState("");
const [editing,setEditing]=useState(null);
const [menuOpen,setMenuOpen]=useState(false);

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
.order("created_at",{ascending:true});

if(data) setLinks(data);
}

async function addLink(){

if(!title||!url) return;

await supabase.from("links").insert({
user_id:user.id,
title,
url
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
.update({
title,
url
})
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

async function signout(){
await supabase.auth.signOut();
window.location="/login";
}

function shareProfile(){

const url=`https://linkarsha-next.vercel.app/${profile.username}`;

if(navigator.share){
navigator.share({
title:`@${profile.username}`,
url:url
});
}else{
navigator.clipboard.writeText(url);
alert("Link copied");
}

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

{/* SIDEBAR */}

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

<div>🏠 My Linkarsh</div>
<div>📊 Analytics</div>
<div>🧰 Tools</div>
<div>✔ Get Verified</div>

<hr/>

<div>🎁 Referrals</div>
<div>⚙ Settings</div>

<div className="logout" onClick={signout}>
Logout
</div>

</div>

</div>

{/* MAIN */}

<div className="main">

{/* MOBILE HEADER */}

<div className="mobile-header">

<div className="avatar big">

<img src={profile?.avatar || "/default-avatar.png"} />

</div>

</label>

</div>

<div className="username">@{profile?.username}</div>

<div className="public-url">

linkarsha-next.vercel.app/{profile?.username}

<button className="share-btn" onClick={shareProfile}>
Share
</button>

</div>

</div>

{/* LINK EDITOR */}

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

{/* LINKS */}

<div className="card">

<h3>Your links</h3>

{links.map(l=>(

<div key={l.id} className="link-row">

<span>{l.title}</span>

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

</div>

{/* PHONE PREVIEW */}

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
href={l.url.startsWith("http")?l.url:`https://${l.url}`}
target="_blank"
>

{l.title}

</a>

))}

</div>

</div>

{/* MOBILE NAV */}

<div className="mobile-nav">

<div>🏠</div>
<div>📊</div>
<div>🧰</div>
<div onClick={()=>setMenuOpen(true)}>☰</div>

</div>

{menuOpen && (
<div className="mobile-menu">

<div onClick={()=>setMenuOpen(false)}>Close</div>

<div className="logout" onClick={signout}>
Sign out
</div>

</div>
)}

<style jsx>{`

.app{
display:flex;
min-height:100vh;
background:#0b0b12;
color:white;
font-family:-apple-system;
}

/* sidebar */

.sidebar{
width:260px;
padding:20px 20px 20px 5px;
border-right:1px solid #1c1c25;
display:none;
}

.sidebar-profile{
text-align:center;
margin-bottom:20px;
}

/* avatar */

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

.avatar.big{
width:100px;
height:100px;
margin:auto;
position:relative;
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
font-weight:bold;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
}

.avatar-upload.big{
top:5px;
right:5px;
}

/* menu */

.menu div{
margin:10px 0;
cursor:pointer;
opacity:.8;
}

.logout{
color:#ff4d4d;
}

/* main */

.main{
flex:1;
padding:40px;
padding-bottom:120px;
max-width:700px;
margin:auto;
}

.mobile-header{
text-align:center;
margin-bottom:40px;
}

.public-url{
background:#111;
padding:8px 14px;
border-radius:8px;
display:inline-block;
margin-top:10px;
}

.share-btn{
margin-left:10px;
background:#1a1a25;
border:none;
color:white;
padding:6px 10px;
border-radius:8px;
cursor:pointer;
}

/* cards */

.card{
background:#111;
padding:25px;
border-radius:16px;
margin-bottom:30px;
}

input{
width:100%;
padding:12px;
margin-top:10px;
background:#0f0f15;
border:1px solid #222;
color:white;
border-radius:8px;
}

button{
margin-top:15px;
padding:12px;
background:white;
color:black;
width:100%;
border-radius:8px;
}

.link-row{
display:flex;
justify-content:space-between;
padding:10px;
margin-top:10px;
background:#0f0f15;
border-radius:10px;
}

.actions button{
margin-left:10px;
}

/* preview */

.preview{
width:350px;
padding:40px;
border-left:1px solid #1c1c25;
display:none;
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

.phone-user{
text-align:center;
margin-bottom:15px;
}

.preview-avatar{
width:70px;
height:70px;
margin:auto;
margin-bottom:10px;
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

/* mobile nav */

.mobile-nav{
position:fixed;
bottom:0;
left:0;
right:0;
height:70px;
background:#111;
display:flex;
justify-content:space-around;
align-items:center;
border-top:1px solid #1c1c25;
}

.mobile-menu{
position:fixed;
bottom:80px;
right:20px;
background:#111;
padding:20px;
border-radius:10px;
border:1px solid #1c1c25;
}

/* desktop */

@media(min-width:1024px){

.sidebar{display:block}
.preview{display:block}
.mobile-nav{display:none}

}

`}</style>

</div>

)

}
