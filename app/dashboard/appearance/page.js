"use client";

import Link from "next/link";

export default function Appearance(){

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
cursor:"pointer",
color:"var(--text)"
}}>

<div style={{display:"flex",alignItems:"center",gap:15}}>

<div style={{
width:55,
height:55,
borderRadius:"12px",
background:"linear-gradient(45deg,#ff7a18,#ffb347)"
}}></div>

<div>Custom</div>

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

<div style={card}>

<div style={{display:"flex",alignItems:"center",gap:12}}>

<div style={{
width:36,
height:36,
borderRadius:"50%",
background:"#888"
}}></div>

<div>Header</div>

</div>

<div style={{opacity:.6}}>Classic →</div>

</div>

<div style={card}>

<div style={{display:"flex",alignItems:"center",gap:12}}>

<div style={{
width:36,
height:36,
borderRadius:"10px",
background:"linear-gradient(45deg,#ff7a18,#ffd000)"
}}></div>

<div>Wallpaper</div>

</div>

<div style={{opacity:.6}}>Gradient →</div>

</div>

<div style={card}>

<div style={{display:"flex",alignItems:"center",gap:12}}>

<div style={{
width:38,
height:18,
border:"2px solid var(--text)",
borderRadius:"6px"
}}></div>

<div>Buttons</div>

</div>

<div style={{opacity:.6}}>Outline →</div>

</div>

<div style={card}>

<div style={{display:"flex",alignItems:"center",gap:12}}>

<div style={{fontSize:20}}>Aa</div>

<div>Text</div>

</div>

<div style={{opacity:.6}}>Summer Glow →</div>

</div>

<div style={card}>

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

<div>→</div>

</div>

</div>

</div>

);

}
