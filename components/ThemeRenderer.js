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
/* TEXT SETTINGS */
/* ================================================= */

const text = {

...(appearance?.text || {}),
...(live?.text || {})

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

width:"100%",
maxWidth:420,

paddingLeft:24,
paddingRight:24,

margin:"0 auto",

display:"flex",
flexDirection:"column",
alignItems:"center"

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
: 42,

transform:

finalTheme?.layout?.avatarOverlap

? `translateY(-${
(finalTheme?.avatar?.size || 110)/2
}px)`

: "none",

marginBottom:22,

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
text?.fontFamily ||
finalTheme?.fonts?.name ||
"Inter",

fontSize:
text?.nameSize || 56,

lineHeight:1,

letterSpacing:"-0.04em",

fontWeight:
text?.fontWeight || 700,

margin:0,

textAlign:
text?.align || "center"

}}
>

{profile.display_name || profile.username}

</h1>

)}

{/* USERNAME */}

{header.showUsername !== false && (

<div
style={{

opacity:
text?.textOpacity || .55,

fontSize:
text?.usernameSize || 18,

marginTop:14,

letterSpacing:"-0.01em",

textAlign:
text?.align || "center",

width:"100%",

fontFamily:
text?.fontFamily ||
"Inter"

}}
>

@{profile.username}

</div>

)}

{/* SUBTITLE */}

{header.subtitle && (

<div
style={{

fontFamily:
text?.fontFamily ||
finalTheme?.fonts?.bio ||
"Inter",

fontSize:20,

lineHeight:1.5,

opacity:
text?.textOpacity || .88,

textAlign:
text?.align || "center",

marginTop:34,

maxWidth:340

}}
>

{header.subtitle}

</div>

)}

{/* BIO */}

{header.showBio !== false &&
profile.bio && (

<p
style={{

maxWidth:340,

textAlign:
text?.align || "center",

opacity:
text?.textOpacity || .72,

lineHeight:1.7,

fontSize:
text?.bioSize || 15,

marginTop:18,

marginBottom:0,

fontFamily:
text?.fontFamily ||
finalTheme?.fonts?.bio ||
"Inter"

}}
>

{profile.bio}

</p>

)}

{/* BUTTONS */}

<div
style={{

width:"100%",

marginTop:54,

paddingBottom:80

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
