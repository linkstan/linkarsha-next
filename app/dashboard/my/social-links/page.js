"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../../lib/supabase";
import { socialIcons } from "../../../lib/socialIcons";
import extractUsername from "../../../lib/extractUsername";

export default function SocialLinksPage(){

const [links,setLinks]=useState({});

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

setLinks(settings.social_links || {});

}

async function updateLink(platform,value){

const username=extractUsername(value);

const updated={...links,[platform]:username};

setLinks(updated);

/* LIVE PREVIEW */

window.dispatchEvent(
new CustomEvent("appearance-update",{
detail:{social_links:updated}
})
);

/* SAVE */

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

const platforms=[

"instagram",
"facebook",
"tiktok",
"youtube",
"twitter",
"snapchat",
"vk",
"pinterest",
"linkedin",
"telegram",
"whatsapp",
"onlyfans",
"discord",
"reddit",
"threads",
"twitch",
"tumblr",
"medium",
"github",
"website",
"email",
"tinder",
"bumble",
"koo",
"ok",
"sharechat",
"qq",
"weibo",
"douyin",
"wordpress",
"signal",
"dailymotion"

];

return(

<div style={{padding:24,maxWidth:720}}>

<h2 style={{marginBottom:20}}>Social Links</h2>

<div style={{
display:"flex",
flexDirection:"column",
gap:14
}}>

{platforms.map((platform)=>{

const Icon=socialIcons[platform];

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

<input
value={links[platform] || ""}
onChange={(e)=>updateLink(platform,e.target.value)}
placeholder={`Enter ${platform} username`}
style={{
flex:1,
border:"none",
outline:"none",
background:"transparent",
fontSize:14
}}
/>

</div>

);

})}

</div>

</div>

);

}
