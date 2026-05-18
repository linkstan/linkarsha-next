export function getContentCinematic({

layout,
block,
index,
isMobile

}){

const cinematic =
layout?.heroStyle === "cinematic";

const featured =
block?.featured === true;

const media =
block?.type === "gallery"
||
block?.type === "video"
||
block?.type === "music";

return{

sectionGap:

cinematic

? (
isMobile ? 120 : 220
)

: (
isMobile ? 80 : 140
),

contentWidth:

featured

? (
isMobile ? 100 : 1320
)

: media

? (
isMobile ? 100 : 1180
)

: (
isMobile ? 100 : 920
),

verticalPadding:

featured

? (
isMobile ? 80 : 160
)

: media

? (
isMobile ? 70 : 140
)

: (
isMobile ? 48 : 100
),

cinematicOffset:

index % 2 === 0
? 0
: (
isMobile ? 0 : 40
),

borderRadius:

featured
? 42
: 28

};

}
