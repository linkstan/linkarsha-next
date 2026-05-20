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

const isLeft =
layout === "left";

return{

heroWidth:

isMobile
? "100%"
: "min(920px,88vw)",

heroGap:

isMobile
? 26
: 40,

contentAlign:

isLeft
? "flex-start"
: "center",

horizontalOffset:

isLeft
? -12
: 0,

verticalOffset:

isMobile
? 0
: 6,

avatarScale:

isMobile
? 0.94
: 1.02,

avatarOffsetX:

isLeft
? -4
: 0,

avatarOffsetY:

isMobile
? 0
: -2,

avatarOffsetTop:

isMobile
? 12
: 22,

titleSpacing:

isMobile
? 10
: 16,

/* ====================================== */
/* EDITORIAL STAGGER RHYTHM */
/* ====================================== */

titleOffsetX:

isLeft
? -8
: 0,

usernameOffsetX:

isLeft
? 4
: 0,

subtitleOffsetX:

isLeft
? 14
: 0,

bioOffsetX:

isLeft
? 22
: 0,

textAlign:

isLeft
? "left"
: "center",

titleLineHeight:

isMobile
? 0.98
: 0.9

};

}
