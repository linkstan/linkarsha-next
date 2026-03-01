"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [msg,setMsg]=useState("");

  async function handleLogin(){
    if(!email || !password){
      setMsg("Enter email & password");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email:email,
      password:password
    });

    if(error){
      setMsg("Wrong login details");
    } else {
      window.location.href="/dashboard";
    }
  }

  return (
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
      <h1>Login to Linkarsha</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        style={{
          marginTop:20,
          padding:12,
          width:280,
          background:"#111",
          border:"1px solid #222",
          color:"white"
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        style={{
          marginTop:10,
          padding:12,
          width:280,
          background:"#111",
          border:"1px solid #222",
          color:"white"
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          marginTop:20,
          padding:12,
          width:280,
          background:"white",
          color:"black",
          fontWeight:"600"
        }}
      >
        Login
      </button>

      <p style={{marginTop:20,color:"#aaa"}}>{msg}</p>
    </div>
  );
}
