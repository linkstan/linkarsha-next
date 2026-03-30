"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomNav({ setOpenMore }) {

const pathname = usePathname();

function active(path){
return pathname === path || pathname.startsWith(path + "/");
}

const navStyle={
position:"fixed",
bottom:18,
left:18,
right:18,
height:70,
background:"rgba(255,255,255,0.07)",
backdropFilter:"blur(16px)",
borderRadius:22,
display:"flex",
justifyContent:"space-around",
alignItems:"center",
boxShadow:"0 10px 30px rgba(0,0,0,0.5), inset 0 1px rgba(255,255,255,0.1)",
zIndex:200
};

const button=(path)=>({

display:"flex",
flexDirection:"column",
alignItems:"center",

padding:"8px 14px",
borderRadius:14,

fontSize:11,
textDecoration:"none",

color: active(path) ? "#3b82f6" : "#bbb",

transform: active(path) ? "translateY(-4px)" : "none",

background: active(path)
? "rgba(255,255,255,0.08)"
: "transparent",

boxShadow: active(path)
? "0 6px 18px rgba(0,0,0,0.5), inset 0 1px rgba(255,255,255,0.15)"
: "none",

transition:"all 0.2s ease"

});

const icon={
width:22,
height:22,
marginBottom:3
};

return(

<div style={navStyle}>

<Link href="/dashboard" style={button("/dashboard")}>

<svg style={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<path d="M3 12l9-9 9 9"/>
<path d="M9 21V9h6v12"/>
</svg>

Home

</Link>

<Link href="/dashboard/links" style={button("/dashboard/links")}>

<svg style={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<path d="M10 13a5 5 0 0 1 7 0l1 1"/>
<path d="M14 11a5 5 0 0 1-7 0l-1-1"/>
</svg>

Links

</Link>

<Link href="/dashboard/appearance" style={button("/dashboard/appearance")}>

<svg style={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<circle cx="12" cy="12" r="3"/>
<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82"/>
</svg>

Appearance

</Link>

<Link href="/dashboard/analytics" style={button("/dashboard/analytics")}>

<svg style={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<line x1="18" y1="20" x2="18" y2="10"/>
<line x1="12" y1="20" x2="12" y2="4"/>
<line x1="6" y1="20" x2="6" y2="14"/>
</svg>

Analytics

</Link>

<div
onClick={()=>setOpenMore(true)}
style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
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
