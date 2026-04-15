"use client";

import { themes } from "../app/lib/themes";

export default function HeroHeader({ profile, appearance, theme })

const themeName = appearance?.theme || "minimal";
const theme = themes[themeName] || themes.minimal;

if(!theme.layout?.hero){
return null;
}

const hero = theme.hero || {};

return(

<div
style={{
width:"100%",
height:hero.height || 200,
position:"relative",
display:"flex",
alignItems:"center",
justifyContent:"center",
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
fontSize:22,
fontWeight:600,
fontFamily:"var(--font-playfair)"
}}
>
{hero.text}
</div>

)}

</div>

);

}
