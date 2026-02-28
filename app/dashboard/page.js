"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [user,setUser]=useState(null);
  const [username,setUsername]=useState("");
  const [msg,setMsg]=useState("");

  useEffect(()=>{
    getUser();
  },[]);

  async function getUser(){
    const {data:{user}} = await supabase.auth.getUser();
    if(!user) return;

    setUser(user);

    // check profile exists
    const {data:profile} = await supabase
      .from("profiles")
      .select("*")
      .eq("id",user.id)
      .single();

    if(!profile){
      // create profile first time
      await supabase.from("profiles").insert({
        id:user.id,
        email:user.email,
      });
    } else {
      setUsername(profile.username || "");
    }
  }

  async function saveUsername(){
    if(!username) return;

    const {error} = await supabase
      .from("profiles")
      .update({username})
      .eq("id",user.id);

    if(error) setMsg(error.message);
    else setMsg("Username saved ✔");
  }

  return (
    <div style={{
      minHeight:"100vh",
      background:"#0b0b12",
      color:"white",
      padding:"40px"
    }}>
      <h1>Dashboard</h1>

      <p>Your email: {user?.email}</p>

      <br/>

      <input
        placeholder="choose username"
        value={username}
        onChange={(e)=>setUsername(e.target.value.toLowerCase())}
        style={{padding:12,width:260,color:"black"}}
      />

      <button onClick={saveUsername} style={{padding:12,marginLeft:10}}>
        Save username
      </button>

      <p>{msg}</p>

      <br/><br/>
      <p>
        Your public page:<br/>
        👉 linkarsha-next.vercel.app/{username}
      </p>
    </div>
  );
}
