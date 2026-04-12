"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../../lib/supabase";
import { detectPlatform } from "../../../lib/detectPlatform";
import { socialIcons } from "../../../lib/socialIcons";

const platformPlaceholders={
instagram:"username",
facebook:"username or profile id",
tiktok:"username",
youtube:"channel handle",
twitter:"username",
snapchat:"username",
pinterest:"username",
linkedin:"profile slug",
telegram:"username",
whatsapp:"phone number with country code",
github:"username",
threads:"username",
twitch:"username",
tumblr:"username",
website:"website URL",
email:"email address",
vk:"username or id",
onlyfans:"username",
discord:"user id",
reddit:"username",
tinder:"profile id",
bumble:"profile id",
koo:"username",
ok:"profile id",
sharechat:"username",
qq:"numeric id",
weibo:"username or uid",
douyin:"user id",
wordpress:"site URL",
signal:"phone number with country code",
dailymotion:"channel name"
};

export default function SocialLinksPage(){

const [links,setLinks]=useState({});
const [input,setInput]=useState("");
const [preview,setPreview]=useState(null);
const [checkingTop,setCheckingTop]=useState(false);
const [checkingManual,setCheckingManual]=useState(null);
const [manualInputs,setManualInputs]=useState({});
const [manualPreview,setManualPreview]=useState(null);

useEffect(()=>{
loadLinks();
},[]);

/* LOAD LINKS */

async function loadLinks(){

const {data:{session}}=await supabase.auth.getSession();
if(!session) return;

const {data}=await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

const settings=data?.profile_settings||{};
const saved=settings.social_links||{};

const converted={};

Object.entries(saved).forEach(([platform,value])=>{
if(Array.isArray(value)){
converted[platform]=value;
}else if(typeof value==="string"){
converted[platform]=[value];
}
});

setLinks(converted);

}

/* SAVE */

async function save(updated){

setLinks(updated);

window.dispatchEvent(
new CustomEvent("appearance-update",{detail:{social_links:updated}})
);

const {data:{session}}=await supabase.auth.getSession();
if(!session) return;

const {data}=await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

const settings=data?.profile_settings||{};
settings.social_links=updated;

await supabase
.from("profiles")
.update({profile_settings:settings})
.eq("id",session.user.id);

}

/* CLEAN USERNAME */

function cleanUsername(username){

if(!username) return "";

let u=username.trim();

u=u.replace(/[?#&].*/,"");
u=u.replace("@","");
u=u.replace(/\/+$/,"");

return u;

}

/* EXTRACT USERNAME FROM URL */

function extractUsername(url){

try{

const u=new URL(url);

let path=u.pathname.replace(/^\/+/,"").replace(/\/$/,"");

if(path.includes("/")){
path=path.split("/")[0];
}

return cleanUsername(path);

}catch{

return cleanUsername(url);

}

}

/* CANONICAL PROFILE URL */

function buildProfileUrl(platform,username){

username=cleanUsername(username);

switch(platform){

case "instagram":
return `https://www.instagram.com/${username}/`;

case "facebook":
return `https://www.facebook.com/${username}`;

case "youtube":
return `https://www.youtube.com/@${username}`;

case "twitter":
return `https://x.com/${username}`;

case "tiktok":
return `https://www.tiktok.com/@${username}`;

case "pinterest":
return `https://www.pinterest.com/${username}`;

case "telegram":
return `https://t.me/${username}`;

case "github":
return `https://github.com/${username}`;

default:
return `https://${platform}.com/${username}`;

}

}

/* CLEAN TITLE */

function cleanTitle(title,username){

if(!title) return username;

let t=title;

if(t.includes("Instagram")){
const m=t.match(/^(.+?)\s\(@/);
if(m) return m[1];
}

t=t.replace("- YouTube","");
t=t.replace(" on X","");
t=t.split("|")[0];
t=t.split("•")[0];
t=t.split("(")[0];
t=t.trim();

if(!t || t.toLowerCase()===username.toLowerCase()){
return username;
}

return t;

}

/* FETCH META */

async function getMeta(url){

try{

const res=await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
const meta=await res.json();
return meta;

}catch{

return null;

}

}

/* PROCESS PREVIEW */

async function generatePreview(platform,username){

const url=buildProfileUrl(platform,username);

const meta=await getMeta(url);

const title=cleanTitle(meta?.title,username);

return{
platform,
username,
title,
image:meta?.image||null
};

}

/* TOP URL CHECK */

async function checkUrl(){

if(!input){
setPreview(null);
return;
}

setCheckingTop(true);
setManualPreview(null);

const url=input.trim();
const platform=detectPlatform(url);

if(!platform){
setPreview(null);
setCheckingTop(false);
return;
}

const username=extractUsername(url);

const data=await generatePreview(platform,username);

setPreview(data);

setCheckingTop(false);

}

/* MANUAL CHECK */

async function checkManual(platform){

const value=manualInputs[platform];
if(!value) return;

setCheckingManual(platform);
setPreview(null);

const username=cleanUsername(value);

const data=await generatePreview(platform,username);

setManualPreview(data);

setCheckingManual(null);

}

/* ADD */

function addPreview(data){

const existing=links[data.platform]||[];

if(existing.includes(data.username)) return;
if(existing.length>=3) return;

const updated={
...links,
[data.platform]:[...existing,data.username]
};

save(updated);

setPreview(null);
setManualPreview(null);
setInput("");
setManualInputs({});

}

/* REMOVE */

function remove(platform,index){

const arr=[...links[platform]];
arr.splice(index,1);

const updated={
...links,
[platform]:arr
};

save(updated);

}

return(

<>
<div
style={{
padding:"16px",
maxWidth:720,
margin:"0 auto",
width:"100%"
}}
>

<h2 style={{marginBottom:20}}>Social Links</h2>

<div style={{marginBottom:25}}>

<div style={{display:"flex",gap:8}}>

<input
value={input}
onChange={(e)=>{

const v=e.target.value;
setInput(v);

if(v){
setManualPreview(null);
}else{
setPreview(null);
}

}}
placeholder="Paste your social profile URL"
style={{
flex:1,
padding:"12px",
borderRadius:10,
border:"1px solid var(--border)"
}}
/>

{input && (

<button
onClick={checkUrl}
style={{
padding:"10px 14px",
borderRadius:8,
border:"none",
background:"#2563eb",
color:"#fff",
cursor:"pointer"
}}
>

{checkingTop ? (
<span className="spinner"></span>
) : "Check"}

</button>

)}

</div>

{preview && (
<PreviewCard data={preview} add={addPreview}/>
)}

</div>

<div style={{
display:"flex",
alignItems:"center",
margin:"25px 0"
}}>
<div style={{flex:1,height:1,background:"var(--border)"}}/>
<div style={{padding:"0 10px",fontSize:13,opacity:.6}}>OR</div>
<div style={{flex:1,height:1,background:"var(--border)"}}/>
</div>

<div style={{display:"flex",flexDirection:"column",gap:12}}>

{Object.keys(socialIcons).map((platform)=>{

const existing=links[platform]||[];
if(existing.length>=3) return null;

return(

<div key={platform}>

<div style={{
display:"flex",
alignItems:"center",
gap:12,
border:"1px solid var(--border)",
padding:"10px 14px",
borderRadius:12,
background:"var(--card)"
}}>

<div style={{width:24,height:24}}>
<img
src={`/icons/${platform==="twitter"?"x":platform}.png`}
onError={(e)=>{e.currentTarget.src="/icons/other.png"}}
style={{width:20,height:20}}
/>
</div>

<div style={{width:100,textTransform:"capitalize"}}>
{platform}
</div>

<div style={{display:"flex",flex:1,gap:8}}>

<input
placeholder={platformPlaceholders[platform]}
value={manualInputs[platform]||""}
onChange={(e)=>{

const v=e.target.value;

setManualInputs({
...manualInputs,
[platform]:v
});

if(v){
setPreview(null);
}else{
setManualPreview(null);
}

}}
style={{
flex:1,
border:"none",
outline:"none",
background:"transparent"
}}
/>

{manualInputs[platform] && (

<button
onClick={()=>checkManual(platform)}
style={{
padding:"6px 12px",
borderRadius:8,
border:"none",
background:"#2563eb",
color:"#fff",
cursor:"pointer"
}}
>

{checkingManual===platform ? (
<span className="spinner"></span>
) : "Check"}

</button>

)}

</div>

</div>

{manualPreview && manualPreview.platform===platform && (
<PreviewCard data={manualPreview} add={addPreview}/>
)}

</div>

);

})}

</div>

<div style={{
marginTop:30,
display:"flex",
flexDirection:"column",
gap:14
}}>

{Object.entries(links).map(([platform,list])=>{

const Icon=socialIcons[platform];

return list.map((username,i)=>(

<div key={platform+i} style={{
display:"flex",
alignItems:"center",
gap:12,
border:"1px solid var(--border)",
padding:"10px 14px",
borderRadius:12,
background:"var(--card)"
}}>

<div style={{width:24,height:24}}>
{Icon}
</div>

<div style={{flex:1}}>
{platform} • @{username}
</div>

<button
onClick={()=>remove(platform,i)}
style={{
border:"none",
background:"transparent",
cursor:"pointer"
}}
>
Remove
</button>

</div>

));

})}

</div>

</div>

<style jsx>{`
.spinner{
width:16px;
height:16px;
border:2px solid rgba(255,255,255,0.3);
border-top-color:#fff;
border-radius:50%;
display:inline-block;
animation:spin .7s linear infinite;
}
@keyframes spin{
to{transform:rotate(360deg)}
}
`}</style>

</>
);

}

/* PREVIEW CARD */

function PreviewCard({data,add}){

return(

<div style={{
marginTop:12,
display:"flex",
gap:14,
alignItems:"center",
background:"var(--card)",
padding:"14px",
borderRadius:14,
border:"1px solid var(--border)"
}}>

{data.image ? (

<img
src={data.image}
alt={data.username}
style={{
width:48,
height:48,
borderRadius:"50%",
objectFit:"cover"
}}
/>

):( 

<div style={{width:48,height:48}}>
<img
src={`/icons/${data.platform==="twitter"?"x":data.platform}.png`}
alt={data.platform}
onError={(e)=>{e.currentTarget.src="/icons/other.png"}}
style={{
width:40,
height:40,
borderRadius:"50%",
objectFit:"cover"
}}
/>
</div>

)}

<div style={{flex:1}}>

<div style={{fontWeight:600}}>
{data.title}
</div>

<div style={{fontSize:12,opacity:.6}}>
{data.platform} • @{data.username}
</div>

</div>

<button
onClick={()=>add(data)}
style={{
padding:"8px 14px",
borderRadius:8,
border:"none",
background:"#22c55e",
color:"#fff",
cursor:"pointer"
}}
>
Add
</button>

</div>

);

}
