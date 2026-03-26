"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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

const [liveTheme,setLiveTheme] = useState(null);
const [appearance,setAppearance] = useState({});

const showPreview =
pathname === "/dashboard" ||
pathname.startsWith("/dashboard/links") ||
pathname.startsWith("/dashboard/blocks") ||
pathname.startsWith("/dashboard/appearance");

useEffect(()=>{

if(pathname.startsWith("/dashboard/links")){
setOpenLinkarsha(true);
}

if(pathname.startsWith("/dashboard/tools")){
setOpenTools(true);
}

},[pathname]);

/* LIVE THEME */

useEffect(()=>{

function handleThemeChange(e){
setLiveTheme(e.detail);
}

window.addEventListener("theme-change",handleThemeChange);

return ()=>{
window.removeEventListener("theme-change",handleThemeChange);
};

},[]);

/* LIVE APPEARANCE */

useEffect(()=>{

function handleAppearance(e){

const data = e.detail || {};

setAppearance(prev => ({
...prev,
header: data.header ?? prev.header,
buttons: data.buttons ?? prev.buttons
}));

if(data.avatar !== undefined){
setProfile(prev => ({
...prev,
avatar: data.avatar
}));
}

}

window.addEventListener("appearance-update",handleAppearance);

return ()=>{
window.removeEventListener("appearance-update",handleAppearance);
};

},[]);

/* LOAD USER */

useEffect(()=>{
loadPreview();
},[]);

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

setAppearance(prof?.profile_settings || {});

const savedMode = prof?.theme_mode || "light";
setMode(savedMode);

if(savedMode==="dark"){
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

/* THEME SWITCH */

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

async function logout(){
await supabase.auth.signOut();
window.location="/login";
}

const theme = liveTheme || profile?.theme;
const header = appearance?.header || {};
const buttons = appearance?.buttons || {};
const themeMap={

Minimal:"#ffffff",
Paper:"#fafafa",
Clean:"#f4f4f4",
"Soft White":"#fdfdfd",
"Creator Light":"#ffffff",

Midnight:"#0b0b12",
"Dark Pro":"#121212",
Mono:"#111111",
Obsidian:"#0f0f10",
"Creator Dark":"#141414",

Ocean:"linear-gradient(135deg,#2193b0,#6dd5ed)",
Sunset:"linear-gradient(135deg,#ff7a18,#ffb347)",
Neon:"linear-gradient(135deg,#00f2fe,#7c5cff)",
Pastel:"linear-gradient(135deg,#fbc2eb,#a6c1ee)",
"Gradient Flow":"linear-gradient(135deg,#667eea,#764ba2)",

Luxury:"#000000",
"Gold Night":"linear-gradient(135deg,#000000,#434343)",
Royal:"linear-gradient(135deg,#141e30,#243b55)",
Tech:"linear-gradient(135deg,#00c6ff,#0072ff)",
Elegant:"linear-gradient(135deg,#bdc3c7,#2c3e50)",

"Creator Pro":"linear-gradient(135deg,#ff9966,#ff5e62)",
Vivid:"linear-gradient(135deg,#f83600,#f9d423)",
Energy:"linear-gradient(135deg,#f953c6,#b91d73)",
Skyline:"linear-gradient(135deg,#4facfe,#00f2fe)",
Dream:"linear-gradient(135deg,#a18cd1,#fbc2eb)"

};

return(

<div style={{
display:"flex",
minHeight:"100vh",
background:"var(--bg)",
color:"var(--text)",
fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"
}}>

{/* SIDEBAR */}

<div style={{
width:260,
background:"var(--sidebar)",
padding:20,
display:"flex",
flexDirection:"column",
borderRight:"1px solid var(--border)"
}}>

<h2 style={{marginBottom:15}}>Linkarsha</h2>

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

<div style={{opacity:0.7}}>
{openUser ? "v" : ">"}
</div>

</div>

{openUser && (

<div style={{
background:"var(--card)",
borderRadius:8,
padding:10,
marginBottom:20,
border:"1px solid var(--border)"
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

<Link href="/dashboard" style={item}>Home</Link>

<div
onClick={()=>setOpenLinkarsha(!openLinkarsha)}
style={item}
>
<span>My Linkarsha</span>
<span>{openLinkarsha ? "v" : ">"}</span>
</div>

{openLinkarsha && (

<div style={submenu}>
<Link href="/dashboard/links" style={subitem}>My Links</Link>
<Link href="/dashboard/link-history" style={subitem}>Link History</Link>
<Link href="/dashboard/get-verified" style={subitem}>Get Verified</Link>
</div>

)}

<Link href="/dashboard/blocks" style={item}>Blocks</Link>
<Link href="/dashboard/appearance" style={item}>Appearance</Link>
<Link href="/dashboard/analytics" style={item}>Analytics</Link>

<hr style={{margin:"20px 0"}}/>

<div
onClick={()=>setOpenTools(!openTools)}
style={item}
>
<span>Tools</span>
<span>{openTools ? "v" : ">"}</span>
</div>

{openTools && (

<div style={submenu}>
<Link href="/dashboard/tools/ai-bio-generator" style={subitem}>AI Bio Generator</Link>
<Link href="/dashboard/tools/qr-code" style={subitem}>QR Code Generator</Link>
<Link href="/dashboard/tools/export-data" style={subitem}>Export Data</Link>
</div>

)}

<Link href="/dashboard/referrals" style={item}>Referrals</Link>
<Link href="/dashboard/settings" style={item}>Settings</Link>

</div>

{/* MAIN */}

<div style={{flex:1,display:"flex"}}>

<div style={{flex:1,padding:40,position:"relative"}}>

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

{/* PHONE PREVIEW */}

{showPreview && profile && (

<div style={{
width:360,
display:"flex",
justifyContent:"center",
alignItems:"center",
borderLeft:"1px solid var(--border)"
}}>

<div style={{
width:280,
height:520,
background:"#000",
borderRadius:30,
padding:18
}}>

<div
key={JSON.stringify(buttons)}
style={{
width:"100%",
height:"100%",
background: themeMap[theme] || "#0b0b12",
borderRadius:20,
overflow:"auto",
color:"#fff"
}}
>

{header.layout==="hero" ? (

<div style={{
height:200,
position:"relative",
overflow:"hidden"
}}>

<div style={{
position:"absolute",
top:0,
left:0,
right:0,
bottom:0,
backgroundImage:`url(${profile?.avatar})`,
backgroundSize:"cover",
backgroundPosition:"center"
}}/>

<div style={{
position:"absolute",
left:0,
right:0,
bottom:0,
height:120,
background:"linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)"
}}/>

</div>

) : (

<div style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
marginTop:20
}}>

<div style={{
width:70,
height:70,
borderRadius:"50%",
overflow:"hidden"
}}>
<img
src={profile?.avatar}
style={{width:"100%",height:"100%",objectFit:"cover"}}
/>
</div>

</div>

)}

<div style={{
textAlign:"center",
marginTop:10,
position:"relative"
}}>

{header.showDisplayName !== false && (
<div style={{
fontFamily: header.displayFont || "Poppins",
fontSize: header.displaySize || 22,
transform: header.layout==="hero"
? `translate(${header.displayAlign?.x||0}px, ${header.displayAlign?.y||0}px)`
: "none"
}}>
{profile?.display_name}
</div>
)}

{header.showUsername !== false && (
<div style={{
fontFamily: header.usernameFont || "Roboto",
fontSize: header.usernameSize || 14,
transform: header.layout==="hero"
? `translate(${header.usernameAlign?.x||0}px, ${header.usernameAlign?.y||0}px)`
: "none"
}}>
@{profile?.username}
</div>
)}

{header.showBio !== false && (
<div style={{
fontFamily: header.bioFont || "Lora",
fontSize: header.bioSize || 15
}}>
{profile?.bio}
</div>
)}

</div>

<div style={{padding:20}}>

{blocks.map(block=>(

<a
key={block.id}
href={block.data_json?.url}
target="_blank"

onMouseEnter={(e)=>{
if(buttons.hoverEffect){
e.currentTarget.style.transform = `translateY(-${buttons.useDefaultMotion ? 4 : buttons.motionStrength}px)`;
}
}}

onMouseLeave={(e)=>{
e.currentTarget.style.transform = "translateY(0)";
}}

onMouseDown={(e)=>{
if(buttons.pressEffect){
e.currentTarget.style.transform =
buttons.depthEffect
? `translateY(${buttons.useDefaultMotion ? 3 : Math.max(1,buttons.motionStrength-1)}px) scale(0.97)`
: "scale(0.95)";
}
}}

onMouseUp={(e)=>{
if(buttons.pressEffect){
e.currentTarget.style.transform = "translateY(0) scale(1)";
}
}}

onTouchStart={(e)=>{
if(buttons.pressEffect){
e.currentTarget.style.transform =
buttons.depthEffect
? `translateY(${buttons.useDefaultMotion ? 3 : Math.max(1,buttons.motionStrength-1)}px) scale(0.97)`
: "scale(0.95)";
}
}}

onTouchEnd={(e)=>{
if(buttons.pressEffect){
e.currentTarget.style.transform = "translateY(0) scale(1)";
}
}}

style={{
display:"block",
padding:12,
marginTop:10,
textDecoration:"none",
transform:"translateY(0)",

background:
buttons.style==="outline"
? "transparent"
: buttons.style==="glass"
? "rgba(255,255,255,0.12)"
: (buttons.colorMode==="theme"
? "rgba(0,0,0,.35)"
: buttons.color),

border:
buttons.style==="outline"
? "1px solid rgba(255,255,255,.6)"
: buttons.style==="glass"
? "1px solid rgba(255,255,255,.25)"
: "none",

backdropFilter:
buttons.style==="glass"
? "blur(12px)"
: "none",

borderRadius:
buttons.radius==="square"?4:
buttons.radius==="round"?10:
buttons.radius==="rounder"?18:999,

color:
buttons.textMode==="theme"
? "#ffffff"
: buttons.textColor,

boxShadow:
buttons.shadowLift
? "0 10px 25px rgba(0,0,0,0.25)"
: buttons.depthEffect
? "0 6px 0 rgba(0,0,0,0.35)"
: "none",

transition:"transform .15s ease, box-shadow .2s ease"
}}
>
{block.data_json?.title}
</a>

))}

</div>

</div>

</div>

</div>

)}

</div>

</div>

);

}

const item={
padding:"10px 12px",
cursor:"pointer",
borderRadius:10,
textDecoration:"none",
color:"var(--text)",
display:"flex",
justifyContent:"space-between",
alignItems:"center"
};

const submenu={
marginLeft:10,
marginTop:5,
marginBottom:10
};

const subitem={
display:"block",
padding:"8px 10px",
opacity:0.85,
cursor:"pointer",
textDecoration:"none",
color:"var(--text)"
};

const dropdownItem={
padding:"8px 10px",
cursor:"pointer",
borderRadius:6
};
