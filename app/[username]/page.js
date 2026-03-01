import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function PublicProfile({ params }) {
  const username = params.username;

  // get profile
  const { data: profile } = await supabase
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

  // get links
  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at",{ascending:true});

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
      
      <h1 style={{fontSize:"42px"}}>
        @{profile.username}
      </h1>

      <p style={{opacity:0.7, marginTop:10}}>
        Welcome to Linkarsha 🚀
      </p>

      <div style={{marginTop:40,width:320}}>
        {links?.map(link=>(
          <a 
            key={link.id}
            href={link.url}
            target="_blank"
            style={{
              display:"block",
              background:"#111",
              padding:"16px",
              marginTop:"12px",
              borderRadius:"12px",
              textAlign:"center",
              textDecoration:"none",
              color:"white",
              fontWeight:"600"
            }}
          >
            {link.title}
          </a>
        ))}
      </div>

    </div>
  );
}
