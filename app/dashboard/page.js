"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [user,setUser]=useState(null);
  const [username,setUsername]=useState("");
  const [msg,setMsg]=useState("");
  const [title,setTitle]=useState("");
  const [url,setUrl]=useState("");
  const [links,setLinks]=useState([]);

  useEffect(()=>{
    loadUser();
  },[]);

  async function loadUser(){
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if(user) loadLinks(user.id);
  }

  async function loadLinks(uid){
    const { data } = await supabase
      .from("links")
      .select("")
      .eq("user_id", uid)
      .order("created_at",{ascending:false});

    if(data) setLinks(data);
  }

  async function saveUsername(){
    if(!username || !user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ username: username })
      .eq("id", user.id);

    if(error) setMsg(error.message);
    else setMsg("Username saved 🎉");
  }

  async function addLink(){
    if(!title || !url || !user) return;

    const { error } = await supabase
      .from("links")
      .insert({
        user_id:user.id,
        title:title,
        url:url
      });

    if(error){
      setMsg(error.message);
    }else{
      setTitle("");
      setUrl("");
      loadLinks(user.id);
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
      <h1>Creator Dashboard 🚀</h1>
      <p style={{opacity:0.7}}>{user.email}</p>

      {/ USERNAME /}
      <h3 style={{marginTop:30}}>Choose username</h3>
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
      <button onClick={saveUsername} style={{marginTop:10,padding:10}}>
        Save username
      </button>

      {/ ADD LINK /}
      <h3 style={{marginTop:50}}>Add new link</h3>

      <input
        placeholder="Title (Instagram)"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        style={{
          display:"block",
          marginTop:10,
          padding:12,
          width:300,
          background:"#111",
          border:"1px solid #222",
          color:"white"
        }}
      />

      <input
        placeholder="URL"
        value={url}
        onChange={(e)=>setUrl(e.target.value)}
        style={{
          display:"block",
          marginTop:10,
          padding:12,
          width:300,
          background:"#111",
          border:"1px solid #222",
          color:"white"
        }}
      />

      <button
        onClick={addLink}
        style={{
          marginTop:15,
          padding:12,
          background:"white",
          color:"black",
          border:"none",
          borderRadius:8,
          fontWeight:"600"
        }}
      >
        Add Link
      </button>

      {/ SHOW LINKS */}
      <h3 style={{marginTop:50}}>Your Links</h3>

      {links.map(link=>(
        <div key={link.id} style={{
          background:"#111",
          padding:15,
          marginTop:10,
          borderRadius:10
        }}>
          <b>{link.title}</b>
          <div style={{opacity:0.6,fontSize:14}}>
            {link.url}
          </div>
        </div>
      ))}

      <p style={{marginTop:20}}>{msg}</p>
    </div>
  );
}
