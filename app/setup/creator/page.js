"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function CreatorSetup(){

const router = useRouter();

const [step,setStep] = useState(1);

const [theme,setTheme] = useState("");
const [platform,setPlatform] = useState("");

const [username,setUsername] = useState("");
const [multiLinks,setMultiLinks] = useState(["","",""]);

const [avatar,setAvatar] = useState("");
const [displayName,setDisplayName] = useState("");
const [bio,setBio] = useState("");

function continueStep(){

if(step===1 && !theme){
alert("Select a theme");
return;
}

if(step===2 && !platform){
alert("Select a platform");
return;
}

if(step===3){

if(platform!=="multi" && username.trim()===""){
alert("Enter username or profile URL");
return;
}

if(platform==="multi"){
const valid = multiLinks.filter(l=>l.trim()!=="");
if(valid.length===0){
alert("Add at least one link");
return;
}
}

}

if(step===4 && !displayName){
alert("Enter display name");
return;
}

setStep(step+1);

}

function updateMultiLink(i,val){

const arr=[...multiLinks];
arr[i]=val;
setMultiLinks(arr);

}

function addMultiLink(){

if(multiLinks.length>=7){
alert("Maximum 7 links allowed");
return;
}

setMultiLinks([...multiLinks,""]);

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

return(

<div style={{
minHeight:"100vh",
background:"#0b0b12",
color:"white",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"
}}>

<h1 style={{marginBottom:30}}>
Creator Setup
</h1>

{/* STEP 1 THEME */}

{step===1 &&(

<div style={{textAlign:"center"}}>

<h2>Select a Theme</h2>

<div style={{
marginTop:30,
display:"grid",
gridTemplateColumns:"repeat(3,120px)",
gap:20
}}>

<div
onClick={()=>setTheme("dark")}
style={{
height:180,
borderRadius:20,
cursor:"pointer",
background:"#111",
border:theme==="dark"?"2px solid #00d26a":"1px solid #333"
}}
></div>

<div
onClick={()=>setTheme("gradient")}
style={{
height:180,
borderRadius:20,
cursor:"pointer",
background:"linear-gradient(180deg,#4f46e5,#9333ea)",
border:theme==="gradient"?"2px solid #00d26a":"1px solid #333"
}}
></div>

<div
onClick={()=>setTheme("light")}
style={{
height:180,
borderRadius:20,
cursor:"pointer",
background:"#ddd",
border:theme==="light"?"2px solid #00d26a":"1px solid #333"
}}
></div>

</div>

<button
onClick={continueStep}
style={{
marginTop:40,
padding:"14px 40px",
borderRadius:10,
border:"none",
background:theme?"#00d26a":"#333",
color:"white",
fontWeight:600,
cursor:theme?"pointer":"not-allowed",
opacity:theme?1:0.6
}}
>
Continue
</button>

</div>

)}

{/* STEP 2 PLATFORM */}

{step===2 &&(

<div style={{textAlign:"center"}}>

<h2>Where is your audience?</h2>

<div style={{
marginTop:30,
display:"grid",
gridTemplateColumns:"repeat(2,160px)",
gap:15
}}>

<button onClick={()=>setPlatform("instagram")}>Instagram</button>
<button onClick={()=>setPlatform("vk")}>VK</button>
<button onClick={()=>setPlatform("facebook")}>Facebook</button>
<button onClick={()=>setPlatform("youtube")}>YouTube</button>
<button onClick={()=>setPlatform("tiktok")}>TikTok</button>
<button onClick={()=>setPlatform("multi")}>Multiple Platforms</button>

</div>

<button
onClick={continueStep}
style={{
marginTop:40,
padding:"14px 40px",
borderRadius:10,
border:"none",
background:platform?"#00d26a":"#333",
color:"white",
fontWeight:600,
cursor:platform?"pointer":"not-allowed",
opacity:platform?1:0.6
}}
>
Continue
</button>

</div>

)}

{/* STEP 3 LINKS */}

{step===3 &&(

<div style={{width:340,textAlign:"center"}}>

<h2>Add your profile</h2>

{platform!=="multi" &&(

<input
placeholder="@username or profile URL"
value={username}
onChange={(e)=>setUsername(e.target.value)}
style={{
marginTop:20,
padding:12,
width:"100%",
background:"#111",
border:"1px solid #333",
color:"white"
}}
/>

)}

{platform==="multi" &&(

<div>

{multiLinks.map((l,i)=>(

<input
key={i}
placeholder="https://profile-link"
value={l}
onChange={(e)=>updateMultiLink(i,e.target.value)}
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

<button onClick={addMultiLink} style={{marginTop:10}}>
+ Add link
</button>

</div>

)}

<button
onClick={continueStep}
style={{
marginTop:30,
padding:"14px 40px",
borderRadius:10,
border:"none",
background:"#00d26a",
color:"white",
fontWeight:600
}}
>
Continue
</button>

</div>

)}

{/* STEP 4 PROFILE INFO */}

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
src={avatar||"/default-avatar.png"}
style={{width:"100%",height:"100%",objectFit:"cover"}}
/>

<label style={{
position:"absolute",
bottom:0,
right:0,
background:"#00d26a",
color:"#fff",
borderRadius:"50%",
width:28,
height:28,
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer",
fontWeight:"bold"
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
maxLength={160}
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
{bio.length}/160
</div>

<button
onClick={continueStep}
style={{
marginTop:20,
padding:"14px 40px",
borderRadius:10,
border:"none",
background:"#00d26a",
color:"white",
fontWeight:600
}}
>
Continue
</button>

</div>

)}

{/* STEP 5 PREVIEW */}

{step===5 &&(

<div style={{textAlign:"center"}}>

<h2>Preview coming next</h2>

</div>

)}

</div>

);

}
