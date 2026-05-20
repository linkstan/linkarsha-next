export function getTrustSignals({

profile,
layout,
background,
isMobile

}){

const isDark =
background?.mode === "dark";

const username =
profile?.username || "";

const displayName =
profile?.display_name || "";

return{

verified:

profile?.verified
|| false,

creatorLabel:

profile?.creatorLabel
|| "Digital Creator",

availability:

profile?.availability
|| "Open for collaborations",

location:

profile?.location
|| "",

responseTime:

profile?.responseTime
|| "Usually responds in 24h",

accentColor:

isDark
? "rgba(255,255,255,.92)"
: "rgba(20,20,20,.88)",

mutedColor:

isDark
? "rgba(255,255,255,.56)"
: "rgba(20,20,20,.56)",

borderColor:

isDark
? "rgba(255,255,255,.08)"
: "rgba(0,0,0,.08)",

surface:

isDark
? "rgba(255,255,255,.04)"
: "rgba(255,255,255,.7)",

showMetadata:
!isMobile,

showTrustBar:true,

compact:
isMobile

};

}
