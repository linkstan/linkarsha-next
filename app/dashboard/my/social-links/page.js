"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../../../lib/supabase";
import { socialIcons } from "../../../../lib/socialIcons";

export default function SocialLinksPage(){

const [links,setLinks]=useState({});
const [loading,setLoading]=useState(true);

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
setLoading(false);

}

async function updateLink(platform,value){

const updated={...links,[platform]:value};

setLinks(updated);

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
"pinterest",
"linkedin",
"telegram",
"whatsapp",
"github",
"reddit",
"discord",
"threads",
"twitch",
"tumblr",
"medium",
"website",
"email"

];

return(

<div style={{
padding:"24px",
maxWidth:720
}}>

<h2 style={{marginBottom:20}}>
Social Links
</h2>

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

<div style={{
width:24,
height:24
}}>
{Icon}
</div>

<input
value={links[platform] || ""}
onChange={(e)=>updateLink(platform,e.target.value)}
placeholder={`Add ${platform} link`}
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
