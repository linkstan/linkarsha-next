"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function ForgotPassword(){

const [email,setEmail]=useState("");
const [msg,setMsg]=useState("");
const [seconds,setSeconds]=useState(0);

useEffect(()=>{

if(seconds===0) return;

const timer=setInterval(()=>{
setSeconds((s)=>s-1);
},1000);

return ()=>clearInterval(timer);

},[seconds]);

async function sendReset(){

if(!email){
setMsg("Please enter your email");
return;
}

const { error } = await supabase.auth.resetPasswordForEmail(email,{
redirectTo: window.location.origin + "/reset-password"
});

if(error){
setMsg("Something went wrong");
return;
}

setMsg("Reset link sent to your email");
setSeconds(300);

}

return (

<div style={{
minHeight:"100vh",
background:"#0b0b12",
color:"white",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
padding:"20px"
}}>

<h1 style={{fontSize:36,fontWeight:700}}>
Forgot your password?
</h1>

<p style={{
color:"#aaa",
marginTop:10,
maxWidth:420,
textAlign:"center",
lineHeight:1.5
}}>
Enter the email address associated with your account, and we'll email you a link to reset your password
</p>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{
marginTop:30,
padding:14,
width:300,
background:"#111",
border:"1px solid #222",
borderRadius:10,
color:"white"
}}
/>

<button
onClick={sendReset}
disabled={seconds>0}
style={{
marginTop:20,
padding:14,
width:300,
background:"white",
color:"black",
borderRadius:10,
fontWeight:600,
cursor:"pointer",
opacity:seconds>0?0.6:1
}}
>
Send reset link
</button>

{seconds>0 && (
<p style={{marginTop:16,color:"#aaa"}}>
Resend reset link in {seconds} seconds
</p>
)}

<p style={{marginTop:20,color:"#aaa"}}>{msg}</p>

</div>

);

}
