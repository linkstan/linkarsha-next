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

/* ---------------- AUTO OPEN MENUS ---------------- */

useEffect(()=>{

if(pathname.startsWith("/dashboard/links")){
setOpenLinkarsha(true);
}

if(pathname.startsWith("/dashboard/tools")){
setOpenTools(true);
}

},[pathname]);

/* ---------------- LOAD USER ---------------- */

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

/* theme */

const savedMode = prof?.theme_mode || "light";
setMode(savedMode);

if(savedMode==="dark"){
document.documentElement.classList.add("dark");
}else{
document.documentElement.classList.remove("dark");
}

/* blocks */

const {data:blockData} = await supabase
.from("blocks")
.select("*")
.eq("user_id",uid)
.eq("type","link")
.order("position",{ascending:true});

setBlocks(blockData || []);

}

/* ---------------- THEME TOGGLE ---------------- */

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

/* ---------------- LOGOUT ---------------- */

async function logout(){
await supabase.auth.signOut();
window.location="/login";
}

/* ---------------- HELPERS ---------------- */

function active(path){
return pathname.startsWith(path);
}

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

{/* USER DROPDOWN */}

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

{/* HOME */}

<Link href="/dashboard" style={{
...item,
background: pathname === "/dashboard" ? "var(--hover)" : "transparent"
}}>
Home
</Link>

{/* MY LINKARSHA */}

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

<Link href="/dashboard/links" style={{
...subitem,
background: pathname === "/dashboard/links" ? "var(--hover)" : "transparent"
}}>
My Links
</Link>

<Link href="/dashboard/link-history" style={{
...subitem,
background: active("/dashboard/link-history") ? "var(--hover)" : "transparent"
}}>
Link History
</Link>

<Link href="/dashboard/get-verified" style={{
...subitem,
background: active("/dashboard/get-verified") ? "var(--hover)" : "transparent"
}}>
Get Verified
</Link>

</div>

)}

{/* BLOCKS */}

<Link href="/dashboard/blocks" style={{
...item,
background: active("/dashboard/blocks") ? "var(--hover)" : "transparent"
}}>
Blocks
</Link>

{/* APPEARANCE */}

<Link href="/dashboard/appearance" style={{
...item,
background: active("/dashboard/appearance") ? "var(--hover)" : "transparent"
}}>
Appearance
</Link>

{/* ANALYTICS */}

<Link href="/dashboard/analytics" style={{
...item,
background: active("/dashboard/analytics") ? "var(--hover)" : "transparent"
}}>
Analytics
</Link>

<hr style={{margin:"20px 0",borderColor:"var(--border)"}}/>

{/* TOOLS */}

<div
onClick={()=>{
setOpenTools(!openTools);
setOpenLinkarsha(false);
}}
style={{
...item,
background: active("/dashboard/tools") ? "var(--hover)" : "transparent"
}}
>
<span>Tools</span>
<span>{openTools ? "v" : ">"}</span>
</div>

{openTools && (

<div style={submenu}>

<Link href="/dashboard/tools/ai-bio-generator" style={subitem}>
AI Bio Generator
</Link>

<Link href="/dashboard/tools/qr-code" style={subitem}>
QR Code Generator
</Link>

<Link href="/dashboard/tools/export-data" style={subitem}>
Export Data
</Link>

</div>

)}

<Link href="/dashboard/referrals" style={item}>
Referrals
</Link>

<Link href="/dashboard/settings" style={item}>
Settings
</Link>

</div>

{/* MAIN AREA */}

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
