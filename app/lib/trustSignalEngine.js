export function getTrustSignals({

profile,
layout,
background,
isMobile

}){

return{

verified:
true,

availability:
"Available for work",

response:
"Replies in 24h",

location:
profile?.location || "Global",

role:
profile?.title || "Creator",

featured:
true,

premium:
background?.type === "ambient",

showBar:
true

};

}
