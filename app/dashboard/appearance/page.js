"use client";

import Link from "next/link";
import { useEffect,useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Appearance(){

const [theme,setTheme]=useState("Minimal");

/* THEME PREVIEW COLORS */

const themePreview={
Minimal:"#ffffff",
Midnight:"#0b0b12",
Ocean:"linear-gradient(45deg,#2193b0,#6dd5ed)",
Sunset:"linear-gradient(45deg,#ff7a18,#ffb347)",
Neon:"linear-gradient(45deg,#00f2fe,#7c5cff)",
Luxury:"#000000",
Pastel:"linear-gradient(45deg,#fbc2eb,#a6c1ee)",
Mono:"#111111"
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
}

}

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
cursor:"pointer",
color:"var(--text)"
}}>

<div style={{display:"flex",alignItems:"center",gap:15}}>

<div style={{
width:55,
height:55,
borderRadius:"12px",
background:themePreview[theme] || "#ffffff",
border:"1px solid var(--border)"
}}></div>

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

<Link href="/dashboard/appearance/header" style={{textDecoration:"none"}}>
<div style={card}>

<div style={{display:"flex",alignItems:"center",gap:12}}>

<div style={{
width:36,
height:36,
borderRadius:"50%",
background:"#888"
}}></div>

<div>Header</div>

</div>

<div style={{opacity:.6}}>Classic →</div>

</div>
</Link>

{/* WALLPAPER */}

<Link href="/dashboard/appearance/wallpaper" style={{textDecoration:"none"}}>
<div style={card}>

<div style={{display:"flex",alignItems:"center",gap:12}}>

<div style={{
width:36,
height:36,
borderRadius:"10px",
background:"linear-gradient(45deg,#ff7a18,#ffd000)"
}}></div>

<div>Wallpaper</div>

</div>

<div style={{opacity:.6}}>Gradient →</div>

</div>
</Link>

{/* BUTTONS */}

<Link href="/dashboard/appearance/buttons" style={{textDecoration:"none"}}>
<div style={card}>

<div style={{display:"flex",alignItems:"center",gap:12}}>

<div style={{
width:38,
height:18,
border:"2px solid var(--text)",
borderRadius:"6px"
}}></div>

<div>Buttons</div>

</div>

<div style={{opacity:.6}}>Outline →</div>

</div>
</Link>

{/* TEXT */}

<Link href="/dashboard/appearance/text" style={{textDecoration:"none"}}>
<div style={card}>

<div style={{display:"flex",alignItems:"center",gap:12}}>

<div style={{fontSize:20}}>Aa</div>

<div>Text</div>

</div>

<div style={{opacity:.6}}>Summer Glow →</div>

</div>
</Link>

{/* COLORS */}

<Link href="/dashboard/appearance/colors" style={{textDecoration:"none"}}>
<div style={card}>

<div style={{display:"flex",alignItems:"center",gap:12}}>

<div style={{
width:30,
height:30,
background:"var(--bg)",
borderRadius:"6px",
border:"1px solid var(--border)"
}}></div>

<div>Colors</div>

</div>

<div>→</div>

</div>
</Link>

</div>

</div>

);

}
