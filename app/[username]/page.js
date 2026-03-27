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
justifyContent:"center",
fontSize:18
}}>
Profile not found
</div>
);
}

const profile = prof;
const appearance = prof.profile_settings || {};

const { data: blockData } = await supabase
.from("blocks")
.select("id,data_json,position")
.eq("user_id", prof.id)
.order("position", { ascending: true });

const blocks = blockData || [];

const header = appearance?.header || {};
const buttons = appearance?.buttons || {};
const heroTextOffset = header.layout === "hero" ? -40 : 0;

const themeMap = {
Minimal:"#ffffff",
Paper:"#fafafa",
Clean:"#f4f4f4",
"Soft White":"#fdfdfd",
"Creator Light":"#ffffff",

Midnight:"#0b0b12",
"Dark Pro":"#121212",
Mono:"#111111",
Obsidian:"#0f0f10",
"Creator Dark":"#141414",

Ocean:"linear-gradient(135deg,#2193b0,#6dd5ed)",
Sunset:"linear-gradient(135deg,#ff7a18,#ffb347)",
Neon:"linear-gradient(135deg,#00f2fe,#7c5cff)",
Pastel:"linear-gradient(135deg,#fbc2eb,#a6c1ee)",
"Gradient Flow":"linear-gradient(135deg,#667eea,#764ba2)",

Luxury:"#000000",
"Gold Night":"linear-gradient(135deg,#000000,#434343)",
Royal:"linear-gradient(135deg,#141e30,#243b55)",
Tech:"linear-gradient(135deg,#00c6ff,#0072ff)",
Elegant:"linear-gradient(135deg,#bdc3c7,#2c3e50)",

"Creator Pro":"linear-gradient(135deg,#ff9966,#ff5e62)",
Vivid:"linear-gradient(135deg,#f83600,#f9d423)",
Energy:"linear-gradient(135deg,#f953c6,#b91d73)",
Skyline:"linear-gradient(135deg,#4facfe,#00f2fe)",
Dream:"linear-gradient(135deg,#a18cd1,#fbc2eb)"
};

const themeBackground = themeMap[profile?.theme] || "#0b0b12";

return (

<div
style={{
minHeight:"100vh",
background:themeBackground,
color:"#fff",
display:"flex",
flexDirection:"column",
alignItems:"center",
paddingTop:0
}}
>

{header.layout === "hero" ? (

<div style={{
width:"100%",
height:260,
position:"relative",
overflow:"hidden"
}}>

<div style={{
position:"absolute",
top:0,
left:0,
right:0,
bottom:0,
backgroundImage:`url(${profile?.avatar || ""})`,
backgroundSize:"cover",
backgroundPosition:"center",
WebkitMaskImage:"linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0))",
maskImage:"linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0))"
}}/>

</div>

) : (

<div
style={{
width:110,
height:110,
borderRadius:"50%",
overflow:"hidden",
marginBottom:20
}}
>
<img
src={profile?.avatar || ""}
style={{width:"100%",height:"100%",objectFit:"cover"}}
/>
</div>

)}

<div style={{marginTop:heroTextOffset,textAlign:"center"}}>

{header.showDisplayName !== false && (
<h1 style={{
fontFamily:header.displayFont || "Poppins",
fontSize:header.displaySize || 22
}}>
{profile?.display_name}
</h1>
)}

{header.showUsername !== false && (
<div style={{
fontFamily:header.usernameFont || "Roboto",
fontSize:header.usernameSize || 14,
opacity:0.7
}}>
@{profile?.username}
</div>
)}

{header.showBio !== false && (
<p style={{
fontFamily:header.bioFont || "Lora",
fontSize:header.bioSize || 15,
opacity:0.7
}}>
{profile?.bio}
</p>
)}

</div>

<div style={{marginTop:40,width:320}}>

{(blocks || []).map((block)=>(
<ButtonBlock
key={block.id}
block={block}
buttons={buttons}
themeBackground={themeBackground}
/>
))}

</div>

</div>

);

}
