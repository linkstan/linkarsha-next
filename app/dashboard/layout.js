"use client";

import Link from "next/link";
import { useState,useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardLayout({ children }) {

const pathname = usePathname();

const [openLinkarsha,setOpenLinkarsha] = useState(false);
const [openAppearance,setOpenAppearance] = useState(false);
const [openTools,setOpenTools] = useState(false);
const [openUser,setOpenUser] = useState(false);

const [profile,setProfile] = useState(null);
const [blocks,setBlocks] = useState([]);

const showPreview =
pathname === "/dashboard" ||
pathname.startsWith("/dashboard/links") ||
pathname.startsWith("/dashboard/blocks") ||
pathname.startsWith("/dashboard/appearance");

/* auto open parent menus when inside page */

useEffect(()=>{
if(pathname.startsWith("/dashboard/links")) setOpenLinkarsha(true);
if(pathname.startsWith("/dashboard/appearance")) setOpenAppearance(true);
},[pathname]);

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

async function logout(){
await supabase.auth.signOut();
window.location="/login";
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

<div style={{position:"relative"}}>

<div
onClick={()=>setOpenUser(!openUser)}
style={{
display:"flex",
alignItems:"center",
gap:10,
marginBottom:10,
cursor:"pointer"
}}
>

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
{openUser ? "v" : ">"}
</div>

</div>

{openUser && (

<div style={{
background:"#1a1a25",
borderRadius:8,
padding:10,
marginBottom:20
}}>

<div style={dropdownItem}>Ask Question</div>
<div style={dropdownItem}>Help Center</div>
<div style={dropdownItem}>Contact Support</div>

<div
onClick={logout}
style={{
...dropdownItem,
color:"#ff6b6b"
}}
>
Sign Out
</div>

</div>

)}

</div>

{/* HOME */}

<Link href="/dashboard" style={{
...item,
background: pathname === "/dashboard" ? "#2a2a2a" : "transparent"
}}>
Home
</Link>

{/* MY LINKARSHA */}

<div
onClick={()=>setOpenLinkarsha(!openLinkarsha)}
style={{
...item,
background: pathname.startsWith("/dashboard/links") ? "#2a2a2a" : "transparent"
}}
>
<span>My Linkarsha</span>
<span>{openLinkarsha ? "v" : ">"}</span>
</div>

{openLinkarsha && (

<div style={submenu}>

<Link href="/dashboard/links" style={{
...subitem,
background: pathname === "/dashboard/links" ? "#2a2a2a" : "transparent"
}}>
My Links
</Link>

<div style={subitem}>Link History</div>

<div style={subitem}>Get Verified</div>

</div>

)}

{/* BLOCKS */}

<Link href="/dashboard/blocks" style={{
...item,
background: pathname.startsWith("/dashboard/blocks") ? "#2a2a2a" : "transparent"
}}>
Blocks
</Link>

{/* APPEARANCE */}

<div
onClick={()=>setOpenAppearance(!openAppearance)}
style={{
...item,
background: pathname.startsWith("/dashboard/appearance") ? "#2a2a2a" : "transparent"
}}
>
<span>Appearance</span>
<span>{openAppearance ? "v" : ">"}</span>
</div>

{openAppearance && (

<div style={submenu}>

<Link href="/dashboard/appearance" style={{
...subitem,
background: pathname === "/dashboard/appearance" ? "#2a2a2a" : "transparent"
}}>
My Theme
</Link>

<div style={subitem}>My Design</div>
<div style={subitem}>Animations</div>

</div>

)}

{/* ANALYTICS */}

<Link href="/dashboard/analytics" style={{
...item,
background: pathname.startsWith("/dashboard/analytics") ? "#2a2a2a" : "transparent"
}}>
Analytics
</Link>

<hr style={{margin:"20px 0",borderColor:"#222"}}/>

{/* TOOLS */}

<div
onClick={()=>setOpenTools(!openTools)}
style={{
...item,
background: pathname.startsWith("/dashboard/tools") ? "#2a2a2a" : "transparent"
}}
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

<Link href="/dashboard/referrals" style={{
...item,
background: pathname.startsWith("/dashboard/referrals") ? "#2a2a2a" : "transparent"
}}>
Referrals
</Link>

{/* SETTINGS */}

<Link href="/dashboard/settings" style={{
...item,
background: pathname.startsWith("/dashboard/settings") ? "#2a2a2a" : "transparent"
}}>
Settings
</Link>

</div>

{/* MAIN AREA */}

<div style={{flex:1,display:"flex"}}>

<div style={{flex:1,padding:40}}>
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

const dropdownItem={
padding:"8px 10px",
cursor:"pointer",
borderRadius:6
};
