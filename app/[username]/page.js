import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://kgsunydafbgnivstjhcs.supabase.co",
  "PASTE_ANON_KEY_HERE"
);

export default async function PublicProfile({ params }) {
  const username = params.username;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) {
    return (
      <div style={{
        minHeight:"100vh",
        background:"#0b0b12",
        color:"white",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        fontSize:"24px"
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
      flexDirection:"column"
    }}>
      <h1>@{profile.username}</h1>
      <p>Welcome to Linkarsha 🚀</p>
    </div>
  );
}
