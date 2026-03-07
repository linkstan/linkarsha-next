"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function CreatorSetup(){

const router = useRouter();

const [step,setStep] = useState(1);
const [theme,setTheme] = useState("");
const [selected,setSelected] = useState([]);
const [urls,setUrls] = useState({});
const [others,setOthers] = useState([{name:"",url:""}]);
const [avatar,setAvatar] = useState("");
const [displayName,setDisplayName] = useState("");
const [bio,setBio] = useState("");

const platforms = [
{name:"Instagram",icon:"/icons/instagram.png"},
{name:"Facebook",icon:"/icons/facebook.png"},
{name:"VK",icon:"/icons/vk.png"},
{name:"YouTube",icon:"/icons/youtube.png"},
{name:"TikTok",icon:"/icons/tiktok.png"},
{name:"WhatsApp",icon:"/icons/whatsapp.png"},
{name:"Website",icon:"/icons/website.png"},
{name:"X",icon:"/icons/x.png"},
{name:"Pinterest",icon:"/icons/pinterest.png"},
{name:"Threads",icon:"/icons/threads.png"},
{name:"Snapchat",icon:"/icons/snapchat.png"},
{name:"Twitch",icon:"/icons/twitch.png"},
{name:"SoundCloud",icon:"/icons/soundcloud.png"},
{name:"Spotify",icon:"/icons/spotify.png"},
{name:"Other",icon:"/icons/other.png"}
];

function togglePlatform(p){
if(selected.includes(p)){
setSelected(selected.filter(x=>x!==p));
}else{
setSelected([...selected,p]);
}
}

function updateUrl(platform,val){
setUrls({...urls,[platform]:val});
}

function updateOther(i,key,val){
const arr=[...others];
arr[i][key]=val;
setOthers(arr);
}

function addOther(){
setOthers([...others,{name:"",url:""}]);
}

function continueStep(){

if(step===1 && !theme){
alert("Select theme");
return;
}

if(step===2 && selected.length===0){
alert("Select at least one platform");
return;
}

if(step===3){

let valid=false;

for(const p of selected){
if(p!=="Other" && urls[p]?.trim()) valid=true;
}

for(const o of others){
if(o.name && o.url) valid=true;
}

if(!valid){
alert("Enter at least one URL");
return;
}

}

if(step===4 && !displayName){
alert("Enter display name");
return;
}

setStep(step+1);

}

async function uploadAvatar(e){

const file=e.target.files[0];
if(!file) return;

const {data:{session}} = await supabase.auth.getSession();
const user=session.user;

const path=user.id;

await supabase.storage
.from("avatars")
.upload(path,file,{upsert:true});

const {data}=supabase.storage
.from("avatars")
.getPublicUrl(path);

setAvatar(data.publicUrl+"?t="+Date.now());

}

function normalize(url){
if(url.startsWith("http")) return url;
return "https://"+url;
}

async function finishSetup(){

const {data:{session}} = await supabase.auth.getSession();
const user=session.user;

await supabase.from("profiles").update({
user_type:"creator",
display_name:displayName,
bio:bio,
avatar:avatar,
theme:theme
}).eq("id",user.id);

for(const p of selected){

if(p==="Other") continue;

const u=urls[p];
if(!u) continue;

await supabase.from("blocks").insert({
user_id:user.id,
type:"link",
data_json:{
title:p,
url:normalize(u)
}
});

}

for(const o of others){

if(!o.name || !o.url) continue;

await supabase.from("blocks").insert({
user_id:user.id,
type:"link",
data_json:{
title:o.name,
url:normalize(o.url)
}
});

}

router.push("/dashboard");

}

return(

<div style={{
minHeight:"100vh",
background:"#0b0b12",
color:"white",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
fontFamily:"-apple-system"
}}>

<h1>Creator Setup</h1>

{step===1 &&(

<div>

<h2>Select Theme</h2>

<div style={{display:"flex",gap:10}}>
<button onClick={()=>setTheme("dark")}>Dark</button>
<button onClick={()=>setTheme("gradient")}>Gradient</button>
<button onClick={()=>setTheme("light")}>Light</button>
</div>

<button
onClick={continueStep}
style={{marginTop:20,opacity:theme?1:0.4}}
>
Continue
</button>

</div>

)}

{step===2 &&(

<div>

<h2>Where is your audience?</h2>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,120px)",
gap:15,
marginTop:20
}}>

{platforms.map(p=>(

<div
key={p.name}
onClick={()=>togglePlatform(p.name)}
style={{
padding:18,
borderRadius:12,
cursor:"pointer",
border:selected.includes(p.name)?"2px solid #00d26a":"1px solid #333",
background:selected.includes(p.name)?"#0f1f16":"#111",
textAlign:"center"
}}
>

<img
src={p.icon}
style={{
width:36,
height:36,
objectFit:"contain",
margin:"auto"
}}
/>

<div style={{marginTop:8,fontSize:14}}>
{p.name}
</div>

</div>

))}

</div>

<button
onClick={continueStep}
style={{marginTop:20,opacity:selected.length?1:0.4}}
>
Continue
</button>

</div>

)}

{step===3 &&(

<div style={{width:320}}>

<h2>Add your profiles</h2>

{selected.map(p=>{

if(p==="Other") return null;

return(

<div key={p} style={{marginTop:10}}>

<div>{p} URL</div>

<input
value={urls[p]||""}
onChange={(e)=>updateUrl(p,e.target.value)}
style={{
width:"100%",
padding:10,
background:"#111",
border:"1px solid #333",
color:"white"
}}
/>

</div>

);

})}

{selected.includes("Other") &&(

<div>

<h3>Other Platforms</h3>

{others.map((o,i)=>(

<div key={i} style={{marginTop:10}}>

<input
placeholder="Platform Name"
value={o.name}
onChange={(e)=>updateOther(i,"name",e.target.value)}
style={{width:"100%"}}
/>

<input
placeholder="Platform URL"
value={o.url}
onChange={(e)=>updateOther(i,"url",e.target.value)}
style={{width:"100%",marginTop:5}}
/>

</div>

))}

<button onClick={addOther} style={{marginTop:10}}>
+ Add platform
</button>

</div>

)}

<button onClick={continueStep} style={{marginTop:20}}>
Continue
</button>

</div>

)}

{step===4 &&(

<div style={{width:320}}>

<h2>Profile Info</h2>

<div style={{
width:90,
height:90,
borderRadius:"50%",
overflow:"hidden",
background:"#222",
margin:"auto",
position:"relative"
}}>

<img
src={avatar||"/default-avatar.png"}
style={{width:"100%",height:"100%",objectFit:"cover"}}
/>

<label style={{
position:"absolute",
bottom:0,
right:0,
background:"#00d26a",
borderRadius:"50%",
width:30,
height:30,
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer"
}}>
+
<input type="file" hidden accept="image/*" onChange={uploadAvatar}/>
</label>

</div>

<input
placeholder="Display Name"
value={displayName}
onChange={(e)=>setDisplayName(e.target.value)}
style={{marginTop:20,width:"100%"}}
/>

<textarea
placeholder="Bio"
value={bio}
maxLength={160}
onChange={(e)=>setBio(e.target.value)}
style={{marginTop:10,width:"100%"}}
/>

<div>{bio.length}/160</div>

<button onClick={continueStep} style={{marginTop:20}}>
Continue
</button>

</div>

)}

{step===5 &&(

<div style={{textAlign:"center"}}>

<h2>Preview</h2>

<div style={{
width:280,
height:520,
background:"#000",
borderRadius:30,
padding:18,
marginTop:20,
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
width:80,
height:80,
borderRadius:"50%",
overflow:"hidden",
margin:"auto",
background:"#222"
}}>

<img
src={avatar||"/default-avatar.png"}
style={{width:"100%",height:"100%",objectFit:"cover"}}
/>

</div>

<div style={{
marginTop:12,
fontWeight:600,
textAlign:"center",
fontSize:18
}}>
{displayName}
</div>

<div style={{
opacity:0.7,
textAlign:"center",
fontSize:14,
marginTop:4
}}>
{bio}
</div>

<div style={{marginTop:20}}>

{selected.map(p=>{
if(p==="Other") return null;

return(
<div key={p} style={{
background:"#1a1a25",
padding:"12px",
borderRadius:12,
textAlign:"center",
marginTop:10
}}>
{p}
</div>
);
})}

{others.map((o,i)=>{
if(!o.name) return null;

return(
<div key={i} style={{
background:"#1a1a25",
padding:"12px",
borderRadius:12,
textAlign:"center",
marginTop:10
}}>
{o.name}
</div>
);
})}

</div>

</div>

</div>

<button
onClick={finishSetup}
style={{
marginTop:20,
padding:"12px 20px",
background:"#00d26a",
borderRadius:10,
color:"#fff",
border:"none",
cursor:"pointer"
}}
>
Finish Setup
</button>

</div>

)}

</div>

);

}
