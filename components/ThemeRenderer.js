"use client";

import HeroHeader from "./HeroHeader";
import ButtonBlock from "./ButtonBlock";

export default function ThemeRenderer({
profile,
appearance,
theme,
blocks
}){

return(

<div
style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
width:"100%"
}}
>

{/* HERO */}

<HeroHeader appearance={appearance} theme={theme} />

{/* AVATAR */}

<img
src={profile.avatar || ""}
style={{
width:theme.avatar?.size || 110,
height:theme.avatar?.size || 110,
borderRadius:"50%",
border:theme.avatar?.border || "none",
objectFit:"cover",
marginTop:theme.layout?.avatarOverlap ? -60 : 20,
marginBottom:20,
position:"relative",
zIndex:3
}}
/>

{/* NAME */}

<h1
style={{
fontFamily:theme.fonts?.name,
fontSize:32,
margin:0
}}
>
{profile.display_name || profile.username}
</h1>

{/* SUBTITLE */}

{appearance?.header?.subtitle && (

<div
style={{
fontFamily:theme.fonts?.bio,
fontSize:22,
opacity:.85,
marginTop:6
}}
>
{appearance.header.subtitle}
</div>

)}

{/* BUTTONS */}

<div style={{
marginTop:40,
width:320
}}>

{blocks.map(block=>(
<ButtonBlock
key={block.id}
block={block}
themeName={profile.theme}
/>
))}

</div>

</div>

);

}
