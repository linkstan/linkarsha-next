"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {

const pathname = usePathname();

const [openLinkarsha,setOpenLinkarsha] = useState(true);
const [openAppearance,setOpenAppearance] = useState(false);
const [openTools,setOpenTools] = useState(false);

/* pages that need preview */

const showPreview =
pathname === "/dashboard" ||
pathname.startsWith("/dashboard/links") ||
pathname.startsWith("/dashboard/blocks") ||
pathname.startsWith("/dashboard/appearance");

return(

<div style={{
display:"flex",
minHeight:"100vh",
background:"#0b0b12",
color:"white",
fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"
}}>

{/* SIDEBAR */}

<div style={{
width:260,
background:"#111",
padding:20,
display:"flex",
flexDirection:"column"
}}>

<h2 style={{marginBottom:30}}>Linkarsha</h2>

<Link href="/dashboard" style={itemStyle}>Home</Link>

<div onClick={()=>setOpenLinkarsha(!openLinkarsha)} style={itemStyle}>
My Linkarsha ▸
</div>

{openLinkarsha && (
<div style={subMenu}>
<Link href="/dashboard/links" style={subItem}>My Links</Link>
<div style={subItem}>Link History</div>
<div style={subItem}>Get Verified</div>
</div>
)}

<Link href="/dashboard/blocks" style={itemStyle}>Blocks</Link>

<div onClick={()=>setOpenAppearance(!openAppearance)} style={itemStyle}>
Appearance ▸
</div>

{openAppearance && (
<div style={subMenu}>
<Link href="/dashboard/appearance" style={subItem}>My Theme</Link>
<div style={subItem}>My Design</div>
<div style={subItem}>Animations</div>
</div>
)}

<Link href="/dashboard/analytics" style={itemStyle}>Analytics</Link>

<hr style={{margin:"20px 0",borderColor:"#222"}}/>

<div onClick={()=>setOpenTools(!openTools)} style={itemStyle}>
Tools ▸
</div>

{openTools && (
<div style={subMenu}>
<div style={subItem}>AI Bio Generator</div>
<div style={subItem}>Smart Links</div>
<div style={subItem}>Export Data</div>
</div>
)}

<div style={{marginTop:20,opacity:0.7}}>
Something exciting is coming.
Invite friends soon and earn rewards.
</div>

<Link href="/dashboard/settings" style={{...itemStyle,marginTop:20}}>
Settings
</Link>

</div>

{/* MAIN AREA */}

<div style={{
flex:1,
display:"flex"
}}>

{/* EDITOR / CONTENT */}

<div style={{
flex:1,
padding:40
}}>
{children}
</div>

{/* PHONE PREVIEW */}

{showPreview && (

<div style={{
width:360,
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#0f0f16"
}}>

<div style={{
width:280,
height:520,
background:"#000",
borderRadius:30,
padding:18,
boxShadow:"0 0 30px rgba(0,0,0,0.6)"
}}>

<div style={{
width:"100%",
height:"100%",
background:"#0b0b12",
borderRadius:20,
padding:20
}}>

<div style={{
width:70,
height:70,
borderRadius:"50%",
background:"#222",
margin:"auto"
}}/>

<div style={{
marginTop:10,
textAlign:"center"
}}>
Preview
</div>

</div>

</div>

</div>

)}

</div>

</div>

);

}

const itemStyle={
padding:"10px 12px",
cursor:"pointer",
borderRadius:8,
textDecoration:"none",
color:"white",
display:"block"
};

const subMenu={
marginLeft:10,
marginTop:5,
marginBottom:10
};

const subItem={
display:"block",
padding:"8px 10px",
opacity:0.8,
cursor:"pointer",
textDecoration:"none",
color:"white"
};
