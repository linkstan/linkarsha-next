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

  async function deleteLink(id){
    await supabase.from("links").delete().eq("id",id);
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
        <div className="profile-block">
          <div className="avatar"/>
          <div className="username">@{profile?.username}</div>
        </div>

        <div className="divider"/>

        <div className="menu">
          <div className="menu-item active">My Linkarsh</div>
          <div className="menu-item">Analytics</div>
          <div className="menu-item">Tools</div>
          <div className="menu-item">Get Verified</div>
        </div>

        <div className="divider"/>

        <div className="menu">
          <div className="menu-item">Referrals</div>
          <div className="menu-item">Settings</div>
          <div className="menu-item logout" onClick={signout}>Logout</div>
        </div>
      </div>

      {/* CENTER */}
      <div className="center">

        <div className="profile-header">
          <div className="avatar large"/>
          <h2>@{profile?.username}</h2>
          <p className="email">{user?.email}</p>

          <div className="public-url">
            🔗 linkarsha-next.vercel.app/{profile?.username}
          </div>
        </div>

        <div className="card">
          <h3>Add link</h3>

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
        </div>

        <div className="card">
          <h3>Your links</h3>

          {links.map(l=>(
            <div key={l.id} className="link-card">
              <span>{l.title}</span>
              <button
                onClick={()=>deleteLink(l.id)}
                className="delete-btn"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* PHONE PREVIEW */}
      <div className="preview">
        <div className="phone">
          <div className="phone-header">
            @{profile?.username}
          </div>

          {links.map(l=>(
            <div key={l.id} className="phone-link">
              {l.title}
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE NAV WITH REAL SVG ICONS */}
      <div className="mobile-nav">

        <div className="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M3 12l9-9 9 9"/>
            <path d="M9 21V9h6v12"/>
          </svg>
        </div>

        <div className="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M3 3v18h18"/>
            <path d="M7 13l4-4 4 4 4-6"/>
          </svg>
        </div>

        <div className="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </div>

        <div className="nav-item logout-icon" onClick={signout}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#ff4d4d" strokeWidth="2">
            <path d="M16 17l5-5-5-5"/>
            <path d="M21 12H9"/>
          </svg>
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

        .profile-block{
          text-align:center;
        }

        .avatar{
          width:60px;
          height:60px;
          border-radius:50%;
          background:#1c1c25;
          margin:0 auto 10px auto;
        }

        .avatar.large{
          width:90px;
          height:90px;
        }

        .username{
          font-weight:600;
        }

        .divider{
          height:1px;
          background:#1c1c25;
          margin:20px 0;
        }

        .menu-item{
          margin:12px 0;
          cursor:pointer;
          opacity:0.8;
          transition:0.2s;
        }

        .menu-item:hover{
          opacity:1;
          transform:translateX(4px);
        }

        .menu-item.active{
          font-weight:600;
          opacity:1;
        }

        .logout{
          color:#ff4d4d;
        }

        .center{
          flex:1;
          padding:40px;
          max-width:700px;
          margin:0 auto;
        }

        .profile-header{
          text-align:center;
          margin-bottom:40px;
        }

        .email{
          opacity:0.6;
        }

        .public-url{
          margin-top:10px;
          background:#111;
          padding:8px 14px;
          border-radius:8px;
          display:inline-block;
          font-size:14px;
          opacity:0.8;
        }

        .card{
          background:#111;
          padding:25px;
          border-radius:16px;
          margin-bottom:30px;
          transition:0.3s;
        }

        .card:hover{
          transform:translateY(-3px);
          box-shadow:0 10px 25px rgba(0,0,0,0.4);
        }

        .input{
          width:100%;
          padding:12px;
          margin-top:10px;
          background:#0f0f15;
          border:1px solid #222;
          color:white;
          border-radius:8px;
        }

        .primary-btn{
          margin-top:15px;
          padding:12px;
          background:white;
          color:black;
          width:100%;
          border-radius:8px;
          font-weight:600;
          transition:0.2s;
        }

        .primary-btn:hover{
          transform:translateY(-2px);
        }

        .link-card{
          background:#0f0f15;
          padding:12px;
          border-radius:10px;
          margin-top:10px;
          display:flex;
          justify-content:space-between;
          align-items:center;
        }

        .delete-btn{
          background:none;
          border:none;
          color:#ff4d4d;
          cursor:pointer;
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

        .phone-header{
          text-align:center;
          margin-bottom:20px;
          font-weight:600;
        }

        .phone-link{
          background:#1a1a25;
          padding:12px;
          border-radius:10px;
          margin-top:10px;
          text-align:center;
        }

        .mobile-nav{
          position:fixed;
          bottom:0;
          left:0;
          right:0;
          background:#111;
          display:flex;
          justify-content:space-around;
          padding:14px 0;
          border-top:1px solid #1c1c25;
        }

        .nav-item{
          width:28px;
          height:28px;
          display:flex;
          align-items:center;
          justify-content:center;
          opacity:0.8;
          transition:0.2s;
        }

        .nav-item:hover{
          opacity:1;
          transform:translateY(-2px);
        }

        @media(min-width:1024px){
          .sidebar{ display:block; }
          .preview{ display:block; }
          .mobile-nav{ display:none; }
        }
      `}</style>

    </div>
  );
}
