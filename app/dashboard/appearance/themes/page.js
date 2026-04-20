"use client";

import { useState,useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Themes(){

const router = useRouter();

const [selected,setSelected]=useState(null);
const [loading,setLoading]=useState(false);

const themes=[

{name:"minimal",display:"Minimal",category:"Light",bg:"#ffffff"},

{name:"samira",display:"Samira",category:"Creator",bg:"#e9ded9"},

{name:"modernminimal",display:"Modern Minimal",category:"Modern",bg:"#efe8e1"},

{name:"archway",display:"Archway",category:"Professional",bg:"#f3efe9"}

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
gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",
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

<div>{t.display}</div>

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
