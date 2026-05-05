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

<div style={{
background:"#d8c9be",
minHeight:"100vh",
fontFamily:"Arial, sans-serif"
}}>

{/* HEADER */}

<div style={{
textAlign:"center",
padding:"50px 20px 20px",
color:"#8b5e5e"
}}>

<div style={{fontSize:40}}>🦷</div>

<h1 style={{
margin:0,
letterSpacing:2,
fontSize:34
}}>
{profile.display_name || profile.username}
</h1>

{header.subtitle && (
<p style={{marginTop:6}}>
{header.subtitle}
</p>
)}

</div>

{/* HERO */}

<div style={{
position:"relative",
height:320,
overflow:"hidden"
}}>

{/* IMAGE */}

<img
src={appearance?.hero?.image || defaultImage}
style={{
width:"100%",
height:"100%",
objectFit:"cover",
display:"block"
}}
/>

{/* WHITE WAVE LINE (strong & visible) */}

<svg
viewBox="0 0 1440 260"
preserveAspectRatio="none"
style={{
position:"absolute",
top:-10,
left:0,
width:"100%",
zIndex:6
}}
>
<path
d="
M0,110
C250,240 450,20 720,80
C1000,150 1200,20 1440,60
"
fill="none"
stroke="#ffffff"
strokeWidth="18"
strokeLinecap="round"
/>
</svg>

{/* TOP CREAM WAVE (deeper cut) */}

<svg
viewBox="0 0 1440 260"
preserveAspectRatio="none"
style={{
position:"absolute",
top:-5,
left:0,
width:"100%",
zIndex:5
}}
>
<path fill="#d8c9be"
d="
M0,110
C250,240 450,20 720,80
C1000,150 1200,20 1440,60
L1440,0
L0,0
Z
"/>
</svg>

{/* BOTTOM DARK WAVE (more depth + shadow) */}

<svg
viewBox="0 0 1440 220"
preserveAspectRatio="none"
style={{
position:"absolute",
bottom:-10,
left:0,
width:"100%",
zIndex:4,
filter:"drop-shadow(0px -10px 18px rgba(0,0,0,0.35))"
}}
>
<path fill="#7a4c4c"
d="
M0,140
C250,300 450,80 720,120
C1000,180 1200,60 1440,100
L1440,220
L0,220
Z
"/>
</svg>

</div>

{/* TEXT */}

<div style={{
marginLeft:180,
marginTop:10
}}>

<h2 style={{
margin:0,
fontSize:22
}}>
{profile.display_name || profile.username}
</h2>

{header.showBio && profile.bio && (
<p style={{
opacity:.8,
lineHeight:1.4
}}>
{profile.bio}
</p>
)}

</div>


{/* ICON GRID */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:30,
marginTop:40,
textAlign:"center"
}}>

{Object.entries(socialLinks).slice(0,6).map(([platform,usernames]) =>
usernames?.map((username,i)=>{

const icon =
platform==="whatsapp"?"💬":
platform==="phone"?"📞":
platform==="email"?"✉️":
platform==="facebook"?"f":
platform==="instagram"?"📷":
"📍";

return(

<a
key={platform+i}
href={buildSocialUrl(platform,username)}
target="_blank"
style={{
textDecoration:"none",
color:"#fff"
}}
>

<div style={{
width:80,
height:80,
borderRadius:"50%",
border:"2px solid rgba(255,255,255,0.4)",
display:"flex",
alignItems:"center",
justifyContent:"center",
margin:"auto",
fontSize:22
}}>
{icon}
</div>

<div style={{
marginTop:8,
fontSize:14,
opacity:.8
}}>
{platform}
</div>

</a>

);

})
)}

</div>


{/* FOOTER */}

<div style={{
textAlign:"center",
marginTop:40,
opacity:.6
}}>
👆 TOQUE NOS ÍCONES
</div>

</div>

</div>

);

}
