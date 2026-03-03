"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignupInner() {
  const router = useRouter();
  const params = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState("");

  // Get username from homepage query
  useEffect(() => {
    const u = params.get("username");
    if (u) setUsername(u.toLowerCase());
  }, [params]);

  // Live username check
  useEffect(() => {
    if (!username) {
      setMsg("");
      return;
    }

    const checkUsername = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .maybeSingle();

      if (data) {
        setMsg("❌ Username already taken");
      } else {
        setMsg("✅ Username available");
      }
    };

    const timer = setTimeout(checkUsername, 400);
    return () => clearTimeout(timer);
  }, [username]);

  async function handleSignup() {
    if (!username || !email || !password) {
      setMsg("Fill all fields");
      return;
    }

    setMsg("Creating account...");

    // Double check username
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (existing) {
      setMsg("❌ Username already taken");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "https://linkarsha-next.vercel.app/login",
      },
    });

    if (error) {
      setMsg(error.message);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email: email,
        username: username,
      });
    }

    setMsg("📩 Confirmation email sent. Check inbox then login.");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0b12",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "-apple-system,BlinkMacSystemFont,sans-serif",
      }}
    >
      <h1>Create account</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value.toLowerCase())}
        style={{
          marginTop: 20,
          padding: 12,
          width: 280,
          background: "#111",
          border: "1px solid #222",
          color: "white",
        }}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          marginTop: 10,
          padding: 12,
          width: 280,
          background: "#111",
          border: "1px solid #222",
          color: "white",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          marginTop: 10,
          padding: 12,
          width: 280,
          background: "#111",
          border: "1px solid #222",
          color: "white",
        }}
      />

      <button
        onClick={handleSignup}
        style={{
          marginTop: 20,
          padding: 12,
          width: 280,
          background: "white",
          color: "black",
        }}
      >
        Create account
      </button>

      <button
        onClick={() => router.push("/login")}
        style={{
          marginTop: 10,
          padding: 12,
          width: 280,
          background: "#222",
          color: "white",
        }}
      >
        Already have account? Login
      </button>

      <p style={{ marginTop: 20, color: "#aaa" }}>{msg}</p>
    </div>
  );
}
