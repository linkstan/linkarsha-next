"use client";

import {
buildSections
} from "../../app/lib/sectionEngine";

import {
getSectionStyles
} from "../../app/lib/sectionStyles";

import BlockRenderer
from "./BlockRenderer";

import {
getBentoConfig
} from "../../app/lib/bentoEngine";

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
sectionStyles.gap,

marginTop:
sectionStyles.marginTop,

marginBottom:
sectionStyles.marginBottom,

width:"100%",

alignItems:

isEditorial
? "flex-start"
: "stretch"

}}
>

{section.blocks.map((block,index)=>{

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
`span ${bento.rowSpan}`

}}
>

<BlockRenderer

block={block}

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
