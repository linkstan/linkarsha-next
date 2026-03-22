"use client";

import { useState,useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default function Appearance(){

/* ACTIVE EDITOR PANEL */

const [editor,setEditor] = useState("main");

/* CURRENT THEME */

const [theme,setTheme] = useState("Minimal");

/* THEME PREVIEW COLORS */

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

/* LOAD USER THEME */

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
}

}

/* LIVE THEME UPDATE LISTENER */

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
borderRadius:"14px",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
marginBottom:"14px",
cursor:"pointer",
border:"1px solid var(--border)",
color:"var(--text)"
};

/* INPUT STYLE */

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

/* MAIN PANEL */

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

<Link href="/dashboard/appearance/themes" style={{textDecoration:"none"}}>

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

<div style={{opacity:.7}}>More →</div>

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

<div style={card} onClick={()=>setEditor("header")}>

<div style={{display:"flex",alignItems:"center",gap:12}}>

<div style={{
width:36,
height:36,
borderRadius:"50%",
background:"#888"
}}/>

<div>Header</div>

</div>

<div>→</div>

</div>


{/* WALLPAPER */}

<div style={card} onClick={()=>setEditor("wallpaper")}>

<div style={{display:"flex",alignItems:"center",gap:12}}>

<div style={{
width:36,
height:36,
borderRadius:"10px",
background:"linear-gradient(45deg,#ff7a18,#ffd000)"
}}/>

<div>Wallpaper</div>

</div>

<div>→</div>

</div>


{/* BUTTONS */}

<div style={card} onClick={()=>setEditor("buttons")}>

<div style={{display:"flex",alignItems:"center",gap:12}}>

<div style={{
width:38,
height:18,
border:"2px solid var(--text)",
borderRadius:"6px"
}}/>

<div>Buttons</div>

</div>

<div>→</div>

</div>


{/* TEXT */}

<div style={card} onClick={()=>setEditor("text")}>

<div style={{display:"flex",alignItems:"center",gap:12}}>

<div style={{fontSize:20}}>Aa</div>

<div>Text</div>

</div>

<div>→</div>

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

<div>→</div>

</div>

</div>

</div>

);

}


/* HEADER EDITOR */

if(editor==="header"){

return(

<div style={{padding:20,maxWidth:650}}>

<div onClick={()=>setEditor("main")} style={{cursor:"pointer",marginBottom:20}}>
← Header
</div>

<h3>Profile Image</h3>

<div style={{
width:70,
height:70,
borderRadius:"50%",
background:"#888",
marginBottom:15
}}/>

<button style={{
padding:"10px 18px",
borderRadius:"20px",
border:"1px solid var(--border)"
}}>
Upload
</button>

<h3 style={{marginTop:25}}>Layout</h3>

<button>Classic</button>
<button style={{marginLeft:10}}>Hero</button>

</div>

);

}


/* WALLPAPER EDITOR */

if(editor==="wallpaper"){

return(

<div style={{padding:20,maxWidth:650}}>

<div onClick={()=>setEditor("main")} style={{cursor:"pointer",marginBottom:20}}>
← Wallpaper
</div>

<h3>Wallpaper Style</h3>

<div style={{
display:"grid",
gridTemplateColumns:"1fr 1fr 1fr",
gap:20,
marginTop:20
}}>

<div><div style={{height:70,background:"#ccc"}}/><div>Fill</div></div>
<div><div style={{height:70,background:"linear-gradient(45deg,orange,red)"}}/><div>Gradient</div></div>
<div><div style={{height:70,background:"#444"}}/><div>Image</div></div>

</div>

</div>

);

}


/* BUTTON EDITOR */

if(editor==="buttons"){

return(

<div style={{padding:20,maxWidth:650}}>

<div onClick={()=>setEditor("main")} style={{cursor:"pointer",marginBottom:20}}>
← Buttons
</div>

<h3>Button Style</h3>

<div style={{display:"flex",gap:10,marginTop:15}}>
<button>Solid</button>
<button>Glass</button>
<button>Outline</button>
</div>

<h3 style={{marginTop:25}}>Corner Radius</h3>

<div style={{display:"flex",gap:10}}>
<button>Square</button>
<button>Round</button>
<button>Rounder</button>
<button>Full</button>
</div>

</div>

);

}


/* TEXT EDITOR */

if(editor==="text"){

return(

<div style={{padding:20,maxWidth:650}}>

<div onClick={()=>setEditor("main")} style={{cursor:"pointer",marginBottom:20}}>
← Text
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
<div>→</div>
</div>

</div>

);

}


/* COLOR EDITOR */

if(editor==="colors"){

return(

<div style={{padding:20,maxWidth:650}}>

<div onClick={()=>setEditor("main")} style={{cursor:"pointer",marginBottom:20}}>
← Colors
</div>

<h3>Buttons</h3>
<div style={inputRow}><div>#FFFFFF</div><div>→</div></div>

<h3>Button Text</h3>
<div style={inputRow}><div>#000000</div><div>→</div></div>

<h3>Page Text</h3>
<div style={inputRow}><div>#FFFFFF</div><div>→</div></div>

<h3>Title Text</h3>
<div style={inputRow}><div>#FFFFFF</div><div>→</div></div>

</div>

);

}

}
