"use client";

import Link from "next/link";
import { useState,useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function DashboardLayout({ children }) {

const pathname = usePathname();

const [openLinkarsha,setOpenLinkarsha] = useState(false);
const [openTools,setOpenTools] = useState(false);
const [openUser,setOpenUser] = useState(false);

const [profile,setProfile] = useState(null);
const [blocks,setBlocks] = useState([]);
const [mode,setMode] = useState("light");

const showPreview =
pathname === "/dashboard" ||
pathname.startsWith("/dashboard/links") ||
pathname.startsWith("/dashboard/blocks") ||
pathname.startsWith("/dashboard/appearance");

/* AUTO OPEN MENUS */

useEffect(()=>{
if(pathname.startsWith("/dashboard/links")) setOpenLinkarsha(true);
if(pathname.startsWith("/dashboard/tools")) setOpenTools(true);
},[pathname]);

useEffect(()=>{
loadPreview();
},[]);

/* LOAD USER */

async function loadPreview(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const uid=session.user.id;

const {data:prof} = await supabase
.from("profiles")
.select("*")
.eq("id",uid)
.single();

setProfile(prof);
setMode(prof?.theme_mode || "light");

/* APPLY THEME */

if(prof?.theme_mode==="dark"){
document.documentElement.classList.add("dark");
}else{
document.documentElement.classList.remove("dark");
}

const {data:blockData} = await supabase
.from("blocks")
.select("*")
.eq("user_id",uid)
.eq("type","link")
.order("position",{ascending:true});

setBlocks(blockData || []);

}

/* TOGGLE MODE */

async function toggleTheme(){

const newMode = mode === "light" ? "dark" : "light";

setMode(newMode);

if(newMode==="dark"){
document.documentElement.classList.add("dark");
}else{
document.documentElement.classList.remove("dark");
}

await supabase
.from("profiles")
.update({theme_mode:newMode})
.eq("id",profile.id);

}

/* LOGOUT */

async function logout(){
await supabase.auth.signOut();
window.location="/login";
}

/* THEME COLORS */

const theme = mode === "dark"
? {
bg:"var(--bg)",
text:"var(--text)",
sidebar:"var(--sidebar)",
card:"var(--card)",
border:"var(--border)",
hover:"var(--hover)"
}
: {
bg:"var(--bg)",
text:"var(--text)",
sidebar:"var(--sidebar)",
card:"var(--card)",
border:"var(--border)",
hover:"var(--hover)"
};

return(

<div style={{
display:"flex",
minHeight:"100vh",
background:theme.bg,
color:theme.text,
fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"
}}>

{/* SIDEBAR */}

<div style={{
width:260,
background:theme.sidebar,
padding:20,
display:"flex",
flexDirection:"column",
borderRight:`1px solid ${theme.border}`
}}>

<h2 style={{marginBottom:15}}>Linkarsha</h2>

{/* USER */}

<div style={{position:"relative"}}>

<div
onClick={()=>setOpenUser(!openUser)}
style={{
display:"flex",
alignItems:"center",
gap:10,
marginBottom:10,
cursor:"pointer"
}}
>

<img
src={profile?.avatar || "/default-avatar.png"}
style={{
width:28,
height:28,
borderRadius:"50%",
objectFit:"cover"
}}
/>

<div style={{flex:1}}>
{profile?.username}
</div>

<div style={{opacity:0.6}}>
{openUser ? "v" : ">"}
</div>

</div>

{openUser && (

<div style={{
background:theme.card,
borderRadius:8,
padding:10,
marginBottom:20
}}>

<div style={dropdownItem}>Ask Question</div>
<div style={dropdownItem}>Help Center</div>
<div style={dropdownItem}>Contact Support</div>

<div
onClick={logout}
style={{
...dropdownItem,
color:"#ff6b6b"
}}
>
Sign Out
</div>

</div>

)}

</div>

{/* MENU */}

<Link href="/dashboard" style={menuItem(theme,pathname==="/dashboard")}>
Home
</Link>

<div
onClick={()=>setOpenLinkarsha(!openLinkarsha)}
style={menuItem(theme,pathname.startsWith("/dashboard/links"))}
>
<span>My Linkarsha</span>
<span>{openLinkarsha ? "v" : ">"}</span>
</div>

{openLinkarsha && (

<div style={{marginLeft:10}}>

<Link href="/dashboard/links" style={subitem(theme)}>
My Links
</Link>

<Link href="/dashboard/link-history" style={subitem(theme)}>
Link History
</Link>

<Link href="/dashboard/get-verified" style={subitem(theme)}>
Get Verified
</Link>

</div>

)}

<Link href="/dashboard/blocks" style={menuItem(theme)}>
Blocks
</Link>

<Link href="/dashboard/appearance" style={menuItem(theme)}>
Appearance
</Link>

<Link href="/dashboard/analytics" style={menuItem(theme)}>
Analytics
</Link>

<hr style={{margin:"20px 0",borderColor:theme.border}}/>

<div
onClick={()=>setOpenTools(!openTools)}
style={menuItem(theme)}
>
<span>Tools</span>
<span>{openTools ? "v" : ">"}</span>
</div>

{openTools && (

<div style={{marginLeft:10}}>

<Link href="/dashboard/tools/ai-bio-generator" style={subitem(theme)}>
AI Bio Generator
</Link>

<Link href="/dashboard/tools/qr-code" style={subitem(theme)}>
QR Code Generator
</Link>

<Link href="/dashboard/tools/export-data" style={subitem(theme)}>
Export Data
</Link>

</div>

)}

<Link href="/dashboard/referrals" style={menuItem(theme)}>
Referrals
</Link>

<Link href="/dashboard/settings" style={menuItem(theme)}>
Settings
</Link>

</div>

{/* MAIN AREA */}

<div style={{flex:1,display:"flex"}}>

<div style={{flex:1,padding:40,position:"relative"}}>

{/* THEME TOGGLE */}

<div
onClick={toggleTheme}
style={{
position:"absolute",
right:30,
top:20,
width:70,
height:36,
borderRadius:40,
cursor:"pointer",
background: mode==="dark"
? "linear-gradient(45deg,#0f9bff,#00f2fe)"
: "linear-gradient(45deg,#ff9a44,#ff5e62)",
display:"flex",
alignItems:"center",
justifyContent: mode==="dark" ? "flex-start" : "flex-end",
padding:4
}}
>

<div style={{
width:28,
height:28,
borderRadius:"50%",
background:"white",
display:"flex",
alignItems:"center",
justifyContent:"center"
}}>
{mode==="dark" ? "🌙" : "☀️"}
</div>

</div>

{children}

</div>

{/* PREVIEW COLUMN */}

{showPreview && (

<div style={{
width:360,
display:"flex",
justifyContent:"center",
alignItems:"center",
background:mode==="dark" ? "#0f0f16" : "#e9ebf2"
}}>

{/* PUBLIC PROFILE ALWAYS DARK */}

<div style={{
width:280,
height:520,
background:"#000",
borderRadius:30,
padding:18
}}>

<div style={{
width:"100%",
height:"100%",
background:"#0b0b12",
borderRadius:20,
padding:20,
overflow:"auto"
}}>

<div style={{
width:70,
height:70,
borderRadius:"50%",
overflow:"hidden",
margin:"auto",
background:"#222"
}}>

<img
src={profile?.avatar || "/default-avatar.png"}
style={{width:"100%",height:"100%",objectFit:"cover"}}
/>

</div>

<div style={{
marginTop:10,
textAlign:"center",
fontWeight:600,
color:"#fff"
}}>
{profile?.display_name}
</div>

<div style={{
textAlign:"center",
opacity:0.7,
fontSize:14,
color:"#aaa"
}}>
{profile?.bio}
</div>

{blocks.map(block=>(

<a
key={block.id}
href={block.data_json?.url}
target="_blank"
style={{
display:"flex",
alignItems:"center",
background:"#1a1a25",
padding:12,
borderRadius:10,
marginTop:10,
textDecoration:"none",
color:"white"
}}
>
{block.data_json?.title}
</a>

))}

</div>

</div>

</div>

)}

</div>

</div>

);

}

/* STYLES */

function menuItem(theme,active=false){
return{
padding:"10px 12px",
cursor:"pointer",
borderRadius:8,
textDecoration:"none",
color:theme.text,
display:"flex",
justifyContent:"space-between",
alignItems:"center",
background:active ? theme.hover : "transparent"
};
}

function subitem(theme){
return{
display:"block",
padding:"8px 10px",
opacity:0.85,
cursor:"pointer",
textDecoration:"none",
color:theme.text
};
}

const dropdownItem={
padding:"8px 10px",
cursor:"pointer",
borderRadius:6
};
