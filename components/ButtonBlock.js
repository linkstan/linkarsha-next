"use client";

import buttonPresets
from "../app/lib/buttonPresets";

import blockVariants
from "../app/lib/blockVariants";

import {
getCinematicCTA
} from "../app/lib/cinematicCTAEngine";

import {
getInteractionAtmosphere
} from "../app/lib/interactionAtmosphereEngine";

import CinematicCTAGroup
from "./renderers/cta/CinematicCTAGroup";

import FeaturedCTAAccent
from "./renderers/cta/FeaturedCTAAccent";

import PremiumInteractionSurface
from "./renderers/interaction/PremiumInteractionSurface";

import PremiumDepthGlow
from "./renderers/interaction/PremiumDepthGlow";

import {

getRadius,
getPadding,
getFontSize,
getShadow,
getBackground,
getBorder,
getTextColor,
getTransform

} from "./renderers/blockStyleEngine";

import ButtonContent
from "./renderers/blocks/ButtonContent";

import ButtonAtmosphere
from "./renderers/blocks/ButtonAtmosphere";

import {
buttonEntranceKeyframes
} from "./renderers/blocks/ButtonMotion";

import {
useState
} from "react";

export default function ButtonBlock({

block,
theme,
appearance,
index,
featuredBlock

}){

const [hovered,setHovered] =
useState(false);

const rawButtons =

appearance?.buttons ||
theme?.buttons ||
{};

const presetButtons = {

...(buttonPresets?.[
rawButtons?.preset
] || {})

};

const buttons = {

...presetButtons,
...rawButtons

};

const layout =
appearance?.layout || {};

const background =
appearance?.background || {};

const motionDuration =
background?.motionDuration || 1;

const staggerIntensity =
background?.staggerIntensity || 1;

const entranceAnimation =
background?.entranceAnimation !== false;

const isCTA =
block?.data_json?.type === "cta";

const isHero =
layout?.type === "hero";

const isFeaturedCTA =

layout?.type === "split"
&&
index === 0;

const isSecondaryCTA =
index === 1;

const variant =

blockVariants?.[
block?.data_json?.variant
] ||

blockVariants.default;

const isFeatured =
featuredBlock?.featured;

const emphasis =
featuredBlock?.emphasis;

const cinematicCTA =
getCinematicCTA({

block,
index,
isHero,
isMobile:false

});

const interaction =
getInteractionAtmosphere({

background,
isHero,
isMobile:false

});


/* ================================================= */
/* BLOCK SIZE ENGINE */
/* ================================================= */

const blockSize =
block?.data_json?.size || "normal";

const isWide =
blockSize === "wide";

const isFeature =

blockSize === "feature"

||

isFeatured

||

cinematicCTA?.featured;

const isHeroBlock =
blockSize === "hero";

const isCard =
layout?.type === "card";

const isAmbient =
background?.type === "ambient";

const isDarkBackground =

background?.background
?

(
background.background === "#050505"
||
background.background === "#0d1117"
||
background.background === "#071b2b"
)

: false;

const surfaceDepth =
background?.surfaceDepth || 1;


/* ================================================= */
/* COMPONENT */
/* ================================================= */

return(

<>

<PremiumInteractionSurface
interaction={interaction}
>

<CinematicCTAGroup

cinematic={cinematicCTA}

background={background}

>

<PremiumDepthGlow
interaction={interaction}
/>

<FeaturedCTAAccent
featured={cinematicCTA?.featured}
/>

<a
href={block?.data_json?.url || "#"}
target="_blank"
rel="noopener noreferrer"

onMouseEnter={()=>{
setHovered(true);
}}

onMouseLeave={()=>{
setHovered(false);
}}

onMouseDown={(e)=>{

if(buttons?.pressEffect){

e.currentTarget.style.transform =

buttons?.depthEffect

? "translateY(3px) scale(.985)"

: "scale(.985)";

}

}}

onMouseUp={(e)=>{

e.currentTarget.style.transform =

`
scale(${cinematicCTA?.scale || 1})
translateY(-${
interaction?.hoverLift || 0
}px)
${getTransform({

hovered,
isHeroBlock,
isFeaturedCTA,
background

})}
`;

}}

onTouchStart={(e)=>{

if(buttons?.pressEffect){

e.currentTarget.style.transform =

buttons?.depthEffect

? "translateY(3px) scale(.985)"

: "scale(.985)";

}

}}

onTouchEnd={(e)=>{

e.currentTarget.style.transform =

`
scale(${cinematicCTA?.scale || 1})
translateY(-${
interaction?.hoverLift || 0
}px)
${getTransform({

hovered,
isHeroBlock,
isFeaturedCTA,
background

})}
`;

}}

style={{

display:"block",

minHeight:

cinematicCTA?.minHeight

||

(
isHeroBlock
? 220

: isFeature
? 170

: undefined
),

padding:getPadding({

isHeroBlock,
isFeature,
isFeaturedCTA,
isSecondaryCTA,
isHero,
buttons

}),

marginTop:
appearance?.text?.buttonSpacing || 18,

textDecoration:"none",

opacity:
entranceAnimation
? 0
: 1,

animation:

entranceAnimation

? `buttonEntrance ${
0.7 * motionDuration
}s cubic-bezier(.22,1,.36,1) ${
index * 0.08 * staggerIntensity
}s both`

: "none",

transition:
`
all ${
interaction?.motionSmoothness || .32
}s cubic-bezier(.22,1,.36,1)
`,

transform:
`
scale(${cinematicCTA?.scale || 1})
${hovered
? `translateY(-${
interaction?.hoverLift || 0
}px)`
: "translateY(0px)"
}
${getTransform({

hovered,
isHeroBlock,
isFeaturedCTA,
background

})}
`,

background:
getBackground({

isCTA,
buttons,
isCard,
isAmbient,
isHeroBlock,
hovered,
isDarkBackground

}),

border:
getBorder({

buttons,
isCard,
isAmbient,
hovered,
isDarkBackground

}),

backdropFilter:

(
buttons?.style === "glass"
||
isCard
||
isAmbient
)

? `blur(${
background?.glassBlur || 26
}px)`

: "none",

WebkitBackdropFilter:

(
buttons?.style === "glass"
||
isCard
||
isAmbient
)

? `blur(${
background?.glassBlur || 26
}px)`

: "none",

borderRadius:
getRadius({

buttons,
isHero

}),

color:
getTextColor({

buttons

}),

fontFamily:
theme?.fonts?.buttons || "Inter",

fontWeight:

isHeroBlock
? 900

: emphasis === "primary"
? 800

: emphasis === "secondary"
? 700

: variant?.emphasis === "primary"
? 800

: variant?.emphasis === "secondary"
? 700

: 600,

fontSize:
getFontSize({

isHeroBlock,
isFeature,
isFeaturedCTA,
isSecondaryCTA,
isHero,
buttons

}),

letterSpacing:"-.02em",

boxShadow:
getShadow({

variant,
isHeroBlock,

surfaceDepth:
surfaceDepth
*
(
cinematicCTA?.shadowIntensity || 1
),

isDarkBackground,
background,
isFeaturedCTA,
hovered,
isAmbient,
buttons

}),

overflow:"hidden",

position:"relative",

zIndex:2,

isolation:"isolate",

willChange:
"transform, box-shadow, background"

}}
>

<ButtonAtmosphere
buttons={buttons}
/>

<div
style={{

display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",

position:"relative",
zIndex:2,

minHeight:

isHeroBlock
? 130
: undefined

}}
>

<ButtonContent

block={block}

isHeroBlock={isHeroBlock}

isHero={isHero}

/>

</div>

</a>

</CinematicCTAGroup>

</PremiumInteractionSurface>

<style jsx global>{`
${buttonEntranceKeyframes}
`}</style>

</>

);

}
