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
padding:"92px 24px 140px",
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
width:124,
height:124,
borderRadius:"50%",
objectFit:"cover",
marginBottom:28,
boxShadow:
"0 18px 50px rgba(0,0,0,.08)"
}}
/>

{/* NAME */}

<div
style={{
fontSize:"clamp(42px,8vw,76px)",
fontWeight:700,
letterSpacing:"-.075em",
lineHeight:.92,
maxWidth:620,
fontFeatureSettings:
'"ss01" on, "cv01" on'
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
opacity:.38,
fontWeight:600
}}
>
@{profile?.username}
</div>

{/* SUBTITLE */}

{header?.subtitle && (

<div
style={{
marginTop:28,
fontSize:"clamp(20px,4vw,28px)",
lineHeight:1.5,
maxWidth:620,
opacity:.72,
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
gap:22,
marginTop:84
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
: "1px solid rgba(0,0,0,.05)",

background:
index===0
? "#0f0f10"
: "#fafafa",

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

? "0 24px 60px rgba(0,0,0,.14)"

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
padding:"13px 20px",
borderRadius:999,
background:"#f7f7f7",
border:"1px solid rgba(0,0,0,.04)",
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

</div>

);

}
