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

import {
useEffect,
useState
} from "react";


/* ================================================= */
/* SOCIAL URL */
/* ================================================= */

function buildSocialUrl(
platform,
username
){

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


/* ================================================= */
/* COMPONENT */
/* ================================================= */

export default function ThemeRenderer({
profile,
appearance,
blocks
}){

const [live,setLive] = useState({});


/* ================================================= */
/* LIVE EVENTS */
/* ================================================= */

useEffect(()=>{

function updateAppearance(e){

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
updateAppearance
);

window.addEventListener(
"theme-change",
updateTheme
);

return ()=>{

window.removeEventListener(
"appearance-update",
updateAppearance
);

window.removeEventListener(
"theme-change",
updateTheme
);

};

},[]);


/* ================================================= */
/* FINAL APPEARANCE */
/* ================================================= */

const finalAppearance = {

...appearance,
...live,

theme:

live?.theme ||
appearance?.theme ||
profile?.theme ||
"minimal"

};


/* ================================================= */
/* THEME */
/* ================================================= */

const themeName =
finalAppearance.theme;

const finalTheme =
getTheme(
themeName,
finalAppearance
);


/* ================================================= */
/* HEADER */
/* ================================================= */

const header = {

...(appearance?.header || {}),
...(live?.header || {})

};


/* ================================================= */
/* SOCIAL */
/* ================================================= */

const socialLinks = {

...(appearance?.social_links || {}),
...(live?.social_links || {})

};


/* ================================================= */
/* CUSTOM THEMES */
/* ================================================= */

const customThemeProps = {

profile,
appearance:finalAppearance,
blocks,

theme:finalTheme,

header,
socialLinks,

buildSocialUrl

};


/* ================================================= */
/* ARCHWAY */
/* ================================================= */

if(themeName === "archway"){

return(
<ArchwayTheme
{...customThemeProps}
/>
);

}


/* ================================================= */
/* MODERN MINIMAL */
/* ================================================= */

if(themeName === "modernminimal"){

return(
<ModernMinimalTheme
{...customThemeProps}
/>
);

}


/* ================================================= */
/* BLUEPRINT */
/* ================================================= */

if(themeName === "blueprint"){

return(
<BlueprintTheme
{...customThemeProps}
/>
);

}


/* ================================================= */
/* SOLSTICE */
/* ================================================= */

if(themeName === "solstice"){

return(
<SolsticeTheme
{...customThemeProps}
/>
);

}


/* ================================================= */
/* PORTFOLIO */
/* ================================================= */

if(themeName === "portfolio"){

return(
<PortfolioTheme
{...customThemeProps}
/>
);

}


/* ================================================= */
/* RIPPLE */
/* ================================================= */

if(themeName === "ripple"){

return(
<RippleTheme
{...customThemeProps}
/>
);

}


/* ================================================= */
/* DEFAULT THEMES */
/* ================================================= */

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
finalTheme?.textColor || "#000000",

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

{/* AVATAR */}

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

objectFit:"cover",

marginTop:

finalTheme?.layout?.avatarOverlap
? -20
: 10,

transform:

finalTheme?.layout?.avatarOverlap

? `translateY(-${
(finalTheme?.avatar?.size || 110)/2
}px)`

: "none",

marginBottom:4,

position:"relative",
zIndex:10,

boxShadow:

finalTheme?.avatar?.shadow
? "0 10px 25px rgba(0,0,0,.18)"
: "none"

}}
/>

{/* NAME */}

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

{/* SUBTITLE */}

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

{/* USERNAME */}

{header.showUsername !== false && (

<div style={{opacity:.7}}>

@{profile.username}

</div>

)}

{/* BIO */}

{header.showBio !== false &&
profile.bio && (

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

theme={finalTheme}

appearance={finalAppearance}

/>

))}

</div>

</div>

</div>

);

}
