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

const [liveTheme,setLiveTheme] = useState(null);
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

setAppearance(prev=>({
...prev,
...e.detail
}));

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

function active(path){
return pathname.startsWith(path);
}

const theme = liveTheme || profile?.theme;
const header = appearance?.header || {};

/* THEME MAP */

const themeMap={

Minimal:"#ffffff",
Midnight:"#0b0b12",
Ocean:"linear-gradient(135deg,#2193b0,#6dd5ed)",
Sunset:"linear-gradient(135deg,#ff7a18,#ffb347)"

};

return(

<div style={{
display:"flex",
minHeight:"100vh",
background:"var(--bg)",
color:"var(--text)"
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

<Link href="/dashboard" style={item}>Home</Link>

<Link href="/dashboard/links" style={item}>My Links</Link>

<Link href="/dashboard/blocks" style={item}>Blocks</Link>

<Link href="/dashboard/appearance" style={item}>Appearance</Link>

<Link href="/dashboard/analytics" style={item}>Analytics</Link>

<hr style={{margin:"20px 0"}}/>

<Link href="/dashboard/referrals" style={item}>Referrals</Link>

<Link href="/dashboard/settings" style={item}>Settings</Link>

</div>

{/* MAIN */}

<div style={{flex:1,display:"flex"}}>

<div style={{flex:1,padding:40}}>

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

<div style={{
width:"100%",
height:"100%",
background: themeMap[theme] || "#0b0b12",
borderRadius:20,
overflow:"hidden",
color:"#fff"
}}>

{header.layout==="hero" ? (

<div>

<div style={{
height:160,
backgroundImage:`url(${profile.avatar})`,
backgroundSize:"cover",
backgroundPosition:"center"
}}/>

<div style={{
padding:20,
textAlign:"center"
}}>

{header.showDisplayName!==false && (
<div style={{
fontFamily:header.displayFont || "Poppins",
fontSize:header.displaySize || 22
}}>
{profile.display_name}
</div>
)}

{header.showUsername!==false && (
<div style={{
fontFamily:header.usernameFont || "Roboto",
fontSize:header.usernameSize || 14,
opacity:.7
}}>
@{profile.username}
</div>
)}

<div style={{
fontFamily:header.bioFont || "Lora",
fontSize:header.bioSize || 15,
opacity:.7
}}>
{profile.bio}
</div>

</div>

</div>

) : (

<div style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
padding:20
}}>

<div style={{
width:70,
height:70,
borderRadius:"50%",
overflow:"hidden"
}}>
<img src={profile.avatar}/>
</div>

</div>

)}

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
textDecoration:"none",
color:"var(--text)"
};
