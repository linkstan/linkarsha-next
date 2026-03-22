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
const [theme,setTheme] = useState("Minimal");

const showPreview =
pathname === "/dashboard" ||
pathname.startsWith("/dashboard/links") ||
pathname.startsWith("/dashboard/blocks") ||
pathname.startsWith("/dashboard/appearance");

/* THEME ENGINE */

const themes={

Minimal:{bg:"#ffffff",text:"#111",btn:"#e9e9e9"},
Paper:{bg:"#fafafa",text:"#111",btn:"#ececec"},
Clean:{bg:"#f4f4f4",text:"#111",btn:"#eaeaea"},
"Soft White":{bg:"#fdfdfd",text:"#111",btn:"#ececec"},
"Creator Light":{bg:"#ffffff",text:"#111",btn:"#ededed"},

Midnight:{bg:"#0b0b12",text:"#fff",btn:"#1a1a25"},
"Dark Pro":{bg:"#121212",text:"#fff",btn:"#1d1d1d"},
Mono:{bg:"#111111",text:"#fff",btn:"#1f1f1f"},
Obsidian:{bg:"#0f0f10",text:"#fff",btn:"#1b1b1b"},
"Creator Dark":{bg:"#141414",text:"#fff",btn:"#1d1d1d"},

Ocean:{bg:"linear-gradient(135deg,#2193b0,#6dd5ed)",text:"#fff",btn:"rgba(0,0,0,.25)"},
Sunset:{bg:"linear-gradient(135deg,#ff7a18,#ffb347)",text:"#fff",btn:"rgba(0,0,0,.25)"},
Neon:{bg:"linear-gradient(135deg,#00f2fe,#7c5cff)",text:"#fff",btn:"rgba(0,0,0,.25)"},
Pastel:{bg:"linear-gradient(135deg,#fbc2eb,#a6c1ee)",text:"#111",btn:"rgba(255,255,255,.6)"},
"Gradient Flow":{bg:"linear-gradient(135deg,#667eea,#764ba2)",text:"#fff",btn:"rgba(0,0,0,.25)"},

Luxury:{bg:"#000000",text:"#d4af37",btn:"#111"},
"Gold Night":{bg:"linear-gradient(135deg,#000,#434343)",text:"#d4af37",btn:"#222"},
Royal:{bg:"linear-gradient(135deg,#141e30,#243b55)",text:"#fff",btn:"rgba(255,255,255,.2)"},
Tech:{bg:"linear-gradient(135deg,#00c6ff,#0072ff)",text:"#fff",btn:"rgba(0,0,0,.2)"},
Elegant:{bg:"linear-gradient(135deg,#bdc3c7,#2c3e50)",text:"#fff",btn:"rgba(0,0,0,.25)"},

"Creator Pro":{bg:"linear-gradient(135deg,#ff9966,#ff5e62)",text:"#fff",btn:"rgba(0,0,0,.2)"},
Vivid:{bg:"linear-gradient(135deg,#f83600,#f9d423)",text:"#fff",btn:"rgba(0,0,0,.2)"},
Energy:{bg:"linear-gradient(135deg,#f953c6,#b91d73)",text:"#fff",btn:"rgba(0,0,0,.2)"},
Skyline:{bg:"linear-gradient(135deg,#4facfe,#00f2fe)",text:"#fff",btn:"rgba(0,0,0,.2)"},
Dream:{bg:"linear-gradient(135deg,#a18cd1,#fbc2eb)",text:"#111",btn:"rgba(255,255,255,.6)"}

};

/* AUTO OPEN MENUS */

useEffect(()=>{

if(pathname.startsWith("/dashboard/links")){
setOpenLinkarsha(true);
}

if(pathname.startsWith("/dashboard/tools")){
setOpenTools(true);
}

},[pathname]);

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
setTheme(prof?.theme || "Minimal");

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

/* LIVE THEME UPDATE */

useEffect(()=>{

function updateTheme(e){
setTheme(e.detail);
}

window.addEventListener("theme-change",updateTheme);

return ()=>window.removeEventListener("theme-change",updateTheme);

},[]);

/* TOGGLE DARK MODE */

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

function active(path){
return pathname.startsWith(path);
}

const activeTheme=themes[theme] || themes.Minimal;

return(

<div style={{
display:"flex",
minHeight:"100vh",
background:"var(--bg)",
color:"var(--text)",
fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"
}}>

{/* SIDEBAR */}
{/* (unchanged sidebar code) */}

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
background:activeTheme.bg,
color:activeTheme.text,
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
src={profile.avatar || "/default-avatar.png"}
style={{width:"100%",height:"100%",objectFit:"cover"}}
/>

</div>

<div style={{
marginTop:10,
textAlign:"center",
fontWeight:600
}}>
{profile.display_name}
</div>

<div style={{
textAlign:"center",
opacity:0.7,
fontSize:14
}}>
{profile.bio}
</div>

{blocks.map(block=>(

<a
key={block.id}
href={block.data_json?.url}
target="_blank"
style={{
display:"flex",
alignItems:"center",
background:activeTheme.btn,
padding:12,
borderRadius:10,
marginTop:10,
textDecoration:"none",
color:activeTheme.text
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
