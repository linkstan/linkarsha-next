export function getPremiumHeroRhythm({

layout,
isHero,
isMobile

}){

const rhythm = {

titleSpacing:26,

subtitleSpacing:34,

bioSpacing:22,

avatarSpacing:32

};


/* ======================================== */
/* HERO */
/* ======================================== */

if(isHero){

rhythm.titleSpacing =

isMobile
? 20
: 34;

rhythm.subtitleSpacing =

isMobile
? 30
: 46;

rhythm.bioSpacing =

isMobile
? 20
: 28;

}


/* ======================================== */
/* EDITORIAL */
/* ======================================== */

if(layout?.heroStyle === "editorial"){

rhythm.titleSpacing *= 1.12;

rhythm.subtitleSpacing *= 1.2;

}


/* ======================================== */
/* LUXURY */
/* ======================================== */

if(layout?.density === "luxury"){

rhythm.titleSpacing *= 1.18;

rhythm.subtitleSpacing *= 1.22;

rhythm.bioSpacing *= 1.15;

}


return rhythm;

}
