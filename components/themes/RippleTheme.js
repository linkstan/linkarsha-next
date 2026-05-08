"use client";

export default function RippleTheme({
profile,
appearance,
socialLinks,
buildSocialUrl
}){

const header = appearance?.header || {};

const defaultImage =
"https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=1200";

return(

<div
style={{
margin:0,
background:"#d8c9be",
fontFamily:"Arial, sans-serif",
minHeight:"100vh"
}}
>

{/* HEADER */}

<div
style={{
textAlign:"center",
padding:"50px 20px 20px",
color:"#8b5e5e"
}}
>

<div style={{fontSize:35}}>
🦷
</div>

<h1
style={{
margin:0,
letterSpacing:2
}}
>
{profile.display_name || profile.username}
</h1>

{header.subtitle && (

<p style={{marginTop:8}}>
{header.subtitle}
</p>

)}

</div>


{/* HERO */}

<div
style={{
position:"relative",
height:280,
overflow:"hidden"
}}
>

{/* IMAGE */}

<img
src={appearance?.hero?.image || defaultImage}
alt=""
style={{
width:"100%",
height:"100%",
objectFit:"cover",
display:"block"
}}
/>


{/* TOP WAVE */}

<svg
viewBox="0 0 1440 260"
preserveAspectRatio="none"
style={{
position:"absolute",
top:0,
left:0,
width:"100%",
height:"100%",
zIndex:2
}}
>
<path
fill="#d8c9be"
d="
M0,80
C317,245 320,130 540,55
C635,12 726,55 913,83
C1213,131 1244,40 1440,20
L1440,0
L0,0
Z
"
/>
</svg>


{/* BOTTOM WAVE */}

<svg
viewBox="0 0 1440 220"
preserveAspectRatio="none"
style={{
position:"absolute",
bottom:-1,
left:0,
width:"100%",
zIndex:3
}}
>
<path
fill="#7a4c4c"
d="
M0,120
C317,285 320,170 540,95
C635,52 726,95 913,123
C1213,171 1244,80 1440,60
L1440,220
L0,220
Z
"
/>
</svg>

</div>


{/* CONTENT */}

<div
style={{
background:"#7a4c4c",
color:"#fff",
padding:"120px 20px 60px",
position:"relative"
}}
>

{/* PROFILE */}

<div
style={{
position:"absolute",
top:-70,
left:30
}}
>

{/* OUTER RING */}

<div
style={{
position:"absolute",
width:150,
height:150,
borderRadius:"50%",
border:"2px solid rgba(255,255,255,0.25)",
top:-10,
left:-10
}}
/>

<img
src={profile.avatar || "https://randomuser.me/api/portraits/women/44.jpg"}
alt=""
style={{
width:130,
height:130,
borderRadius:"50%",
border:"6px solid rgba(255,255,255,0.6)",
display:"block",
objectFit:"cover"
}}
/>

</div>


{/* TEXT */}

<div
style={{
marginLeft:180,
marginTop:10
}}
>

<h2
style={{
margin:0
}}
>
{profile.display_name || profile.username}
</h2>

{header.showBio && profile.bio && (

<p
style={{
margin:"5px 0",
opacity:.8,
lineHeight:1.5
}}
>
{profile.bio}
</p>

)}

</div>


{/* ICON GRID */}

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:30,
marginTop:40,
textAlign:"center"
}}
>

{Object.entries(socialLinks || {}).slice(0,6).map(([platform,usernames])=>

usernames?.map((username,i)=>{

const icon =
platform==="whatsapp" ? "💬" :
platform==="phone" ? "📞" :
platform==="email" ? "✉️" :
platform==="facebook" ? "f" :
platform==="instagram" ? "📷" :
"📍";

return(

<a
key={platform+i}
href={buildSocialUrl(platform,username)}
target="_blank"
rel="noopener noreferrer"
style={{
textDecoration:"none",
color:"#fff"
}}
>

<div
style={{
width:80,
height:80,
borderRadius:"50%",
border:"2px solid rgba(255,255,255,0.4)",
display:"flex",
alignItems:"center",
justifyContent:"center",
margin:"auto",
fontSize:22
}}
>
{icon}
</div>

<div
style={{
marginTop:8,
fontSize:14,
opacity:.8,
textTransform:"capitalize"
}}
>
{platform}
</div>

</a>

);

})

)}

</div>


{/* FOOTER */}

<div
style={{
textAlign:"center",
marginTop:40,
opacity:.6
}}
>
👆 TOQUE NOS ÍCONES
</div>

</div>

</div>

);

}
