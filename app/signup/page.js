"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Signup() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [msg,setMsg]=useState("");

  async function handleSignup(){
    const {error} = await supabase.auth.signUp({
      email:email,
      password:password,
    });

    if(error) setMsg(error.message);
    else setMsg("Signup success. Check email.");
  }

  return (
    <div style={{padding:40,color:"white",background:"#0b0b12",height:"100vh"}}>
      <h1>Create account</h1>

      <input 
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        style={{display:"block",margin:"10px 0",padding:10,width:300}}
      />

      <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        style={{display:"block",margin:"10px 0",padding:10,width:300}}
      />

      <button onClick={handleSignup} style={{padding:12}}>
        Create account
      </button>

      <p>{msg}</p>
    </div>
  );
}
