"use client";

export default function HeroHeader({ appearance, theme }) {

if(!theme?.layout?.hero){
return null;
}

const hero = theme.hero || {};

return(

<div
style={{
width:"100%",
height:hero.height || 220,
position:"relative",
display:"flex",
alignItems:"center",
justifyContent:"center",
overflow:"hidden",

/* curved hero bottom */
borderBottomLeftRadius:"40% 80px",
borderBottomRightRadius:"40% 80px"
}}
>

{/* HERO BACKGROUND */}

<div
style={{
position:"absolute",
top:0,
left:0,
right:0,
bottom:0,
background:appearance?.heroImage
? `url(${appearance.heroImage}) center/cover no-repeat`
: hero?.image
? `url(${hero.image}) center/cover no-repeat`
: theme.background || "#d8d8d8"
}}
/>

{/* HERO OVERLAY */}

{hero.overlay && (

<div
style={{
position:"absolute",
top:0,
left:0,
right:0,
bottom:0,
background:hero.overlay
}}
/>

)}

{/* HERO TEXT */}

{hero.text && (

<div
style={{
position:"relative",
zIndex:2,
fontSize:28,
fontWeight:600,
fontFamily:"var(--font-playfair)",
textAlign:"center"
}}
>
{hero.text}
</div>

)}

</div>

);

}
