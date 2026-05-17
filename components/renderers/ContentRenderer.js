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

import BlockRenderer
from "./BlockRenderer";

import {
getBentoConfig
} from "../../app/lib/bentoEngine";

import {
getFeaturedBlock
} from "../../app/lib/featuredBlockEngine";

import {
getStorytellingFlow
} from "../../app/lib/storytellingEngine";

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

paddingBottom:80,

width:"100%"

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

return(

<div
key={sectionIndex}
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
rhythm.marginBottom

width:"100%",

alignItems:

isEditorial
? "flex-start"
: "stretch"

}}
>

{section.blocks.map((block,index)=>{
const storytelling =
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
storytelling.spacingTop,

marginBottom:
storytelling.spacingBottom,

transform:
`scale(${storytelling.emphasis})`,

transformOrigin:"center",

transition:
"transform .5s cubic-bezier(.22,1,.36,1)"

}}
>

<BlockRenderer

block={{

...block,

featuredBlock

}}

theme={finalTheme}

appearance={finalAppearance}

index={index}

/>

</div>

);

})}

</div>

);

})}

</div>

);

}
