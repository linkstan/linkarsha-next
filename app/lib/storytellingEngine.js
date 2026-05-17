export function getStorytellingFlow({

index,
block,
isHero

}){

const size =
block?.data_json?.size;

const type =
block?.data_json?.type;


/* ======================================== */
/* DEFAULT */
/* ======================================== */

let priority = "normal";

let spacingTop = 0;

let spacingBottom = 0;

let emphasis = 1;


/* ======================================== */
/* HERO */
/* ======================================== */

if(
isHero
&&
index === 0
){

priority = "hero";

spacingTop = 20;

spacingBottom = 50;

emphasis = 1.24;

}


/* ======================================== */
/* FEATURE */
/* ======================================== */

if(
size === "feature"
||
type === "cta"
){

priority = "feature";

spacingTop = 20;

spacingBottom = 34;

emphasis = 1.12;

}


/* ======================================== */
/* MEDIA */
/* ======================================== */

if(
type === "video"
||
type === "gallery"
){

priority = "media";

spacingTop = 26;

spacingBottom = 40;

emphasis = 1.08;

}


/* ======================================== */
/* EDITORIAL */
/* ======================================== */

if(
type === "testimonials"
||
type === "faq"
){

priority = "editorial";

spacingTop = 50;

spacingBottom = 50;

emphasis = 1;

}


return{

priority,
spacingTop,
spacingBottom,
emphasis

};

}
