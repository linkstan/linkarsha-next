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
height:hero.height || 240,
position:"relative",
overflow:"hidden"
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
position:"absolute",
top:"45%",
left:"50%",
transform:"translate(-50%,-50%)",
zIndex:2,
fontSize:30,
fontWeight:600,
fontFamily:"var(--font-playfair)",
textAlign:"center"
}}
>
{hero.text}
</div>

)}

{/* CURVE SHAPE */}

<div
style={{
position:"absolute",
bottom:-80,
left:0,
right:0,
height:160,
background:theme.background || "#e9ded9",
borderTopLeftRadius:"50% 100%",
borderTopRightRadius:"50% 100%"
}}
/>

</div>

);

}
