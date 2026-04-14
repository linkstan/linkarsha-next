"use client";

import { useState,useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Themes(){

const router = useRouter();

const [selected,setSelected]=useState(null);
const [loading,setLoading]=useState(false);

const themes=[

{name:"Minimal",category:"Light",bg:"#ffffff"},
{name:"Paper",category:"Light",bg:"#fafafa"},
{name:"Clean",category:"Light",bg:"#f4f4f4"},
{name:"Soft White",category:"Light",bg:"#fdfdfd"},
{name:"Creator Light",category:"Light",bg:"#ffffff"},

{name:"Midnight",category:"Dark",bg:"#0b0b12"},
{name:"Dark Pro",category:"Dark",bg:"#121212"},
{name:"Mono",category:"Dark",bg:"#111111"},
{name:"Obsidian",category:"Dark",bg:"#0f0f10"},
{name:"Creator Dark",category:"Dark",bg:"#141414"},

{name:"Ocean",category:"Gradient",bg:"linear-gradient(45deg,#2193b0,#6dd5ed)"},
{name:"Sunset",category:"Gradient",bg:"linear-gradient(45deg,#ff7a18,#ffb347)"},
{name:"Neon",category:"Gradient",bg:"linear-gradient(45deg,#00f2fe,#7c5cff)"},
{name:"Pastel",category:"Gradient",bg:"linear-gradient(45deg,#fbc2eb,#a6c1ee)"},
{name:"Gradient Flow",category:"Gradient",bg:"linear-gradient(45deg,#667eea,#764ba2)"},

{name:"Luxury",category:"Premium",bg:"#000000"},
{name:"Gold Night",category:"Premium",bg:"linear-gradient(45deg,#000000,#434343)"},
{name:"Royal",category:"Premium",bg:"linear-gradient(45deg,#141e30,#243b55)"},
{name:"Tech",category:"Premium",bg:"linear-gradient(45deg,#00c6ff,#0072ff)"},
{name:"Elegant",category:"Premium",bg:"linear-gradient(45deg,#bdc3c7,#2c3e50)"},

{name:"Creator Pro",category:"Creator",bg:"linear-gradient(45deg,#ff9966,#ff5e62)"},
{name:"Vivid",category:"Creator",bg:"linear-gradient(45deg,#f83600,#f9d423)"},
{name:"Energy",category:"Creator",bg:"linear-gradient(45deg,#f953c6,#b91d73)"},
{name:"Skyline",category:"Creator",bg:"linear-gradient(45deg,#4facfe,#00f2fe)"},
{name:"Dream",category:"Creator",bg:"linear-gradient(45deg,#a18cd1,#fbc2eb)"}

];

useEffect(()=>{
loadTheme();
},[]);

async function loadTheme(){

const {data:{session}}=await supabase.auth.getSession();
if(!session) return;

const {data}=await supabase
.from("profiles")
.select("theme")
.eq("id",session.user.id)
.single();

if(data?.theme){
setSelected(data.theme);
}

}

async function applyTheme(name){

/* 1 — instant preview */
setSelected(name);

window.dispatchEvent(
new CustomEvent("theme-change",{detail:name})
);

/* 2 — save to database */

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

await supabase
.from("profiles")
.update({theme:name})
.eq("id",session.user.id);

}

return(

<div style={{
padding:"30px",
background:"var(--bg)",
minHeight:"100vh",
color:"var(--text)"
}}>

{/* HEADER */}

<div style={{
display:"flex",
alignItems:"center",
gap:12,
marginBottom:25
}}>

<div
onClick={()=>router.back()}
style={{
width:36,
height:36,
borderRadius:"50%",
border:"1px solid var(--border)",
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer"
}}
>
←
</div>

<h2>Select Theme</h2>

</div>

{/* GRID */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"20px",
maxWidth:900
}}>

{themes.map((t,i)=>(

<div
key={i}
style={{
border:selected===t.name
? "2px solid #00d26a"
: "1px solid var(--border)",
borderRadius:14,
padding:14,
background:"var(--card)",
transition:"all .25s ease"
}}

>

<div style={{
height:90,
borderRadius:10,
background:t.bg,
marginBottom:10
}}/>

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}>

<div>{t.name}</div>

{selected===t.name && (
<div style={{
width:8,
height:8,
borderRadius:"50%",
background:"#00d26a"
}}/>
)}

</div>

<div style={{
fontSize:11,
opacity:.6,
marginTop:6
}}>
{t.category}
</div>

<button
onClick={()=>applyTheme(t.name)}
style={{
marginTop:10,
width:"100%",
padding:"8px",
borderRadius:8,
border:"none",
background:selected===t.name ? "#00d26a" : "#333",
color:"#fff",
cursor:"pointer"
}}
>

{loading && selected===t.name
? "Applying..."
: selected===t.name
? "Applied"
: "Apply Theme"}

</button>

</div>

))}

</div>

</div>

);

}
