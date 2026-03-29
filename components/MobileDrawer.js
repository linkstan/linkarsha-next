"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileDrawer({
openMore,
setOpenMore,
profile,
logout
}){

const [openSection,setOpenSection] = useState("");

function toggle(section){
setOpenSection(openSection === section ? "" : section);
}

if(!openMore) return null;

const item={
padding:"12px 10px",
borderRadius:10,
cursor:"pointer",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
transition:"0.15s"
};

const highlight={
background:"rgba(255,255,255,0.08)"
};

const subItem={
padding:"10px 20px",
opacity:0.9,
cursor:"pointer",
display:"block",
textDecoration:"none",
color:"var(--text)"
};

return(

<div
onClick={()=>setOpenMore(false)}
style={{
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.35)",
zIndex:300
}}
>

<div
onClick={(e)=>e.stopPropagation()}
style={{
position:"absolute",
right:0,
top:0,
width:280,
height:"100%",
background:"var(--sidebar)",
padding:20,
borderLeft:"1px solid var(--border)",
overflowY:"auto",
transform: openMore ? "translateX(0)" : "translateX(100%)",
transition:"transform 0.25s ease"
}}
>

{/* PROFILE */}

<div style={{
display:"flex",
alignItems:"center",
gap:10,
marginBottom:10
}}>

<img
src={profile?.avatar || "/default-avatar.png"}
style={{
width:38,
height:38,
borderRadius:"50%"
}}
/>

<div>

<div style={{fontWeight:600}}>
{profile?.username}
</div>

<div style={{
fontSize:12,
opacity:0.7
}}>
linkarsha.com/{profile?.username}
</div>

</div>

</div>

<hr style={{margin:"15px 0"}}/>

{/* BLOCKS */}

<Link href="/dashboard/blocks" style={subItem}>
Blocks
</Link>

{/* TOOLS */}

<div
onClick={()=>toggle("tools")}
style={{
...item,
...(openSection==="tools" ? highlight : {})
}}
>

<span>Tools</span>
<span>{openSection==="tools" ? "▼" : ">"}</span>

</div>

{openSection==="tools" && (

<div>

<Link href="/dashboard/tools/ai-bio-generator" style={subItem}>
AI Bio Generator
</Link>

<Link href="/dashboard/tools/qr-code" style={subItem}>
QR Code Generator
</Link>

<Link href="/dashboard/tools/export-data" style={subItem}>
Export Data
</Link>

</div>

)}

{/* ACCOUNT */}

<div
onClick={()=>toggle("account")}
style={{
...item,
...(openSection==="account" ? highlight : {})
}}
>

<span>Account</span>
<span>{openSection==="account" ? "▼" : ">"}</span>

</div>

{openSection==="account" && (

<div>

<Link href="/dashboard/referrals" style={subItem}>
Referrals
</Link>

<Link href="/dashboard/settings" style={subItem}>
Settings
</Link>

</div>

)}

<hr style={{margin:"15px 0"}}/>

{/* SUPPORT */}

<div
onClick={()=>toggle("support")}
style={{
...item,
...(openSection==="support" ? highlight : {})
}}
>

<span>Support</span>
<span>{openSection==="support" ? "▼" : ">"}</span>

</div>

{openSection==="support" && (

<div>

<div style={subItem}>Ask Question</div>
<div style={subItem}>Help Center</div>
<div style={subItem}>Contact Support</div>

</div>

)}

{/* SIGN OUT */}

<div
onClick={logout}
style={{
marginTop:25,
padding:"12px",
borderRadius:10,
cursor:"pointer",
color:"#ff5e5e",
textAlign:"center",
border:"1px solid rgba(255,0,0,0.25)"
}}
>
Sign Out
</div>

</div>

</div>

);

}
