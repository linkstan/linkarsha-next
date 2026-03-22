"use client";

import { useState,useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default function Appearance(){

const [page,setPage] = useState("main");
const [theme,setTheme] = useState("Minimal");

/* THEME PREVIEW */

const themePreview={
Minimal:"#ffffff",
Midnight:"#0b0b12",
Ocean:"linear-gradient(45deg,#2193b0,#6dd5ed)",
Sunset:"linear-gradient(45deg,#ff7a18,#ffb347)",
Neon:"linear-gradient(45deg,#00f2fe,#7c5cff)",
Luxury:"#000000",
Pastel:"linear-gradient(45deg,#fbc2eb,#a6c1ee)",
Mono:"#111111"
};

useEffect(()=>{
loadTheme();
},[]);

async function loadTheme(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const {data}=await supabase
.from("profiles")
.select("theme")
.eq("id",session.user.id)
.single();

if(data?.theme){
setTheme(data.theme);
}

}

/* UI STYLES */

const card={
background:"var(--card)",
padding:"18px",
borderRadius:"14px",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
marginBottom:"14px",
cursor:"pointer",
border:"1px solid var(--border)",
color:"var(--text)"
};

const inputRow={
background:"var(--card)",
border:"1px solid var(--border)",
borderRadius:"30px",
padding:"14px 18px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"22px",
color:"var(--text)"
};

/* MAIN PAGE */

if(page==="main"){

return(

<div style={{
padding:"20px",
background:"var(--bg)",
minHeight:"100vh",
color:"var(--text)"
}}>

<div style={{maxWidth:650}}>

<h2 style={{marginBottom:15}}>Theme</h2>

<Link href="/dashboard/appearance/themes" style={{textDecoration:"none"}}>

<div style={{
background:"var(--card)",
padding:"20px",
borderRadius:"18px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"25px",
border:"1px solid var(--border)",
cursor:"pointer"
}}>

<div style={{display:"flex",alignItems:"center",gap:15}}>

<div style={{
width:55,
height:55,
borderRadius:"12px",
background:themePreview[theme] || "#fff",
border:"1px solid var(--border)"
}}/>

<div>{theme}</div>

</div>

<div style={{opacity:.7}}>More →</div>

</div>

</Link>

<h3 style={{
fontSize:"20px",
fontWeight:"600",
marginTop:"30px",
marginBottom:"10px"
}}>
Customize theme
</h3>

{/* HEADER */}

<div style={card} onClick={()=>setPage("header")}>

<div style={{display:"flex",alignItems:"center",gap:12}}>

<div style={{
width:36,
height:36,
borderRadius:"50%",
background:"#888"
}}/>

<div>Header</div>

</div>

<div style={{opacity:.6}}>Classic →</div>

</div>

{/* WALLPAPER */}

<div style={card} onClick={()=>setPage("wallpaper")}>

<div style={{display:"flex",alignItems:"center",gap:12}}>

<div style={{
width:36,
height:36,
borderRadius:"10px",
background:"linear-gradient(45deg,#ff7a18,#ffd000)"
}}/>

<div>Wallpaper</div>

</div>

<div style={{opacity:.6}}>Gradient →</div>

</div>

{/* BUTTONS */}

<div style={card} onClick={()=>setPage("buttons")}>

<div style={{display:"flex",alignItems:"center",gap:12}}>

<div style={{
width:38,
height:18,
border:"2px solid var(--text)",
borderRadius:"6px"
}}/>

<div>Buttons</div>

</div>

<div style={{opacity:.6}}>Outline →</div>

</div>

{/* TEXT */}

<div style={card} onClick={()=>setPage("text")}>

<div style={{display:"flex",alignItems:"center",gap:12}}>

<div style={{fontSize:20}}>Aa</div>

<div>Text</div>

</div>

<div style={{opacity:.6}}>Summer Glow →</div>

</div>

{/* COLORS */}

<div style={card} onClick={()=>setPage("colors")}>

<div style={{display:"flex",alignItems:"center",gap:12}}>

<div style={{
width:30,
height:30,
background:"var(--bg)",
borderRadius:"6px",
border:"1px solid var(--border)"
}}/>

<div>Colors</div>

</div>

<div>→</div>

</div>

</div>

</div>

);

}

/* HEADER PAGE */

if(page==="header"){

return(

<div style={{padding:20,maxWidth:650}}>

<div onClick={()=>setPage("main")} style={{cursor:"pointer",marginBottom:20}}>
← Header
</div>

<h3>Profile image</h3>

<div style={{
display:"flex",
alignItems:"center",
gap:15,
marginBottom:25
}}>

<div style={{
width:60,
height:60,
borderRadius:"50%",
background:"#888"
}}/>

<button style={{
background:"var(--card)",
color:"var(--text)",
borderRadius:"25px",
padding:"10px 18px",
border:"1px solid var(--border)"
}}>
+ Add
</button>

</div>

<h3>Profile image layout</h3>

<div style={{display:"flex",gap:12}}>
<button>Classic</button>
<button>Hero</button>
</div>

</div>

);

}

/* WALLPAPER PAGE */

if(page==="wallpaper"){

return(

<div style={{padding:20,maxWidth:650}}>

<div onClick={()=>setPage("main")} style={{cursor:"pointer",marginBottom:20}}>
← Wallpaper
</div>

<h3>Wallpaper style</h3>

<div style={{
display:"grid",
gridTemplateColumns:"1fr 1fr 1fr",
gap:20
}}>

<div><div style={{height:70,background:"#ccc"}}/><div>Fill</div></div>
<div><div style={{height:70,background:"linear-gradient(45deg,orange,red)"}}/><div>Gradient</div></div>
<div><div style={{height:70,background:"#aaa"}}/><div>Blur</div></div>

</div>

</div>

);

}

/* BUTTONS PAGE */

if(page==="buttons"){

return(

<div style={{padding:20,maxWidth:650}}>

<div onClick={()=>setPage("main")} style={{cursor:"pointer",marginBottom:20}}>
← Buttons
</div>

<h3>Button style</h3>

<div style={{display:"flex",gap:15}}>
<button>Solid</button>
<button>Glass</button>
<button>Outline</button>
</div>

<h3 style={{marginTop:25}}>Corner roundness</h3>

<div style={{display:"flex",gap:15}}>
<button>Square</button>
<button>Round</button>
<button>Rounder</button>
<button>Full</button>
</div>

</div>

);

}

/* TEXT PAGE */

if(page==="text"){

return(

<div style={{padding:20,maxWidth:650}}>

<div onClick={()=>setPage("main")} style={{cursor:"pointer",marginBottom:20}}>
← Text
</div>

<h3>Page font</h3>

<select style={{width:"100%",padding:10}}>
<option>Link Sans</option>
<option>Inter</option>
<option>Montserrat</option>
<option>Poppins</option>
</select>

<h3 style={{marginTop:20}}>Page text color</h3>

<div style={inputRow}>
<div>#FFFFFF</div>
<div>→</div>
</div>

</div>

);

}

/* COLORS PAGE */

if(page==="colors"){

return(

<div style={{padding:20,maxWidth:650}}>

<div onClick={()=>setPage("main")} style={{cursor:"pointer",marginBottom:20}}>
← Colors
</div>

<h3>Buttons</h3>
<div style={inputRow}><div>#FFFFFF</div><div>→</div></div>

<h3>Button Text</h3>
<div style={inputRow}><div>#000000</div><div>→</div></div>

<h3>Page Text</h3>
<div style={inputRow}><div>#FFFFFF</div><div>→</div></div>

<h3>Title Text</h3>
<div style={inputRow}><div>#FFFFFF</div><div>→</div></div>

</div>

);

}

}
