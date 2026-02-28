"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const router = useRouter();
  const [user,setUser]=useState(null);
  const [username,setUsername]=useState("");
  const [msg,setMsg]=useState("");

  useEffect(()=>{
    checkUser();
  },[]);

  async function checkUser(){
    const { data: { user } } = await supabase.auth.getUser();

    if(!user){
      router.push("/signup");
    }else{
      setUser(user);
    }
  }

  async function saveUsername(){
    if(!username) return;

    const { error } = await supabase
      .from("profiles")
      .update({ username: username })
      .eq("id", user.id);

    if(error){
      setMsg(error.message);
    }else{
      setMsg("Username saved 🎉");
    }
  }

  if(!user){
    return <div style={{color:"white",padding:40}}>Loading...</div>;
  }

  return (
    <div style={{
      minHeight:"100vh",
      background:"#0b0b12",
      color:"white",
      padding:40
    }}>
      <h1>Welcome to dashboard</h1>

      <p style={{marginTop:20}}>Choose your username</p>

      <input
        placeholder="username"
        value={username}
        onChange={(e)=>setUsername(e.target.value.toLowerCase())}
        style={{
          padding:12,
          marginTop:10,
          width:260,
          background:"#111",
          border:"1px solid #222",
          color:"white"
        }}
      />

      <br/>

      <button
        onClick={saveUsername}
        style={{
          marginTop:20,
          padding:12,
          background:"white",
          color:"black",
          border:"none",
          borderRadius:8
        }}
      >
        Save username
      </button>

      <p>{msg}</p>
    </div>
  );
}
