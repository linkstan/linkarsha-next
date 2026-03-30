"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomNav({ setOpenMore }) {

const pathname = usePathname();

function active(path){
return pathname === path || pathname.startsWith(path + "/");
}

const navItem = (path) => ({
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
gap:4,
padding:"8px 12px",
borderRadius:12,
textDecoration:"none",
color: active(path) ? "#4da3ff" : "var(--text)",
background: active(path) ? "rgba(77,163,255,0.12)" : "transparent",
boxShadow: active(path)
? "0 4px 12px rgba(77,163,255,0.35)"
: "none",
transform: active(path) ? "translateY(-2px)" : "none",
transition:"all 0.15s ease"
});

return (

<div style={{
position:"fixed",
bottom:0,
left:0,
right:0,
height:70,
background:"var(--sidebar)",
borderTop:"1px solid var(--border)",
display:"flex",
justifyContent:"space-around",
alignItems:"center",
zIndex:200
}}>

<Link href="/dashboard" style={navItem("/dashboard")}>

<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<path d="M3 11l9-8 9 8"></path>
<path d="M5 10v10h14V10"></path>
</svg>

<div style={{fontSize:11}}>Home</div>

</Link>


<Link href="/dashboard/links" style={navItem("/dashboard/links")}>

<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<path d="M10 13a5 5 0 0 1 7 0l1 1a5 5 0 0 1-7 7l-1-1"/>
<path d="M14 11a5 5 0 0 1-7 0l-1-1a5 5 0 0 1 7-7l1 1"/>
</svg>

<div style={{fontSize:11}}>My Linkarsha</div>

</Link>


<Link href="/dashboard/appearance" style={navItem("/dashboard/appearance")}>

<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<circle cx="12" cy="12" r="3"/>
<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82"/>
<path d="M4.6 9a1.65 1.65 0 0 0-.33-1.82"/>
</svg>

<div style={{fontSize:11}}>Appearance</div>

</Link>


<Link href="/dashboard/analytics" style={
