"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [msg,setMsg]=useState("");
  const router = useRouter();

  async function handleSignup(){
    const { error } = await supabase.auth.signUp({
      email:email,
      password:password,
      options:{
        emailRedirectTo:"https://linkarsha-next.vercel.app/dashboard"
      }
    });

    if(error){
      setMsg(error.message);
    }else{
      setMsg("Signup success. Check your email.");
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
      <h1>Create account</h1>

      <input 
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        style={{marginTop:20,padding:12,width:280,background:"#111",border:"1px solid #222",color:"white"}}
      />

      <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        style={{marginTop:10,padding:12,width:280,background:"#111",border:"1px solid #222",color:"white"}}
      />

      <button 
        onClick={handleSignup}
        style={{marginTop:20,padding:12,background:"white",color:"black"}}
      >
        Create account
      </button>

      <p style={{marginTop:20}}>{msg}</p>
    </div>
  );
}
