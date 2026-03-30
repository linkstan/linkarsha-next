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
height:72,
background:"rgba(255,255,255,0.08)",
backdropFilter:"blur(20px)",
borderRadius:26,
display:"flex",
alignItems:"center",
justifyContent:"space-around",
boxShadow:"0 10px 28px rgba(0,0,0,0.25)",
zIndex:200
};

const item=(path)=>({

flex:1,

display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",

fontSize:11,
textDecoration:"none",

color:active(path) ? "#3b82f6" : "var(--text)",

transform:active(path) ? "translateY(2px)" : "none",

boxShadow:active(path)
? "inset 0 6px 10px rgba(0,0,0,0.25)"
: "none",

height:"100%",

transition:"all .15s ease"

});

const icon={
width:26,
height:26,
marginBottom:4
};

const divider={
width:1,
height:48,
background:"linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(255,255,255,0.6), rgba(0,0,0,0.35))",
boxShadow:"0 0 4px rgba(0,0,0,0.35)"
};

return(

<div style={nav}>

<Link href="/dashboard" style={item("/dashboard")}>

{active("/dashboard") ? (

<svg style={icon} viewBox="0 0 24 24" fill="currentColor">
<path d="M12 3l9 8v10h-6v-6H9v6H3V11z"/>
</svg>

):( 

<svg style={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<path d="M3 11l9-8 9 8"/>
<path d="M5 10v10h5v-6h4v6h5V10"/>
</svg>

)}

Home

</Link>

<div style={divider}></div>

<Link href="/dashboard/links" style={item("/dashboard/links")}>

<svg style={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">

<path d="M10 13a5 5 0 017 0l1 1a5 5 0 01-7 7l-1-1"/>
<path d="M14 11a5 5 0 00-7 0l-1-1a5 5 0 017-7l1 1"/>

<circle cx="19" cy="5" r="3"/>
<line x1="19" y1="3.5" x2="19" y2="6.5"/>
<line x1="17.5" y1="5" x2="20.5" y2="5"/>

</svg>

My Links

</Link>

<div style={divider}></div>

<Link href="/dashboard/appearance" style={item("/dashboard/appearance")}>

<svg style={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">

<rect x="4" y="5" width="12" height="14" rx="2"/>
<rect x="8" y="7" width="12" height="14" rx="2"/>
<rect x="12" y="9" width="12" height="14" rx="2"/>

</svg>

Appearance

</Link>

<div style={divider}></div>

<Link href="/dashboard/analytics" style={item("/dashboard/analytics")}>

{active("/dashboard/analytics") ? (

<svg style={icon} viewBox="0 0 24 24" fill="currentColor">
<rect x="4" y="11" width="3" height="9"/>
<rect x="10" y="4" width="3" height="16"/>
<rect x="17" y="8" width="3" height="12"/>
</svg>

):( 

<svg style={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<line x1="5" y1="20" x2="5" y2="11"/>
<line x1="12" y1="20" x2="12" y2="4"/>
<line x1="19" y1="20" x2="19" y2="8"/>
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
cursor:"pointer",
color:"var(--text)"
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
