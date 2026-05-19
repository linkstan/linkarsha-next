export function getCinematicHeroComposition({

layout,
background,
isHero,
isMobile

}){

if(!isHero){

return{

heroWidth:"100%",

heroGap:0,

contentAlign:"center",

horizontalOffset:0,
verticalOffset:0,

avatarScale:1,

avatarOffsetX:0,
avatarOffsetY:0,
avatarOffsetTop:0,

titleSpacing:0,

titleOffsetX:0,
usernameOffsetX:0,
subtitleOffsetX:0,
bioOffsetX:0,

textAlign:"center",

titleLineHeight:0.92

};

}

const isDark =
background?.mode === "dark";

return{

heroWidth:

isMobile
? "100%"
: "min(920px,88vw)",

heroGap:

isMobile
? 24
: 36,

contentAlign:

layout === "left"
? "flex-start"
: "center",

horizontalOffset:

layout === "left"
? -20
: 0,

verticalOffset:
0,

avatarScale:

isMobile
? 0.92
: 1,

avatarOffsetX:

layout === "left"
? -6
: 0,

avatarOffsetY:
0,

avatarOffsetTop:

isMobile
? 10
: 18,

titleSpacing:

isMobile
? 10
: 14,

titleOffsetX:

layout === "left"
? -6
: 0,

usernameOffsetX:

layout === "left"
? 2
: 0,

subtitleOffsetX:

layout === "left"
? 10
: 0,

bioOffsetX:

layout === "left"
? 16
: 0,

textAlign:

layout === "left"
? "left"
: "center",

titleLineHeight:

isMobile
? 0.96
: 0.9

};

}
