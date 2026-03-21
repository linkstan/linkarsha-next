"use client";

import { useState } from "react";

export default function Themes(){

const themes=[
{name:"Minimal",bg:"#ffffff",text:"#111"},
{name:"Midnight",bg:"#0b0b12",text:"#ffffff"},
{name:"Ocean",bg:"linear-gradient(45deg,#2193b0,#6dd5ed)",text:"#fff"},
{name:"Sunset",bg:"linear-gradient(45deg,#ff7a18,#ffb347)",text:"#fff"},
{name:"Neon",bg:"linear-gradient(45deg,#00f2fe,#7c5cff)",text:"#fff"},
{name:"Luxury",bg:"#000000",text:"#d4af37"},
{name:"Glass",bg:"linear-gradient(45deg,#e0eafc,#cfdef3)",text:"#111"},
{name:"Pastel",bg:"linear-gradient(45deg,#fbc2eb,#a6c1ee)",text:"#111"},
{name:"Mono",bg:"#111",text:"#fff"},
{name:"Creator Pro",bg:"linear-gradient(45deg,#ff9966,#ff5e62)",text:"#fff"},
{name:"Gradient Flow",bg:"linear-gradient(45deg,#667eea,#764ba2)",text:"#fff"},
{name:"Tech",bg:"linear-gradient(45deg,#00c6ff,#0072ff)",text:"#fff"},
{name:"Elegant",bg:"linear-gradient(45deg,#bdc3c7,#2c3e50)",text:"#fff"},
{name:"Dark Pro",bg:"#121212",text:"#fff"},
{name:"Vivid",bg:"linear-gradient(45deg,#f83600,#f9d423)",text:"#fff"}
];

const [selected,setSelected]=useState(null);

return(

<div style={{
padding:"30px",
background:"var(--bg)",
minHeight:"100vh",
color:"var(--text)"
}}>

<h2 style={{marginBottom:25}}>Select Theme</h2>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",
gap:"20px",
maxWidth:900
}}>

{themes.map((t,i)=>(

<div
key={i}
onClick={()=>setSelected(t.name)}
style={{
cursor:"pointer",
border:"1px solid var(--border)",
borderRadius:14,
padding:14,
background:"var(--card)"
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

</div>

))}

</div>

</div>

);

}
