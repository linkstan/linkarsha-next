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
background:"#355f6b",
display:"flex",
flexDirection:"column",
alignItems:"center"
}}
>

{/* TOP BEIGE AREA */}

<div
style={{
width:"100%",
height:260,
background:"#e9e1d8",
position:"relative",
overflow:"hidden"
}}
>

{/* SMOOTH WAVE DIVIDER */}

<svg
viewBox="0 0 1440 320"
preserveAspectRatio="none"
style={{
position:"absolute",
bottom:0,
left:0,
width:"100%",
height:220
}}
>

<path
fill="#355f6b"
d="
M0,224
C180,180 320,260 480,220
C640,180 760,140 920,160
C1080,180 1200,120 1320,80
C1380,60 1420,40 1440,32
L1440,320
L0,320
Z"
/>

</svg>

</div>

{/* AVATAR */}

<div
style={{
marginTop:-65,
marginBottom:40,
zIndex:5
}}
>

<div
style={{
width:110,
height:110,
borderRadius:"50%",
border:"7px solid #d7a8a2",
overflow:"hidden",
background:"#fff"
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
maxWidth:320,
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:50,
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
width:90,
height:90,
borderRadius:"50%",
border:"3px solid #e8ddd4",
display:"flex",
alignItems:"center",
justifyContent:"center",
marginBottom:12
}}
>

<img
src="/icons/other.png"
style={{
width:34,
height:34
}}
/>

</div>

<div
style={{
fontSize:14,
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
