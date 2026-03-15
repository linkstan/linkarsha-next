"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Appearance(){

const [section,setSection] = useState("main");
const [user,setUser] = useState(null);

const [displayName,setDisplayName] = useState("@username");
const [displayFont,setDisplayFont] = useState("Inter");
const [displayColor,setDisplayColor] = useState("#ffffff");

const [buttonColor,setButtonColor] = useState("#ffffff");
const [buttonTextColor,setButtonTextColor] = useState("#000000");

const [pageTextColor,setPageTextColor] = useState("#ffffff");
const [titleTextColor,setTitleTextColor] = useState("#ffffff");

const fonts = [
"Inter","Poppins","Montserrat","Roboto","Open Sans","Nunito","Oswald",
"Lato","Raleway","Playfair Display","Bebas Neue","Anton","Rubik",
"DM Sans","Manrope","Archivo","Cabin","Josefin Sans","Work Sans",
"Kanit","Outfit","Space Grotesk","Exo","Orbitron","Barlow"
];

useEffect(()=>{
init();
},[]);

async function init(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

setUser(session.user);

const {data:prof} = await supabase
.from("profiles")
.select("display_name")
.eq("id",session.user.id)
.single();

if(prof?.display_name){
setDisplayName(prof.display_name);
}

}


/* MAIN */

if(section==="main"){

return(

<div style={{maxWidth:600}}>

<h2 style={{marginBottom:20}}>Theme</h2>

<div style={{
background:"#1a1a25",
padding:20,
borderRadius:14,
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:30
}}>

<div>Custom</div>
<div style={{opacity:0.6}}>More {" >"}</div>

</div>

<h3 style={{marginBottom:10}}>Customize theme</h3>

<div style={card} onClick={()=>setSection("header")}>Header {" >"}</div>
<div style={card} onClick={()=>setSection("wallpaper")}>Wallpaper {" >"}</div>
<div style={card} onClick={()=>setSection("buttons")}>Buttons {" >"}</div>
<div style={card} onClick={()=>setSection("text")}>Text {" >"}</div>
<div style={card} onClick={()=>setSection("colors")}>Colors {" >"}</div>

</div>

);

}


/* HEADER */

if(section==="header"){

return(

<div style={{maxWidth:600}}>

<div style={back} onClick={()=>setSection("main")}>
{"<"} Header
</div>

<h3 style={{marginTop:20}}>Profile Picture</h3>

<div style={{
display:"flex",
alignItems:"center",
gap:15,
marginBottom:20
}}>

<div style={{
width:60,
height:60,
borderRadius:"50%",
background:"#333"
}}></div>

<button style={button}>Edit Profile Picture</button>

</div>


<h3>Profile Picture Layout</h3>

<div style={{display:"flex",gap:10,marginBottom:20}}>
<div style={selectBox}>Classic</div>
<div style={selectBox}>Hero</div>
</div>


<h3>Display Name</h3>

<input
value={displayName}
onChange={(e)=>setDisplayName(e.target.value)}
style={input}
/>


<h3 style={{marginTop:20}}>Display Name Font</h3>

<select
value={displayFont}
onChange={(e)=>setDisplayFont(e.target.value)}
style={input}
>

{fonts.map(f=>(
<option key={f}>{f}</option>
))}

</select>


<h3 style={{marginTop:20}}>Display Name Font Color</h3>

<input
type="color"
value={displayColor}
onChange={(e)=>setDisplayColor(e.target.value)}
style={colorInput}
/>

</div>

);

}


/* WALLPAPER */

if(section==="wallpaper"){

return(

<div style={{maxWidth:600}}>

<div style={back} onClick={()=>setSection("main")}>
{"<"} Wallpaper
</div>

<h3 style={{marginTop:20}}>Wallpaper Style</h3>

<div style={{display:"flex",gap:10,flexWrap:"wrap"}}>

<div style={selectBox}>Fill</div>
<div style={selectBox}>Gradient</div>
<div style={selectBox}>Blur</div>
<div style={selectBox}>Pattern</div>
<div style={selectBox}>Image</div>
<div style={selectBox}>Video</div>

</div>

</div>

);

}


/* BUTTONS */

if(section==="buttons"){

return(

<div style={{maxWidth:600}}>

<div style={back} onClick={()=>setSection("main")}>
{"<"} Buttons
</div>

<h3 style={{marginTop:20}}>Button Style</h3>

<div style={{display:"flex",gap:10,marginBottom:20}}>
<div style={selectBox}>Solid</div>
<div style={selectBox}>Glass</div>
<div style={selectBox}>Outline</div>
</div>


<h3>Corner Roundness</h3>

<div style={{display:"flex",gap:10,marginBottom:20}}>
<div style={selectBox}>Square</div>
<div style={selectBox}>Round</div>
<div style={selectBox}>Rounder</div>
<div style={selectBox}>Full</div>
</div>


<h3>Button Color</h3>

<input
type="color"
value={buttonColor}
onChange={(e)=>setButtonColor(e.target.value)}
style={colorInput}
/>


<h3 style={{marginTop:20}}>Button Text Color</h3>

<input
type="color"
value={buttonTextColor}
onChange={(e)=>setButtonTextColor(e.target.value)}
style={colorInput}
/>

</div>

);

}


/* TEXT */

if(section==="text"){

return(

<div style={{maxWidth:600}}>

<div style={back} onClick={()=>setSection("main")}>
{"<"} Text
</div>

<h3 style={{marginTop:20}}>Page Font</h3>

<select style={input}>
{fonts.map(f=>(
<option key={f}>{f}</option>
))}
</select>


<h3 style={{marginTop:20}}>Page Text Color</h3>

<input
type="color"
value={pageTextColor}
onChange={(e)=>setPageTextColor(e.target.value)}
style={colorInput}
/>


<h3 style={{marginTop:20}}>Title Font</h3>

<select style={input}>
{fonts.map(f=>(
<option key={f}>{f}</option>
))}
</select>


<h3 style={{marginTop:20}}>Title Color</h3>

<input
type="color"
value={titleTextColor}
onChange={(e)=>setTitleTextColor(e.target.value)}
style={colorInput}
/>


<h3 style={{marginTop:20}}>Title Size</h3>

<div style={{display:"flex",gap:10}}>
<div style={selectBox}>Small</div>
<div style={selectBox}>Large</div>
</div>

</div>

);

}


/* COLORS */

if(section==="colors"){

return(

<div style={{maxWidth:600}}>

<div style={back} onClick={()=>setSection("main")}>
{"<"} Colors
</div>

<h3 style={{marginTop:20}}>Buttons</h3>

<input
type="color"
value={buttonColor}
onChange={(e)=>setButtonColor(e.target.value)}
style={colorInput}
/>


<h3 style={{marginTop:20}}>Button Text</h3>

<input
type="color"
value={buttonTextColor}
onChange={(e)=>setButtonTextColor(e.target.value)}
style={colorInput}
/>


<h3 style={{marginTop:20}}>Page Text</h3>

<input
type="color"
value={pageTextColor}
onChange={(e)=>setPageTextColor(e.target.value)}
style={colorInput}
/>


<h3 style={{marginTop:20}}>Title Text</h3>

<input
type="color"
value={titleTextColor}
onChange={(e)=>setTitleTextColor(e.target.value)}
style={colorInput}
/>

</div>

);

}

}



const card={
background:"#1a1a25",
padding:18,
borderRadius:12,
marginBottom:10,
cursor:"pointer"
};

const back={
fontSize:20,
cursor:"pointer",
marginBottom:20
};

const input={
width:"100%",
padding:12,
borderRadius:8,
border:"1px solid #333",
background:"#111",
color:"white"
};

const colorInput={
width:80,
height:40,
border:"none",
cursor:"pointer"
};

const selectBox={
background:"#1a1a25",
padding:12,
borderRadius:10,
cursor:"pointer"
};

const button={
background:"#7c5cff",
border:"none",
padding:"8px 14px",
borderRadius:8,
color:"white",
cursor:"pointer"
};
