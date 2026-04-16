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
top:"42%",
left:"50%",
transform:"translate(-50%,-50%)",
zIndex:3,
fontSize:34,
fontFamily:"'Dancing Script', cursive",
color:"#2b2b2b",
padding:"6px 16px",
background:"rgba(255,255,255,0.65)",
borderRadius:8,
backdropFilter:"blur(4px)"
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
