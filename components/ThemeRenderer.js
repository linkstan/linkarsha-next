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
const [mounted,setMounted] =
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
/* ENTRANCE ANIMATION */
/* ================================================= */

useEffect(()=>{

const timer = setTimeout(()=>{

setMounted(true);

},80);

return ()=>clearTimeout(timer);

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
/* LAYOUT CAPABILITIES */
/* ================================================= */

const capabilities =
presetText?.capabilities || {};

const cinematicHero =
capabilities?.cinematicHero;

const asymmetricSplit =
capabilities?.asymmetricSplit;

const stickyIntro =
capabilities?.stickyIntro;

const featuredCTA =
capabilities?.featuredCTA;

const editorialComposition =
capabilities?.editorialComposition;

const immersiveSpacing =
capabilities?.immersiveSpacing;

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

const isAmbient =
background?.type === "ambient";

const surfaceDepth =
background?.surfaceDepth || 1;
/* ================================================= */
/* MOTION ENGINE */
/* ================================================= */

const motionPreset =
background?.motionPreset ||
"cinematic";

const motionDuration =
background?.motionDuration || 1;

const staggerIntensity =
background?.staggerIntensity || 1;

const entranceAnimation =
background?.entranceAnimation !== false;

const floatAnimation =
background?.floatAnimation !== false;

const isDarkBackground =

background?.type === "ambient"

||

themeName === "blueprint"

||

themeName === "dark";


/* ================================================= */
/* TYPOGRAPHY ENGINE */
/* ================================================= */

const typographyIntensity =
(background?.atmosphereIntensity || 1)
*
(background?.heroIntensity || 1);

const headingScale =
isHero
? (
isMobile
? 1.08
: 1.18
)
: 1;

const adaptiveTextOpacity =
isDarkBackground
? Math.min(
(text?.textOpacity || .72) + .12,
1
)
: (
text?.textOpacity || .72
);


/* ================================================= */
/* DENSITY ENGINE */
/* ================================================= */

const density =
text?.density || "balanced";

const adaptiveSpacing =

density === "compact"

? .78

: density === "luxury"

? 1.28

: 1;


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

<>

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
`
background 900ms ease,
color 500ms ease,

opacity ${
0.9 * motionDuration
}s cubic-bezier(.22,1,.36,1),

transform ${
1.2 * motionDuration
}s cubic-bezier(.22,1,.36,1)
s cubic-bezier(.22,1,.36,1)
`,

color:
finalTheme?.textColor || "#000000",

minHeight:"100vh",

position:"relative",

overflow:"hidden",

opacity:

entranceAnimation

? (
mounted
? 1
: 0
)

: 1,

transform:

entranceAnimation

? (
mounted
? "translateY(0px)"
: "translateY(28px)"
)

: "none",

}}
>

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
): (
(background?.blurStrength || 80)
*
(background?.atmosphereIntensity || 1)
)
}px)`,

opacity:
background?.type === "ambient"
? 1
: 0,

transition:
"all 1200ms cubic-bezier(.22,1,.36,1)",
animation:

floatAnimation
&&
background?.type === "ambient"

? `floatingGlow ${
12 / motionDuration
}s ease-in-out infinite`

: "none",
  
pointerEvents:"none"

}}
/>

<HeroHeader
appearance={finalAppearance}
theme={finalTheme}
/>

<div
style={{

width:"100%",

maxWidth:

isMobile

? (
text?.contentWidthMobile || 520
)

: isEditorial

? (
text?.contentWidthEditorial || 720
)

: isHero

? (
text?.contentWidthHero || 1100
)

: isCard

? (
text?.contentWidthCard || 560
)

: isSplit

? (
text?.contentWidthSplit || 1200
)

: (
text?.contentWidth || 520
),

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
? (
50 * adaptiveSpacing
)
: (
120 * adaptiveSpacing
)
)

: undefined,

alignItems:
isSplit
? "start"
: "center",

background:

isCard

? (

isAmbient

? `rgba(
255,
255,
255,
${
isDarkBackground
? .08
: .16
}
)`

: `rgba(
255,
255,
255,
${
isDarkBackground
? .14
: .72
}
)`

)

: "transparent",

backdropFilter:

isCard

? `blur(${
(background?.glassBlur || 26)
*
1.4
}px)`

: "none",

border:

isCard

? (

isAmbient

? `1px solid rgba(
255,
255,
255,
${
isDarkBackground
? .08
: .12
}
)`

: `1px solid rgba(
255,
255,
255,
${
isDarkBackground
? .18
: .55
}
)`

)

: "none",

borderRadius:

isCard
? 48
: 0,

boxShadow:

isCard

? (

isAmbient

? `
0 ${
30 * surfaceDepth
}px ${
80 * surfaceDepth
}px rgba(
0,
0,
0,
${
isDarkBackground ? .42 : .28
}
)
`

: `
0 ${
30 * surfaceDepth
}px ${
80 * surfaceDepth
}px rgba(
0,
0,
0,
${
isDarkBackground ? .20 : .10
}
)
`

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

<img
src={profile.avatar || ""}

style={{

width:

isHero
? (
140 *
(background?.heroIntensity || 1)
)
: (
finalTheme?.avatar?.size || 110
),

height:

isHero
? (
140 *
(background?.heroIntensity || 1)
)
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
(
text?.sectionSpacing || 22
)
*
adaptiveSpacing,

position:"relative",
zIndex:10,

boxShadow:

finalTheme?.avatar?.shadow
? "0 10px 25px rgba(0,0,0,.18)"
: "none"

}}
/>

{header.showDisplayName !== false && (

<h1
style={{

fontFamily:
text?.fontFamily ||
finalTheme?.fonts?.name ||
"Inter",

fontSize:

isHero

? (
isMobile

? `clamp(${
54 * headingScale
}px,${
14 * headingScale
}vw,${
76 * headingScale
}px)`

: `clamp(${
72 * headingScale
}px,${
10 * headingScale
}vw,${
140 * headingScale
}px)`
)

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
`${
(
text?.letterSpacing || -0.04
)
*
typographyIntensity
}em`,

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

{header.showUsername !== false && (

<div
style={{

opacity:
adaptiveTextOpacity,

fontSize:
text?.usernameSize || 18,

marginTop:
(
text?.nameBottomSpacing || 14
)
*
adaptiveSpacing,

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
adaptiveTextOpacity,

textAlign:

isEditorial
? "left"
: (
text?.align || "center"
),

marginTop:
(
(text?.sectionSpacing || 54)
/
1.5
)
*
adaptiveSpacing,

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
adaptiveTextOpacity,

lineHeight:

(
text?.lineHeight || 1.7
)

*

(
isHero
? 1.04
: 1
),

fontSize:
text?.bioSize || 15,

marginTop:

(
(text?.sectionSpacing || 54)
/
3
)

*
adaptiveSpacing,

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
? (
60 * adaptiveSpacing
)
: (
90 * adaptiveSpacing
)
)

: isSplit
? 0
: (
(text?.sectionSpacing || 54)
*
adaptiveSpacing
),

paddingBottom:80

}}
>

{blocks.map((block,index)=>(

<ButtonBlock
  
index={index}
 
key={block.id}

block={block}

theme={finalTheme}

appearance={finalAppearance}

/>

))}

</div>

</div>

</div>

<style jsx global>{`

@keyframes floatingGlow {

0%{
transform:
translate(0px,0px)
scale(1);
}

25%{
transform:
translate(12px,-8px)
scale(1.04);
}

50%{
transform:
translate(-6px,12px)
scale(1.02);
}

75%{
transform:
translate(10px,6px)
scale(1.05);
}

100%{
transform:
translate(0px,0px)
scale(1);
}

}

`}</style>

</>

);

}
