"use client";

import HeroHeader from "./HeroHeader";
import ButtonBlock from "./ButtonBlock";

import ModernMinimalTheme from "./themes/ModernMinimalTheme";
import ArchwayTheme from "./themes/ArchwayTheme";
import BlueprintTheme from "./themes/BlueprintTheme";
import SolsticeTheme from "./themes/SolsticeTheme";
import PortfolioTheme from "./themes/PortfolioTheme";
import RippleTheme from "./themes/RippleTheme";

import backgroundPresets
from "../app/lib/backgroundPresets";

import { getTheme }
from "../app/lib/themeEngine";

import { layoutPresets }
from "../app/lib/layoutPresets";

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

const [isMobile,setIsMobile] =
useState(false);


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
/* RESPONSIVE */
/* ================================================= */

useEffect(()=>{

function handleResize(){

setIsMobile(
window.innerWidth <= 768
);

}

handleResize();

window.addEventListener(
"resize",
handleResize
);

return ()=>{

window.removeEventListener(
"resize",
handleResize
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
/* BACKGROUND SETTINGS */
/* ================================================= */

const rawBackground = {

...(appearance?.background || {}),
...(live?.background || {})

};

const presetBackground = {

...(backgroundPresets?.[
rawBackground?.preset
] || {})

};

const background = {

...presetBackground,
...rawBackground

};


/* ================================================= */
/* LAYOUT SETTINGS */
/* ================================================= */

const layout = {

...(appearance?.layout || {}),
...(live?.layout || {})

};


/* ================================================= */
/* TEXT SETTINGS */
/* ================================================= */

const presetText = {

...(layoutPresets?.[
layout?.type
] || {})

};

const text = {

...presetText,

...(appearance?.text || {}),
...(live?.text || {})

};


/* ================================================= */
/* LAYOUT TYPES */
/* ================================================= */

const isCentered =
layout?.type === "centered";

const isEditorial =
layout?.type === "editorial";

const isHero =
layout?.type === "hero";

const isCard =
layout?.type === "card";

const isSplit =
layout?.type === "split";


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

justifyContent:

isHero
? "flex-start"
: "center",

padding:

isHero
? "0"
: (
isSplit
? "60px 40px"
: "40px 20px"
),

width:"100%",

background:

background?.type === "gradient"

? `linear-gradient(
${background?.gradientDirection || "135deg"},
${background?.gradient1 || "#ffffff"},
${background?.gradient2 || "#e9ecff"}
)`

: (
background?.background ||
finalTheme?.background ||
"#ffffff"
),

transition:
"background 900ms ease, color 500ms ease",

color:
finalTheme?.textColor || "#000000",

minHeight:"100vh",

position:"relative",
overflow:"hidden",

}}
>

{/* ================================================= */}
{/* GLOW */}
{/* ================================================= */}

<div
style={{

position:"absolute",

top:

background?.glowPosition === "bottom"
? "auto"
: (
background?.glowPosition === "center"
? "50%"
: -120
),

bottom:
background?.glowPosition === "bottom"
? -120
: "auto",

left:

background?.glowPosition === "top-right"
? "auto"
: (
background?.glowPosition === "center"
? "50%"
: -120
),

right:
background?.glowPosition === "top-right"
? -120
: "auto",

transform:

background?.glowPosition === "center"
? "translate(-50%,-50%)"
: "none",

width:

isHero

? (
isMobile
? 340
: 760
)

: (
isMobile
? 240
: 420
),

height:

isHero

? (
isMobile
? 340
: 760
)

: (
isMobile
? 240
: 420
),

borderRadius:"50%",

background:

background?.type === "ambient"

? `${background?.glowColor || "#7c7cff"}${Math.round(
(background?.glowOpacity || .18)*255
).toString(16).padStart(2,"0")}`

: "transparent",

filter:
`blur(${
isHero
? (
(background?.blurStrength || 80) + 40
)
: (
background?.blurStrength || 80
)
}px)`,

opacity:
background?.type === "ambient"
? 1
: 0,

transition:
"all 1200ms cubic-bezier(.22,1,.36,1)",

pointerEvents:"none"

}}
/>


<HeroHeader
appearance={finalAppearance}
theme={finalTheme}
/>


{/* ================================================= */}
{/* MAIN CONTENT */}
{/* ================================================= */}

<div
style={{

width:"100%",

maxWidth:

isMobile

? 520

: isEditorial
? 720

: isHero
? 1100

: isCard
? 560

: isSplit
? 1200

: 520,


display:

isSplit && !isMobile
? "grid"
: "flex",


flexDirection:
isSplit
? undefined
: "column",


gridTemplateColumns:

isSplit && !isMobile
? "420px minmax(400px,1fr)"
: undefined,


gap:

isSplit

? (
isMobile
? 50
: 120
)

: undefined,


alignItems:
isSplit
? "start"
: "center",


background:

isCard

? (
background?.type === "ambient"
? "rgba(255,255,255,0.16)"
: "rgba(255,255,255,0.72)"
)

: "transparent",


backdropFilter:

isCard
? "blur(40px)"
: "none",


border:

isCard

? (
background?.type === "ambient"
? "1px solid rgba(255,255,255,0.12)"
: "1px solid rgba(255,255,255,0.55)"
)

: "none",


borderRadius:

isCard
? 48
: 0,

boxShadow:

isCard

? (
background?.type === "ambient"

? "0 30px 80px rgba(0,0,0,.28)"

: "0 30px 80px rgba(0,0,0,.10)"
)

: "none",

padding:

isCard

? (
isMobile
? "38px 24px"
: "70px 55px"
)

: "0",

paddingLeft:24,
paddingRight:24,

margin:"0 auto",

paddingTop:

isHero

? (
isMobile
? 40
: 120
)

: undefined,

transition:
"all 700ms cubic-bezier(.22,1,.36,1)",

}}
>

{/* ================================================= */}
{/* LEFT SIDE */}
{/* ================================================= */}

<div
style={{

display:"flex",
flexDirection:"column",

alignItems:

isEditorial

? "flex-start"

: (
text?.align === "left"
? "flex-start"
: (
text?.align === "right"
? "flex-end"
: "center"
)
),

width:"100%",

position:

isSplit && !isMobile
? "sticky"
: "relative",

top:

isSplit && !isMobile
? 80
: "auto",

}}
>

{/* AVATAR */}

<img
src={profile.avatar || ""}

style={{

width:

isHero
? 140
: (
finalTheme?.avatar?.size || 110
),

height:

isHero
? 140
: (
finalTheme?.avatar?.size || 110
),

borderRadius:"50%",

border:
finalTheme?.avatar?.border || "none",

objectFit:"cover",

marginTop:

isSplit
? 20

: isHero
? (
isMobile
? 120
: 220
)

: finalTheme?.layout?.avatarOverlap
? -20
: text?.headerTopSpacing || 42,

transform:

finalTheme?.layout?.avatarOverlap

? `translateY(-${
(finalTheme?.avatar?.size || 110)/2
}px)`

: "none",

marginBottom:
text?.sectionSpacing || 22,

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

isHero

isMobile
? "clamp(54px,14vw,76px)"
: "clamp(72px,10vw,140px)"

: isEditorial

? "clamp(54px,7vw,92px)"

: isSplit

? "clamp(58px,8vw,100px)"

: isCard

? "clamp(46px,6vw,72px)"

: "clamp(42px,6vw,62px)",

lineHeight:

isHero
? 0.92
: 1,

letterSpacing:
`${text?.letterSpacing || -0.04}em`,

fontWeight:
text?.fontWeight || 700,

margin:0,

textAlign:

isEditorial
? "left"
: (
text?.align || "center"
),

width:"100%"

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

marginTop:
text?.nameBottomSpacing || 14,

letterSpacing:
`${(text?.letterSpacing || -0.04)/4}em`,

textAlign:

isEditorial
? "left"
: (
text?.align || "center"
),

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

fontSize:

isHero
? 26
: 20,

lineHeight:
text?.lineHeight || 1.5,

opacity:
text?.textOpacity || .88,

textAlign:

isEditorial
? "left"
: (
text?.align || "center"
),

marginTop:
(text?.sectionSpacing || 54) / 1.5,

maxWidth:

isEditorial
? 260
: 340,

width:"100%"

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

maxWidth:

isEditorial
? 260
: 340,

width:"100%",

textAlign:

isEditorial
? "left"
: (
text?.align || "center"
),

opacity:
text?.textOpacity || .72,

lineHeight:
text?.lineHeight || 1.7,

fontSize:
text?.bioSize || 15,

marginTop:
(text?.sectionSpacing || 54) / 3,

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

</div>


{/* ================================================= */}
{/* RIGHT SIDE / BUTTONS */}
{/* ================================================= */}

<div
style={{

width:"100%",

maxWidth:

isSplit

? (
isMobile
? "100%"
: 680
)

: "100%",

display:"flex",
flexDirection:"column",

alignItems:

isEditorial
? "flex-start"
: "stretch",

marginTop:

isHero

? (
isMobile
? 60
: 90
)

: isSplit
? 0
: (
text?.sectionSpacing || 54
),

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
