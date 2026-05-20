"use client";

import {
getHeroComposition
} from "../../app/lib/heroCompositionEngine";

import {
getPremiumHeroRhythm
} from "../../app/lib/premiumHeroRhythm";

import {
getHeroDepth
} from "../../app/lib/heroDepthEngine";

import {
getHeroCompositionRefinement
} from "../../app/lib/heroCompositionRefinement";

import {
getHeroCinematicFlow
} from "../../app/lib/heroCinematicFlow";

import {
getAsymmetricHero
} from "../../app/lib/asymmetricHeroEngine";

import {
getHeroCTAAnchor
} from "../../app/lib/heroCTAAnchorEngine";

import {
getHeroStoryPanel
} from "../../app/lib/heroStoryPanelEngine";

import {
getTrustSignals
} from "../../app/lib/trustSignalEngine";

import HeroAsymmetricLayout
from "./HeroAsymmetricLayout";

import HeroStoryPanel
from "./HeroStoryPanel";

import TrustSignalBar
from "./trust/TrustSignalBar";

import CreatorIdentityStrip
from "./trust/CreatorIdentityStrip";

import PremiumMetadataRow
from "./trust/PremiumMetadataRow";

import VerificationBadge
from "./trust/VerificationBadge";


export default function HeroContent({

profile,
header,

text,
finalTheme,

isHero,
isEditorial,
isSplit,
isCard,

isHeroLeft,
isMobile,

adaptiveSpacing,
adaptiveTextOpacity,

headingScale,
typographyIntensity,

background,
layout,

heroLayout,
advancedHeroLayout,

visualBalance,
heroWidths,
cinematicSpacing

}){

const composition =
getHeroComposition({

layout,
isMobile,
background,
text

});

const refinement =
getHeroCompositionRefinement({

layout,
isMobile

});

const cinematicFlow =
getHeroCinematicFlow({

layout,
isMobile

});

const asymmetricHero =
getAsymmetricHero({

layout,
isMobile

});

const heroCTAAnchor =
getHeroCTAAnchor({

layout,
isMobile

});

const heroStoryPanel =
getHeroStoryPanel({

layout,
background,
isMobile

});

const trustSignals =
getTrustSignals({

profile,
layout,
background,
isMobile

});

const cinematicWidth =

isHero

? (
refinement?.contentWidth
||
heroWidths?.introWidth
||
advancedHeroLayout?.introWidth
||
heroLayout?.introWidth
||
760
)

: composition.textWidth;

const rhythm =
getPremiumHeroRhythm({

layout,
isHero,
isMobile

});

const heroDepth =
getHeroDepth({

background,
layout

});

return(

<HeroStoryPanel

panel={heroStoryPanel}

background={background}

>

<HeroAsymmetricLayout

asymmetricHero={asymmetricHero}

isHero={isHero}

isMobile={isMobile}

>

<div
style={{

display:"flex",
flexDirection:"column",

alignItems:

isHero

? heroLayout.contentAlign

: isHeroLeft

? "flex-start"

: isEditorial

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

gap:

isHero

? cinematicFlow.heroGap

: composition.compositionGap,

transform:

isHero

? `translateX(${
refinement?.introOffset || 0
}px)`

: "none",

position:"relative",

zIndex:4,

maxWidth:

isHero

? (
refinement?.heroMaxWidth
||
"100%"
)

: "100%"

}}
>

<CreatorIdentityStrip
signals={trustSignals}
/>

<img
src={profile.avatar || ""}

style={{

width:

isHero

? (
140 *
composition.heroScale
)

: (
finalTheme?.avatar?.size || 110
),

height:

isHero

? (
140 *
composition.heroScale
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
? 32

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
rhythm.avatarSpacing,

position:"relative",
zIndex:10,

boxShadow:

finalTheme?.avatar?.shadow

? heroDepth.avatarShadow

: "none"

}}
/>

<div
style={{

maxWidth:
cinematicWidth,

width:"100%",

position:"relative",

zIndex:3

}}
>

{header.showDisplayName !== false && (

<div
style={{

display:"flex",
alignItems:"center",

gap:

isMobile
? 10
: 14,

justifyContent:

isEditorial
? "flex-start"
: (
text?.align === "left"
? "flex-start"
: "center"
)

}}
>

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
160 * composition.heroScale
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
`${(
text?.letterSpacing || -0.04
)
*
typographyIntensity
}em`,

fontWeight:
text?.fontWeight || 700,

margin:0,

maxWidth:

isHero

? (
heroCTAAnchor?.titleWidth
||
(
isMobile
? "92%"
: "82%"
)
)

: "100%",

marginBottom:

isHero

? (
cinematicFlow?.titleSpacing || 0
)

: 0,

textAlign:

isEditorial
? "left"
: (
text?.align || "center"
),

width:"fit-content"

}}
>

{profile.display_name || profile.username}

</h1>

<VerificationBadge
signals={trustSignals}
/>

</div>

)}

{header.showUsername !== false && (

<div
style={{

opacity:
adaptiveTextOpacity,

fontSize:
text?.usernameSize || 18,

marginTop:
rhythm.titleSpacing,

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

<PremiumMetadataRow
signals={trustSignals}
/>

{header.subtitle && (

<div
style={{

fontFamily:
text?.fontFamily ||
finalTheme?.fonts?.bio ||
"Inter",

fontSize:

isHero

? (
isMobile
? 22
: 30
)

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
rhythm.subtitleSpacing,

maxWidth:

isHero

? (
heroLayout?.bioWidth
||
composition.textWidth
)

: isEditorial
? 260
: 340,

width:"100%",

position:"relative",

zIndex:2

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

isHero

? (
refinement?.bioWidth
||
heroLayout?.bioWidth
||
composition.textWidth
)

: isEditorial
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
? refinement?.verticalFlow || 1.04
: 1
),

fontSize:
text?.bioSize || 15,

marginTop:
rhythm.bioSpacing,

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

<TrustSignalBar
signals={trustSignals}
/>

</div>

</div>

</HeroAsymmetricLayout>

</HeroStoryPanel>

);

}
