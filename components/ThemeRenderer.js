"use client";

import HeroHeader from "./HeroHeader";
import ButtonBlock from "./ButtonBlock";
import { getTheme } from "../app/lib/themeEngine";

export default function ThemeRenderer({
profile,
appearance,
blocks
}){

const themeName = profile?.theme || "minimal";
const finalTheme = getTheme(themeName, appearance);

const header = appearance?.header || {};

return(

<div
style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
width:"100%",
background:finalTheme?.background || "#ffffff",
color: finalTheme?.textColor || "#000",
minHeight:"100vh"
}}
>

{/* HERO */}

<HeroHeader appearance={appearance} theme={finalTheme} />

{/* AVATAR */}

<img
src={profile.avatar || ""}
style={{
width:finalTheme?.avatar?.size || 110,
height:finalTheme?.avatar?.size || 110,
borderRadius:"50%",
border:finalTheme?.avatar?.border || "none",
objectFit:"cover",

marginTop:finalTheme?.layout?.avatarOverlap ? -70 : 20,
marginBottom:16,
position:"relative",
zIndex:5
}}
/>

{/* NAME */}

{header.showDisplayName !== false && (

<h1
style={{
fontFamily:finalTheme?.fonts?.name || "Inter",
fontSize:34,
margin:0,
textAlign:"center"
}}
>
{profile.display_name || profile.username}
</h1>

)}

{/* SUBTITLE */}

{header.subtitle && (

<div
style={{
fontFamily:finalTheme?.fonts?.bio || "Inter",
fontSize:26,
opacity:.9,
marginTop:6,
textAlign:"center"
}}
>
{header.subtitle}
</div>

)}

{/* USERNAME */}

{header.showUsername !== false && (

<div
style={{
opacity:.7,
marginTop:6
}}
>
@{profile.username}
</div>

)}

{/* BIO */}

{header.showBio && profile.bio && (

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

{/* SOCIAL ICONS ABOVE LINKS */}

{header.showSocialIcons && header.socialPosition==="header" && (

<div
style={{
display:"flex",
gap:14,
marginTop:16
}}
>

<a href={`https://instagram.com/${profile.username}`} target="_blank">📸</a>
<a href={`https://twitter.com/${profile.username}`} target="_blank">🐦</a>
<a href={`https://t.me/${profile.username}`} target="_blank">✈️</a>

</div>

)}

{/* BUTTONS */}

<div
style={{
width:320,
marginTop:36
}}
>

{blocks.map(block=>(
<ButtonBlock
key={block.id}
block={block}
themeName={themeName}
theme={finalTheme}
appearance={appearance}
/>
))}

</div>

{/* SOCIAL ICONS BELOW LINKS */}

{header.showSocialIcons && header.socialPosition==="bottom" && (

<div
style={{
display:"flex",
gap:14,
marginTop:30
}}
>

<a href={`https://instagram.com/${profile.username}`} target="_blank">📸</a>
<a href={`https://twitter.com/${profile.username}`} target="_blank">🐦</a>
<a href={`https://t.me/${profile.username}`} target="_blank">✈️</a>

</div>

)}

</div>

);

}
