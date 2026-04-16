"use client";

import HeroHeader from "./HeroHeader";
import ButtonBlock from "./ButtonBlock";
import { getTheme } from "../app/lib/themeEngine";

export default function ThemeRenderer({
profile,
appearance,
theme,
blocks
}){

const themeName = profile?.theme || "minimal";
const finalTheme = getTheme(themeName, appearance);

return(

<div
style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
width:"100%",
background:finalTheme?.background || "#ffffff"
}}
>

{/* HERO */}

<HeroHeader appearance={appearance} theme={finalTheme} />

{/* AVATAR */}

<img
src={profile.avatar || ""}
style={{
width:finalTheme?.avatar?.size || 120,
height:finalTheme?.avatar?.size || 120,
borderRadius:"50%",
border:"none",
objectFit:"cover",

/* overlap hero correctly */
marginTop:finalTheme?.layout?.avatarOverlap ? -70 : 20,

marginBottom:16,
position:"relative",
zIndex:5
}}
/>

{/* NAME */}

<h1
style={{
fontFamily:"var(--font-playfair)",
fontSize:36,
margin:0,
textAlign:"center",
color:"#ffffff"
}}
>
{profile.display_name || profile.username}
</h1>

{/* SUBTITLE */}

{appearance?.header?.subtitle && (

<div
style={{
fontFamily:"var(--font-dancing)",
fontSize:28,
opacity:.95,
marginTop:6,
textAlign:"center",
color:"#ffffff"
}}
>
{appearance.header.subtitle}
</div>

)}

{/* USERNAME */}

<div
style={{
opacity:.75,
marginTop:6,
color:"#ffffff"
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
opacity:.9,
marginTop:10,
color:"#ffffff"
}}
>
{profile.bio}
</p>

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
/>
))}

</div>

</div>

);

}
