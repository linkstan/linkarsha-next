"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatorSetup(){

const router = useRouter();

const [step,setStep] = useState(1);
const [theme,setTheme] = useState("");

function continueStep(){

if(step===1 && !theme){
alert("Select a theme");
return;
}

setStep(step+1);

}

return(

<div style={{
minHeight:"100vh",
background:"#0b0b12",
color:"white",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"
}}>

<h1 style={{marginBottom:30}}>
Creator Setup
</h1>

{step===1 && (

<div style={{textAlign:"center"}}>

<h2>Select a Theme</h2>

<div style={{
marginTop:30,
display:"grid",
gridTemplateColumns:"repeat(3,120px)",
gap:20
}}>

<div
onClick={()=>setTheme("dark")}
style={{
height:180,
borderRadius:20,
cursor:"pointer",
background:"#111",
border:theme==="dark"?"2px solid #00d26a":"1px solid #333"
}}
></div>

<div
onClick={()=>setTheme("gradient")}
style={{
height:180,
borderRadius:20,
cursor:"pointer",
background:"linear-gradient(180deg,#4f46e5,#9333ea)",
border:theme==="gradient"?"2px solid #00d26a":"1px solid #333"
}}
></div>

<div
onClick={()=>setTheme("light")}
style={{
height:180,
borderRadius:20,
cursor:"pointer",
background:"#ddd",
border:theme==="light"?"2px solid #00d26a":"1px solid #333"
}}
></div>

</div>

<button
onClick={continueStep}
style={{
marginTop:40,
padding:"14px 40px",
borderRadius:10,
border:"none",
background:theme?"#00d26a":"#333",
color:"white",
fontWeight:600,
cursor:theme?"pointer":"not-allowed",
opacity:theme?1:0.6
}}
>

Continue

</button>

</div>

)}

{step===2 && (

<div style={{textAlign:"center"}}>

<h2>Select Platform</h2>

<p style={{opacity:0.6}}>
Platform selection coming next step
</p>

</div>

)}

</div>

);

}
