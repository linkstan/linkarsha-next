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

  useEffect(()=>{ load(); },[]);

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
    <div className="dashboard-wrapper">

      {/* SIDEBAR */}
      <div className="sidebar">
        <div style={{marginBottom:30}}>
          <div style={{
            width:60,height:60,borderRadius:"50%",
            background:"#222",marginBottom:10
          }} />
          <strong>@{profile?.username}</strong>
        </div>

        <hr style={{opacity:0.2}}/>

        <div className="menu">
          <div>My Linkarsh</div>
          <div>Analytics</div>
          <div>Tools</div>
          <div>Get Verified</div>
        </div>

        <hr style={{opacity:0.2,marginTop:20}}/>

        <div className="menu">
          <div>Referrals</div>
          <div>Settings</div>
          <div style={{cursor:"pointer"}} onClick={signout}>Logout</div>
        </div>
      </div>

      {/* CENTER */}
      <div className="center">

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
          className="input"
        />

        <input
          placeholder="URL"
          value={url}
          onChange={(e)=>setUrl(e.target.value)}
          className="input"
        />

        <button onClick={addLink} className="primary-btn">
          Add
        </button>

        <h3 style={{marginTop:40}}>Your links</h3>

        {links.map(l=>(
          <div key={l.id} className="link-card">
            {l.title}
          </div>
        ))}
      </div>

      {/* PREVIEW */}
      <div className="preview">
        <div className="phone">
          <h3 style={{textAlign:"center"}}>@{profile?.username}</h3>

          {links.map(l=>(
            <div key={l.id} className="phone-link">
              {l.title}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .dashboard-wrapper{
          display:flex;
          min-height:100vh;
          background:#0b0b12;
          color:white;
          font-family:-apple-system,BlinkMacSystemFont,sans-serif;
        }

        .sidebar{
          width:260px;
          padding:30px;
          border-right:1px solid #1c1c25;
          display:none;
        }

        .menu div{
          margin-top:12px;
          cursor:pointer;
        }

        .center{
          flex:1;
          padding:40px;
          max-width:600px;
          margin:0 auto;
        }

        .input{
          width:100%;
          padding:12px;
          margin-top:10px;
          background:#111;
          border:1px solid #222;
          color:white;
        }

        .primary-btn{
          margin-top:15px;
          padding:12px;
          background:white;
          color:black;
          width:100%;
        }

        .link-card{
          background:#111;
          padding:15px;
          border-radius:10px;
          margin-top:10px;
        }

        .preview{
          width:350px;
          padding:40px;
          border-left:1px solid #1c1c25;
          display:none;
        }

        .phone{
          width:260px;
          height:520px;
          border-radius:30px;
          background:#111;
          margin:0 auto;
          padding:20px;
          overflow-y:auto;
        }

        .phone-link{
          background:#1a1a25;
          padding:12px;
          border-radius:10px;
          margin-top:10px;
          text-align:center;
        }

        @media(min-width:1024px){
          .sidebar{ display:block; }
          .preview{ display:block; }
        }
      `}</style>

    </div>
  );
}
