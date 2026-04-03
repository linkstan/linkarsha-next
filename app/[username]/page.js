import ButtonBlock from "../../components/ButtonBlock";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 60;

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function PublicProfile({ params }) {

const username = params?.username;

const { data: prof } = await supabase
.from("profiles")
.select("*")
.eq("username", username)
.single();

if (!prof) {
return (
<div style={{
minHeight:"100vh",
display:"flex",
alignItems:"center",
justifyContent:"center"
}}>
Profile not found
</div>
);
}

const profile = prof;
const appearance = profile.profile_settings || {};

const wallpaper = appearance.wallpaper || null;
const blur = appearance.wallpaperBlur || 0;
const overlay = appearance.wallpaperOverlay !== false;

const themeMap={
Minimal:"#ffffff",
Paper:"#fafafa",
Clean:"#f4f4f4",
Midnight:"#0b0b12",
"Dark Pro":"#121212",
Mono:"#111111",
Ocean:"linear-gradient(135deg,#2193b0,#6dd5ed)",
Sunset:"linear-gradient(135deg,#ff7a18,#ffb347)",
Neon:"linear-gradient(135deg,#00f2fe,#7c5cff)",
Pastel:"linear-gradient(135deg,#fbc2eb,#a6c1ee)",
Royal:"linear-gradient(135deg,#141e30,#243b55)",
Luxury:"#000000"
};

const background=wallpaper || themeMap[profile.theme] || "#0b0b12";

const { data: blockData } = await supabase
.from("blocks")
.select("*")
.eq("user_id",profile.id)
.order("position",{ascending:true});

const blocks=blockData || [];

return(

<div style={{
minHeight:"100vh",
background:background,
backgroundSize:"cover",
backgroundPosition:"center",
display:"flex",
flexDirection:"column",
alignItems:"center",
paddingTop:40,
position:"relative",
color:"#fff"
}}>

{wallpaper && blur>0 && (
<div style={{
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
backdropFilter:`blur(${blur}px)`,
WebkitBackdropFilter:`blur(${blur}px)`
}}/>
)}

{wallpaper && overlay && (
<div style={{
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.25)"
}}/>
)}

<div style={{
position:"relative",
zIndex:2,
display:"flex",
flexDirection:"column",
alignItems:"center"
}}>

<img
src={profile.avatar || ""}
style={{
width:110,
height:110,
borderRadius:"50%",
objectFit:"cover",
marginBottom:20
}}
/>

<h1>{profile.display_name}</h1>

<div style={{opacity:.7}}>
@{profile.username}
</div>

<p style={{
maxWidth:320,
textAlign:"center",
opacity:.8
}}>
{profile.bio}
</p>

<div style={{marginTop:40,width:320}}>

{blocks.map(block=>(
<ButtonBlock
key={block.id}
block={block}
/>
))}

</div>

</div>

</div>

);

}
