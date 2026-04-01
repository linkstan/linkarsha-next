"use client";

import { useState } from "react";
import Link from "next/link";

export default function MorePage({ profile }) {

const [open,setOpen] = useState("");

function toggle(section){
setOpen(open === section ? "" : section);
}

const row=(section)=>({
padding:"14px 16px",
borderRadius:12,
marginBottom:8,
cursor:"pointer",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
fontSize:15,
background:"var(--card)",
color:open===section ? "#3b82f6" : "var(--text)",
transition:"all .15s ease"
});

const rowStatic={
padding:"14px 16px",
borderRadius:12,
marginBottom:8,
cursor:"pointer",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
fontSize:15,
background:"var(--card)",
color:"var(--text)"
};

const icon=(section)=>({
width:22,
height:22,
marginRight:10,
transition:"transform .15s ease,color .15s ease",
transform:open===section ? "scale(1.15)" : "scale(1)",
color:open===section ? "#3b82f6" : "var(--text)"
});

const iconStatic={
width:22,
height:22,
marginRight:10,
color:"var(--text)"
};

const sub={
padding:"10px 26px",
display:"block",
textDecoration:"none",
color:"var(--text)",
fontSize:14
};

const divider={
margin:"18px 0",
height:1,
background:"var(--border)"
};

function signOut(){
window.location="/login";
}

return(

<div style={{padding:20,paddingBottom:90}}>

{/* PROFILE */}

<div style={{display:"flex",alignItems:"center",gap:12}}>

<img
src={profile?.avatar || "/default-avatar.png"}
style={{width:44,height:44,borderRadius:"50%",objectFit:"cover"}}
/>

<div>

<div style={{fontWeight:600,fontSize:16}}>
{profile?.username || "username"}
</div>

<div style={{fontSize:13,opacity:.7}}>
linkarsh.com/{profile?.username || "username"}
</div>

</div>

</div>

<div style={divider}></div>

{/* MY LINKARSH */}

<div onClick={()=>toggle("links")} style={row("links")}>

<div style={{display:"flex",alignItems:"center"}}>

<svg style={icon("links")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<rect x="3" y="4" width="18" height="4" rx="1"/>
<rect x="3" y="10" width="18" height="4" rx="1"/>
<rect x="3" y="16" width="12" height="4" rx="1"/>
</svg>

My Linkarsh

</div>

<span>{open==="links" ? "▼" : ">"}</span>

</div>

{open==="links" && (

<div>

<Link href="/dashboard/links" style={sub}>My Links</Link>
<Link href="/dashboard/social-links" style={sub}>Social Links</Link>
<Link href="/dashboard/link-history" style={sub}>Link History</Link>
<Link href="/dashboard/get-verified" style={sub}>Get Verified</Link>

</div>

)}

{/* BLOCKS */}

<Link href="/dashboard/blocks" style={rowStatic}>

<div style={{display:"flex",alignItems:"center"}}>

<svg style={iconStatic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<rect x="3" y="3" width="7" height="7"/>
<rect x="14" y="3" width="7" height="7"/>
<rect x="3" y="14" width="7" height="7"/>
<rect x="14" y="14" width="7" height="7"/>
</svg>

Blocks

</div>

</Link>

{/* TOOLS */}

<div onClick={()=>toggle("tools")} style={row("tools")}>

<div style={{display:"flex",alignItems:"center"}}>

<svg style={icon("tools")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">

<circle cx="6" cy="6" r="3"/>
<polygon points="18,4 21,9 15,9"/>
<polygon points="6,14 9,20 3,20"/>
<rect x="15" y="14" width="6" height="6" transform="rotate(45 18 17)"/>

</svg>

Tools

</div>

<span>{open==="tools" ? "▼" : ">"}</span>

</div>

{open==="tools" && (

<div>

<Link href="/dashboard/tools/ai-bio-generator" style={sub}>AI Bio Generator</Link>
<Link href="/dashboard/tools/qr-code" style={sub}>QR Code Generator</Link>
<Link href="/dashboard/tools/export-data" style={sub}>Export Data</Link>

</div>

)}

{/* SETTINGS */}

<div onClick={()=>toggle("settings")} style={row("settings")}>

<div style={{display:"flex",alignItems:"center"}}>

<svg style={icon("settings")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<circle cx="12" cy="12" r="3"/>
<path d="M19.4 15a1.6 1.6 0 0 0 .33 1.82"/>
<path d="M4.6 9a1.6 1.6 0 0 0-.33-1.82"/>
<path d="M12 2v3"/>
<path d="M12 19v3"/>
<path d="M4.93 4.93l2.12 2.12"/>
<path d="M16.95 16.95l2.12 2.12"/>
</svg>

Settings

</div>

<span>{open==="settings" ? "▼" : ">"}</span>

</div>

{open==="settings" && (

<div>

<Link href="/dashboard/account" style={sub}>My Account</Link>
<Link href="/dashboard/billing" style={sub}>Payment & Billing</Link>
<Link href="/dashboard/terms" style={sub}>Terms of Service</Link>
<Link href="/dashboard/privacy" style={sub}>Privacy Policy</Link>
<Link href="/dashboard/cookies" style={sub}>Cookies Policy</Link>
<Link href="/dashboard/community" style={sub}>Community Standards</Link>

</div>

)}

{/* SIGN OUT */}

<div style={{marginTop:20}}>

<button
onClick={signOut}
style={{
width:"100%",
padding:"12px",
borderRadius:10,
border:"none",
background:"#ef4444",
color:"#fff",
fontWeight:600,
cursor:"pointer"
}}
>
Sign Out
</button>

</div>

</div>

);

}
