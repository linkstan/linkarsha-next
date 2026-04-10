"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../../lib/supabase";
import { detectPlatform } from "../../../lib/detectPlatform";
import extractUsername from "../../../lib/extractUsername";
import { socialIcons } from "../../../lib/socialIcons";

const platformPlaceholders = {
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
const [message,setMessage]=useState("");
const [preview,setPreview]=useState(null);
const [checking,setChecking]=useState(false);
const [manualInputs,setManualInputs]=useState({});

useEffect(()=>{
loadLinks();
},[]);

async function loadLinks(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const {data}=await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

const settings=data?.profile_settings || {};
const saved=settings.social_links || {};

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
new CustomEvent("appearance-update",{
detail:{social_links:updated}
})
);

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const {data}=await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

const settings=data?.profile_settings || {};
settings.social_links=updated;

await supabase
.from("profiles")
.update({profile_settings:settings})
.eq("id",session.user.id);
}

/* NORMALIZE URL */

function normalizeUrl(url){

let u=url.trim();

if(!u.startsWith("http://") && !u.startsWith("https://")){
u="https://"+u;
}

return u;
}

/* CHECK URL */

async function checkUrl(){

if(!input || input.trim()===""){
setPreview(null);
return;
}

setChecking(true);
setPreview(null);
setMessage("");

const url=normalizeUrl(input);

const platform=detectPlatform(url);

if(!platform){
setChecking(false);
setPreview({error:true});
return;
}

const username=extractUsername(url);

let meta=null;

try{
const res=await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
meta=await res.json();
}catch(e){
meta=null;
}

setPreview({
platform,
username,
title:meta?.title || username,
image:meta?.image || null
});

setChecking(false);
}

/* ADD LINK */

function addPreview(){

if(!preview) return;

const existing=links[preview.platform] || [];

if(existing.includes(preview.username)){
setMessage("⚠ This account is already added");
return;
}

if(existing.length>=3){
setMessage("⚠ Maximum 3 links allowed for this platform");
return;
}

const updated={
...links,
[preview.platform]:[...existing,preview.username]
};

save(updated);

setPreview(null);
setInput("");
setMessage(`✔ ${preview.platform} added`);
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

<div style={{padding:"24px",maxWidth:720}}>

<h2 style={{marginBottom:20}}>Social Links</h2>

{/* AUTO INPUT */}

<div style={{marginBottom:25}}>

<div style={{display:"flex",gap:8}}>

<input
value={input}
onChange={(e)=>{
const value=e.target.value;
setInput(value);

if(!value){
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
cursor:"pointer",
minWidth:80
}}
>

{checking ? (
<span className="spinner"></span>
) : "Check"}

</button>

)}

</div>

{/* SPINNER STYLE */}

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

{/* PREVIEW CARD */}

{preview && !preview.error && (

<div style={{
marginTop:12,
display:"flex",
gap:14,
alignItems:"center",
background:"var(--card)",
padding:"14px",
borderRadius:14,
border:"1px solid var(--border)",
boxShadow:"0 2px 10px rgba(0,0,0,0.15)"
}}>

{preview.image ? (

<img
src={preview.image}
alt={preview.title}
onError={(e)=>{e.target.src="";}}
style={{
width:48,
height:48,
borderRadius:"50%",
objectFit:"cover"
}}
/>

) : (

<div style={{
width:48,
height:48,
display:"flex",
alignItems:"center",
justifyContent:"center"
}}>
{socialIcons[preview.platform]}
</div>

)}

<div style={{flex:1}}>

<div style={{fontWeight:600,fontSize:15}}>
{preview.title}
</div>

<div style={{fontSize:12,opacity:.6}}>
{preview.platform} • @{preview.username}
</div>

</div>

<button
onClick={addPreview}
style={{
padding:"8px 14px",
borderRadius:8,
border:"none",
background:"#22c55e",
color:"#fff",
cursor:"pointer",
fontWeight:600
}}
>
Add
</button>

</div>

)}

{preview && preview.error && (

<div style={{
marginTop:10,
fontSize:13,
color:"#ef4444"
}}>
We couldn't detect that profile. Please check the URL or use manual fields below.
</div>

)}

<div style={{marginTop:8,fontSize:13,opacity:.8}}>
{message}
</div>

</div>

{/* OR */}

<div style={{
display:"flex",
alignItems:"center",
margin:"25px 0"
}}>
<div style={{flex:1,height:1,background:"var(--border)"}}/>
<div style={{padding:"0 10px",fontSize:13,opacity:.6}}>OR</div>
<div style={{flex:1,height:1,background:"var(--border)"}}/>
</div>

{/* MANUAL INPUTS */}

<div style={{display:"flex",flexDirection:"column",gap:12}}>

{Object.keys(socialIcons).map((platform)=>{

const Icon=socialIcons[platform];
const existing=links[platform] || [];

if(existing.length>=3) return null;

return(

<div
key={platform}
style={{
display:"flex",
alignItems:"center",
gap:12,
border:"1px solid var(--border)",
padding:"10px 14px",
borderRadius:12,
background:"var(--card)"
}}
>

<div style={{width:24,height:24}}>
{Icon}
</div>

<div style={{
width:120,
fontSize:14,
textTransform:"capitalize"
}}>
{platform}
</div>

<div style={{display:"flex",flex:1,gap:8}}>

<input
placeholder={platformPlaceholders[platform] || "value"}
value={manualInputs[platform] || ""}
onChange={(e)=>{
setManualInputs({
...manualInputs,
[platform]:e.target.value
});
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
Check
</button>

)}

</div>

</div>

</div>

</div>

);
})}

</div>

{/* SAVED LINKS */}

<div style={{
marginTop:30,
display:"flex",
flexDirection:"column",
gap:14
}}>

{Object.entries(links).map(([platform,list])=>{

const Icon=socialIcons[platform];

return list.map((username,i)=>(

<div
key={platform+i}
style={{
display:"flex",
alignItems:"center",
gap:12,
border:"1px solid var(--border)",
padding:"10px 14px",
borderRadius:12,
background:"var(--card)"
}}
>

<div style={{width:24,height:24}}>
{Icon}
</div>

<div style={{flex:1}}>
{platform} / {username}
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
);
}
