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
height:hero.height || 260,
position:"relative",
overflow:"hidden"
}}
>

{/* HERO IMAGE */}

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
: "#ddd"
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
top:"40%",
left:"50%",
transform:"translate(-50%,-50%)",
zIndex:4,
fontSize:36,
fontFamily:"var(--font-dancing)",
color:"#2d2d2d",
textAlign:"center",
textShadow:"0 0 25px rgba(255,255,255,0.95), 0 0 50px rgba(255,255,255,0.9)"
}}
>
{hero.text}
</div>
)}

{/* AVATAR NOTCH CUT */}

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
