"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const params = useSearchParams();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [username,setUsername]=useState("");
  const [msg,setMsg]=useState("");

  // if came from homepage with username
  useEffect(()=>{
    const u = params.get("username");
    if(u) setUsername(u);
  },[]);

  // 🔵 CHECK USERNAME LIVE
  async function checkUsername(u){
    if(!u) return;

    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("username",u)
      .single();

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
      email,
      password,
      options:{
        emailRedirectTo:"https://linkarsha-next.vercel.app/login"
      }
    });

    if(error){
      setMsg(error.message);
      return;
    }

    // create profile row
    const user = data.user;
    if(user){
      await supabase.from("profiles").insert({
        id:user.id,
        email:email,
        username:username
      });
    }

    setMsg("📩 Check email → confirm → then LOGIN");
  }

  // 🟢 LOGIN BUTTON
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
        placeholder="Username"
        value={username}
        onChange={(e)=>{
          setUsername(e.target.value);
          checkUsername(e.target.value);
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
