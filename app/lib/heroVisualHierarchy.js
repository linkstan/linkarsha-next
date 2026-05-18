export function getHeroVisualHierarchy({

heroPreset,
isHero,
isMobile

}){

if(!isHero){

return{

titleScale:1,
spacingScale:1,
bioScale:1

};

}


const cinematicBoost =

isMobile
? .94
: 1;


return{

titleScale:
(heroPreset?.titleScale || 1)
*
cinematicBoost,

spacingScale:

heroPreset?.contentGap

? (
heroPreset.contentGap / 100
)

: 1,

bioScale:

heroPreset?.bioWidth

? (
heroPreset.bioWidth / 500
)

: 1

};

}
