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

/* LIVE THEME */
const [liveTheme,setLiveTheme] = useState(null);

/* APPEARANCE SETTINGS */
const [appearance,setAppearance] = useState({});

const showPreview =
pathname === "/dashboard" ||
pathname.startsWith("/dashboard/links") ||
pathname.startsWith("/dashboard/blocks") ||
pathname.startsWith("/dashboard/appearance");

/* AUTO OPEN MENUS */

useEffect(()=>{

if(pathname.startsWith("/dashboard/links")){
setOpenLinkarsha(true);
}

if(pathname.startsWith("/dashboard/tools")){
setOpenTools(true);
}

},[pathname]);

/* LIVE THEME LISTENER */

useEffect(()=>{

function handleThemeChange(e){
setLiveTheme(e.detail);
}

window.addEventListener("theme-change",handleThemeChange);

return ()=>{
window.removeEventListener("theme-change",handleThemeChange);
};

},[]);

/* LIVE APPEARANCE LISTENER */

useEffect(()=>{

function handleAppearance(e){

setAppearance(prev=>({
...prev,
...e.detail
}));

/* NEW: LIVE AVATAR UPDATE */

if(e.detail?.avatar!==undefined){
setProfile(prev=>({
...prev,
avatar:e.detail.avatar
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

/* LOAD APPEARANCE */

setAppearance(prof?.profile_settings || {});

/* THEME MODE */

const savedMode = prof?.theme_mode || "light";
setMode(savedMode);

if(savedMode==="dark"){
document.documentElement.classList.add("dark");
}else{
document.documentElement.classList.remove("dark");
}

/* LOAD BLOCKS */

const {data:blockData} = await supabase
.from("blocks")
.select("*")
.eq("user_id",uid)
.eq("type","link")
.order("position",{ascending:true});

setBlocks(blockData || []);

}

/* TOGGLE THEME MODE */

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

/* ACTIVE HELPER */

function active(path){
return pathname.startsWith(path);
}

/* THEME USED IN PREVIEW */

const theme = liveTheme || profile?.theme;

/* HEADER SETTINGS */

const header = appearance?.header || {};

/* THEME MAP */

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

<Link href="/dashboard" style={{
...item,
background: pathname === "/dashboard" ? "var(--hover)" : "transparent"
}}>
Home
</Link>

<div
onClick={()=>{
setOpenLinkarsha(!openLinkarsha);
setOpenTools(false);
}}
style={{
...item,
background: active("/dashboard/links") ? "var(--hover)" : "transparent"
}}
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

<hr style={{margin:"20px 0",borderColor:"var(--border)"}}/>

<div
onClick={()=>{
setOpenTools(!openTools);
setOpenLinkarsha(false);
}}
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

{/* MAIN + PHONE */}

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
background:"var(--bg)",
borderLeft:"1px solid var(--border)"
}}>

<div style={{
width:280,
height:520,
background:"#000",
borderRadius:30,
padding:18,
boxShadow:"0 40px 80px rgba(0,0,0,0.5)"
}}>

<div style={{
width:"100%",
height:"100%",
background: themeMap[theme] || "#0b0b12",
borderRadius:20,
padding:20,
overflow:"auto",
color: theme === "Minimal" ? "#111" : "#fff"
}}>

{/* HEADER */}

{header.layout === "hero" ? (

<div style={{marginBottom:20}}>

<div style={{
height:120,
borderRadius:16,
background: themeMap[theme] || "#222",
marginBottom:-40
}}/>

<div style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
textAlign:"center"
}}>

<div style={{
width:80,
height:80,
borderRadius:"50%",
overflow:"hidden",
background:"#222",
border:"4px solid white"
}}>

<img
src={profile?.avatar || "/default-avatar.png"}
style={{
width:"100%",
height:"100%",
objectFit:"cover"
}}
/>

</div>

{header.showDisplayName !== false && (

<div style={{
marginTop:10,
fontFamily: header.font || "Inter",
fontWeight: header.fontWeight || 600,
fontSize: header.fontSize || 22
}}>
{profile?.display_name}
</div>

)}

{header.showUsername !== false && (

<div style={{
opacity:.7,
fontSize:14
}}>
@{profile?.username}
</div>

)}

<div style={{
marginTop:6,
opacity:.7,
fontSize:14
}}>
{profile?.bio}
</div>

</div>

</div>

) : (

<div style={{
display:"flex",
flexDirection:"column",
alignItems:
header.alignment==="left"
? "flex-start"
: header.alignment==="right"
? "flex-end"
: "center",
textAlign: header.alignment || "center",
marginBottom:20
}}>

<div style={{
width:70,
height:70,
borderRadius:"50%",
overflow:"hidden",
background:"#222",
marginBottom:10
}}>

<img
src={profile?.avatar || "/default-avatar.png"}
style={{
width:"100%",
height:"100%",
objectFit:"cover"
}}
/>

</div>

{header.showDisplayName !== false && (

<div style={{
fontFamily: header.font || "Inter",
fontWeight: header.fontWeight || 600,
fontSize: header.fontSize || 22
}}>
{profile?.display_name}
</div>

)}

{header.showUsername !== false && (

<div style={{
opacity:.7,
fontSize:14
}}>
@{profile?.username}
</div>

)}

<div style={{
marginTop:6,
opacity:.7,
fontSize:14,
maxWidth:220
}}>
{profile?.bio}
</div>

</div>

)}

{blocks.map(block=>(

<a
key={block.id}
href={block.data_json?.url}
target="_blank"
style={{
display:"flex",
alignItems:"center",
background:"rgba(0,0,0,.25)",
padding:12,
borderRadius:10,
marginTop:10,
textDecoration:"none",
color:"inherit"
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
