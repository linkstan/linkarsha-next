"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignupInner() {

  const router = useRouter();
  const params = useSearchParams();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [username,setUsername]=useState("");
  const [msg,setMsg]=useState("");

  // get username from homepage
  useEffect(()=>{
    const u = params.get("username");
    if(u) setUsername(u.toLowerCase());
  },[params]);

  // LIVE username check (instant green/red)
  useEffect(()=>{
    if(!username) return;

    const check = async()=>{
      const { data } = await supabase
        .from("profiles")
        .select("username")
        .eq("username",username)
        .maybeSingle();

      if(data){
        setMsg("❌ Username already taken");
      } else {
        setMsg("✅ Username available");
      }
    };

    const t=setTimeout(check,400);
    return ()=>clearTimeout(t);

  },[username]);

  // SIGNUP
  async function handleSignup(){
    if(!email || !password || !username){
      setMsg("Fill all fields");
      return;
    }

    setMsg("Creating account...");

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

    const user=data.user;

    // create profile row
    if(user){
      await supabase.from("profiles").insert({
        id:user.id,
        email:email,
        username:username
      });
    }

    setMsg("📩 Confirmation email sent. Check inbox then login.");
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
