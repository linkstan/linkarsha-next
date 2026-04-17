"use client";

import HeroHeader from "./HeroHeader";
import ButtonBlock from "./ButtonBlock";
import { getTheme } from "../app/lib/themeEngine";

function buildSocialUrl(platform, username){

switch(platform){

case "instagram":
return `https://www.instagram.com/${username}`;

case "facebook":
return `https://www.facebook.com/${username}`;

case "twitter":
return `https://x.com/${username}`;

case "youtube":
return `https://www.youtube.com/@${username}`;

case "tiktok":
return `https://www.tiktok.com/@${username}`;

case "telegram":
return `https://t.me/${username}`;

case "github":
return `https://github.com/${username}`;

case "pinterest":
return `https://www.pinterest.com/${username}`;

case "linkedin":
return `https://www.linkedin.com/in/${username}`;

case "website":
return username.startsWith("http") ? username : `https://${username}`;

case "email":
return `mailto:${username}`;

case "whatsapp":
return `https://wa.me/${username}`;

default:
return `https://${platform}.com/${username}`;

}

}

export default function ThemeRenderer({
profile,
appearance,
blocks
}){

const themeName = profile?.theme || "minimal";
const finalTheme = getTheme(themeName, appearance);

const header = appearance?.header || {};
const socialLinks = appearance?.social_links || {};

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

{/* DISPLAY NAME */}

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
marginTop:16,
flexWrap:"wrap",
justifyContent:"center"
}}
>

{Object.entries(socialLinks).map(([platform,usernames]) =>
usernames?.length > 0 &&
usernames.map((username,i)=>(
<a
key={platform+i}
href={buildSocialUrl(platform,username)}
target="_blank"
rel="noopener noreferrer"
>
<img
src={`/icons/${platform==="twitter"?"x":platform}.png`}
style={{width:22,height:22}}
onError={(e)=>{e.currentTarget.src="/icons/other.png"}}
/>
</a>
))
)}

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
marginTop:30,
flexWrap:"wrap",
justifyContent:"center"
}}
>

{Object.entries(socialLinks).map(([platform,usernames]) =>
usernames?.length > 0 &&
usernames.map((username,i)=>(
<a
key={platform+i}
href={buildSocialUrl(platform,username)}
target="_blank"
rel="noopener noreferrer"
>
const iconSrc =
header.socialIconStyle==="official"
? `/icons/${platform==="twitter"?"x":platform}.png`
: `/icons/theme/${platform}.svg`;

<img
src={iconSrc}
style={{width:22,height:22}}
onError={(e)=>{e.currentTarget.src="/icons/other.png"}}
/>
</a>
))
)}

</div>

)}

</div>

);

}
