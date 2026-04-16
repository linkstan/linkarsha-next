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

{/* TEXT */}

{hero.text && (
<div
style={{
position:"absolute",
top:"45%",
left:"50%",
transform:"translate(-50%,-50%)",
zIndex:2,
fontSize:32,
fontWeight:600,
textAlign:"center"
}}
>
{hero.text}
</div>
)}

{/* HERO CURVE CUT */}

<div
style={{
position:"absolute",
bottom:-45,
left:"50%",
transform:"translateX(-50%)",
width:"35%",
height:120,
background:theme.background || "#e9ded9",
borderRadius:"50%"
}}
/>

</div>

);

}
