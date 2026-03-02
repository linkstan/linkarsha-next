"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [user,setUser]=useState(null);
  const [profile,setProfile]=useState(null);
  const [loading,setLoading]=useState(true);
  const [title,setTitle]=useState("");
  const [url,setUrl]=useState("");
  const [links,setLinks]=useState([]);

  useEffect(()=>{
    load();
  },[]);

  async function load(){
    const { data:{ session } } = await supabase.auth.getSession();

    if(!session){
      window.location.href="/login";
      return;
    }

    setUser(session.user);

    // get profile
    const { data: prof } = await supabase
      .from("profiles")
      .select("*")
      .eq("id",session.user.id)
      .single();

    setProfile(prof);

    loadLinks(session.user.id);
    setLoading(false);
  }

  async function loadLinks(uid){
    const { data } = await supabase
      .from("links")
      .select("*")
      .eq("user_id",uid)
      .order("created_at",{ascending:false});

    if(data) setLinks(data);
  }

  async function addLink(){
    if(!title || !url) return;

    await supabase.from("links").insert({
      user_id:user.id,
      title,
      url
    });

    setTitle("");
    setUrl("");
    loadLinks(user.id);
  }

  async function signout(){
    await supabase.auth.signOut();
    window.location.href="/login";
  }

  if(loading){
    return <div style={{color:"white",background:"#0b0b12",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>Loading...</div>
  }

  return (
    <div style={{background:"#0b0b12",minHeight:"100vh",color:"white",padding:40}}>
      <h1>Dashboard</h1>

      <p>@{profile?.username}</p>
      <p style={{opacity:0.6}}>{user?.email}</p>

      <p style={{marginTop:10}}>
        Public page:  
        <a href={`/${profile?.username}`} target="_blank" style={{color:"cyan"}}>
          linkarsha-next.vercel.app/{profile?.username}
        </a>
      </p>

      <button onClick={signout} style={{marginTop:10}}>Sign out</button>

      <h3 style={{marginTop:40}}>Add link</h3>

      <input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
      <input placeholder="URL" value={url} onChange={(e)=>setUrl(e.target.value)} />

      <button onClick={addLink}>Add</button>

      <h3 style={{marginTop:40}}>Your links</h3>

      {links.map(l=>(
        <div key={l.id}>{l.title}</div>
      ))}
    </div>
  );
}
