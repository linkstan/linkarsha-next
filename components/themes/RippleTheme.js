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
minHeight:"100vh",
overflow:"hidden"
}}
>

{/* HEADER */}

<div
style={{
textAlign:"center",
padding:"50px 20px 20px",
color:"#8b5e5e",
position:"relative",
zIndex:10
}}
>

<div style={{
fontSize:35,
marginBottom:10
}}>
🦷
</div>

<h1
style={{
margin:0,
letterSpacing:2,
fontSize:34,
fontWeight:700
}}
>
{profile.display_name || profile.username}
</h1>

{header.subtitle && (

<p
style={{
marginTop:12,
fontSize:16,
opacity:.9
}}
>
{header.subtitle}
</p>

)}

</div>


{/* HERO */}

<div
style={{
position:"relative",
height:320,
overflow:"hidden",
marginTop:-10
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
height:120,
zIndex:2
}}
>

{/* MAIN TOP SHAPE */}

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

{/* WHITE EDGE */}

<path
d="
M0,80
C317,245 320,130 540,55
C635,12 726,55 913,83
C1213,131 1244,40 1440,20
"
fill="none"
stroke="rgba(255,255,255,0.9)"
strokeWidth="5"
strokeLinecap="round"
/>

</svg>


{/* TOP SHADOW / 3D EFFECT */}

<svg
viewBox="0 0 1440 260"
preserveAspectRatio="none"
style={{
position:"absolute",
top:78,
left:0,
width:"100%",
height:90,
zIndex:2,
pointerEvents:"none",
opacity:.55,
filter:"blur(10px)"
}}
>

<defs>
<linearGradient id="topFade" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stopColor="rgba(0,0,0,0.28)" />
<stop offset="100%" stopColor="rgba(0,0,0,0)" />
</linearGradient>
</defs>

<path
fill="url(#topFade)"
d="
M0,80
C317,245 320,130 540,55
C635,12 726,55 913,83
C1213,131 1244,40 1440,20
L1440,120
L0,120
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
height:120,
zIndex:3
}}
>

{/* MAIN BOTTOM SHAPE */}

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


{/* BOTTOM SHADOW / 3D EFFECT */}

<svg
viewBox="0 0 1440 220"
preserveAspectRatio="none"
style={{
position:"absolute",
bottom:58,
left:0,
width:"100%",
height:90,
zIndex:4,
pointerEvents:"none",
opacity:.65,
filter:"blur(12px)"
}}
>

<defs>
<linearGradient id="bottomFade" x1="0" y1="1" x2="0" y2="0">
<stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
<stop offset="100%" stopColor="rgba(0,0,0,0)" />
</linearGradient>
</defs>

<path
fill="url(#bottomFade)"
d="
M0,120
C317,285 320,170 540,95
C635,52 726,95 913,123
C1213,171 1244,80 1440,60
L1440,0
L0,0
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
position:"relative",
marginTop:-2
}}
>

{/* PROFILE */}

<div
style={{
position:"absolute",
top:-68,
left:32,
zIndex:20
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

{/* SECOND RING */}

<div
style={{
position:"absolute",
width:138,
height:138,
borderRadius:"50%",
border:"2px solid rgba(255,255,255,0.2)",
top:-4,
left:-4
}}
/>

{/* PROFILE IMAGE */}

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
marginLeft:185,
marginTop:5,
maxWidth:220
}}
>

<h2
style={{
margin:0,
fontSize:24,
lineHeight:1.2,
fontWeight:700
}}
>
{profile.display_name || profile.username}
</h2>

{header.showBio && profile.bio && (

<p
style={{
margin:"10px 0 0",
opacity:.82,
lineHeight:1.45,
fontSize:15
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
marginTop:55,
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
width:86,
height:86,
borderRadius:"50%",
border:"2px solid rgba(255,255,255,0.35)",
display:"flex",
alignItems:"center",
justifyContent:"center",
margin:"auto",
fontSize:24
}}
>
{icon}
</div>

<div
style={{
marginTop:10,
fontSize:15,
opacity:.85,
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
marginTop:45,
opacity:.6,
fontSize:14
}}
>
👆 TOQUE NOS ÍCONES
</div>

</div>

</div>

);

}
