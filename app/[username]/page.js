"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function PublicProfile({ params }) {

const [profile, setProfile] = useState(null);
const [blocks, setBlocks] = useState([]);
const [appearance, setAppearance] = useState({});

useEffect(() => {
load();
}, []);

async function load() {

const username = params.username;

const { data: prof } = await supabase
.from("profiles")
.select("*")
.eq("username", username)
.single();

if (!prof) return;

setProfile(prof);

setAppearance(prof.profile_settings || {});

const { data: blockData } = await supabase
.from("blocks")
.select("*")
.eq("user_id", prof.id)
.order("position", { ascending: true });

setBlocks(blockData || []);

}

if (!profile) return null;

const header = appearance?.header || {};

const themeMap = {
Minimal: "#ffffff",
Midnight: "#0b0b12",
Ocean: "linear-gradient(135deg,#2193b0,#6dd5ed)",
Sunset: "linear-gradient(135deg,#ff7a18,#ffb347)",
Dream: "linear-gradient(135deg,#a18cd1,#fbc2eb)"
};

const themeBackground = themeMap[profile.theme] || "#0b0b12";

return (

<div
style={{
minHeight: "100vh",
background: themeBackground,
color: "#fff",
display: "flex",
flexDirection: "column",
alignItems: "center",
paddingTop: 40
}}
>

{/* HERO */}

{header.layout === "hero" ? (

<div
style={{
width: "100%",
height: 220,
backgroundImage: `url(${profile.avatar})`,
backgroundSize: "cover",
backgroundPosition: "center",
position: "relative"
}}
>

{/* FADE OVERLAY */}

<div
style={{
position: "absolute",
bottom: 0,
left: 0,
right: 0,
height: 120,
background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)"
}}
/>

</div>

) : (

<div
style={{
width: 110,
height: 110,
borderRadius: "50%",
overflow: "hidden",
marginBottom: 20
}}
>
<img
src={profile.avatar}
style={{ width: "100%", height: "100%", objectFit: "cover" }}
/>
</div>

)}

{/* DISPLAY NAME */}

{header.showDisplayName !== false && (
<h1
style={{
fontFamily: header.displayFont || "Poppins",
fontSize: header.displaySize || 22
}}
>
{profile.display_name}
</h1>
)}

{/* USERNAME */}

{header.showUsername !== false && (
<div
style={{
fontFamily: header.usernameFont || "Roboto",
fontSize: header.usernameSize || 14,
opacity: 0.7
}}
>
@{profile.username}
</div>
)}

{/* BIO */}

<p
style={{
fontFamily: header.bioFont || "Lora",
fontSize: header.bioSize || 15,
opacity: 0.7
}}
>
{profile.bio}
</p>

{/* LINKS */}

<div style={{ marginTop: 40, width: 320 }}>

{blocks.map((block) => (

<a
key={block.id}
href={block.data_json?.url}
target="_blank"
style={{
display: "block",
background: "rgba(255,255,255,.08)",
padding: 14,
borderRadius: 10,
marginBottom: 10,
textDecoration: "none",
color: "#fff"
}}
>
{block.data_json?.title}
</a>

))}

</div>

</div>

);

}
