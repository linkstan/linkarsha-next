export function getSectionRhythm({

section,
index,
isHero,
isMobile,
adaptiveSpacing

}){

const type =
section?.type || "default";



/* ============================================ */
/* BASE */
/* ============================================ */

let spacing =

isMobile
? 28
: 46;

let emphasis = 1;



/* ============================================ */
/* HERO INTRO */
/* ============================================ */

if(index === 0){

spacing =

isMobile
? 34
: 72;

emphasis = 1.15;

}



/* ============================================ */
/* FEATURED */
/* ============================================ */

if(
type === "featured"
){

spacing *= 1.35;

emphasis *= 1.12;

}



/* ============================================ */
/* CTA */
/* ============================================ */

if(
type === "cta"
){

spacing *= 1.2;

}



/* ============================================ */
/* EDITORIAL */
/* ============================================ */

if(
type === "editorial"
){

spacing *= 1.45;

}



/* ============================================ */
/* HERO */
/* ============================================ */

if(isHero){

spacing *= 1.2;

}



/* ============================================ */
/* FINAL */
/* ============================================ */

return{

gap:
spacing * adaptiveSpacing,

marginBottom:
spacing * adaptiveSpacing,

emphasis

};

}
