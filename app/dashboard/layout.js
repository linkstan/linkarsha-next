"use client";

import Link from "next/link";
import { useState,useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function DashboardLayout({ children }) {

const pathname = usePathname();

const [openLinkarsha,setOpenLinkarsha] = useState(false);
const [openAppearance,setOpenAppearance] = useState(false);
const [openTools,setOpenTools] = useState(false);

const [profile,setProfile] = useState(null);
const [blocks,setBlocks] = useState([]);

const showPreview =
pathname === "/dashboard" ||
pathname.startsWith("/dashboard/links") ||
pathname.startsWith("/dashboard/blocks") ||
pathname.startsWith("/dashboard/appearance");

function isActive(path){
return pathname === path || pathname.startsWith(path+"/");
}

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
background:"#0f0f10",
padding:20,
display:"flex",
flexDirection:"column"
}}>

<h2 style={{marginBottom:15}}>Linkarsha</h2>

{/* USER */}

<div style={{
display:"flex",
alignItems:"center",
gap:10,
marginBottom:30,
cursor:"pointer"
}}>

<img
src={profile?.avatar || "/default-avatar.png"}
style={{
width:28,
height:28,
borderRadius:"50%",
objectFit:"cover"
}}
/>

<div style={{flex:1}}>
{profile?.username}
</div>

<div style={{opacity:0.7}}>
v
</div>

</div>

{/* HOME */}

<Link href="/dashboard" style={{
...item,
background:isActive("/dashboard") ? "#2a2a2a" : "transparent"
}}>
Home
</Link>

{/* MY LINKARSHA */}

<div
onClick={()=>setOpenLinkarsha(!openLinkarsha)}
style={{
...item,
background:isActive("/dashboard/links") ? "#2a2a2a" : "transparent"
}}
>

<span>My Linkarsha</span>

<span>{openLinkarsha ? "v" : ">"}</span>

</div>

{openLinkarsha && (
<div style={submenu}>

<Link href="/dashboard/links" style={subitem}>
My Links
</Link>

<div style={subitem}>Link History</div>
<div style={subitem}>Get Verified</div>

</div>
)}

{/* BLOCKS */}

<Link href="/dashboard/blocks" style={{
...item,
background:isActive("/dashboard/blocks") ? "#2a2a2a" : "transparent"
}}>
Blocks
</Link>

{/* APPEARANCE */}

<div
onClick={()=>setOpenAppearance(!openAppearance)}
style={{
...item,
background:isActive("/dashboard/appearance") ? "#2a2a2a" : "transparent"
}}
>

<span>Appearance</span>

<span>{openAppearance ? "v" : ">"}</span>

</div>

{openAppearance && (
<div style={submenu}>

<Link href="/dashboard/appearance" style={subitem}>
My Theme
</Link>

<div style={subitem}>My Design</div>
<div style={subitem}>Animations</div>

</div>
)}

{/* ANALYTICS */}

<Link href="/dashboard/analytics" style={{
...item,
background:isActive("/dashboard/analytics") ? "#2a2a2a" : "transparent"
}}>
Analytics
</Link>

<hr style={{margin:"20px 0",borderColor:"#222"}}/>

{/* TOOLS */}

<div
onClick={()=>setOpenTools(!openTools)}
style={item}
>

<span>Tools</span>

<span>{openTools ? "v" : ">"}</span>

</div>

{openTools && (
<div style={submenu}>
<div style={subitem}>AI Bio Generator</div>
<div style={subitem}>Smart Links</div>
<div style={subitem}>Export Data</div>
</div>
)}

{/* REFERRALS */}

<Link href="/dashboard/referrals" style={item}>
Referrals
</Link>

{/* SETTINGS */}

<Link href="/dashboard/settings" style={item}>
Settings
</Link>

</div>

{/* MAIN */}

<div style={{
flex:1,
display:"flex"
}}>

<div style={{
flex:1,
padding:40
}}>
{children}
</div>

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
padding:18
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
background:"#1a1a25",
padding:12,
borderRadius:10,
marginTop:10,
textDecoration:"none",
color:"white"
}}
>

{block.data_json?.title}

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

const item={
padding:"10px 12px",
cursor:"pointer",
borderRadius:8,
textDecoration:"none",
color:"white",
display:"flex",
justifyContent:"space-between",
alignItems:"center"
};

const submenu={
marginLeft:10,
marginTop:5,
marginBottom:10
};

const subitem={
display:"block",
padding:"8px 10px",
opacity:0.8,
cursor:"pointer",
textDecoration:"none",
color:"white"
};
