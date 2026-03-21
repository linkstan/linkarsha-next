"use client";

import { useState } from "react";

export default function Appearance() {

const [page,setPage] = useState("main");
const [theme,setTheme] = useState({
name:"Custom",
preview:"linear-gradient(45deg,#ff7a18,#ffb347)"
});

/* 15 THEMES */

const themes=[
{name:"Minimal",preview:"#ffffff"},
{name:"Midnight",preview:"#0b0b12"},
{name:"Neon Glow",preview:"linear-gradient(45deg,#00f2fe,#7c5cff)"},
{name:"Sunset",preview:"linear-gradient(45deg,#ff7a18,#ffb347)"},
{name:"Ocean",preview:"linear-gradient(45deg,#2193b0,#6dd5ed)"},
{name:"Glass",preview:"linear-gradient(45deg,#e0eafc,#cfdef3)"},
{name:"Luxury",preview:"linear-gradient(45deg,#000000,#434343)"},
{name:"Creator Pro",preview:"linear-gradient(45deg,#ff9966,#ff5e62)"},
{name:"Soft Pastel",preview:"linear-gradient(45deg,#fbc2eb,#a6c1ee)"},
{name:"Mono",preview:"#111"},
{name:"Gradient Flow",preview:"linear-gradient(45deg,#667eea,#764ba2)"},
{name:"Dark Pro",preview:"#121212"},
{name:"Vivid",preview:"linear-gradient(45deg,#f83600,#f9d423)"},
{name:"Elegant",preview:"linear-gradient(45deg,#bdc3c7,#2c3e50)"},
{name:"Tech",preview:"linear-gradient(45deg,#00c6ff,#0072ff)"}
];

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

const sectionTitle={
fontSize:"20px",
fontWeight:"600",
marginTop:"30px",
marginBottom:"10px",
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

/* PAGE RENDER */

function renderPage(){

/* MAIN PAGE */

if(page==="main"){
return(

<div style={{maxWidth:650}}>

<h2 style={{marginBottom:15,color:"var(--text)"}}>Theme</h2>

<div style={{
background:"var(--card)",
padding:"20px",
borderRadius:"18px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"25px",
border:"1px solid var(--border)",
color:"var(--text)"
}}>

<div style={{display:"flex",alignItems:"center",gap:15}}>
<div style={{
width:55,
height:55,
borderRadius:"12px",
background:theme.preview
}}></div>

<div>{theme.name}</div>
</div>

<div
style={{opacity:.7,cursor:"pointer"}}
onClick={()=>setPage("themes")}
>
More >
</div>

</div>

<h3 style={sectionTitle}>Customize theme</h3>

<div style={card} onClick={()=>setPage("header")}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{
width:36,
height:36,
borderRadius:"50%",
background:"#888"
}}></div>
<div>Header</div>
</div>

<div style={{opacity:.6}}>Classic ></div>
</div>

<div style={card} onClick={()=>setPage("wallpaper")}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{
width:36,
height:36,
borderRadius:"10px",
background:"linear-gradient(45deg,#ff7a18,#ffd000)"
}}></div>
<div>Wallpaper</div>
</div>

<div style={{opacity:.6}}>Gradient ></div>
</div>

<div style={card} onClick={()=>setPage("buttons")}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{
width:38,
height:18,
border:"2px solid var(--text)",
borderRadius:"6px"
}}></div>

<div>Buttons</div>
</div>

<div style={{opacity:.6}}>Outline ></div>
</div>

<div style={card} onClick={()=>setPage("text")}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{fontSize:20}}>Aa</div>
<div>Text</div>
</div>

<div style={{opacity:.6}}>Summer Glow ></div>
</div>

<div style={card} onClick={()=>setPage("colors")}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{
width:30,
height:30,
background:"var(--bg)",
borderRadius:"6px",
border:"1px solid var(--border)"
}}></div>

<div>Colors</div>
</div>

<div>></div>
</div>

</div>
);
}

/* THEMES PAGE */

if(page==="themes"){
return(

<div style={{maxWidth:650}}>

<div onClick={()=>setPage("main")} style={{cursor:"pointer",marginBottom:20}}>
&lt; Themes
</div>

<h3 style={{marginBottom:20}}>Select Theme</h3>

<div style={{
display:"grid",
gridTemplateColumns:"1fr 1fr 1fr",
gap:20
}}>

{themes.map(t=>(
<div
key={t.name}
onClick={()=>{
setTheme(t);
setPage("main");
}}
style={{
cursor:"pointer",
border:"1px solid var(--border)",
borderRadius:12,
padding:10,
textAlign:"center",
background:"var(--card)"
}}
>

<div style={{
height:70,
borderRadius:8,
background:t.preview,
marginBottom:8
}}></div>

<div>{t.name}</div>

</div>
))}

</div>

</div>
);
}

/* OTHER PAGES REMAIN SAME */

if(page==="header"){
return(
<div style={{maxWidth:650,color:"var(--text)"}}>
<div style={{cursor:"pointer"}} onClick={()=>setPage("main")}>
&lt; Header
</div>
<h3 style={{marginTop:25}}>Profile image</h3>
</div>
);
}

if(page==="wallpaper"){
return(
<div style={{maxWidth:650,color:"var(--text)"}}>
<div onClick={()=>setPage("main")} style={{cursor:"pointer"}}>
&lt; Wallpaper
</div>
</div>
);
}

if(page==="buttons"){
return(
<div style={{maxWidth:650,color:"var(--text)"}}>
<div onClick={()=>setPage("main")} style={{cursor:"pointer"}}>
&lt; Buttons
</div>
</div>
);
}

if(page==="text"){
return(
<div style={{maxWidth:650,color:"var(--text)"}}>
<div onClick={()=>setPage("main")} style={{cursor:"pointer"}}>
&lt; Text
</div>
</div>
);
}

if(page==="colors"){
return(
<div style={{maxWidth:650,color:"var(--text)"}}>
<div onClick={()=>setPage("main")} style={{cursor:"pointer"}}>
&lt; Colors
</div>
</div>
);
}

}

return (
<div style={{
padding:"20px",
background:"var(--bg)",
minHeight:"100vh",
color:"var(--text)"
}}>
{renderPage()}
</div>
);

}
