export function getCinematicSpacing({

layout,
isHero,
isMobile

}){

/* ======================================== */
/* DEFAULT */
/* ======================================== */

const spacing = {

heroGap:90,

sectionGap:54,

blockGap:24,

heroTopSpacing:

isMobile
? 90
: 160,

heroBottomSpacing:

isMobile
? 70
: 120

};


/* ======================================== */
/* SPLIT */
/* ======================================== */

if(layout?.type === "split"){

spacing.heroGap =

isMobile
? 70
: 140;

spacing.sectionGap =

isMobile
? 50
: 90;

}


/* ======================================== */
/* HERO */
/* ======================================== */

if(isHero){

spacing.heroGap *= 1.2;

spacing.sectionGap *= 1.16;

spacing.blockGap *= 1.08;

}


/* ======================================== */
/* LUXURY */
/* ======================================== */

if(layout?.density === "luxury"){

spacing.heroGap *= 1.18;

spacing.sectionGap *= 1.22;

spacing.blockGap *= 1.1;

}


/* ======================================== */
/* COMPACT */
/* ======================================== */

if(layout?.density === "compact"){

spacing.heroGap *= .82;

spacing.sectionGap *= .84;

spacing.blockGap *= .88;

}


return spacing;

}
