"use client";

import { useState,useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function Themes(){

const [selected,setSelected]=useState(null);

const themes=[
{name:"Minimal",bg:"#ffffff"},
{name:"Midnight",bg:"#0b0b12"},
{name:"Ocean",bg:"linear-gradient(45deg,#2193b0,#6dd5ed)"},
{name:"Sunset",bg:"linear-gradient(45deg,#ff7a18,#ffb347)"},
{name:"Neon",bg:"linear-gradient(45deg,#00f2fe,#7c5cff)"},
{name:"Luxury",bg:"#000000"},
{name:"Pastel",bg:"linear-gradient(45deg,#fbc2eb,#a6c1ee)"},
{name:"Mono",bg:"#111"},
];

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
setSelected(data.theme);
}

}

async function applyTheme(name){

setSelected(name);

const {data:{session}} = await supabase.auth.getSession();

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
style={{
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

<div style={{marginBottom:10}}>
{t.name}
</div>

<button
onClick={()=>applyTheme(t.name)}
style={{
width:"100%",
background:selected===t.name ? "#00d26a" : "#222",
border:"none",
padding:"8px",
borderRadius:6,
color:"white",
cursor:"pointer"
}}
>
{selected===t.name ? "Applied" : "Apply"}
</button>

</div>

))}

</div>

</div>

);

}
