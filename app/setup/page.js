"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Setup(){

const [user,setUser]=useState(null);
const [step,setStep]=useState(1);

const [userType,setUserType]=useState("");
const [industry,setIndustry]=useState("");
const [theme,setTheme]=useState("");

const [displayName,setDisplayName]=useState("");
const [bio,setBio]=useState("");

const [link1,setLink1]=useState("");
const [link2,setLink2]=useState("");
const [link3,setLink3]=useState("");

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

async function saveProfile(){

await supabase
.from("profiles")
.update({
user_type:userType,
industry:industry,
display_name:displayName,
bio:bio,
theme:theme
})
.eq("id",user.id);

}

async function createBlocks(){

const links=[link1,link2,link3];

for(let i=0;i<links.length;i++){

if(!links[i]) continue;

await supabase.from("blocks").insert({
user_id:user.id,
type:"link",
data_json:{
title:"Link",
url:links[i]
}
});

}

}

async function finishSetup(){

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

<h1 style={{marginBottom:"20px"}}>
Setup your Linkarsha
</h1>

{step===1 &&(

<div>

<h2>Who are you?</h2>

<div style={{marginTop:20,display:"flex",flexDirection:"column",gap:"10px"}}>

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

<h2>Select your field</h2>

<div style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"10px",
marginTop:"20px"
}}>

<button onClick={()=>{setIndustry("instagram");setStep(3);}}>
Instagram
</button>

<button onClick={()=>{setIndustry("youtube");setStep(3);}}>
YouTube
</button>

<button onClick={()=>{setIndustry("tiktok");setStep(3);}}>
TikTok
</button>

<button onClick={()=>{setIndustry("restaurant");setStep(3);}}>
Restaurant
</button>

<button onClick={()=>{setIndustry("cafe");setStep(3);}}>
Cafe
</button>

<button onClick={()=>{setIndustry("store");setStep(3);}}>
Online Store
</button>

</div>

</div>

)}

{step===3 &&(

<div style={{width:"320px"}}>

<h2>Add your links</h2>

<input
placeholder="Link 1"
value={link1}
onChange={(e)=>setLink1(e.target.value)}
style={{marginTop:10,padding:10,width:"100%"}}
/>

<input
placeholder="Link 2"
value={link2}
onChange={(e)=>setLink2(e.target.value)}
style={{marginTop:10,padding:10,width:"100%"}}
/>

<input
placeholder="Link 3"
value={link3}
onChange={(e)=>setLink3(e.target.value)}
style={{marginTop:10,padding:10,width:"100%"}}
/>

<button
style={{marginTop:20,width:"100%"}}
onClick={()=>setStep(4)}
>
Continue
</button>

</div>

)}

{step===4 &&(

<div style={{width:"320px"}}>

<h2>Profile Info</h2>

<input
placeholder="Display Name"
value={displayName}
onChange={(e)=>setDisplayName(e.target.value)}
style={{marginTop:10,padding:10,width:"100%"}}
/>

<textarea
placeholder="Bio"
value={bio}
onChange={(e)=>setBio(e.target.value)}
style={{marginTop:10,padding:10,width:"100%"}}
/>

<button
style={{marginTop:20,width:"100%"}}
onClick={()=>setStep(5)}
>
Continue
</button>

</div>

)}

{step===5 &&(

<div style={{textAlign:"center"}}>

<h2>Preview</h2>

<div style={{
marginTop:20,
background:"#111",
padding:"30px",
borderRadius:"20px",
width:"260px"
}}>

<div style={{fontSize:"20px",fontWeight:"600"}}>
@{displayName || "username"}
</div>

<p style={{opacity:0.7}}>
{bio}
</p>

{link1 &&(
<div style={{marginTop:10,background:"#222",padding:"10px",borderRadius:"8px"}}>
{link1}
</div>
)}

{link2 &&(
<div style={{marginTop:10,background:"#222",padding:"10px",borderRadius:"8px"}}>
{link2}
</div>
)}

{link3 &&(
<div style={{marginTop:10,background:"#222",padding:"10px",borderRadius:"8px"}}>
{link3}
</div>
)}

</div>

<button
style={{marginTop:30,padding:"12px 30px"}}
onClick={finishSetup}
>
🎉 Finish Setup
</button>

</div>

)}

</div>

);

}
