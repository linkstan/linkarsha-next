"use client";

import {
getHeroComposition
} from "../../app/lib/heroCompositionEngine";

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
heroLayout

}){

const composition =
getHeroComposition({

layout,
isMobile,
background,
text

});

return(

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
composition.compositionGap

}}
>

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
? (
composition.topSpacing
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

<div
style={{

maxWidth:

isHero

? heroLayout.introWidth

: composition.textWidth,

width:"100%"

}}
>

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
? 28
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

isHero

? composition.textWidth

: isEditorial
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

isHero

? composition.textWidth

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

</div>

);

}
