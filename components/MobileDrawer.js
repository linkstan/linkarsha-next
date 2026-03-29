"use client";

import { useState } from "react";

export default function MobileDrawer({
openMore,
setOpenMore,
profile,
logout
}){

const [openSection,setOpenSection] = useState("");

function toggle(section){
setOpenSection(openSection === section ? "" : section);
}

if(!openMore) return null;

const item={
padding:"12px 10px",
borderRadius:8,
cursor:"pointer",
display:"flex",
justifyContent:"space-between",
alignItems:"center"
};

const highlight={
background:"var(--card)"
};

const subItem={
padding:"10px 18px",
opacity:0.85,
cursor:"pointer"
};

return(

<div
onClick={()=>setOpenMore(false)}
style={{
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.35)",
zIndex:300
}}
>

<div
onClick={(e)=>e.stopPropagation()}
style={{
position:"absolute",
right:0,
top:0,
width:280,
height:"100%",
background:"var(--sidebar)",
padding:20,
borderLeft:"1px solid var(--border)",
overflowY:"auto"
}}
>

{/* PROFILE */}

<div style={{
display:"flex",
alignItems:"center",
gap:10,
marginBottom:10
}}>

<img
src={profile?.avatar || "/default-avatar.png"}
style={{
width:38,
height:38,
borderRadius:"50%"
}}
/>

<div>

<div style={{fontWeight:600}}>
{profile?.username}
</div>

<div style={{
fontSize:12,
opacity:0.7
}}>
linkarsha.com/{profile?.username}
</div>

</div>

</div>

<hr style={{margin:"15px 0"}}/>

{/* BLOCKS */}

<div style={item}>
Blocks
</div>

{/* TOOLS */}

<div
onClick={()=>toggle("tools")}
style={{
...item,
...(openSection==="tools" ? highlight : {})
}}
>

<span>Tools</span>
<span>{openSection==="tools" ? "v" : ">"}</span>

</div>

{openSection==="tools" && (

<div>

<div style={subItem}>Bio Generator</div>
<div style={subItem}>QR Code Generator</div>
<div style={subItem}>Export Data</div>

</div>

)}

{/* ACCOUNT */}

<div
onClick={()=>toggle("account")}
style={{
...item,
...(openSection==="account" ? highlight : {})
}}
>

<span>Account</span>
<span>{openSection==="account" ? "v" : ">"}</span>

</div>

{openSection==="account" && (

<div>

<div style={subItem}>Referrals</div>
<div style={subItem}>Settings</div>

</div>

)}

<hr style={{margin:"15px 0"}}/>

{/* SUPPORT */}

<div
onClick={()=>toggle("support")}
style={{
...item,
...(openSection==="support" ? highlight : {})
}}
>

<span>Support</span>
<span>{openSection==="support" ? "v" : ">"}</span>

</div>

{openSection==="support" && (

<div>

<div style={subItem}>Ask Question</div>
<div style={subItem}>Help Center</div>
<div style={subItem}>Contact Support</div>

</div>

)}

{/* SIGN OUT */}

<div
onClick={logout}
style={{
marginTop:25,
padding:"12px",
borderRadius:10,
cursor:"pointer",
color:"#ff5e5e",
textAlign:"center",
border:"1px solid rgba(255,0,0,0.25)"
}}
>
Sign Out
</div>

</div>

</div>

);

}
