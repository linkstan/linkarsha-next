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
    return (
      <div style={{
        background:"#0b0b12",
        color:"white",
        height:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{
      display:"flex",
      minHeight:"100vh",
      background:"#0b0b12",
      color:"white",
      fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"
    }}>

      {/* SIDEBAR (Desktop only) */}
      <div style={{
        width:260,
        padding:30,
        borderRight:"1px solid #1c1c25",
        display:"none"
      }} className="sidebar-desktop">

        <div style={{marginBottom:20}}>
          <div style={{
            width:60,
            height:60,
            borderRadius:"50%",
            background:"#222",
            marginBottom:10
          }} />
          <strong>@{profile?.username}</strong>
        </div>

        <hr style={{opacity:0.2}}/>

        <div style={{marginTop:20,lineHeight:2}}>
          <div>My Linkarsh</div>
          <div>Analytics</div>
          <div>Tools</div>
          <div>Get Verified</div>
        </div>

        <hr style={{opacity:0.2,marginTop:20}}/>

        <div style={{marginTop:20,lineHeight:2}}>
          <div>Referrals</div>
          <div>Settings</div>
          <div style={{cursor:"pointer"}} onClick={signout}>Logout</div>
        </div>

      </div>

      {/* CENTER SECTION */}
      <div style={{
        flex:1,
        padding:40,
        maxWidth:600,
        margin:"0 auto"
      }}>

        <h2>@{profile?.username}</h2>
        <p style={{opacity:0.6}}>{user?.email}</p>

        <p style={{marginTop:10}}>
          Public page:  
          <a 
            href={`/${profile?.username}`} 
            target="_blank"
            style={{color:"cyan",marginLeft:5}}
          >
            linkarsha-next.vercel.app/{profile?.username}
          </a>
        </p>

        <h3 style={{marginTop:40}}>Add link</h3>

        <input
          placeholder="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          style={{
            width:"100%",
            padding:12,
            marginTop:10,
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
            width:"100%",
            padding:12,
            marginTop:10,
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
            width:"100%"
          }}
        >
          Add
        </button>

        <h3 style={{marginTop:40}}>Your links</h3>

        {links.map(l=>(
          <div key={l.id} style={{
            background:"#111",
            padding:15,
            borderRadius:10,
            marginTop:10
          }}>
            {l.title}
          </div>
        ))}

      </div>

      {/* PHONE PREVIEW (Desktop only) */}
      <div style={{
        width:350,
        padding:40,
        borderLeft:"1px solid #1c1c25",
        display:"none"
      }} className="preview-desktop">

        <div style={{
          width:260,
          height:520,
          borderRadius:30,
          background:"#111",
          margin:"0 auto",
          padding:20,
          overflowY:"auto"
        }}>

          <h3 style={{textAlign:"center"}}>@{profile?.username}</h3>

          {links.map(l=>(
            <div key={l.id} style={{
              background:"#1a1a25",
              padding:12,
              borderRadius:10,
              marginTop:10,
              textAlign:"center"
            }}>
              {l.title}
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
