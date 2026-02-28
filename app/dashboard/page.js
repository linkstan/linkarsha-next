"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [user,setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({data})=>{
      setUser(data.user);
    });
  },[]);

  if(!user){
    return (
      <div style={{color:"white",background:"#0b0b12",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
        Checking login...
      </div>
    );
  }

  return (
    <div style={{color:"white",background:"#0b0b12",height:"100vh",padding:40}}>
      <h1>Welcome to Linkarsha 🚀</h1>
      <p>{user.email}</p>
    </div>
  );
}
