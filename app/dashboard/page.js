"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);
  const [title,setTitle]=useState("");
  const [url,setUrl]=useState("");
  const [links,setLinks]=useState([]);
  const [username,setUsername]=useState("");

  useEffect(()=>{
    async function loadSession(){
      const { data: { session } } = await supabase.auth.getSession();

      if(session?.user){
        setUser(session.user);
        loadLinks(session.user.id);

        // get username
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", session.user.id)
          .single();

        if(profile) setUsername(profile.username);
      }

      setLoading(false);
    }

    loadSession();
  },[]);

  async function loadLinks(uid){
    const { data } = await supabase
      .from("links")
      .select("*")
      .eq("user_id", uid)
      .order("created_at",{ascending:false});

    if(data) setLinks(data);
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

    if(!error){
      setTitle("");
      setUrl("");
      loadLinks(user.id);
    }
  }

  if(loading){
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
      <p style={{opacity:0.6}}>{user?.email}</p>

      {username && (
        <p style={{marginTop:10,opacity:0.7}}>
          Your public page:  
          <br/>
          <b>linkarsha-next.vercel.app/{username}</b>
        </p>
      )}

      <h3 style={{marginTop:40}}>Add new link</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        style={{display:"block",marginTop:10,padding:12,width:300,background:"#111",border:"1px solid #222",color:"white"}}
      />

      <input
        placeholder="URL"
        value={url}
        onChange={(e)=>setUrl(e.target.value)}
        style={{display:"block",marginTop:10,padding:12,width:300,background:"#111",border:"1px solid #222",color:"white"}}
      />

      <button 
        onClick={addLink}
        style={{marginTop:15,padding:12,background:"white",color:"black"}}
      >
        Add Link
      </button>

      <h3 style={{marginTop:50}}>Your Links</h3>

      {links.map(link=>(
        <div key={link.id} style={{
          background:"#111",
          padding:15,
          marginTop:10,
          borderRadius:10
        }}>
          <b>{link.title}</b>
          <div style={{opacity:0.6,fontSize:14}}>{link.url}</div>
        </div>
      ))}
    </div>
  );
}
