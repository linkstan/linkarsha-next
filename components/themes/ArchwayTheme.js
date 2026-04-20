"use client";

export default function ArchwayTheme({
profile,
appearance,
blocks,
socialLinks,
buildSocialUrl
}){

const headerImage = appearance?.header?.heroImage || profile.avatar || "";

const blur = appearance?.header?.blur ?? 12;

return(

<div
style={{
width:"100%",
background:"#f3efe9",
display:"flex",
flexDirection:"column",
alignItems:"center",
minHeight:"100vh"
}}
>

{/* HEADER IMAGE */}

<div
style={{
width:"100%",
height:220,
backgroundImage:`url(${headerImage})`,
backgroundSize:"cover",
backgroundPosition:"center",
filter:`blur(${blur}px)`,
position:"relative"
}}
/>


{/* PROFILE ARCH */}

<div
style={{
width:220,
height:260,
marginTop:-120,
borderTopLeftRadius:140,
borderTopRightRadius:140,
borderBottomLeftRadius:16,
borderBottomRightRadius:16,
overflow:"hidden",
background:"#f3efe9"
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
fontFamily:"Playfair Display",
fontSize:32,
marginTop:20,
color:"#1a1a1a"
}}
>
{profile.display_name || profile.username}
</div>


{/* SUBTITLE */}

{appearance?.header?.subtitle && (

<div
style={{
fontSize:14,
letterSpacing:2,
opacity:.7,
marginTop:4
}}
>
{appearance.header.subtitle}
</div>

)}


{/* CONTACT LINKS */}

<div
style={{
marginTop:25,
display:"flex",
flexDirection:"column",
gap:12,
alignItems:"center"
}}
>

{blocks.slice(0,3).map((block)=>(

<div
key={block.id}
style={{
display:"flex",
alignItems:"center",
gap:10,
fontSize:15,
color:"#444"
}}
>

<span>•</span>

<a
href={block?.data_json?.url || "#"}
style={{
textDecoration:"none",
color:"#444"
}}
>
{block?.data_json?.title}
</a>

</div>

))}

</div>


{/* DIVIDER */}

<div
style={{
width:260,
height:1,
background:"rgba(0,0,0,0.15)",
marginTop:30
}}
/>


{/* SOCIAL HANDLES */}

<div
style={{
marginTop:20,
display:"flex",
flexDirection:"column",
gap:10,
alignItems:"center"
}}
>

{Object.entries(socialLinks).map(([platform,usernames]) =>
usernames?.map((username,i)=>{

return(

<div
key={platform+i}
style={{
display:"flex",
gap:10,
fontSize:15
}}
>

<span>{platform}</span>

<span>@{username}</span>

</div>

);

})
)}

</div>


{/* TAGLINE */}

{profile.bio && (

<div
style={{
marginTop:30,
fontStyle:"italic",
opacity:.7,
textAlign:"center",
maxWidth:260
}}
>
{profile.bio}
</div>

)}


{/* CTA BUTTON */}

{blocks[3] && (

<a
href={blocks[3]?.data_json?.url || "#"}
style={{
marginTop:30,
border:"1px solid #333",
padding:"10px 22px",
textDecoration:"none",
color:"#333",
letterSpacing:2,
fontSize:13
}}
>
{blocks[3]?.data_json?.title}
</a>

)}

</div>

);

}
