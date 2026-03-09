"use client";

import Link from "next/link";
import { useState,useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function DashboardLayout({ children }) {

const pathname = usePathname();

/* ALL COLLAPSED BY DEFAULT */

const [openLinkarsha,setOpenLinkarsha] = useState(false);
const [openAppearance,setOpenAppearance] = useState(false);
const [openTools,setOpenTools] = useState(false);

/* preview state */

const [profile,setProfile] = useState(null);
const [blocks,setBlocks] = useState([]);

/* pages that need preview */

const showPreview =
pathname === "/dashboard" ||
pathname.startsWith("/dashboard/links") ||
pathname.startsWith("/dashboard/blocks") ||
pathname.startsWith("/dashboard/appearance");

useEffect(()=>{
loadPreview();
},[]);

async function loadPreview(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const uid=session.user.id;

const {data:prof} = await supabase
.from("profiles")
.select("*")
.eq("id",uid)
.single();

setProfile(prof);

const {data:blockData} = await supabase
.from("blocks")
.select("*")
.eq("user_id",uid)
.eq("type","link")
.order("position",{ascending:true});

setBlocks(blockData || []);

}

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

{/* MY LINKARSHA */}

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

{/* BLOCKS */}

<Link href="/dashboard/blocks" style={itemStyle}>Blocks</Link>

{/* APPEARANCE */}

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

{/* ANALYTICS */}

<Link href="/dashboard/analytics" style={itemStyle}>Analytics</Link>

<hr style={{margin:"20px 0",borderColor:"#222"}}/>

{/* TOOLS */}

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

{/* REFERRALS */}

<Link href="/dashboard/referrals" style={itemStyle}>
Referrals
</Link>

{/* SETTINGS */}

<Link href="/dashboard/settings" style={{...itemStyle,marginTop:10}}>
Settings
</Link>

</div>

{/* MAIN AREA */}

<div style={{
flex:1,
display:"flex"
}}>

{/* EDITOR / PAGE CONTENT */}

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
padding:20,
overflow:"auto"
}}>

<div style={{
width:70,
height:70,
borderRadius:"50%",
overflow:"hidden",
margin:"auto",
background:"#222"
}}>

<img
src={profile?.avatar || "/default-avatar.png"}
style={{width:"100%",height:"100%",objectFit:"cover"}}
/>

</div>

<div style={{
marginTop:10,
textAlign:"center",
fontWeight:600
}}>
{profile?.display_name}
</div>

<div style={{
textAlign:"center",
opacity:0.7,
fontSize:14
}}>
{profile?.bio}
</div>

{blocks.map(block=>(

<a
key={block.id}
href={block.data_json?.url}
target="_blank"
style={{
display:"flex",
alignItems:"center",
gap:10,
background:"#1a1a25",
padding:12,
borderRadius:10,
marginTop:10,
textDecoration:"none",
color:"white"
}}
>

<span>{block.data_json?.title}</span>

</a>

))}

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
