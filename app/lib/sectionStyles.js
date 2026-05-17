export function getSectionStyles({

section,
isMobile,
adaptiveSpacing

}){

const type =
section?.type || "default";


/* ================================================= */
/* HERO SECTION */
/* ================================================= */

if(type === "hero"){

return{

marginTop:

isMobile
? 20
: 40,

marginBottom:

isMobile
? (
80 * adaptiveSpacing
)
: (
140 * adaptiveSpacing
),

gap:

isMobile
? 20
: 32

};

}


/* ================================================= */
/* FEATURE SECTION */
/* ================================================= */

if(type === "feature"){

return{

marginTop:

isMobile
? (
30 * adaptiveSpacing
)
: (
60 * adaptiveSpacing
),

marginBottom:

isMobile
? (
50 * adaptiveSpacing
)
: (
90 * adaptiveSpacing
),

gap:24

};

}


/* ================================================= */
/* DEFAULT SECTION */
/* ================================================= */

return{

marginTop:

isMobile
? (
18 * adaptiveSpacing
)
: (
30 * adaptiveSpacing
),

marginBottom:

isMobile
? (
30 * adaptiveSpacing
)
: (
54 * adaptiveSpacing
),

gap:18

};

}
