"use client";

import BlockRenderer
from "./BlockRenderer";

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

return(

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

display:

layout?.enableBento
? "grid"
: "flex",

flexDirection:

layout?.enableBento
? undefined
: "column",

gridTemplateColumns:

layout?.enableBento

? (
isMobile
? "1fr"
: "repeat(2,minmax(0,1fr))"
)

: undefined,

gridAutoRows:

layout?.enableBento
? "minmax(140px,auto)"
: undefined,

gap:

layout?.enableBento
? 22
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

);

}
