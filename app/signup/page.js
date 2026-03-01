"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Signup() {
  const params = useSearchParams();
  const router = useRouter();

  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [msg,setMsg]=useState("");

  useEffect(()=>{
    const u = params.get("username");
    if(u) setUsername(u.toLowerCase());
  },[]);

  async function handleSignup(){
    if(!username || !email || !password){
      setMsg("Fill all fields");
      return;
    }

    // check username uniqueness
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .single();

    if(existing){
      setMsg("Username not available. Choose another.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if(error){
      setMsg(error.message);
      return;
    }

    // insert profile manually
    await supabase.from("profiles").insert({
      id:data.user.id,
      email:data.user.email,
      username:username
    });

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
      fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"
    }}>

      <h1>Create Account</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value.toLowerCase())}
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

      <button
        onClick={handleSignup}
        style={{marginTop:20,padding:12,width:280,background:"white",color:"black"}}
      >
        Create Account
      </button>

      <button
        onClick={()=>router.push("/login")}
        style={{marginTop:15,background:"transparent",color:"#aaa",border:"none"}}
      >
        Already have an account? Login
      </button>

      <p style={{marginTop:20,color:"#aaa"}}>{msg}</p>

    </div>
  );
}
