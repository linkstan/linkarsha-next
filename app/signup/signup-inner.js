"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignupInner() {

  const router = useRouter();
  const params = useSearchParams();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [username,setUsername] = useState("");
  const [msg,setMsg] = useState("");
  const [usernameAvailable,setUsernameAvailable] = useState(null); 
  const [loading,setLoading] = useState(false);

  // -----------------------------
  // USERNAME CHECK FUNCTION
  // -----------------------------
  async function checkUsername(u){
    if(!u){
      setUsernameAvailable(null);
      setMsg("");
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("username",u)
      .maybeSingle();

    if(error){
      setMsg("Error checking username");
      setUsernameAvailable(false);
      return;
    }

    if(data){
      setUsernameAvailable(false);
      setMsg("❌ Username already taken");
    } else {
      setUsernameAvailable(true);
      setMsg("✅ Username available");
    }
  }

  // -----------------------------
  // GET USERNAME FROM HOMEPAGE
  // -----------------------------
  useEffect(()=>{
    const u = params.get("username");
    if(u){
      const clean = u.toLowerCase();
      setUsername(clean);
      checkUsername(clean);
    }
  },[params]);

  // -----------------------------
  // LIVE CHECK WHEN TYPING
  // -----------------------------
  useEffect(()=>{
    const timeout = setTimeout(()=>{
      if(username){
        checkUsername(username);
      }
    },400);

    return ()=>clearTimeout(timeout);
  },[username]);

  // -----------------------------
  // SIGNUP
  // -----------------------------
  async function handleSignup(){

    if(!username || !email || !password){
      setMsg("Fill all fields");
      return;
    }

    if(usernameAvailable === false){
      setMsg("Choose another username");
      return;
    }

    if(usernameAvailable === null){
      setMsg("Checking username...");
      return;
    }

    setLoading(true);
    setMsg("Creating account...");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options:{
        emailRedirectTo:"https://linkarsha-next.vercel.app/login"
      }
    });

    if(error){
      setLoading(false);
      setMsg(error.message);
      return;
    }

    const user = data.user;

    if(user){
      const { error:profileError } = await supabase
        .from("profiles")
        .insert({
          id:user.id,
          email:email,
          username:username
        });

      if(profileError){
        setLoading(false);
        setMsg("Error saving profile");
        return;
      }
    }

    setLoading(false);
    setMsg("📩 Confirmation email sent. Check inbox & spam.");
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
        disabled={loading}
        style={{
          marginTop:20,
          padding:12,
          width:280,
          background: loading ? "#444" : "white",
          color: loading ? "#aaa" : "black",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Please wait..." : "Create account"}
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
