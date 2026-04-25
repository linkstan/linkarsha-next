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
position:"relative"
}}
>

{/* BIG WAVE */}

<svg
viewBox="0 0 1440 260"
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
d="M0,180C240,120 420,200 620,160C820,120 1000,60 1200,80C1320,90 1380,120 1440,140L1440,260L0,260Z"
/>

</svg>

</div>


{/* AVATAR ON WAVE */}

<div
style={{
marginTop:-70,
marginBottom:50,
zIndex:5
}}
>

<div
style={{
width:110,
height:110,
borderRadius:"50%",
border:"6px solid #d8a9a3",
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
width:32,
height:32
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
