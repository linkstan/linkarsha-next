import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://kgsunydafbgnivstjhcs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnc3VueWRhZmJnbml2c3RqaGNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNzk3MTEsImV4cCI6MjA4Nzc1NTcxMX0.oTvJcbbsnXPdSq0wc7rSyjJIezCZUxTz1Xe6FoC6ybs"
);

export default async function UserPage({ params }) {
  const username = params.username;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!data) {
    return (
      <div style={{
        minHeight:"100vh",
        background:"#0b0b12",
        color:"white",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        fontSize:24
      }}>
        User not found
      </div>
    );
  }

  return (
    <div style={{
      minHeight:"100vh",
      background:"#0b0b12",
      color:"white",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"column",
      fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"
    }}>
      <h1 style={{fontSize:42}}>@{data.username}</h1>
      <p style={{opacity:0.7}}>Linkarsha public page</p>
    </div>
  );
}
