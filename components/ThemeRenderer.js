"use client";

import HeroHeader from "./HeroHeader";

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
floatingGlowKeyframes
} from "./renderers/MotionEffects";

import BackgroundGlow
from "./renderers/BackgroundGlow";

import ContentRenderer
from "./renderers/ContentRenderer";

import HeroContent
from "./renderers/HeroContent";

import LayoutContainer
from "./renderers/LayoutContainer";

import {
getAtmosphere
} from "../app/lib/atmosphereEngine";

import AtmosphereOverlay
from "./renderers/AtmosphereOverlay";

import {
getActiveHeroPreset
} from "../app/lib/getActiveHeroPreset";

import {
getHeroLayout
} from "../app/lib/heroLayoutEngine";

import {
getHeroVisualHierarchy
} from "../app/lib/heroVisualHierarchy";

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
/* BACKGROUND */
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
/* LAYOUT */
/* ================================================= */

const layout = {

...(appearance?.layout || {}),
...(live?.layout || {})

};


/* ================================================= */
/* HERO PRESET */
/* ================================================= */

const heroPreset =
getActiveHeroPreset({

layout,
background

});

const heroLayout =
getHeroLayout({

layout,
heroPreset,
isMobile

});
const hierarchy =
getHeroVisualHierarchy({

heroPreset,
isHero,
isMobile

});
/* ================================================= */
/* TEXT */
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
/* CAPABILITIES */
/* ================================================= */

const capabilities =
presetText?.capabilities || {};

const asymmetricSplit =
capabilities?.asymmetricSplit;

const stickyIntro =
capabilities?.stickyIntro;


/* ================================================= */
/* LAYOUT TYPES */
/* ================================================= */

const isEditorial =
layout?.type === "editorial";

const isHero =
layout?.type === "hero";

const isCard =
layout?.type === "card";

const isSplit =
layout?.type === "split";

const isHeroCentered =
layout?.heroAlignment === "center";

const isHeroLeft =
layout?.heroAlignment === "left";


/* ================================================= */
/* ATMOSPHERE */
/* ================================================= */

const atmosphere =
getAtmosphere({

background,
theme:finalTheme,
isHero,
isMobile

});

const isAmbient =
background?.type === "ambient";

const surfaceDepth =
background?.surfaceDepth || 1;

const isDarkBackground =

background?.type === "ambient"

||

themeName === "blueprint"

||

themeName === "dark";


/* ================================================= */
/* HERO WIDTH */
/* ================================================= */

const heroContentWidth =

isHero

? (
isMobile
? "100%"
: (
layout?.heroContentWidth
||
heroPreset?.heroWidth
||
980
)
)

: undefined;


/* ================================================= */
/* MOTION */
/* ================================================= */

const motionDuration =
background?.motionDuration || 1;

const floatAnimation =
background?.floatAnimation !== false;

const entranceAnimation =
background?.entranceAnimation !== false;


/* ================================================= */
/* TYPOGRAPHY */
/* ================================================= */

const typographyIntensity =
(background?.atmosphereIntensity || 1)
*
(background?.heroIntensity || 1);

const headingScale =

isHero

? hierarchy.titleScale

: 1;
)
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
/* DENSITY */
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
/* CUSTOM THEME ROUTING */
/* ================================================= */

if(themeName === "archway"){

return(
<ArchwayTheme
{...customThemeProps}
/>
);

}

if(themeName === "modernminimal"){

return(
<ModernMinimalTheme
{...customThemeProps}
/>
);

}

if(themeName === "blueprint"){

return(
<BlueprintTheme
{...customThemeProps}
/>
);

}

if(themeName === "solstice"){

return(
<SolsticeTheme
{...customThemeProps}
/>
);

}

if(themeName === "portfolio"){

return(
<PortfolioTheme
{...customThemeProps}
/>
);

}

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

<LayoutContainer

background={background}

finalTheme={finalTheme}

isHero={isHero}

isSplit={isSplit}

isHeroCentered={isHeroCentered}

heroContentWidth={heroContentWidth}

motionDuration={motionDuration}

entranceAnimation={entranceAnimation}

mounted={mounted}

>

<AtmosphereOverlay

atmosphere={atmosphere}

background={background}

/>

<BackgroundGlow

background={background}

isHero={isHero}

isMobile={isMobile}

motionDuration={motionDuration}

floatAnimation={floatAnimation}

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

isHero && !isMobile

? heroLayout.heroColumns

: isSplit && !isMobile

? `
minmax(
${
layout?.splitLeftWidth || 420
}px,
${
layout?.splitLeftWidth || 420
}px
)
minmax(500px,1fr)
`

: undefined,

gap:

isHero

? heroLayout.contentGap
*
hierarchy.spacingScale

: asymmetricSplit

? (
isMobile
? (
60 * adaptiveSpacing
)
: (
160 * adaptiveSpacing
)
)

: isSplit

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

isHero

? heroLayout.contentAlign

: isSplit
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

? (
layout?.heroTopSpacingMobile
||
heroPreset?.topSpacingMobile
||
80
)

: (
layout?.heroTopSpacing
||
heroPreset?.topSpacingDesktop
||
140
)
)

: undefined,

transition:
"all 700ms cubic-bezier(.22,1,.36,1)"

}}
>

<HeroContent

profile={profile}

header={header}

text={text}

finalTheme={finalTheme}

layout={layout}

heroLayout={heroLayout}

isHero={isHero}

isEditorial={isEditorial}

isSplit={isSplit}

isCard={isCard}

isHeroLeft={isHeroLeft}

isMobile={isMobile}

adaptiveSpacing={adaptiveSpacing}

adaptiveTextOpacity={adaptiveTextOpacity}

headingScale={headingScale}

typographyIntensity={typographyIntensity}

background={background}

stickyIntro={stickyIntro}

/>

<ContentRenderer

blocks={blocks}

finalTheme={finalTheme}

finalAppearance={finalAppearance}

layout={layout}

text={text}

isHero={isHero}

isSplit={isSplit}

isEditorial={isEditorial}

isMobile={isMobile}

adaptiveSpacing={adaptiveSpacing}

/>

</div>

</LayoutContainer>

<style jsx global>{`
${floatingGlowKeyframes}
`}</style>

</>

);

}
