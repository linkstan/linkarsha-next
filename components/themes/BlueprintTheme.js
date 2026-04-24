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
padding:"50px 20px 80px",
textAlign:"center",
position:"relative"
}}
>

{/* PROFILE IMAGE */}

<div
style={{
width:80,
height:80,
borderRadius:"50%",
margin:"0 auto 10px",
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


{/* NAME */}

<div
style={{
fontSize:26,
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
marginTop:4
}}
>
{profile.subtitle}
</div>

)}


{/* WAVE DIVIDER */}

<svg
viewBox="0 0 1440 120"
style={{
position:"absolute",
bottom:-1,
left:0,
width:"100%",
height:120
}}
>

<path
fill="#2f5668"
d="M0,64L80,74.7C160,85,320,107,480,101.3C640,96,800,64,960,53.3C1120,43,1280,53,1360,58.7L1440,64L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z"
/>

</svg>

</div>
{/* LOGO / PROFILE */}

<div
style={{
width:80,
height:80,
borderRadius:"50%",
border:"6px solid #e9e1d8",
margin:"0 auto 10px",
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


{/* NAME */}

<div
style={{
fontSize:26,
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
marginTop:4
}}
>
{profile.subtitle}
</div>

)}

</div>


{/* DARK SECTION */}

<div
style={{
width:"100%",
maxWidth:360,
padding:"40px 20px",
display:"grid",
gridTemplateColumns:"1fr 1fr 1fr",
gap:28,
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
width:60,
height:60,
borderRadius:"50%",
border:"2px solid #f1e2d6",
display:"flex",
alignItems:"center",
justifyContent:"center",
marginBottom:8
}}
>

<img
src="/icons/other.png"
style={{
width:24,
height:24,
opacity:.85
}}
/>

</div>

<div
style={{
fontSize:12,
letterSpacing:1,
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
