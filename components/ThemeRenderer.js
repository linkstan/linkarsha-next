"use client";

import HeroHeader from "./HeroHeader";

import MinimalTheme from "./themes/MinimalTheme";
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

import HeroDepthLayers
from "./renderers/HeroDepthLayers";

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
getPremiumComposition
} from "../app/lib/premiumCompositionEngine";

import {
getAdvancedHeroLayout
} from "../app/lib/getAdvancedHeroLayout";

import {
getCinematicSpacing
} from "../app/lib/cinematicSpacingEngine";

import {
getVisualBalance
} from "../app/lib/visualBalanceEngine";

import {
getHeroWidths
} from "../app/lib/heroWidthEngine";

import {
getFloatingHeroSurface
} from "../app/lib/floatingHeroSurfaceEngine";

import {
getHeroSpotlight
} from "../app/lib/heroSpotlightEngine";

import FloatingHeroSurface
from "./renderers/FloatingHeroSurface";

import HeroSpotlight
from "./renderers/HeroSpotlight";

import {
getSectionTransition
} from "../app/lib/sectionTransitionEngine";

import SectionTransitionLayer
from "./renderers/SectionTransitionLayer";

import {
getAmbientLight
} from "../app/lib/ambientLightEngine";

import {
getDepthFog
} from "../app/lib/depthFogEngine";

import AmbientLightLayer
from "./renderers/atmosphere/AmbientLightLayer";

import DepthFogLayer
from "./renderers/atmosphere/DepthFogLayer";

import CinematicAtmosphereStack
from "./renderers/atmosphere/CinematicAtmosphereStack";

import {
useEffect,
useState
} from "react";


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
/* LIVE */
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
/* ENTRANCE */
/* ================================================= */

useEffect(()=>{

const timer = setTimeout(()=>{

setMounted(true);

},80);

return ()=>clearTimeout(timer);

},[]);


/* ================================================= */
/* APPEARANCE */
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
/* HERO */
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

const advancedHeroLayout =
getAdvancedHeroLayout({

layout

});

const hierarchy =
getHeroVisualHierarchy({

heroPreset,
isHero:
layout?.type === "hero",
isMobile

});

const premiumComposition =
getPremiumComposition({

layout,
isHero:
layout?.type === "hero",
isMobile

});

const cinematicSpacing =
getCinematicSpacing({

layout,
isHero:
layout?.type === "hero",
isMobile

});

const visualBalance =
getVisualBalance({

layout,
isHero:
layout?.type === "hero",
isMobile

});

const heroWidths =
getHeroWidths({

layout,
isHero:
layout?.type === "hero",
isMobile

});

const floatingHeroSurface =
getFloatingHeroSurface({

layout,
background,
isMobile

});

const heroSpotlight =
getHeroSpotlight({

background,
layout,
isMobile

});

const sectionTransition =
getSectionTransition({

layout,
background,
isMobile

});

const ambientLight =
getAmbientLight({

background,
isHero:
layout?.type === "hero",
isMobile

});

const depthFog =
getDepthFog({

background,
isHero:
layout?.type === "hero",
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
/* TYPES */
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
/* CAPABILITIES */
/* ================================================= */

const capabilities =
presetText?.capabilities || {};

const asymmetricSplit =
capabilities?.asymmetricSplit;

const stickyIntro =
capabilities?.stickyIntro;


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
heroWidths?.introWidth
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
/* ROUTING */
/* ================================================= */
if(themeName === "minimal"){

return(
<MinimalTheme
{...customThemeProps}
/>
);

}
  
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
/* DEFAULT */
/* ================================================= */

return(

<>

<CinematicAtmosphereStack>

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

<AmbientLightLayer
ambient={ambientLight}
/>

<DepthFogLayer
fog={depthFog}
/>

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

<HeroDepthLayers

background={background}

isHero={isHero}

isMobile={isMobile}

layout={layout}

/>

<HeroSpotlight

spotlight={heroSpotlight}

background={background}

/>

<HeroHeader
appearance={finalAppearance}
theme={finalTheme}
/>

<SectionTransitionLayer

transition={sectionTransition}

background={background}

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

? (
layout?.heroStyle === "asymmetric"

? "minmax(560px,1.25fr) minmax(320px,.75fr)"

: advancedHeroLayout.heroColumns
||
premiumComposition.heroColumns
||
heroLayout.heroColumns
)

: isSplit && !isMobile

? premiumComposition.contentColumns

: undefined,

gap:

isHero

? cinematicSpacing.heroGap
*
hierarchy.spacingScale

: isSplit

? premiumComposition.contentGap

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
cinematicSpacing.heroTopSpacing
||
heroPreset?.topSpacingMobile
||
80
)

: (
layout?.heroTopSpacing
||
cinematicSpacing.heroTopSpacing
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

<FloatingHeroSurface

surface={floatingHeroSurface}

background={background}

>

<HeroContent

profile={profile}

header={header}

text={text}

finalTheme={finalTheme}

layout={layout}

heroLayout={heroLayout}

advancedHeroLayout={
advancedHeroLayout
}

visualBalance={visualBalance}

heroWidths={heroWidths}

cinematicSpacing={cinematicSpacing}

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

</FloatingHeroSurface>

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

</CinematicAtmosphereStack>

<style jsx global>{`
${floatingGlowKeyframes}
`}</style>

</>

);

}
