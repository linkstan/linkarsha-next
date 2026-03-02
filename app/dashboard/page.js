"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard(){
  const [user,setUser]=useState(null);
  const [username,setUsername]=useState("");
  const [links,setLinks]=useState([]);
  const [title,setTitle]=useState("");
  const [url,setUrl]=useState("");
  const router = useRouter();

  useEffect(()=>{
    loadUser();
  },[]);

  async function loadUser(){
    const { data:{session} } = await supabase.auth.getSession();

    if(!session){
      router.push("/login");
      return;
    }

    setUser(session.user);

    // ✅ get username from profiles table
    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", session.user.id)
      .single();

    if(profile){
      setUsername(profile.username);
    }

    loadLinks(session.user.id);
  }

  async function loadLinks(uid){
    const { data } = await supabase
      .from("links")
      .select("*")
      .eq("user_id", uid)
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

  // ✅ SIGN OUT
  async function handleLogout(){
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div style={{
      minHeight:"100vh",
      background:"#0b0b12",
      color:"white",
      padding:40
    }}>
      <h1>Dashboard</h1>

      {username && (
        <p style={{opacity:0.6}}>
          Public page: linkarsha-next.vercel.app/{username}
        </p>
      )}

      <button
        onClick={handleLogout}
        style={{
          marginTop:10,
          padding:8,
          background:"#222",
          color:"white",
          border:"1px solid #333"
        }}
      >
        Sign Out
      </button>

      <h3 style={{marginTop:30}}>Add Link</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        style={{marginTop:10,padding:12,width:300,background:"#111",border:"1px solid #222",color:"white"}}
      />

      <input
        placeholder="URL"
        value={url}
        onChange={(e)=>setUrl(e.target.value)}
        style={{marginTop:10,padding:12,width:300,background:"#111",border:"1px solid #222",color:"white"}}
      />

      <button
        onClick={addLink}
        style={{marginTop:15,padding:12,background:"white",color:"black"}}
      >
        Add
      </button>

      <h3 style={{marginTop:40}}>Your Links</h3>

      {links.map(link=>(
        <div key={link.id} style={{marginTop:10}}>
          {link.title}
        </div>
      ))}
    </div>
  );
}
