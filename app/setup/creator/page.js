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

function normalizeLink(link){

if(link.startsWith("http")) return link;

if(link.startsWith("@")) link=link.replace("@","");

return "https://"+link;

}

function detectPlatform(link){

const l=link.toLowerCase();

if(l.includes("instagram")) return "Instagram";
if(l.includes("vk")) return "VK";
if(l.includes("youtube")) return "YouTube";
if(l.includes("tiktok")) return "TikTok";
if(l.includes("facebook")) return "Facebook";

return "Website";

}

async function finishSetup(){

const {data:{session}} = await supabase.auth.getSession();
const user=session.user;

await supabase
.from("profiles")
.update({
user_type:"creator",
industry:platform,
display_name:displayName,
bio:bio,
avatar:avatar,
theme:theme
})
.eq("id",user.id);

let links=[];

if(platform!=="multi"){
links=[username];
}else{
links=multiLinks;
}

for(const link of links){

if(link.trim()==="") continue;

const url=normalizeLink(link);
const title=detectPlatform(url);

await supabase.from("blocks").insert({

user_id:user.id,
type:"link",
data_json:{
title:title,
url:url
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
fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"
}}>

<h1 style={{marginBottom:30}}>
Creator Setup
</h1>

{/* STEP 1 THEME */}

{step===1 &&(

<div>

<h2>Select Theme</h2>

<button onClick={()=>setTheme("dark")}>Dark</button>
<button onClick={()=>setTheme("gradient")}>Gradient</button>
<button onClick={()=>setTheme("light")}>Light</button>

<button onClick={continueStep} style={{marginTop:20}}>
Continue
</button>

</div>

)}

{/* STEP 2 PLATFORM */}

{step===2 &&(

<div>

<h2>Where is your audience?</h2>

<button onClick={()=>setPlatform("instagram")}>Instagram</button>
<button onClick={()=>setPlatform("vk")}>VK</button>
<button onClick={()=>setPlatform("facebook")}>Facebook</button>
<button onClick={()=>setPlatform("youtube")}>YouTube</button>
<button onClick={()=>setPlatform("tiktok")}>TikTok</button>
<button onClick={()=>setPlatform("multi")}>Multiple Platforms</button>

<button onClick={continueStep} style={{marginTop:20}}>
Continue
</button>

</div>

)}

{/* STEP 3 LINKS */}

{step===3 &&(

<div style={{width:320}}>

<h2>Add your profile</h2>

{platform!=="multi" &&(

<input
placeholder="@username or profile URL"
value={username}
onChange={(e)=>setUsername(e.target.value)}
style={{marginTop:10,width:"100%"}}
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
style={{marginTop:10,width:"100%"}}
/>

))}

<button onClick={addMultiLink}>
+ Add link
</button>

</div>

)}

<button onClick={continueStep} style={{marginTop:20}}>
Continue
</button>

</div>

)}

{/* STEP 4 PROFILE */}

{step===4 &&(

<div style={{width:320}}>

<h2>Profile Info</h2>

<input
placeholder="Display Name"
value={displayName}
onChange={(e)=>setDisplayName(e.target.value)}
style={{marginTop:10,width:"100%"}}
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

{/* STEP 5 PREVIEW */}

{step===5 &&(

<div>

<h2>Preview</h2>

<div>{displayName}</div>
<div>{bio}</div>

<button onClick={finishSetup} style={{marginTop:20}}>
🎉 Finish Setup
</button>

</div>

)}

</div>

);

}
