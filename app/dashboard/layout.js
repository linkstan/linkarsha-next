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

useEffect(()=>{
if(pathname.startsWith("/dashboard/links")) setOpenLinkarsha(true);
if(pathname.startsWith("/dashboard/tools")) setOpenTools(true);
},[pathname]);

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
onClick={()=>setOpenLinkarsha(!openLinkarsha)}
style={{
...item,
background: pathname.startsWith("/dashboard/links") ? "var(--hover)" : "transparent"
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

<Link href="/dashboard/link-history" style={subitem}>
Link History
</Link>

<Link href="/dashboard/get-verified" style={subitem}>
Get Verified
</Link>

</div>

)}

<Link href="/dashboard/blocks" style={{
...item,
background: pathname.startsWith("/dashboard/blocks") ? "var(--hover)" : "transparent"
}}>
Blocks
</Link>

<Link href="/dashboard/appearance" style={{
...item,
background: pathname.startsWith("/dashboard/appearance") ? "var(--hover)" : "transparent"
}}>
Appearance
</Link>

<Link href="/dashboard/analytics" style={{
...item,
background: pathname.startsWith("/dashboard/analytics") ? "var(--hover)" : "transparent"
}}>
Analytics
</Link>

<hr style={{margin:"20px 0",borderColor:"var(--border)"}}/>

<div
onClick={()=>setOpenTools(!openTools)}
style={{
...item,
background: pathname.startsWith("/dashboard/tools") ? "var(--hover)" : "transparent"
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

{/* PROFILE LINK BOX */}

{profile && pathname === "/dashboard" && (

<div style={{
marginTop:30,
display:"flex",
border:"1px solid var(--border)",
borderRadius:12,
overflow:"hidden",
background:"var(--card)",
maxWidth:420
}}>

<div style={{
padding:"12px 16px",
flex:1,
color:"var(--text)"
}}>
linkarsha-next.vercel.app/{profile.username}
</div>

<button style={{
padding:"12px 18px",
border:"none",
background:"#5cc06a",
color:"#000",
cursor:"pointer"
}}>
Copy
</button>

</div>

)}

</div>

{/* PHONE PREVIEW */}

{showPreview && (

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
color:"white"
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
