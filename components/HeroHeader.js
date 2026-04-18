"use client";

export default function HeroHeader({ appearance, theme }) {

if(!theme?.layout?.hero){
return null;
}

const hero = theme.hero || {};
const header = appearance?.header || {};

/* final values */

const heroImage = header.heroImage || hero.image;
const heroText = header.heroText || hero.text;
const heroOpacity = (header.heroOpacity ?? 100) / 100;

/* auto hero positioning */

const heroPosition = header.heroPosition || "center center";

/* responsive hero height */

const heroHeight = hero.height || "33vw";

/* --- FIX: make avatar cut perfectly match avatar circle --- */

const avatarSize = theme?.avatar?.size || 110;
const gap = Math.max(14, avatarSize * 0.12); // space between hero edge and avatar
const cutSize = avatarSize + gap * 2;

return(

<div
style={{
width:"100%",
height:heroHeight,
maxHeight:260,
position:"relative",
overflow:"hidden"
}}
>

{/* HERO IMAGE */}

{heroImage && (

<img
src={heroImage}
style={{
position:"absolute",
top:0,
left:0,
width:"100%",
height:"100%",
objectFit:"cover",
objectPosition: heroPosition,
opacity:heroOpacity,
transition:"opacity .3s ease"
}}
/>

)}

{/* SOFT WHITE GRADIENT */}

<div
style={{
position:"absolute",
top:0,
left:0,
right:0,
bottom:0,
background:"linear-gradient(rgba(255,255,255,0.65), rgba(255,255,255,0.55))"
}}
/>

{/* HERO TEXT */}

{heroText && (

<div
style={{
position:"absolute",
top:"40%",
left:"50%",
transform:"translate(-50%,-50%)",
zIndex:4,
fontSize:36,
fontFamily:"var(--font-dancing)",
color:"#2d2d2d",
textAlign:"center",
textShadow:"0 0 30px rgba(255,255,255,.95),0 0 60px rgba(255,255,255,.85),0 0 90px rgba(255,255,255,.7)"
}}
>
{heroText}
</div>

)}

{/* AVATAR CUT */}

<div
style={{
position:"absolute",
bottom:-(cutSize/2),
left:"50%",
transform:"translateX(-50%)",
width:cutSize,
height:cutSize,
background:theme.background || "#e9ded9",
borderRadius:"50%",
zIndex:3
}}
/>

</div>

);
}
