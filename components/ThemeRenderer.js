"use client";

import HeroHeader from "./HeroHeader";
import ButtonBlock from "./ButtonBlock";
import ModernMinimalTheme from "./themes/ModernMinimalTheme";
import ArchwayTheme from "./themes/ArchwayTheme";
import BlueprintTheme from "./themes/BlueprintTheme";
import SolsticeTheme from "./themes/SolsticeTheme";
import PortfolioTheme from "./themes/PortfolioTheme";
import RippleTheme from "./themes/RippleTheme";
import { getTheme } from "../app/lib/themeEngine";
import { useEffect, useState } from "react";

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
return username.startsWith("http")
? username
: `https://${username}`;

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

const [live,setLive] = useState({});

/* LIVE EVENTS */

useEffect(()=>{

function update(e){

setLive(prev=>({
...prev,
...e.detail
}));

}

function updateTheme(e){

setLive(prev=>({
...prev,
theme:e.detail
}));

}

window.addEventListener(
"appearance-update",
update
);

window.addEventListener(
"theme-change",
updateTheme
);

return ()=>{

window.removeEventListener(
"appearance-update",
update
);

window.removeEventListener(
"theme-change",
updateTheme
);

};

},[]);


/* FINAL LIVE APPEARANCE */

const finalAppearance = {
...appearance,
...live,
theme:
live?.theme ||
appearance?.theme ||
profile?.theme ||
"minimal"
};


/* THEME NAME */

const themeName = finalAppearance.theme;


/* HEADER */

const header = {
...(appearance?.header || {}),
...(live?.header || {})
};


/* SOCIAL LINKS */

const socialLinks = {
...(appearance?.social_links || {}),
...(live?.social_links || {})
};


/* ARCHWAY */

if(themeName === "archway"){

return(
<ArchwayTheme
profile={profile}
appearance={finalAppearance}
blocks={blocks}
socialLinks={socialLinks}
buildSocialUrl={buildSocialUrl}
/>
)

}


/* MODERN MINIMAL */

if(themeName === "modernminimal"){

return(
<ModernMinimalTheme
profile={profile}
appearance={finalAppearance}
blocks={blocks}
socialLinks={socialLinks}
buildSocialUrl={buildSocialUrl}
/>
)

}


/* BLUEPRINT */

if(themeName === "blueprint"){

return(
<BlueprintTheme
profile={profile}
appearance={finalAppearance}
blocks={blocks}
socialLinks={socialLinks}
buildSocialUrl={buildSocialUrl}
/>
)

}


/* SOLSTICE */

if(themeName === "solstice"){

return(
<SolsticeTheme
profile={profile}
appearance={finalAppearance}
blocks={blocks}
socialLinks={socialLinks}
buildSocialUrl={buildSocialUrl}
/>
)

}


/* PORTFOLIO */

if(themeName === "portfolio"){

return(
<PortfolioTheme
profile={profile}
appearance={finalAppearance}
blocks={blocks}
socialLinks={socialLinks}
buildSocialUrl={buildSocialUrl}
/>
)

}


/* RIPPLE */

if(themeName === "ripple"){

return(
<RippleTheme
profile={profile}
appearance={finalAppearance}
blocks={blocks}
socialLinks={socialLinks}
buildSocialUrl={buildSocialUrl}
/>
)

}


/* DEFAULT THEMES */

const finalTheme =
getTheme(themeName, finalAppearance);

return(

<div
style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
width:"100%",
background:
finalTheme?.background || "#ffffff",
color:
finalTheme?.textColor || "#000",
minHeight:"100vh"
}}
>

<HeroHeader
appearance={finalAppearance}
theme={finalTheme}
/>

<div
style={{
width:360,
maxWidth:"100%",
margin:"0 auto",
display:"flex",
flexDirection:"column",
alignItems:"center",
gap:6
}}
>

<img
src={profile.avatar || ""}
style={{
width:
finalTheme?.avatar?.size || 110,

height:
finalTheme?.avatar?.size || 110,

borderRadius:"50%",

border:
finalTheme?.avatar?.border || "none",

objectFit:"contain",

marginTop:
finalTheme?.layout?.avatarOverlap
? -20
: 10,

transform:
finalTheme?.layout?.avatarOverlap
? `translateY(-${(finalTheme?.avatar?.size || 110)/2}px)`
: "none",

marginBottom:4,
position:"relative",
zIndex:10
}}
/>

{header.showDisplayName !== false && (

<h1
style={{
fontFamily:
finalTheme?.fonts?.name || "Inter",

fontSize:34,
margin:0,
textAlign:"center"
}}
>
{profile.display_name || profile.username}
</h1>

)}

{header.subtitle && (

<div
style={{
fontFamily:
finalTheme?.fonts?.bio || "Inter",

fontSize:26,
opacity:.9,
textAlign:"center"
}}
>
{header.subtitle}
</div>

)}

{header.showUsername !== false && (

<div style={{opacity:.7}}>
@{profile.username}
</div>

)}

{header.showBio && profile.bio && (

<p
style={{
maxWidth:320,
textAlign:"center",
opacity:.85
}}
>
{profile.bio}
</p>

)}

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
appearance={finalAppearance}
/>

))}

</div>

</div>

</div>

);

}
