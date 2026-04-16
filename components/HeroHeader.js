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

const heroHeight = hero.height || 260;

return(

<div
style={{
width:"100%",
height:heroHeight,
position:"relative",
overflow:"hidden"
}}
>

{/* HERO IMAGE */}

{heroImage && (

<div
style={{
position:"absolute",
top:0,
left:0,
right:0,
bottom:0,
backgroundImage:`url(${heroImage})`,
backgroundSize:"cover",
backgroundPosition: heroPosition,
backgroundAttachment: "scroll",
backgroundRepeat:"no-repeat",
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
textShadow:"0 0 25px rgba(255,255,255,0.95),0 0 40px rgba(255,255,255,0.9)"
}}
>
{heroText}
</div>

)}

{/* AVATAR CUT */}

<div
style={{
position:"absolute",
bottom:-60,
left:"50%",
transform:"translateX(-50%)",
width:140,
height:140,
background:theme.background || "#e9ded9",
borderRadius:"50%",
zIndex:3
}}
/>

</div>

);

}
