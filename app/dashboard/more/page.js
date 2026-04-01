"use client";

import { useState } from "react";
import Link from "next/link";

export default function MorePage(){

const [openSection,setOpenSection] = useState("");

function toggle(section){
setOpenSection(openSection === section ? "" : section);
}

const item={
padding:"14px 16px",
borderRadius:10,
marginBottom:8,
cursor:"pointer",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
textDecoration:"none",
color:"var(--text)",
fontSize:15
};

const subItem={
padding:"10px 18px",
marginBottom:4,
borderRadius:8,
cursor:"pointer",
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
padding:"20px",
paddingBottom:"90px"
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
opacity:0.7
}}>
linkarsh.com/username
</div>

</div>

</div>

<div style={divider}></div>

{/* MY LINKARSH */}

<div
onClick={()=>toggle("linkarsh")}
style={{
...item,
color:openSection==="linkarsh" ? "#3b82f6" : "var(--text)"
}}
>

<span>My Linkarsh</span>

<span style={{
color:openSection==="linkarsh" ? "#3b82f6" : "var(--text)"
}}>
{openSection==="linkarsh" ? "▼" : ">"}
</span>

</div>

{openSection==="linkarsh" && (

<div>

<Link href="/dashboard/links" style={subItem}>
My Links
</Link>

<Link href="/dashboard/social-links" style={subItem}>
Social Links
</Link>

<Link href="/dashboard/link-history" style={subItem}>
Link History
</Link>

<Link href="/dashboard/get-verified" style={subItem}>
Get Verified
</Link>

</div>

)}

{/* BLOCKS */}

<Link href="/dashboard/blocks" style={item}>
Blocks
</Link>

{/* TOOLS */}

<div
onClick={()=>toggle("tools")}
style={{
...item,
color:openSection==="tools" ? "#3b82f6" : "var(--text)"
}}
>

<span>Tools</span>

<span style={{
color:openSection==="tools" ? "#3b82f6" : "var(--text)"
}}>
{openSection==="tools" ? "▼" : ">"}
</span>

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

{/* SETTINGS */}

<div
onClick={()=>toggle("settings")}
style={{
...item,
color:openSection==="settings" ? "#3b82f6" : "var(--text)"
}}
>

<span>Settings</span>

<span style={{
color:openSection==="settings" ? "#3b82f6" : "var(--text)"
}}>
{openSection==="settings" ? "▼" : ">"}
</span>

</div>

{openSection==="settings" && (

<div>

<Link href="/dashboard/account" style={subItem}>
My Account
</Link>

<Link href="/dashboard/billing" style={subItem}>
Payment & Billing
</Link>

<Link href="/dashboard/terms" style={subItem}>
Terms of Service
</Link>

<Link href="/dashboard/privacy" style={subItem}>
Privacy Policy
</Link>

<Link href="/dashboard/cookies" style={subItem}>
Cookies Policy
</Link>

<Link href="/dashboard/community" style={subItem}>
Community Standards
</Link>

</div>

)}

</div>

);

}
