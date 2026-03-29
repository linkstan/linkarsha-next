"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomNav({ setOpenMore }) {

const pathname = usePathname();

function active(path){
return pathname.startsWith(path);
}

const itemStyle = (path) => ({
textDecoration:"none",
color: active(path) ? "#4da3ff" : "var(--text)",
textAlign:"center",
fontWeight: active(path) ? "600" : "400"
});

return (

<div style={{
position:"fixed",
bottom:0,
left:0,
right:0,
height:65,
background:"var(--sidebar)",
borderTop:"1px solid var(--border)",
display:"flex",
justifyContent:"space-around",
alignItems:"center",
zIndex:200
}}>

<Link href="/dashboard" style={itemStyle("/dashboard")}>
<div>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<path d="M3 12l9-9 9 9"></path>
<path d="M9 21V9h6v12"></path>
</svg>
<div style={{fontSize:11}}>Home</div>
</div>
</Link>

<Link href="/dashboard/links" style={itemStyle("/dashboard/links")}>
<div>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<path d="M10 13a5 5 0 0 1 7 0l1 1a5 5 0 0 1-7 7l-1-1"></path>
<path d="M14 11a5 5 0 0 1-7 0l-1-1a5 5 0 0 1 7-7l1 1"></path>
</svg>
<div style={{fontSize:11}}>My Linkarsha</div>
</div>
</Link>

<Link href="/dashboard/appearance" style={itemStyle("/dashboard/appearance")}>
<div>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<circle cx="12" cy="12" r="3"></circle>
<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82"></path>
</svg>
<div style={{fontSize:11}}>Appearance</div>
</div>
</Link>

<Link href="/dashboard/analytics" style={itemStyle("/dashboard/analytics")}>
<div>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<line x1="18" y1="20" x2="18" y2="10"></line>
<line x1="12" y1="20" x2="12" y2="4"></line>
<line x1="6" y1="20" x2="6" y2="14"></line>
</svg>
<div style={{fontSize:11}}>Analytics</div>
</div>
</Link>

<div
onClick={()=>setOpenMore(true)}
style={{
cursor:"pointer",
color:"var(--text)",
textAlign:"center"
}}
>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<circle cx="12" cy="12" r="1"></circle>
<circle cx="19" cy="12" r="1"></circle>
<circle cx="5" cy="12" r="1"></circle>
</svg>
<div style={{fontSize:11}}>More</div>
</div>

</div>

);

}
