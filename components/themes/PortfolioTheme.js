"use client";

export default function PortfolioTheme({
profile,
appearance,
blocks
}){

const mainLinks = blocks.slice(0,4);
const bottomLink = blocks[4];

return(

<div
style={{
minHeight:"100vh",
background:'url("https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200") center / cover no-repeat',
display:"flex",
flexDirection:"column",
alignItems:"center",
paddingTop:120,
fontFamily:"Georgia, serif",
color:"#ffffff"
}}
>

{/* MAIN CARD */}

<div
style={{
width:360,
background:"rgba(255,255,255,0.08)",
border:"2px solid rgba(255,255,255,0.35)",
borderRadius:22,
padding:"90px 25px 40px",
textAlign:"center",
backdropFilter:"blur(6px)",
position:"relative",
overflow:"visible"
}}
>

{/* PROFILE IMAGE */}

<div
style={{
width:120,
height:120,
borderRadius:"50%",
background:`url(${profile.avatar || ""}) center / cover`,
border:"6px solid white",
position:"absolute",
top:-70,
left:"50%",
transform:"translateX(-50%)"
}}
/>

{/* NAME */}

<div
style={{
fontSize:36,
marginBottom:6
}}
>
{profile.display_name || profile.username}
</div>

{/* SUBTITLE */}

{appearance?.header?.subtitle && (

<div
style={{
fontFamily:"Arial",
opacity:.85
}}
>
{appearance.header.subtitle}
</div>

)}

{/* USERNAME */}

<div
style={{
fontFamily:"Arial",
marginTop:6,
opacity:.7
}}
>
@{profile.username}
</div>

{/* DOTTED LINE */}

<div
style={{
margin:"18px auto",
width:160,
borderBottom:"3px dotted rgba(255,255,255,0.7)"
}}
/>

{/* BUTTONS */}

{mainLinks.map((block)=>(
<a
key={block.id}
href={block?.data_json?.url || "#"}
target="_blank"
style={{
display:"block",
width:"100%",
padding:14,
margin:"14px auto",
borderRadius:40,
background:"rgba(255,255,255,0.85)",
color:"#333",
fontFamily:"Arial",
letterSpacing:3,
textDecoration:"none"
}}
>
{block?.data_json?.title}
</a>
))}

</div>


{/* SECOND CARD */}

<div
style={{
width:360,
marginTop:24,
background:"rgba(255,255,255,0.08)",
border:"2px solid rgba(255,255,255,0.35)",
borderRadius:22,
padding:30,
textAlign:"center",
backdropFilter:"blur(6px)"
}}
>

<h2
style={{
fontStyle:"italic",
marginBottom:15
}}
>
Free Template
</h2>

{bottomLink && (

<a
href={bottomLink?.data_json?.url || "#"}
target="_blank"
style={{
display:"block",
padding:14,
borderRadius:40,
background:"rgba(255,255,255,0.85)",
color:"#333",
fontFamily:"Arial",
letterSpacing:3,
textDecoration:"none"
}}
>
{bottomLink?.data_json?.title}
</a>

)}

</div>


{/* FLOAT BUTTON */}

<div
style={{
position:"fixed",
right:20,
bottom:20,
width:48,
height:48,
background:"#111",
borderRadius:12,
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:22
}}
>
☾
</div>

</div>

);

}
