"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  function handleContinue() {
    if (!username) return;
    router.push(`/signup?username=${username}`);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0b0b12",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      
      <h1 style={{
        fontSize: "48px",
        fontWeight: "700",
        marginBottom: "20px",
        letterSpacing: "-1px"
      }}>
        Claim your Linkarsha
      </h1>

      <p style={{
        color: "#888",
        marginBottom: "40px",
        fontSize: "18px"
      }}>
        linkarsha.vercel.app/
      </p>

      <div style={{
        display: "flex",
        gap: "10px"
      }}>
        <input
          placeholder="yourname"
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
          style={{
            padding: "14px 16px",
            background: "#111",
            border: "1px solid #222",
            borderRadius: "10px",
            color: "white",
            width: "220px",
            fontSize: "16px"
          }}
        />

        <button
          onClick={handleContinue}
          style={{
            padding: "14px 20px",
            background: "white",
            color: "black",
            border: "none",
            borderRadius: "10px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Continue
        </button>
      </div>

    </div>
  );
}
