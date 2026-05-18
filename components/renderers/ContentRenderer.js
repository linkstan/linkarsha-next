"use client";

import {
buildSections
} from "../../app/lib/sectionEngine";

import {
getSectionStyles
} from "../../app/lib/sectionStyles";

import {
getSectionRhythm
} from "../../app/lib/sectionRhythmEngine";

import {
getStorytellingFlow
} from "../../app/lib/storytellingEngine";

import BlockRenderer
from "./BlockRenderer";

import {
getBentoConfig
} from "../../app/lib/bentoEngine";

import {
getFeaturedBlock
} from "../../app/lib/featuredBlockEngine";

import {
getContentCinematic
} from "../../app/lib/contentCinematicEngine";

import CinematicSectionShell
from "./blocks/layout/CinematicSectionShell";

export default function ContentRenderer({

blocks,
finalTheme,
finalAppearance,

layout,
text,

isHero,
isSplit,
isEditorial,

isMobile,

adaptiveSpacing

}){

const isBento =
layout?.enableBento;

const sections =
buildSections(blocks);

return(

<div
style={{

width:"100%",

maxWidth:

isSplit

? (
isMobile
? "100%"
: 820
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

{sections.map((section,sectionIndex)=>{

const sectionStyles =
getSectionStyles({

section,
isMobile,
adaptiveSpacing

});

const rhythm =
getSectionRhythm({

section,
index:sectionIndex,
isHero,
isMobile,
adaptiveSpacing

});
  
const cinematic =
getContentCinematic({

layout,
block:section.blocks?.[0],
index:sectionIndex,
isMobile

});

return(

<CinematicSectionShell

key={sectionIndex}

cinematic={cinematic}

background={
finalAppearance?.background
}

>

<div
style={{

display:

isBento
? "grid"
: "flex",

flexDirection:

isBento
? undefined
: "column",

gridTemplateColumns:

isBento

? (
isMobile
? "1fr"
: "repeat(2,minmax(0,1fr))"
)

: undefined,

gridAutoRows:

isBento
? "minmax(160px,auto)"
: undefined,

gap:
rhythm.gap,

marginTop:
sectionStyles.marginTop,

marginBottom:
rhythm.marginBottom,

width:"100%",

alignItems:

isEditorial
? "flex-start"
: "stretch"

}}
>

{section.blocks.map((block,index)=>{

const story =
getStorytellingFlow({

index,
block,
isHero

});

const featuredBlock =
getFeaturedBlock({

block,
index,
layout

});

const bento =
getBentoConfig({

block,
index,
isMobile

});

return(

<div

key={block.id}

style={{

gridColumn:
`span ${bento.colSpan}`,

gridRow:
`span ${bento.rowSpan}`,

marginTop:
story.spacingTop,

marginBottom:
story.spacingBottom,

transform:
`scale(${story.emphasis})`,

transformOrigin:
"center top",

transition:
"all 700ms cubic-bezier(.22,1,.36,1)"

}}
>

<BlockRenderer

block={{

...block,

featuredBlock,
story

}}

theme={finalTheme}

appearance={finalAppearance}

index={index}

/>

</div>

</CinematicSectionShell>

);

})}

</div>

);

})}

</div>

);

}
