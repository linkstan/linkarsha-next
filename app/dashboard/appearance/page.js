"use client";

import { useState,useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default function Appearance(){

const [editor,setEditor] = useState("main");
const [theme,setTheme] = useState("Minimal");
const [appearanceSettings,setAppearanceSettings] = useState({});

async function saveAppearance(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

await supabase
.from("profiles")
.update({
theme:theme,
profile_settings:appearanceSettings
})
.eq("id",session.user.id);

alert("Changes saved");

}
const themePreview={

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

Ocean:"linear-gradient(45deg,#2193b0,#6dd5ed)",
Sunset:"linear-gradient(45deg,#ff7a18,#ffb347)",
Neon:"linear-gradient(45deg,#00f2fe,#7c5cff)",
Pastel:"linear-gradient(45deg,#fbc2eb,#a6c1ee)",
"Gradient Flow":"linear-gradient(45deg,#667eea,#764ba2)",

Luxury:"#000000",
"Gold Night":"linear-gradient(45deg,#000000,#434343)",
Royal:"linear-gradient(45deg,#141e30,#243b55)",
Tech:"linear-gradient(45deg,#00c6ff,#0072ff)",
Elegant:"linear-gradient(45deg,#bdc3c7,#2c3e50)",

"Creator Pro":"linear-gradient(45deg,#ff9966,#ff5e62)",
Vivid:"linear-gradient(45deg,#f83600,#f9d423)",
Energy:"linear-gradient(45deg,#f953c6,#b91d73)",
Skyline:"linear-gradient(45deg,#4facfe,#00f2fe)",
Dream:"linear-gradient(45deg,#a18cd1,#fbc2eb)"

};

useEffect(()=>{
loadTheme();
},[]);

async function loadTheme(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const {data}=await supabase
.from("profiles")
.select("theme")
.eq("id",session.user.id)
.single();

if(data?.theme){
setTheme(data.theme);

/* send live preview update */
window.dispatchEvent(
new CustomEvent("theme-change",{detail:data.theme})
);

}

}

useEffect(()=>{

function handleThemeChange(e){
setTheme(e.detail);
}

window.addEventListener("theme-change",handleThemeChange);

return ()=>{
window.removeEventListener("theme-change",handleThemeChange);
};

},[]);

/* CARD STYLE */

const card={
background:"var(--card)",
padding:"18px",
borderRadius:"16px",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
marginBottom:"14px",
cursor:"pointer",
border:"1px solid var(--border)",
color:"var(--text)"
};

/* CIRCLE ARROW */

const arrow={
width:36,
height:36,
borderRadius:"50%",
border:"1px solid var(--border)",
display:"flex",
alignItems:"center",
justifyContent:"center",
background:"var(--bg)"
};

const inputRow={
background:"var(--card)",
border:"1px solid var(--border)",
borderRadius:"30px",
padding:"14px 18px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"22px",
color:"var(--text)"
};

if(editor==="main"){

return(

<div style={{
padding:"20px",
background:"var(--bg)",
minHeight:"100vh",
color:"var(--text)"
}}>

<div style={{maxWidth:650}}>

<h2 style={{marginBottom:15}}>Theme</h2>

<Link
href="/dashboard/appearance/themes"
style={{
textDecoration:"none",
color:"var(--text)"
}}
>

<div style={{
background:"var(--card)",
padding:"20px",
borderRadius:"18px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"25px",
border:"1px solid var(--border)",
cursor:"pointer"
}}>

<div style={{display:"flex",alignItems:"center",gap:15}}>

<div style={{
width:55,
height:55,
borderRadius:"12px",
background:themePreview[theme] || "#fff",
border:"1px solid var(--border)"
}}/>

<div>{theme}</div>

</div>

<div style={arrow}>→</div>

</div>

</Link>

<h3 style={{
fontSize:"20px",
fontWeight:"600",
marginTop:"30px",
marginBottom:"10px"
}}>
Customize theme
</h3>

{/* HEADER */}

<Link
href="/dashboard/appearance/header"
style={{
textDecoration:"none",
color:"var(--text)"
}}
>

<div style={card}>

<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{width:36,height:36,borderRadius:"50%",background:"#888"}}/>
<div>Header</div>
</div>

<div style={arrow}>→</div>

</div>

</Link>

{/* BUTTONS */}

<Link
href="/dashboard/appearance/buttons"
style={{
textDecoration:"none",
color:"var(--text)"
}}
>

<div style={card}>

<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{
width:38,
height:18,
border:"2px solid var(--text)",
borderRadius:"6px"
}}/>
<div>Buttons</div>
</div>

<div style={arrow}>→</div>

</div>

</Link>

{/* TEXT */}

<div style={card} onClick={()=>setEditor("text")}>

<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{fontSize:20}}>Aa</div>
<div>Text</div>
</div>

<div style={arrow}>→</div>

</div>

{/* WALLPAPER */}

<Link href="/dashboard/appearance/wallpaper" style={{textDecoration:"none"}}>

<div style={card}>

<div style={{display:"flex",alignItems:"center",gap:12}}>

<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<rect x="3" y="3" width="18" height="18" rx="3"/>
<circle cx="8" cy="8" r="2"/>
<path d="M21 15l-5-5L5 21"/>
</svg>

<div>Wallpaper</div>

</div>

<div style={arrow}>→</div>

</div>

</Link>

{/* LINK PREVIEW IMAGE */}

<div
style={card}
onClick={async ()=>{

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const {data} = await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

const settings = data?.profile_settings || {};
const seo = settings.seo || {};

const current = seo.showPreviewImage !== false;
seo.showPreviewImage = !current;

settings.seo = seo;

await supabase
.from("profiles")
.update({profile_settings:settings})
.eq("id",session.user.id);

alert(seo.showPreviewImage
? "Preview image enabled"
: "Preview image disabled");

}}
>

<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{fontSize:20}}>🔗</div>
<div>Link Preview Image</div>
</div>

<div style={arrow}>→</div>

</div>

{/* COLORS */}

<div style={card} onClick={()=>setEditor("colors")}>

<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{
width:30,
height:30,
background:"var(--bg)",
borderRadius:"6px",
border:"1px solid var(--border)"
}}/>
<div>Colors</div>
</div>

<div style={arrow}>→</div>

</div>

</div>

<button
onClick={saveAppearance}
style={{
position:"fixed",
right:30,
bottom:30,
padding:"12px 22px",
borderRadius:"30px",
border:"none",
background:"#22c55e",
color:"#fff",
fontWeight:600,
cursor:"pointer",
boxShadow:"0 10px 30px rgba(0,0,0,.25)"
}}
>
Save Changes
</button>

</div>

);

}

/* TEXT */

if(editor==="text"){

return(

<div style={{padding:20,maxWidth:650}}>

<div
onClick={()=>setEditor("main")}
style={{
display:"flex",
alignItems:"center",
gap:10,
cursor:"pointer",
marginBottom:20
}}
>

<div style={arrow}>←</div>
<div>Text</div>

</div>

<h3>Font</h3>

<select style={{padding:10,marginTop:10}}>
<option>Inter</option>
<option>Montserrat</option>
<option>Poppins</option>
<option>Roboto</option>
</select>

<h3 style={{marginTop:25}}>Text Color</h3>

<div style={inputRow}>
<div>#FFFFFF</div>
<div style={arrow}>→</div>
</div>

</div>

);

}

/* COLORS */

if(editor==="colors"){

return(

<div style={{padding:20,maxWidth:650}}>

<div
onClick={()=>setEditor("main")}
style={{
display:"flex",
alignItems:"center",
gap:10,
cursor:"pointer",
marginBottom:20
}}
>

<div style={arrow}>←</div>
<div>Colors</div>

</div>

<h3>Buttons</h3>
<div style={inputRow}><div>#FFFFFF</div><div style={arrow}>→</div></div>

<h3>Button Text</h3>
<div style={inputRow}><div>#000000</div><div style={arrow}>→</div></div>

<h3>Page Text</h3>
<div style={inputRow}><div>#FFFFFF</div><div style={arrow}>→</div></div>

<h3>Title Text</h3>
<div style={inputRow}><div>#FFFFFF</div><div style={arrow}>→</div></div>

</div>

);

}

}
