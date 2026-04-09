"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../../lib/supabase";
import { detectPlatform } from "../../../lib/detectPlatform";
import extractUsername from "../../../lib/extractUsername";
import { socialIcons } from "../../../lib/socialIcons";

export default function SocialLinksPage(){

const [links,setLinks]=useState({});
const [input,setInput]=useState("");
const [message,setMessage]=useState("");
const [preview,setPreview]=useState(null);

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

/* DETECT PREVIEW */

function detectPreview(value){

setInput(value);

if(!value){
setPreview(null);
return;
}

const platform=detectPlatform(value);

if(!platform){
setPreview({error:true});
return;
}

const username=extractUsername(value);

setPreview({
platform,
username
});

}

/* ADD LINK FROM PREVIEW */

function addPreview(){

if(!preview) return;

const existing = links[preview.platform] || [];

/* DUPLICATE CHECK */

if(existing.includes(preview.username)){
setMessage("⚠ This account is already added");
return;
}

/* MAX 3 CHECK */

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

<h2 style={{marginBottom:20}}>
Social Links
</h2>

{/* AUTO INPUT */}

<div style={{marginBottom:25}}>

<input
value={input}
onChange={(e)=>detectPreview(e.target.value)}
placeholder="Paste your social profile URL"
style={{
width:"100%",
padding:"12px",
borderRadius:10,
border:"1px solid var(--border)"
}}
/>

{/* PREVIEW */}

{preview && !preview.error && (

<div style={{
marginTop:12,
display:"flex",
alignItems:"center",
gap:10,
background:"var(--card)",
padding:"10px 14px",
borderRadius:10,
border:"1px solid var(--border)"
}}>

<div style={{width:24,height:24}}>
{socialIcons[preview.platform]}
</div>

<div style={{flex:1}}>
<b>{preview.platform}</b> ✔ detected
<br/>
<span style={{fontSize:12,opacity:.7}}>
{preview.username}
</span>
</div>

<button
onClick={addPreview}
style={{
padding:"6px 12px",
borderRadius:6,
border:"none",
background:"#16a34a",
color:"#fff",
cursor:"pointer"
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
Platform not detected. Use manual fields below.
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

<input
placeholder="username"
onKeyDown={(e)=>{

if(e.key==="Enter"){

const username=e.target.value.trim();
if(!username) return;

const updated={
...links,
[platform]:[...(links[platform] || []),username]
};

save(updated);
e.target.value="";

}

}}
style={{
flex:1,
border:"none",
outline:"none",
background:"transparent"
}}
/>

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
