"use client";

export default function BlueprintTheme({
profile,
appearance,
blocks,
socialLinks,
buildSocialUrl
}){

const primary = blocks.slice(0,5);

return(

<div
style={{
width:"100%",
minHeight:"100vh",
background:"#2f5668",
display:"flex",
flexDirection:"column",
alignItems:"center",
color:"#f1e2d6"
}}
>

{/* TOP LIGHT SECTION */}

<div
style={{
width:"100%",
background:"#e9e1d8",
padding:"80px 20px 120px",
textAlign:"center",
position:"relative"
}}
>

{/* NAME */}

<div
style={{
fontSize:34,
fontWeight:600,
letterSpacing:1,
color:"#2f5668"
}}
>
{profile.display_name || profile.username}
</div>


{/* SUBTITLE */}

{profile.subtitle && (

<div
style={{
fontSize:14,
opacity:.7,
marginTop:6
}}
>
{profile.subtitle}
</div>

)}

{/* WAVE */}

<svg
viewBox="0 0 1440 150"
style={{
position:"absolute",
bottom:-1,
left:0,
width:"100%",
height:150
}}
>

<path
fill="#2f5668"
d="M0,96L80,101.3C160,107,320,117,480,106.7C640,96,800,64,960,58.7C1120,53,1280,75,1360,85.3L1440,96L1440,160L0,160Z"
/>

</svg>

</div>


{/* PROFILE IMAGE OVERLAP */}

<div
style={{
marginTop:-60,
marginBottom:40,
zIndex:5
}}
>

<div
style={{
width:110,
height:110,
borderRadius:"50%",
border:"6px solid #e6b9b3",
overflow:"hidden"
}}
>

<img
src={profile.avatar || ""}
style={{
width:"100%",
height:"100%",
objectFit:"cover"
}}
/>

</div>

</div>


{/* ICON GRID */}

<div
style={{
width:"100%",
maxWidth:360,
display:"grid",
gridTemplateColumns:"1fr 1fr 1fr",
gap:36,
justifyItems:"center"
}}
>

{primary.map((block)=>{

return(

<a
key={block.id}
href={block?.data_json?.url || "#"}
target="_blank"
style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
textDecoration:"none",
color:"#f1e2d6"
}}
>

<div
style={{
width:80,
height:80,
borderRadius:"50%",
border:"3px solid #f1e2d6",
display:"flex",
alignItems:"center",
justifyContent:"center",
marginBottom:12
}}
>

<img
src="/icons/other.png"
style={{
width:30,
height:30,
opacity:.9
}}
/>

</div>

<div
style={{
fontSize:13,
letterSpacing:2,
textAlign:"center"
}}
>
{block?.data_json?.title}
</div>

</a>

)

})}

</div>

</div>

);

}
