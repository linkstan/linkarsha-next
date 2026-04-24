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
padding:"50px 20px 110px",
textAlign:"center"
}}
>

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
