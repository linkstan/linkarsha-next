"use client";

import {
buildSections
} from "../../app/lib/sectionEngine";

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

isBento
? 24
: undefined,

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

{sections.map((section,sectionIndex)=>(

<div
key={sectionIndex}
style={{

display:"contents"

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

))}

</div>

);

}
