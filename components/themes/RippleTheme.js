"use client";

export default function RippleTheme({
profile,
appearance,
socialLinks,
buildSocialUrl
}) {

const header = appearance?.header || {};

const heroImage =
appearance?.hero?.image
||
appearance?.header?.heroImage
||
"https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1400";

return (

<div
style={{
minHeight:"100vh",

background:
"linear-gradient(180deg,#f7f1ec 0%,#ead9cf 100%)",

fontFamily:"Inter, sans-serif",

overflow:"hidden",

color:"#2b1d1d"
}}
>

{/* HERO */}

<section
style={{
position:"relative",

height:"clamp(300px,48vw,420px)",

overflow:"hidden"
}}
>

{/* IMAGE */}

<img
src={heroImage}
alt=""

style={{
width:"100%",
height:"100%",

objectFit:"cover",

display:"block"
}}
/>

{/* OVERLAY */}

<div
style={{
position:"absolute",
inset:0,

background:
"linear-gradient(180deg, rgba(0,0,0,.12) 0%, rgba(0,0,0,.48) 100%)"
}}
/>

{/* TOP LABEL */}

<div
style={{
position:"absolute",

top:34,
left:"50%",

transform:"translateX(-50%)",

fontSize:12,

letterSpacing:".24em",

textTransform:"uppercase",

color:"rgba(255,255,255,.72)",

fontWeight:700
}}
>
Creator Profile
</div>

{/* WAVE */}

<div
style={{
position:"absolute",

bottom:-1,
left:0,
right:0,

height:130,

background:"#f7f1ec",

borderTopLeftRadius:"55% 100%",
borderTopRightRadius:"55% 100%"
}}
/>

</section>


{/* PROFILE SECTION */}

<section
style={{
position:"relative",

marginTop:"calc(var(--space-2xl) * -1)",

padding:"0 24px var(--space-4xl)",

zIndex:5
}}
>

{/* PROFILE CARD */}

<div
style={{
maxWidth:820,

margin:"0 auto",

background:"rgba(255,255,255,.72)",

backdropFilter:"blur(18px)",

border:
"1px solid rgba(255,255,255,.42)",

borderRadius:38,

padding:"38px 28px 34px",

boxShadow:
"0 30px 80px rgba(0,0,0,.10)"
}}
>

{/* TOP */}

<div
style={{
display:"flex",

flexDirection:"column",

alignItems:"center",

textAlign:"center"
}}
>

{/* AVATAR */}

<div
style={{
width:138,
height:138,

borderRadius:"50%",

padding:6,

background:
"linear-gradient(135deg,#ffffff,#e7d7cc)",

boxShadow:
"0 16px 40px rgba(0,0,0,.12)"
}}
>

<img
src={
profile.avatar
||
"https://randomuser.me/api/portraits/women/44.jpg"
}

alt=""

style={{
width:"100%",
height:"100%",

borderRadius:"50%",

objectFit:"cover"
}}
/>

</div>

{/* NAME */}

<h1
style={{
fontSize:"clamp(38px,8vw,72px)",

lineHeight:.92,

letterSpacing:"-.07em",

margin:"var(--space-lg) 0 var(--space-sm)",

fontWeight:700,

maxWidth:620
}}
>
{profile.display_name || profile.username}
</h1>

{/* USERNAME */}

<div
style={{
fontSize:14,

letterSpacing:".16em",

textTransform:"uppercase",

opacity:.48,

fontWeight:600
}}
>
@{profile.username}
</div>

{/* BIO */}

{header.showBio !== false && profile.bio && (

<div
style={{
marginTop:28,

maxWidth:620,

fontSize:"clamp(16px,3vw,22px)",

lineHeight:1.8,

opacity:.72
}}
>
{profile.bio}
</div>

)}

</div>


{/* SOCIAL GRID */}

<div
style={{
display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(140px,1fr))",

gap:18,

marginTop:"var(--space-2xl)"
}}
>

{Object.entries(socialLinks || {})
.slice(0,8)
.map(([platform,usernames]) =>

usernames?.map((username,i)=>(

<a
key={platform+i}

href={buildSocialUrl(platform,username)}

target="_blank"

rel="noopener noreferrer"

style={{
background:"#ffffff",

borderRadius:26,

padding:"22px 18px",

textDecoration:"none",

color:"#2b1d1d",

display:"flex",
flexDirection:"column",

alignItems:"center",

justifyContent:"center",

minHeight:132,

boxShadow:
"0 10px 30px rgba(0,0,0,.05)",

border:
"1px solid rgba(0,0,0,.04)"
}}
>

<div
style={{
width:54,
height:54,

borderRadius:"50%",

background:"#f4ece7",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:22,

marginBottom:14
}}
>
{
platform==="instagram" ? "◎" :
platform==="tiktok" ? "◉" :
platform==="youtube" ? "▶" :
platform==="linkedin" ? "in" :
platform==="twitter" ? "𝕏" :
platform==="email" ? "✉" :
platform==="whatsapp" ? "✆" :
"◌"
}
</div>

<div
style={{
fontSize:15,

fontWeight:600,

textTransform:"capitalize"
}}
>
{platform}
</div>

</a>

))

)}

</div>

</div>

</section>

</div>

);

}
