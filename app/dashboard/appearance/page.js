"use client";

import { themes } from "../../lib/themes";
import { useState,useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default function Appearance(){

const [editor,setEditor] = useState("main");
const [theme,setTheme] = useState("minimal");

const currentTheme = themes[theme] || themes.minimal;

const themePreview={

minimal:"#ffffff",
samira:"#e9ded9",
modernminimal:"#efe8e1",
archway:"#f3efe9",
blueprint:"#2f5668",
solstice:"#efe9df",
portfolio:"#2c2c2c",
ripple:"#d8c9be"

};

useEffect(()=>{
loadTheme();
},[]);

async function loadTheme(){

const {data:{session}} =
await supabase.auth.getSession();

if(!session) return;

const {data}=await supabase
.from("profiles")
.select("theme")
.eq("id",session.user.id)
.single();

if(data?.theme){

setTheme(data.theme);

window.dispatchEvent(
new CustomEvent(
"theme-change",
{
detail:data.theme
}
)
);

}

}

useEffect(()=>{

function handleThemeChange(e){

setTheme(e.detail);

}

window.addEventListener(
"theme-change",
handleThemeChange
);

return ()=>{

window.removeEventListener(
"theme-change",
handleThemeChange
);

};

},[]);

/* CARD */

const card={

background:"var(--card)",
padding:"18px",
borderRadius:"16px",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
marginBottom:"14px",
cursor:"pointer",
border:"1px solid var(--border)",
color:"var(--text)"

};

/* ARROW */

const arrow={

width:36,
height:36,
borderRadius:"50%",
border:"1px solid var(--border)",
display:"flex",
alignItems:"center",
justifyContent:"center",
background:"var(--bg)"

};

/* INPUT */

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


/* ================================================= */
/* MAIN PAGE */
/* ================================================= */

if(editor==="main"){

return(

<div
style={{
padding:"20px",
background:"var(--bg)",
minHeight:"100vh",
color:"var(--text)"
}}
>

<div style={{maxWidth:650}}>

<h2 style={{marginBottom:15}}>
Theme
</h2>

{/* THEME SELECT */}

<Link
href="/dashboard/appearance/themes"
style={{
textDecoration:"none",
color:"var(--text)"
}}
>

<div
style={{
background:"var(--card)",
padding:"20px",
borderRadius:"18px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"25px",
border:"1px solid var(--border)",
cursor:"pointer"
}}
>

<div
style={{
display:"flex",
alignItems:"center",
gap:15
}}
>

<div
style={{
width:55,
height:55,
borderRadius:"12px",
background:
themePreview[theme] || "#fff",
border:"1px solid var(--border)"
}}
/>

<div>
{currentTheme.name}
</div>

</div>

<div style={arrow}>
→
</div>

</div>

</Link>

<h3
style={{
fontSize:"20px",
fontWeight:"600",
marginTop:"30px",
marginBottom:"10px"
}}
>
Customize theme
</h3>

{/* HEADER */}

{currentTheme.features.hero && (

<Link
href="/dashboard/appearance/header"
style={{
textDecoration:"none",
color:"var(--text)"
}}
>

<div style={card}>

<div
style={{
display:"flex",
alignItems:"center",
gap:12
}}
>

<div
style={{
width:36,
height:36,
borderRadius:"50%",
background:"#888"
}}
/>

<div>
Header
</div>

</div>

<div style={arrow}>
→
</div>

</div>

</Link>

)}

{/* BUTTONS */}

<Link
href="/dashboard/appearance/buttons"
style={{
textDecoration:"none",
color:"var(--text)"
}}
>

<div style={card}>

<div
style={{
display:"flex",
alignItems:"center",
gap:12
}}
>

<div
style={{
width:38,
height:18,
border:"2px solid var(--text)",
borderRadius:"6px"
}}
/>

<div>
Buttons
</div>

</div>

<div style={arrow}>
→
</div>

</div>

</Link>

{/* TEXT */}

<div
style={card}
onClick={()=>setEditor("text")}
>

<div
style={{
display:"flex",
alignItems:"center",
gap:12
}}
>

<div style={{fontSize:20}}>
Aa
</div>

<div>
Text
</div>

</div>

<div style={arrow}>
→
</div>

</div>

{/* WALLPAPER */}

{currentTheme.features.heroImage && (

<Link
href="/dashboard/appearance/wallpaper"
style={{
textDecoration:"none",
color:"var(--text)"
}}
>

<div style={card}>

<div
style={{
display:"flex",
alignItems:"center",
gap:12
}}
>

<div style={{fontSize:20}}>
🖼️
</div>

<div>
Wallpaper
</div>

</div>

<div style={arrow}>
→
</div>

</div>

</Link>

)}

{/* SOCIAL ICONS */}

{currentTheme.features.socialIcons && (

<div style={card}>

<div
style={{
display:"flex",
alignItems:"center",
gap:12
}}
>

<div style={{fontSize:20}}>
◎
</div>

<div>
Social Icons
</div>

</div>

<div style={arrow}>
→
</div>

</div>

)}

{/* SUBTITLE */}

{currentTheme.features.subtitle && (

<div style={card}>

<div
style={{
display:"flex",
alignItems:"center",
gap:12
}}
>

<div style={{fontSize:20}}>
✎
</div>

<div>
Subtitle
</div>

</div>

<div style={arrow}>
→
</div>

</div>

)}

{/* COLORS */}

<div
style={card}
onClick={()=>setEditor("colors")}
>

<div
style={{
display:"flex",
alignItems:"center",
gap:12
}}
>

<div
style={{
width:30,
height:30,
background:"var(--bg)",
borderRadius:"6px",
border:"1px solid var(--border)"
}}
/>

<div>
Colors
</div>

</div>

<div style={arrow}>
→
</div>

</div>

</div>

</div>

);

}


/* ================================================= */
/* TEXT */
/* ================================================= */

if(editor==="text"){

return(

<div style={{padding:20,maxWidth:650}}>

<div
onClick={()=>setEditor("main")}
style={{
display:"flex",
alignItems:"center",
gap:10,
cursor:"pointer",
marginBottom:20
}}
>

<div style={arrow}>
←
</div>

<div>
Text
</div>

</div>

<h3>
Font
</h3>

<select
style={{
padding:10,
marginTop:10
}}
>

<option>Inter</option>
<option>Montserrat</option>
<option>Poppins</option>
<option>Roboto</option>
<option>Playfair Display</option>

</select>

<h3 style={{marginTop:25}}>
Text Color
</h3>

<div style={inputRow}>

<div>
#FFFFFF
</div>

<div style={arrow}>
→
</div>

</div>

</div>

);

}


/* ================================================= */
/* COLORS */
/* ================================================= */

if(editor==="colors"){

return(

<div style={{padding:20,maxWidth:650}}>

<div
onClick={()=>setEditor("main")}
style={{
display:"flex",
alignItems:"center",
gap:10,
cursor:"pointer",
marginBottom:20
}}
>

<div style={arrow}>
←
</div>

<div>
Colors
</div>

</div>

<h3>
Buttons
</h3>

<div style={inputRow}>

<div>
#FFFFFF
</div>

<div style={arrow}>
→
</div>

</div>

<h3>
Button Text
</h3>

<div style={inputRow}>

<div>
#000000
</div>

<div style={arrow}>
→
</div>

</div>

<h3>
Page Text
</h3>

<div style={inputRow}>

<div>
#FFFFFF
</div>

<div style={arrow}>
→
</div>

</div>

<h3>
Title Text
</h3>

<div style={inputRow}>

<div>
#FFFFFF
</div>

<div style={arrow}>
→
</div>

</div>

</div>

);

}

}
