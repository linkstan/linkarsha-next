"use client";

import Link from "next/link";
import { useEffect,useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Appearance(){

const [theme,setTheme]=useState("Custom");

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
background:"linear-gradient(45deg,#ff7a18,#ffb347)"
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

<div style={card}>
<div>Header</div>
<div style={{opacity:.6}}>Classic →</div>
</div>

<div style={card}>
<div>Wallpaper</div>
<div style={{opacity:.6}}>Gradient →</div>
</div>

<div style={card}>
<div>Buttons</div>
<div style={{opacity:.6}}>Outline →</div>
</div>

<div style={card}>
<div>Text</div>
<div style={{opacity:.6}}>Summer Glow →</div>
</div>

<div style={card}>
<div>Colors</div>
<div>→</div>
</div>

</div>

</div>

);

}
