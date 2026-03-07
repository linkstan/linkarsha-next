"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Setup(){

const [user,setUser]=useState(null);
const [step,setStep]=useState(1);

const [userType,setUserType]=useState("");
const [industry,setIndustry]=useState("");

const [avatar,setAvatar]=useState("");
const [displayName,setDisplayName]=useState("");
const [bio,setBio]=useState("");

const [links,setLinks]=useState([""]);

useEffect(()=>{
init();
},[]);

async function init(){

const {data:{session}} = await supabase.auth.getSession();

if(!session){
window.location="/login";
return;
}

setUser(session.user);

}

function updateLink(i,val){

const arr=[...links];
arr[i]=val;
setLinks(arr);

}

function addLink(){

if(links.length>=7){
alert("Maximum 7 links allowed");
return;
}

setLinks([...links,""]);

}

function validateLinks(){

const valid=links.filter(l=>l.trim()!=="");

if(valid.length===0){
alert("Add at least 1 link");
return false;
}

return true;

}

async function uploadAvatar(e){

const file=e.target.files[0];
if(!file) return;

const path=user.id;

await supabase.storage
.from("avatars")
.upload(path,file,{upsert:true});

const {data}=supabase.storage
.from("avatars")
.getPublicUrl(path);

setAvatar(data.publicUrl);

}

async function saveProfile(){

await supabase
.from("profiles")
.update({
user_type:userType,
industry:industry,
display_name:displayName,
bio:bio,
avatar:avatar
})
.eq("id",user.id);

}

async function createBlocks(){

for(const link of links){

if(link.trim()==="") continue;

let url=link;

if(!link.startsWith("http")){
url="https://"+link;
}

await supabase.from("blocks").insert({
user_id:user.id,
type:"link",
data_json:{
title:url,
url:url
}
});

}

}

async function finishSetup(){

if(!displayName){
alert("Enter display name");
return;
}

if(!validateLinks()) return;

await saveProfile();
await createBlocks();

window.location="/dashboard";

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
fontFamily:"-apple-system"
}}>

<h1 style={{marginBottom:20}}>Setup your Linkarsha</h1>

{step===1 &&(

<div>

<h2>Who are you?</h2>

<div style={{
marginTop:20,
display:"flex",
flexDirection:"column",
gap:10
}}>

<button onClick={()=>{setUserType("creator");setStep(2);}}>
Creator
</button>

<button onClick={()=>{setUserType("business");setStep(2);}}>
Business
</button>

<button onClick={()=>{setUserType("personal");setStep(3);}}>
Personal
</button>

</div>

</div>

)}

{step===2 &&(

<div>

<h2>Select category</h2>

<div style={{
marginTop:20,
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:10
}}>

{userType==="creator" &&(
<>

<button onClick={()=>{setIndustry("instagram");setStep(3);}}>Instagram</button>
<button onClick={()=>{setIndustry("vk");setStep(3);}}>VK</button>
<button onClick={()=>{setIndustry("facebook");setStep(3);}}>Facebook</button>
<button onClick={()=>{setIndustry("youtube");setStep(3);}}>YouTube</button>
<button onClick={()=>{setIndustry("tiktok");setStep(3);}}>TikTok</button>
<button onClick={()=>{setIndustry("multi");setStep(3);}}>Multiple Platforms</button>

</>
)}

{userType==="business" &&(
<>

<button onClick={()=>{setIndustry("restaurant");setStep(3);}}>Restaurant / Cafe</button>
<button onClick={()=>{setIndustry("store");setStep(3);}}>Online Store</button>
<button onClick={()=>{setIndustry("healthcare");setStep(3);}}>Healthcare</button>
<button onClick={()=>{setIndustry("salon");setStep(3);}}>Salon / Beauty</button>
<button onClick={()=>{setIndustry("gym");setStep(3);}}>Gym / Fitness</button>
<button onClick={()=>{setIndustry("agency");setStep(3);}}>Agency / Services</button>

</>
)}

</div>

<div style={{marginTop:20}}>
<button onClick={()=>setStep(1)}>Back</button>
</div>

</div>

)}

{step===3 &&(

<div style={{width:340}}>

<h2>Add your links</h2>

{links.map((l,i)=>(

<input
key={i}
placeholder="@username or https://link"
value={l}
onChange={(e)=>updateLink(i,e.target.value)}
style={{
marginTop:10,
padding:12,
width:"100%",
background:"#111",
border:"1px solid #333",
color:"white"
}}
/>

))}

<div style={{marginTop:10}}>

<button onClick={addLink}>+ Add link</button>

</div>

<div style={{marginTop:20,display:"flex",gap:10}}>

<button onClick={()=>setStep(userType==="personal"?1:2)}>
Back
</button>

<button onClick={()=>{
if(!validateLinks()) return;
setStep(4);
}}>
Continue
</button>

</div>

</div>

)}

{step===4 &&(

<div style={{width:340,textAlign:"center"}}>

<h2>Profile Info</h2>

<div style={{marginTop:20}}>

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
src={avatar || "/default-avatar.png"}
style={{
width:"100%",
height:"100%",
objectFit:"cover"
}}
/>

<label style={{
position:"absolute",
bottom:0,
right:0,
background:"#000",
borderRadius:"50%",
padding:"4px 8px",
cursor:"pointer"
}}>
+
<input type="file" hidden accept="image/*" onChange={uploadAvatar}/>
</label>

</div>

</div>

<input
placeholder="Display Name"
value={displayName}
onChange={(e)=>setDisplayName(e.target.value)}
style={{
marginTop:20,
padding:12,
width:"100%",
background:"#111",
border:"1px solid #333",
color:"white"
}}
/>

<textarea
placeholder="Bio"
value={bio}
maxLength={120}
onChange={(e)=>setBio(e.target.value)}
style={{
marginTop:10,
padding:12,
width:"100%",
background:"#111",
border:"1px solid #333",
color:"white"
}}
/>

<div style={{fontSize:12,opacity:0.6}}>
{bio.length}/120
</div>

<div style={{marginTop:20,display:"flex",gap:10}}>

<button onClick={()=>setStep(3)}>
Back
</button>

<button onClick={()=>setStep(5)}>
Continue
</button>

</div>

</div>

)}

{step===5 &&(

<div style={{textAlign:"center"}}>

<h2>Preview</h2>

<div style={{
marginTop:20,
background:"#111",
padding:30,
borderRadius:20,
width:260
}}>

<div style={{
width:70,
height:70,
borderRadius:"50%",
overflow:"hidden",
background:"#222",
margin:"auto"
}}>

<img
src={avatar || "/default-avatar.png"}
style={{
width:"100%",
height:"100%",
objectFit:"cover"
}}
/>

</div>

<div style={{marginTop:10,fontWeight:600}}>
{displayName}
</div>

<div style={{opacity:0.7,fontSize:14}}>
{bio}
</div>

{links.filter(l=>l.trim()!=="").map((l,i)=>(
<div key={i} style={{marginTop:10}}>
{l}
</div>
))}

</div>

<div style={{marginTop:20,display:"flex",gap:10,justifyContent:"center"}}>

<button onClick={()=>setStep(4)}>
Back
</button>

<button onClick={finishSetup}>
🎉 Finish Setup
</button>

</div>

</div>

)}

</div>

);

}
