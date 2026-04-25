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
background:"#335d69",
display:"flex",
flexDirection:"column",
alignItems:"center"
}}
>

{/* TOP BEIGE SECTION */}

<div
style={{
width:"100%",
height:260,
background:"#e9e1d8",
position:"relative"
}}
>

{/* WAVE */}

<svg
viewBox="0 0 1440 160"
style={{
position:"absolute",
bottom:0,
left:0,
width:"100%",
height:160
}}
>

<path
fill="#335d69"
d="M0,64C200,120 350,20 520,60C700,100 880,40 1050,60C1220,80 1360,140 1440,120L1440,160L0,160Z"
/>

</svg>

</div>


{/* AVATAR ON WAVE */}

<div
style={{
marginTop:-55,
marginBottom:40,
zIndex:10
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
maxWidth:360,
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:40,
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
