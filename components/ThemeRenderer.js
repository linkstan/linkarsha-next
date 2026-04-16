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
width:theme?.avatar?.size || 120,
height:theme?.avatar?.size || 120,
borderRadius:"50%",
border:"none",
objectFit:"cover",
marginTop:-70,
marginBottom:20,
position:"relative",
zIndex:5
}}
/>

{/* NAME */}

<h1
style={{
fontFamily:theme?.fonts?.name || "Inter",
fontSize:34,
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
fontSize:26,
opacity:.9,
marginTop:6,
textAlign:"center"
}}
>
{appearance.header.subtitle}
</div>

)}

{/* USERNAME */}

<div
style={{
opacity:.7,
marginTop:6
}}
>
@{profile.username}
</div>

{/* BIO */}

{profile.bio && (

<p
style={{
maxWidth:320,
textAlign:"center",
opacity:.85,
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
