"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Setup(){

const router = useRouter();
const [role,setRole] = useState("");

function continueSetup(){

if(!role){
alert("Please select an option");
return;
}

router.push(`/setup/${role}`);

}

return(

<div style={{
minHeight:"100vh",
background:"#0b0b12",
color:"white",
display:"flex",
alignItems:"center",
justifyContent:"center",
flexDirection:"column",
fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"
}}>

<h1 style={{marginBottom:40}}>
Who are you?
</h1>

<div style={{
display:"flex",
flexDirection:"column",
gap:20,
width:340
}}>

<div
onClick={()=>setRole("creator")}
style={{
padding:20,
borderRadius:12,
border:"1px solid #222",
cursor:"pointer",
background:role==="creator"?"#151520":"#111"
}}
>

<div style={{fontSize:20,fontWeight:700}}>
Creator
</div>

<div style={{opacity:0.7,fontSize:14,marginTop:6}}>
Build following and analyze your audience to monetize.
</div>

</div>

<div
onClick={()=>setRole("business")}
style={{
padding:20,
borderRadius:12,
border:"1px solid #222",
cursor:"pointer",
background:role==="business"?"#151520":"#111"
}}
>

<div style={{fontSize:20,fontWeight:700}}>
Business
</div>

<div style={{opacity:0.7,fontSize:14,marginTop:6}}>
Grow your business and reach more customers online.
</div>

</div>

<div
onClick={()=>setRole("personal")}
style={{
padding:20,
borderRadius:12,
border:"1px solid #222",
cursor:"pointer",
background:role==="personal"?"#151520":"#111"
}}
>

<div style={{fontSize:20,fontWeight:700}}>
Personal
</div>

<div style={{opacity:0.7,fontSize:14,marginTop:6}}>
Share your important links with friends and contacts.
</div>

</div>

</div>

<button
onClick={continueSetup}
style={{
marginTop:40,
padding:"14px 40px",
borderRadius:10,
border:"none",
background:role?"#00d26a":"#333",
color:"white",
fontWeight:600,
cursor:role?"pointer":"not-allowed",
opacity:role?1:0.6
}}
>

Continue

</button>

</div>

);

}
