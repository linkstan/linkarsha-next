import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://kgsunydafbgnivstjhcs.supabase.co",
  "YOUR_ANON_KEY"
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
