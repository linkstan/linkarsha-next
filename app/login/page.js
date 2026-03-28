"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Login(){

const [login,setLogin]=useState("");
const [password,setPassword]=useState("");
const [msg,setMsg]=useState("");
const [loading,setLoading]=useState(false);

const router = useRouter();

/* auto redirect if already logged in */

useEffect(()=>{
checkSession();
},[]);

async function checkSession(){

const { data:{session} } = await supabase.auth.getSession();

if(session){
router.push("/dashboard");
}

}

async function handleLogin(){

if(loading) return;

/* prevent empty fields */

if(!login || !password){
setMsg("Enter email/username and password");
return;
}

setLoading(true);

let emailToUse = login.trim().toLowerCase();

/* allow login using username */

if(!login.includes("@")){

const { data: userRow } = await supabase
.from("profiles")
.select("email")
.eq("username", login.toLowerCase())
.maybeSingle();

if(!userRow){
setMsg("Invalid credentials");
setLoading(false);
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
setLoading(false);
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
disabled={loading}
style={{
marginTop:20,
padding:14,
width:300,
background:"white",
color:"black",
borderRadius:10,
fontWeight:600,
cursor:"pointer",
opacity:loading?0.6:1
}}
>
{loading ? "Logging in..." : "Log in"}
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
