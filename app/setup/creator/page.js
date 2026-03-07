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
src={avatar||"/default-avatar.png"}
style={{width:"100%",height:"100%",objectFit:"cover"}}
/>

</div>

<div style={{marginTop:10,fontWeight:600}}>
{displayName}
</div>

<div style={{opacity:0.7,fontSize:14}}>
{bio}
</div>

{platform!=="multi" && username &&(

<div style={{
marginTop:12,
background:"#1a1a25",
padding:10,
borderRadius:10
}}>
{detectPlatform(username)}
</div>

)}

{platform==="multi" && multiLinks.filter(l=>l.trim()!=="").map((l,i)=>(

<div
key={i}
style={{
marginTop:10,
background:"#1a1a25",
padding:10,
borderRadius:10
}}
>
{detectPlatform(l)}
</div>

))}

</div>

<div style={{marginTop:20}}>

<button
onClick={finishSetup}
style={{
padding:"14px 40px",
borderRadius:10,
border:"none",
background:"#00d26a",
color:"white",
fontWeight:600
}}
>
🎉 Finish Setup
</button>

</div>

</div>

)}

</div>

);

}
