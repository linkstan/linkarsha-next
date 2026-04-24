"use client";

export default function BlueprintTheme({
profile,
appearance,
blocks,
socialLinks,
buildSocialUrl
}){

const primaryBlocks = blocks.slice(0,5);

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

{/* TOP SECTION */}

<div
style={{
width:"100%",
maxWidth:420,
background:"#e9e1d8",
padding:"40px 20px 90px",
textAlign:"center",
position:"relative"
}}
>

{/* LOGO */}

{profile.avatar && (

<img
src={profile.avatar}
style={{
width:60,
height:60,
borderRadius:"50%",
objectFit:"cover",
marginBottom:10
}}
/>

)}

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
marginTop:4,
opacity:.7
}}
>
{profile.subtitle}
</div>

)}

</div>


{/* PROFILE IMAGE */}

<div
style={{
marginTop:-70,
marginBottom:20
}}
>

<img
src={profile.avatar || ""}
style={{
width:140,
height:140,
borderRadius:"50%",
border:"6px solid #e9e1d8",
objectFit:"cover"
}}
/>

</div>


{/* BIO */}

{profile.bio && (

<div
style={{
maxWidth:300,
textAlign:"center",
fontSize:15,
lineHeight:1.5,
marginBottom:30
}}
>
{profile.bio}
</div>

)}


{/* BUTTON GRID */}

<div
style={{
display:"grid",
gridTemplateColumns:"1fr 1fr 1fr",
gap:30,
maxWidth:340,
marginBottom:60
}}
>

{primaryBlocks.map((block)=>{

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
width:26,
height:26,
opacity:.8
}}
/>

</div>

<div
style={{
fontSize:12,
letterSpacing:1
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
