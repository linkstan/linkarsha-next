"use client";

import { useState } from "react";
import Link from "next/link";

export default function MorePage(){

const [open,setOpen] = useState("");

function toggle(section){
setOpen(open === section ? "" : section);
}

const row={
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

const sub={
padding:"10px 20px",
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

return(

<div style={{
padding:20,
paddingBottom:90
}}>

{/* PROFILE */}

<div style={{
display:"flex",
alignItems:"center",
gap:12
}}>

<img
src="/default-avatar.png"
style={{
width:44,
height:44,
borderRadius:"50%"
}}
/>

<div>

<div style={{
fontWeight:600,
fontSize:16
}}>
Username
</div>

<div style={{
fontSize:13,
opacity:.7
}}>
linkarsh.com/username
</div>

</div>

</div>

<div style={divider}></div>

{/* MY LINKARSH */}

<div
onClick={()=>toggle("links")}
style={{
...row,
color:open==="links" ? "#3b82f6" : "var(--text)"
}}
>

My Linkarsh

<span>{open==="links" ? "▼" : ">"}</span>

</div>

{open==="links" && (

<div>

<Link href="/dashboard/links" style={sub}>My Links</Link>

<Link href="/dashboard/social-links" style={sub}>
Social Links
</Link>

<Link href="/dashboard/link-history" style={sub}>
Link History
</Link>

<Link href="/dashboard/get-verified" style={sub}>
Get Verified
</Link>

</div>

)}

{/* BLOCKS */}

<Link href="/dashboard/blocks" style={row}>
Blocks
</Link>

{/* TOOLS */}

<div
onClick={()=>toggle("tools")}
style={{
...row,
color:open==="tools" ? "#3b82f6" : "var(--text)"
}}
>

Tools

<span>{open==="tools" ? "▼" : ">"}</span>

</div>

{open==="tools" && (

<div>

<Link href="/dashboard/tools/ai-bio-generator" style={sub}>
AI Bio Generator
</Link>

<Link href="/dashboard/tools/qr-code" style={sub}>
QR Code Generator
</Link>

<Link href="/dashboard/tools/export-data" style={sub}>
Export Data
</Link>

</div>

)}

{/* SETTINGS */}

<div
onClick={()=>toggle("settings")}
style={{
...row,
color:open==="settings" ? "#3b82f6" : "var(--text)"
}}
>

Settings

<span>{open==="settings" ? "▼" : ">"}</span>

</div>

{open==="settings" && (

<div>

<Link href="/dashboard/account" style={sub}>
My Account
</Link>

<Link href="/dashboard/billing" style={sub}>
Payment & Billing
</Link>

<Link href="/dashboard/terms" style={sub}>
Terms of Service
</Link>

<Link href="/dashboard/privacy" style={sub}>
Privacy Policy
</Link>

<Link href="/dashboard/cookies" style={sub}>
Cookies Policy
</Link>

<Link href="/dashboard/community" style={sub}>
Community Standards
</Link>

</div>

)}

</div>

);

}
