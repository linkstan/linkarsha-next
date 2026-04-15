import ThemeRenderer from "../../components/ThemeRenderer";
import { themes } from "../lib/themes";
import HeroHeader from "../../components/HeroHeader";
import { cache } from "react";
import React from "react";
import ButtonBlock from "../../components/ButtonBlock";
import { createClient } from "@supabase/supabase-js";
import { socialIcons } from "../lib/socialIcons";
import { buildSocialUrl } from "../lib/buildSocialUrl";

export const revalidate = 120;
export const dynamic = "force-static";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/* ---------------- PROFILE CACHE ---------------- */

const getProfile = cache(async (username) => {

const { data } = await supabase
.from("profiles")
.select("id,username,display_name,bio,avatar,theme,profile_settings")
.eq("username", username)
.single();

return data;

});

/* ---------------- BLOCKS CACHE ---------------- */

const getBlocks = cache(async (id)=>{

const { data } = await supabase
.from("blocks")
.select("*")
.eq("user_id",id)
.order("position",{ascending:true});

return data;

});

/* ---------------- PAGE ---------------- */

export default async function PublicProfile({ params }) {

const username = params?.username;

/* PROFILE */

const profile = await getProfile(username);

if (!profile) {
return (
<div style={{
minHeight:"100vh",
display:"flex",
alignItems:"center",
justifyContent:"center"
}}>
Profile not found
</div>
);
}

/* SETTINGS */

const appearance = profile.profile_settings || {};
const themeName = profile.theme || "minimal";
const theme = themes[themeName] || themes.minimal;
const header = appearance.header || {};
const socialLinks = appearance.social_links || {};
const showSocialIcons = header.showSocialIcons;

const socialPosition = "header";

/* SOCIAL LINKS */

const activeSocial = [];

Object.entries(socialLinks).forEach(([platform,list])=>{

if(!socialIcons[platform]) return;

if(Array.isArray(list)){

list.forEach(username=>{
activeSocial.push({platform,username});
});

}else if(list){

activeSocial.push({platform,username:list});

}

});

/* WALLPAPER */

const wallpaper = appearance.wallpaper || null;
const blur = appearance.wallpaperBlur || 0;
const overlay = appearance.wallpaperOverlay !== false;

/* THEMES */

const themeMap={
Minimal:"#ffffff",
Paper:"#fafafa",
Clean:"#f4f4f4",
Midnight:"#0b0b12",
"Dark Pro":"#121212",
Mono:"#111111",
Ocean:"linear-gradient(135deg,#2193b0,#6dd5ed)",
Sunset:"linear-gradient(135deg,#ff7a18,#ffb347)",
Neon:"linear-gradient(135deg,#00f2fe,#7c5cff)",
Pastel:"linear-gradient(135deg,#fbc2eb,#a6c1ee)",
Royal:"linear-gradient(135deg,#141e30,#243b55)",
Luxury:"#000000"
};

const background = wallpaper || theme.background || "#0b0b12";

/* BLOCKS */

const blocksPromise = getBlocks(profile.id);
const blockData = await blocksPromise;
const blocks = blockData || [];

/* ---------------- RENDER ---------------- */

return(

<div style={{
minHeight:"100vh",
background:background,
backgroundSize:"cover",
backgroundPosition:"center",
display:"flex",
flexDirection:"column",
alignItems:"center",
paddingTop: theme.layout?.hero ? 0 : 40,
position:"relative",
color:"#fff"
}}>

{/* WALLPAPER BLUR */}

{wallpaper && blur>0 && (
<div style={{
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
backdropFilter:`blur(${blur}px)`,
WebkitBackdropFilter:`blur(${blur}px)`
}}/>
)}

{/* WALLPAPER OVERLAY */}

{wallpaper && overlay && (
<div style={{
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.25)"
}}/>
)}

{/* THEME RENDERER */}

<div style={{
position:"relative",
zIndex:2,
display:"flex",
flexDirection:"column",
alignItems:"center",
width:"100%"
}}>

<ThemeRenderer
profile={profile}
appearance={appearance}
theme={theme}
blocks={blocks}
/>

</div>

</div>

);

}
