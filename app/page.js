"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username,setUsername] = useState("");
  const router = useRouter();

  function handleClaim(){
    if(!username) return;
    router.push(`/signup?username=${username}`);
  }

  function goLogin(){
    router.push("/login");
  }

  return (
    <div style={{
      minHeight:"100vh",
      background:"#0b0b12",
      color:"white",
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
      fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"
    }}>

      <h1 style={{fontSize:48,fontWeight:700}}>
        Claim your Linkarsha
      </h1>

      <div style={{marginTop:30,display:"flex",gap:10}}>
        <input
          placeholder="yourname"
          value={username}
          onChange={(e)=>setUsername(e.target.value.toLowerCase())}
          style={{
            padding:14,
            width:220,
            background:"#111",
            border:"1px solid #222",
            color:"white",
            borderRadius:10
          }}
        />

        <button
          onClick={handleClaim}
          style={{
            padding:14,
            background:"white",
            color:"black",
            borderRadius:10,
            fontWeight:600
          }}
        >
          Get Started
        </button>
      </div>

      <button
        onClick={goLogin}
        style={{
          marginTop:25,
          background:"transparent",
          color:"#aaa",
          border:"none",
          cursor:"pointer"
        }}
      >
        Sign In
      </button>

    </div>
  );
}
