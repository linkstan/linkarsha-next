export function getRadius({
buttons,
isHero
}){

switch(buttons?.radius){

case "square":
return 0;

case "round":
return 16;

case "rounder":
return 24;

case "full":
return 999;

default:

return buttons?.radiusValue ||
(isHero ? 28 : 18);

}

}


export function getPadding({

isHeroBlock,
isFeature,
isFeaturedCTA,
isSecondaryCTA,
isHero,
buttons

}){

if(isHeroBlock){

return "42px 42px";

}

if(isFeature){

return "36px 36px";

}

if(isFeaturedCTA){

return "32px 38px";

}

if(isSecondaryCTA){

return "24px 28px";

}

if(isHero){

return "26px 34px";

}

switch(buttons?.size){

case "small":
return "10px 14px";

case "large":
return "30px 36px";

default:
return "18px 24px";

}

}


export function getFontSize({

isHeroBlock,
isFeature,
isFeaturedCTA,
isSecondaryCTA,
isHero,
buttons

}){

if(isHeroBlock){

return 28;

}

if(isFeature){

return 24;

}

if(isFeaturedCTA){

return 22;

}

if(isSecondaryCTA){

return 18;

}

if(isHero){

return 20;

}

switch(buttons?.size){

case "small":
return 14;

case "large":
return 21;

default:
return 17;

}

}


export function getShadow({

isHeroBlock,
surfaceDepth,
isDarkBackground,
background,
isFeaturedCTA,
hovered,
isAmbient,
buttons

}){

if(isHeroBlock){

return `
0 ${
46 * surfaceDepth
}px ${
120 * surfaceDepth
}px rgba(
0,
0,
0,
${
isDarkBackground ? .44 : .24
}
)
`;

}

const intensity =
surfaceDepth *
(background?.atmosphereIntensity || 1);

if(isFeaturedCTA){

return `
0 ${
36 * surfaceDepth
}px ${
90 * surfaceDepth
}px rgba(
0,
0,
0,
${
isDarkBackground ? .38 : .22
}
)
`;

}

if(hovered){

if(isAmbient){

return `
0 ${
25 * intensity
}px ${
60 * intensity
}px rgba(0,0,0,${
isDarkBackground ? .42 : .28
})
`;

}

return `
0 ${
20 * intensity
}px ${
45 * intensity
}px rgba(0,0,0,.18)
`;

}

if(isAmbient){

return `
0 ${
10 * intensity
}px ${
28 * intensity
}px rgba(0,0,0,${
isDarkBackground ? .34 : .18
})
`;

}

if(buttons?.shadowLift){

return buttons?.style === "glass"

? `0 ${
(buttons?.depth || 14)
*
intensity
}px ${
(buttons?.depth || 14)
*
2.4
*
intensity
}px rgba(0,0,0,${
isDarkBackground ? .28 : .18
})`

: `0 ${
(buttons?.depth || 14)
*
intensity
}px ${
(buttons?.depth || 14)
*
2.4
*
intensity
}px rgba(0,0,0,${
isDarkBackground ? .24 : .16
})`;

}

if(buttons?.depthEffect){

return `
0 ${
6 * intensity
}px 0 rgba(0,0,0,.22)
`;

}

return `
0 ${
6 * intensity
}px ${
16 * intensity
}px rgba(0,0,0,${
isDarkBackground ? .20 : .08
})
`;

}


export function getBackground({

isCTA,
buttons,
isCard,
isAmbient,
isHeroBlock,
hovered,
isDarkBackground

}){

if(isCTA){

return "#e3a9a9";

}

if(buttons?.style === "outline"){

return "transparent";

}

if(
buttons?.style === "glass"
||
isCard
||
isAmbient
){

if(isHeroBlock){

return hovered

? `rgba(
255,
255,
255,
${
isDarkBackground ? .28 : .42
}
)`

: `rgba(
255,
255,
255,
${
isDarkBackground ? .18 : .30
}
)`;

}

return hovered

? `rgba(
255,
255,
255,
${
isDarkBackground
? .18
: .28
}
)`

: `rgba(
255,
255,
255,
${
isDarkBackground
? .10
: .18
}
)`;

}

return buttons?.bg || "#000000";

}


export function getBorder({

buttons,
isCard,
isAmbient,
hovered,
isDarkBackground

}){

if(buttons?.style === "outline"){

return "1.5px solid rgba(0,0,0,.18)";

}

if(
buttons?.style === "glass"
||
isCard
||
isAmbient
){

return hovered

? `1px solid rgba(
255,
255,
255,
${
isDarkBackground
? .22
: .45
}
)`

: `1px solid rgba(
255,
255,
255,
${
isDarkBackground
? .12
: .25
}
)`;

}

return "none";

}


export function getTextColor({
buttons
}){

if(buttons?.style === "outline"){

return "#111111";

}

return buttons?.text || "#ffffff";

}


export function getTransform({

hovered,
isHeroBlock,
isFeaturedCTA,
background

}){

if(hovered){

return `translateY(-${
(
isHeroBlock
? 10

: isFeaturedCTA
? 7

: 4
)
*
(background?.animationIntensity || 1)
}px) scale(${
1 + (
0.01 *
(background?.animationIntensity || 1)
)
})`;

}

return "translateY(0px) scale(1)";

}
