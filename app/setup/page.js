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

const [instagram,setInstagram]=useState("");
const [youtube,setYoutube]=useState("");
const [website,setWebsite]=useState("");
const [twitter,setTwitter]=useState("");

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

if(instagram){

await supabase.from("blocks").insert({
user_id:user.id,
type:"link",
data_json:{
title:"Instagram",
url:instagram.startsWith("http")
? instagram
: `https://instagram.com/${instagram}`
}
});

}

if(youtube){

await supabase.from("blocks").insert({
user_id:user.id,
type:"link",
data_json:{
title:"YouTube",
url:youtube
}
});

}

if(website){

await supabase.from("blocks").insert({
user_id:user.id,
type:"link",
data_json:{
title:"Website",
url:website.startsWith("http")
? website
: `https://${website}`
}
});

}

if(twitter){

await supabase.from("blocks").insert({
user_id:user.id,
type:"link",
data_json:{
title:"Twitter",
url:twitter.startsWith("http")
? twitter
: `https://twitter.com/${twitter}`
}
});

}

}

async function finishSetup(){

if(!displayName){
alert("Enter display name");
return;
}

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
fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"
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

<h2>Select your category</h2>

<div style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:10,
marginTop:20
}}>

{userType==="creator" && (
<>
<button onClick={()=>{setIndustry("instagram");setStep(3);}}>Instagram Creator</button>
<button onClick={()=>{setIndustry("youtube");setStep(3);}}>YouTube Creator</button>
<button onClick={()=>{setIndustry("tiktok");setStep(3);}}>TikTok Creator</button>
<button onClick={()=>{setIndustry("multi");setStep(3);}}>Multiple Platforms</button>
</>
)}

{userType==="business" && (
<>
<button onClick={()=>{setIndustry("restaurant");setStep(3);}}>Restaurant</button>
<button onClick={()=>{setIndustry("cafe");setStep(3);}}>Cafe</button>
<button onClick={()=>{setIndustry("store");setStep(3);}}>Online Store</button>
<button onClick={()=>{setIndustry("healthcare");setStep(3);}}>Healthcare</button>
</>
)}

</div>

<div style={{marginTop:20}}>
<button onClick={()=>setStep(1)}>Back</button>
</div>

</div>

)}

{step===3 &&(

<div style={{width:320}}>

<h2>Add your links</h2>

<input
placeholder="Instagram username / URL"
value={instagram}
onChange={(e)=>setInstagram(e.target.value)}
style={{marginTop:10,padding:10,width:"100%"}}
/>

<input
placeholder="YouTube channel / URL"
value={youtube}
onChange={(e)=>setYoutube(e.target.value)}
style={{marginTop:10,padding:10,width:"100%"}}
/>

<input
placeholder="Website"
value={website}
onChange={(e)=>setWebsite(e.target.value)}
style={{marginTop:10,padding:10,width:"100%"}}
/>

<input
placeholder="Twitter username / URL"
value={twitter}
onChange={(e)=>setTwitter(e.target.value)}
style={{marginTop:10,padding:10,width:"100%"}}
/>

<div style={{marginTop:20,display:"flex",gap:10}}>

<button onClick={()=>setStep(2)}>Back</button>

<button onClick={()=>setStep(4)}>
Continue
</button>

</div>

</div>

)}

{step===4 &&(

<div style={{width:320,textAlign:"center"}}>

<h2>Profile Info</h2>

<div style={{marginTop:20}}>

<div style={{
width:90,
height:90,
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

<label style={{marginTop:10,display:"block",cursor:"pointer"}}>
Upload photo
<input type="file" hidden accept="image/*" onChange={uploadAvatar}/>
</label>

</div>

<input
placeholder="Display Name"
value={displayName}
onChange={(e)=>setDisplayName(e.target.value)}
style={{marginTop:15,padding:10,width:"100%"}}
/>

<textarea
placeholder="Bio"
value={bio}
maxLength={120}
onChange={(e)=>setBio(e.target.value)}
style={{marginTop:10,padding:10,width:"100%"}}
/>

<div style={{fontSize:12,opacity:0.6}}>
{bio.length}/120
</div>

<div style={{marginTop:20,display:"flex",gap:10}}>

<button onClick={()=>setStep(3)}>Back</button>

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

<div style={{marginTop:10,fontWeight:"600"}}>
{displayName}
</div>

<div style={{opacity:0.7,fontSize:14}}>
{bio}
</div>

{instagram && <div style={{marginTop:10}}>Instagram</div>}
{youtube && <div style={{marginTop:10}}>YouTube</div>}
{website && <div style={{marginTop:10}}>Website</div>}
{twitter && <div style={{marginTop:10}}>Twitter</div>}

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
