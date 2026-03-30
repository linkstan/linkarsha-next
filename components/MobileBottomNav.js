"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomNav({ setOpenMore }) {

const pathname = usePathname();

function active(path){
if(path === "/dashboard") return pathname === "/dashboard";
return pathname.startsWith(path);
}

const nav={
position:"fixed",
bottom:18,
left:18,
right:18,
height:70,
background:"rgba(255,255,255,0.07)",
backdropFilter:"blur(16px)",
borderRadius:22,
display:"flex",
alignItems:"center",
justifyContent:"space-around",
boxShadow:"0 10px 28px rgba(0,0,0,0.45), inset 0 1px rgba(255,255,255,0.08)",
zIndex:200
};

const item=(path)=>({
flex:1,
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
fontSize:11,
padding:"6px 0",
textDecoration:"none",
color:active(path) ? "#3b82f6" : "#bdbdbd",
transform:active(path) ? "translateY(-2px)" : "none",
transition:"all .15s ease"
});

const icon={
width:22,
height:22,
marginBottom:3
};

const divider={
width:1,
height:28,
background:"linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0.05))",
boxShadow:"0 0 4px rgba(255,255,255,0.15)"
};

return(

<div style={nav}>

<Link href="/dashboard" style={item("/dashboard")}>

{active("/dashboard") ? (

<svg style={icon} viewBox="0 0 24 24" fill="currentColor">
<path d="M12 3l9 9h-3v9h-5v-6H11v6H6v-9H3z"/>
</svg>

):( 

<svg style={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<path d="M3 12l9-9 9 9"/>
<path d="M9 21V9h6v12"/>
</svg>

)}

Home

</Link>

<div style={divider}></div>

<Link href="/dashboard/links" style={item("/dashboard/links")}>

{active("/dashboard/links") ? (

<svg style={icon} viewBox="0 0 24 24" fill="currentColor">
<path d="M10 13a5 5 0 017 0l1 1a5 5 0 01-7 7l-1-1z"/>
<path d="M14 11a5 5 0 00-7 0l-1-1a5 5 0 017-7l1 1z"/>
</svg>

):( 

<svg style={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<path d="M10 13a5 5 0 017 0l1 1a5 5 0 01-7 7l-1-1"/>
<path d="M14 11a5 5 0 00-7 0l-1-1a5 5 0 017-7l1 1"/>
</svg>

)}

My Links

</Link>

<div style={divider}></div>

<Link href="/dashboard/appearance" style={item("/dashboard/appearance")}>

{active("/dashboard/appearance") ? (

<svg style={icon} viewBox="0 0 24 24" fill="currentColor">
<circle cx="12" cy="12" r="4"/>
</svg>

):( 

<svg style={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<circle cx="12" cy="12" r="3"/>
</svg>

)}

Appearance

</Link>

<div style={divider}></div>

<Link href="/dashboard/analytics" style={item("/dashboard/analytics")}>

{active("/dashboard/analytics") ? (

<svg style={icon} viewBox="0 0 24 24" fill="currentColor">
<rect x="5" y="10" width="3" height="9"/>
<rect x="10" y="4" width="3" height="15"/>
<rect x="16" y="7" width="3" height="12"/>
</svg>

):( 

<svg style={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<line x1="18" y1="20" x2="18" y2="10"/>
<line x1="12" y1="20" x2="12" y2="4"/>
<line x1="6" y1="20" x2="6" y2="14"/>
</svg>

)}

Analytics

</Link>

<div style={divider}></div>

<div
onClick={()=>setOpenMore(true)}
style={{
flex:1,
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
fontSize:11,
color:"#bbb",
cursor:"pointer"
}}
>

<svg style={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<circle cx="12" cy="12" r="1"/>
<circle cx="19" cy="12" r="1"/>
<circle cx="5" cy="12" r="1"/>
</svg>

More

</div>

</div>

);

}
