"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [user,setUser]=useState(null);
  const [username,setUsername]=useState("");
  const [msg,setMsg]=useState("");

  // load session safely
  useEffect(()=>{
    loadUser();
  },[]);

  async function loadUser(){
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  }

  async function saveUsername(){
    if(!username || !user) return;

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
    return (
      <div style={{
        minHeight:"100vh",
        background:"#0b0b12",
        color:"white",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
      }}>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div style={{
      minHeight:"100vh",
      background:"#0b0b12",
      color:"white",
      padding:40,
      fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"
    }}>
      <h1>Welcome to Linkarsha 🚀</h1>
      <p style={{opacity:0.7}}>{user.email}</p>

      <p style={{marginTop:30}}>Choose your username</p>

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
          color:"white",
          borderRadius:8
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
          borderRadius:8,
          fontWeight:"600",
          cursor:"pointer"
        }}
      >
        Save username
      </button>

      <p style={{marginTop:20}}>{msg}</p>
    </div>
  );
}
