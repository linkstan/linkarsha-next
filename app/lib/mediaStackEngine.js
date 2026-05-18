export function getMediaStack({

block,
layout,
isMobile

}){

const type =
block?.data_json?.type;

const isGallery =
type === "gallery";

const isVideo =
type === "video";

return{

enabled:
isGallery || isVideo,

stackOffset:

isMobile
? 14
: 28,

stackRotation:

isMobile
? 2
: 4,

floatingDepth:

isMobile
? 18
: 36,

mediaScale:

isGallery
? 1.02
: 1,

hoverLift:

isMobile
? 8
: 18,

parallaxIntensity:

isMobile
? .4
: .8

};

}
