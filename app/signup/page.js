"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Signup() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [username,setUsername]=useState("");
  const [msg,setMsg]=useState("");

  // 🔵 SIGNUP
  async function handleSignup(){
    if(!email || !password || !username){
      setMsg("Fill all fields");
      return;
    }

    // check username availability
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .single();

    if(existing){
      setMsg("Username already taken");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options:{
        emailRedirectTo:"https://linkarsha-next.vercel.app/login"
      }
    });

    if(error){
      setMsg(error.message);
      return;
    }

    setMsg("📩 Check your email to confirm, then login.");
  }

  // 🟢 LOGIN
  async function handleLogin(){
    if(!email || !password){
      setMsg("Enter email & password");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if(error){
      setMsg(error.message);
      return;
    }

    const user = data.user;

    // check profile exists
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    // if not exists → create profile
    if(!profile){
      await supabase.from("profiles").insert({
        id: user.id,
        email: user.email,
        username: username
      });
    }

    window.location.href="/dashboard";
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
      <h1>Create account</h1>

      <input 
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        style={{marginTop:20,padding:12,width:280,background:"#111",border:"1px solid #222",color:"white"}}
      />

      <input 
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        style={{marginTop:10,padding:12,width:280,background:"#111",border:"1px solid #222",color:"white"}}
      />

      <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        style={{marginTop:10,padding:12,width:280,background:"#111",border:"1px solid #222",color:"white"}}
      />

      {/* SIGNUP */}
      <button 
        onClick={handleSignup}
        style={{marginTop:20,padding:12,background:"white",color:"black",width:280}}
      >
        Create account
      </button>

      {/* LOGIN */}
      <button 
        onClick={handleLogin}
        style={{marginTop:10,padding:12,background:"#222",color:"white",width:280}}
      >
        Already confirmed? Login
      </button>

      <p style={{marginTop:20,color:"#aaa"}}>{msg}</p>
    </div>
  );
}
