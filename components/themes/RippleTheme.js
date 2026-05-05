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
height:360,
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

{/* WHITE WAVE LINE */}

<svg
viewBox="0 0 1440 260"
preserveAspectRatio="none"
style={{
position:"absolute",
top:-40,
left:0,
width:"100%",
zIndex:6
}}
>
<path
d="M0,160 
C200,260 400,40 720,120 
C1050,200 1220,40 1440,100"
fill="none"
stroke="#ffffff"
strokeWidth="16"
strokeLinecap="round"
/>
</svg>

{/* TOP CREAM WAVE */}

<svg
viewBox="0 0 1440 260"
preserveAspectRatio="none"
style={{
position:"absolute",
top:-20,
left:0,
width:"100%",
zIndex:5
}}
>
<path
fill="#d8c9be"
d="M0,160 
C200,260 400,40 720,120 
C1050,200 1220,40 1440,100 
L1440,0 
L0,0 
Z"
/>
</svg>

{/* BOTTOM DARK WAVE */}

<svg
viewBox="0 0 1440 220"
preserveAspectRatio="none"
style={{
position:"absolute",
bottom:-15,
left:0,
width:"100%",
zIndex:4,
filter:"drop-shadow(0px -14px 22px rgba(0,0,0,0.45))"
}}
>
<path
fill="#7a4c4c"
d="M0,170 
C200,300 400,90 720,150 
C1050,220 1220,80 1440,130 
L1440,220 
L0,220 
Z"
/>
</svg>

</div>


{/* CONTENT */}

<div style={{
background:"#7a4c4c",
color:"#fff",
padding:"120px 20px 60px",
position:"relative"
}}>

{/* PROFILE */}

<div style={{
position:"absolute",
top:-75,
left:30,
zIndex:10
}}>

{/* OUTER RING */}
<div style={{
position:"absolute",
width:150,
height:150,
borderRadius:"50%",
border:"2px solid rgba(255,255,255,0.25)",
top:-10,
left:-10
}}/>

{/* AVATAR */}
<img
src={profile.avatar}
style={{
width:130,
height:130,
borderRadius:"50%",
border:"6px solid rgba(255,255,255,0.65)",
objectFit:"cover"
}}
/>

</div>


{/* TEXT */}

<div style={{
marginLeft:180,
marginTop:10
}}>

<h2 style={{
margin:0,
fontSize:22,
fontWeight:600
}}>
{profile.display_name || profile.username}
</h2>

{header.showBio && profile.bio && (
<p style={{
opacity:.8,
lineHeight:1.4,
marginTop:6
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

{Object.entries(socialLinks || {}).slice(0,6).map(([platform,usernames]) =>
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
rel="noopener noreferrer"
style={{
textDecoration:"none",
color:"#fff"
}}
>

<div style={{
width:80,
height:80,
borderRadius:"50%",
border:"2px solid rgba(255,255,255,0.45)",
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
opacity:.85
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
