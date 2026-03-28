"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Login(){

const [login,setLogin]=useState("");
const [password,setPassword]=useState("");
const [msg,setMsg]=useState("");
const router = useRouter();

async function handleLogin(){

let emailToUse = login;

/* allow login using username */

if(!login.includes("@")){

const { data: userRow } = await supabase
.from("profiles")
.select("email")
.eq("username", login)
.maybeSingle();

if(!userRow){
setMsg("Invalid credentials");
return;
}

emailToUse = userRow.email;

}

const { data, error } = await supabase.auth.signInWithPassword({
email: emailToUse,
password
});

if(error){
setMsg("Invalid credentials");
return;
}

const user = data.user;

/* ensure profile exists */

const { data: profile } = await supabase
.from("profiles")
.select("id")
.eq("id", user.id)
.maybeSingle();

if(!profile){

const usernameFromEmail = emailToUse.split("@")[0];

await supabase.from("profiles").insert({
id:user.id,
email:user.email,
username:usernameFromEmail
});

}

router.push("/dashboard");

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

<h1 style={{fontSize:40,fontWeight:700}}>Welcome Back!</h1>

<p style={{color:"#aaa",marginTop:6}}>
Log in to your Linkarsh
</p>

<input
placeholder="Email or Username"
value={login}
onChange={(e)=>setLogin(e.target.value)}
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

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{
marginTop:12,
padding:14,
width:300,
background:"#111",
border:"1px solid #222",
borderRadius:10,
color:"white"
}}
/>

<button
onClick={handleLogin}
style={{
marginTop:20,
padding:14,
width:300,
background:"white",
color:"black",
borderRadius:10,
fontWeight:600,
cursor:"pointer"
}}
>
Log in
</button>

<div style={{marginTop:14}}>
<a
href="/forgot-password"
style={{
color:"#aaa",
textDecoration:"underline",
fontSize:14
}}
>
Forgot Password
</a>
</div>

<p style={{marginTop:20,color:"#aaa"}}>{msg}</p>

</div>
);
}
