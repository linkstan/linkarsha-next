"use client";

export default function LayoutContainer({

children,

background,
finalTheme,

isHero,
isSplit,
isHeroCentered,

heroContentWidth,

motionDuration,

entranceAnimation,
mounted

}){

return(

<div
style={{

display:"flex",

flexDirection:"column",

alignItems:"center",

maxWidth:

isHero
? heroContentWidth
: undefined,

margin:

isHeroCentered
? "0 auto"
: undefined,

justifyContent:

isHero
? "flex-start"
: "center",

padding:

isHero
? "0"
: (
isSplit
? "60px 40px"
: "40px 20px"
),

width:"100%",

background:

background?.type === "gradient"

? `linear-gradient(
${background?.gradientDirection || "135deg"},
${background?.gradient1 || "#ffffff"},
${background?.gradient2 || "#e9ecff"}
)`

: (
background?.background ||
finalTheme?.background ||
"#ffffff"
),

transition:
`
background 900ms ease,
color 500ms ease,
opacity ${
0.9 * motionDuration
}s cubic-bezier(.22,1,.36,1),
transform ${
1.2 * motionDuration
}s cubic-bezier(.22,1,.36,1)
`,

color:
finalTheme?.textColor || "#000000",

minHeight:"100vh",

position:"relative",

overflow:"hidden",

opacity:

entranceAnimation

? (
mounted
? 1
: 0
)

: 1,

transform:

entranceAnimation

? (
mounted
? "translateY(0px)"
: "translateY(28px)"
)

: "none"

}}
>

{children}

</div>

);

}
