"use client";

import HeroHeader from "./HeroHeader";
import ButtonBlock from "./ButtonBlock";

export default function ThemeRenderer({
profile,
appearance,
theme,
blocks
}){

const themeName = profile?.theme || "minimal";

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
width:theme?.avatar?.size || 110,
height:theme?.avatar?.size || 110,
borderRadius:"50%",
border:theme?.avatar?.border || "none",
objectFit:"cover",
marginTop:theme?.layout?.avatarOverlap ? -60 : 20,
marginBottom:20,
position:"relative",
zIndex:3
}}
/>

{/* NAME */}

<h1
style={{
fontFamily:theme?.fonts?.name || "Inter",
fontSize:32,
margin:0,
textAlign:"center"
}}
>
{profile.display_name || profile.username}
</h1>

{/* SUBTITLE */}

{appearance?.header?.subtitle && (

<div
style={{
fontFamily:theme?.fonts?.bio || "Inter",
fontSize:22,
opacity:.85,
marginTop:6,
textAlign:"center"
}}
>
{appearance.header.subtitle}
</div>

)}

{/* USERNAME */}

<div style={{
opacity:.7,
marginTop:6
}}>
@{profile.username}
</div>

{/* BIO */}

{profile.bio && (

<p
style={{
maxWidth:320,
textAlign:"center",
opacity:.8,
marginTop:10
}}
>
{profile.bio}
</p>

)}

{/* BUTTONS */}

<div
style={{
width:320,
marginTop:40
}}
>

{blocks.map(block=>(
<ButtonBlock
key={block.id}
block={block}
themeName={themeName}
/>
))}

</div>

</div>

);

}
