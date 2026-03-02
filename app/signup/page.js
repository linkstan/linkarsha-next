"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [username,setUsername]=useState("");
  const [msg,setMsg]=useState("");

  // 🔵 CHECK USERNAME LIVE
  async function checkUsername(u){
    if(!u) return true;

    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("username",u)
      .maybeSingle();

    if(data){
      setMsg("❌ Username already taken");
      return false;
    }else{
      setMsg("✅ Username available");
      return true;
    }
  }

  // 🔵 SIGNUP
  async function handleSignup(){
    if(!email || !password || !username){
      setMsg("Fill all fields");
      return;
    }

    const ok = await checkUsername(username);
    if(!ok) return;

    const { data, error } = await supabase.auth.signUp({
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

    const user = data.user;

    // create profile row with username
    if(user){
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id:user.id,
          email:email,
          username:username
        });

      if(profileError){
        setMsg(profileError.message);
        return;
      }
    }

    setMsg("📩 Check email → confirm → then LOGIN");
  }

  function goLogin(){
    router.push("/login");
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
      fontFamily:"-apple-system"
    }}>
      <h1>Create account</h1>

      <input
        placeholder="Username (unique)"
        value={username}
        onChange={(e)=>{
          setUsername(e.target.value.toLowerCase());
          checkUsername(e.target.value.toLowerCase());
        }}
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
        Create account
      </button>

      <button
        onClick={goLogin}
        style={{marginTop:10,padding:12,width:280,background:"#222",color:"white"}}
      >
        Already have account? Login
      </button>

      <p style={{marginTop:20,color:"#aaa"}}>{msg}</p>
    </div>
  );
}
