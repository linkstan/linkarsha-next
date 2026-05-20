"use client";

export default function MinimalTheme({
profile,
appearance,
blocks,
socialLinks,
buildSocialUrl
}){

const header =
appearance?.header || {};

return(

<div
style={{
width:"100%",
minHeight:"100vh",
background:"#ffffff",
display:"flex",
flexDirection:"column",
alignItems:"center",
padding:"64px 20px 120px",
fontFamily:"Inter, sans-serif",
color:"#111111"
}}
>

{/* HERO */}

<div
style={{
width:"100%",
maxWidth:720,
display:"flex",
flexDirection:"column",
alignItems:"center",
textAlign:"center"
}}
>

{/* AVATAR */}

<img
src={profile?.avatar || ""}
style={{
width:112,
height:112,
borderRadius:"50%",
objectFit:"cover",
marginBottom:28
}}
/>

{/* NAME */}

<div
style={{
fontSize:"clamp(42px,8vw,76px)",
fontWeight:700,
letterSpacing:"-.06em",
lineHeight:.92,
maxWidth:620
}}
>
{profile?.display_name || profile?.username}
</div>

{/* USERNAME */}

<div
style={{
marginTop:16,
fontSize:15,
letterSpacing:".08em",
textTransform:"uppercase",
opacity:.45
}}
>
@{profile?.username}
</div>

{/* SUBTITLE */}

{header?.subtitle && (

<div
style={{
marginTop:28,
fontSize:22,
lineHeight:1.4,
maxWidth:620,
opacity:.82,
fontWeight:500
}}
>
{header.subtitle}
</div>

)}

{/* BIO */}

{profile?.bio && (

<div
style={{
marginTop:24,
fontSize:16,
lineHeight:1.8,
maxWidth:540,
opacity:.68
}}
>
{profile.bio}
</div>

)}

</div>


{/* CTA STACK */}

<div
style={{
width:"100%",
maxWidth:640,
display:"flex",
flexDirection:"column",
gap:18,
marginTop:64
}}
>

{blocks.map((block,index)=>(

<a
key={block.id}
href={block?.data_json?.url || "#"}
target="_blank"
rel="noopener noreferrer"
style={{
width:"100%",
padding:"24px 26px",
borderRadius:28,
border:
index===0
? "2px solid #111"
: "1px solid rgba(0,0,0,.08)",

background:
index===0
? "#111111"
: "#f7f7f7",

color:
index===0
? "#ffffff"
: "#111111",

textDecoration:"none",

display:"flex",
alignItems:"center",
justifyContent:"space-between",

transition:"all .25s ease",

boxShadow:

index===0

? "0 14px 40px rgba(0,0,0,.12)"

: "none"
}}
>

<div
style={{
display:"flex",
flexDirection:"column",
gap:6
}}
>

<div
style={{
fontSize:18,
fontWeight:600,
letterSpacing:"-.03em"
}}
>
{block?.data_json?.title}
</div>

{block?.data_json?.description && (

<div
style={{
fontSize:14,
opacity:.58,
lineHeight:1.5
}}
>
{block?.data_json?.description}
</div>

)}

</div>

<div
style={{
fontSize:20,
opacity:.45
}}
>
↗
</div>

</a>

))}

</div>


{/* SOCIALS */}

{Object.keys(socialLinks || {}).length > 0 && (

<div
style={{
display:"flex",
flexWrap:"wrap",
justifyContent:"center",
gap:14,
marginTop:58
}}
>

{Object.entries(socialLinks).map(([platform,usernames])=>

usernames?.map((username,i)=>(

<a
key={platform+i}
href={buildSocialUrl(platform,username)}
target="_blank"
rel="noopener noreferrer"
style={{
padding:"12px 18px",
borderRadius:999,
background:"#f4f4f4",
textDecoration:"none",
color:"#111111",
fontSize:14,
fontWeight:500,
letterSpacing:"-.01em"
}}
>
{platform}
</a>

))

)}

</div>

)}


{/* FOOTER */}

<div
style={{
marginTop:80,
fontSize:13,
opacity:.35,
letterSpacing:".08em",
textTransform:"uppercase"
}}
>
minimal theme
</div>

</div>

);

}
