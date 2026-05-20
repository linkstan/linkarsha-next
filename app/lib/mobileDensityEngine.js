export function getMobileDensity({

type,
layout,
index,
isMobile

}){

const config = {

spacingTop:0,
spacingBottom:0,

contentWidth:"100%",

density:"balanced",

stackGap:24,

paddingX:0,

maxWidth:"100%"

};


/* ======================================== */
/* DESKTOP */
/* ======================================== */

if(!isMobile){

config.stackGap = 36;

}


/* ======================================== */
/* HERO CTA */
/* ======================================== */

if(
type === "cta"
&&
index === 0
){

config.spacingTop =
isMobile
? 10
: 24;

config.spacingBottom =
isMobile
? 24
: 54;

config.stackGap =
isMobile
? 18
: 30;

config.density = "focused";

config.maxWidth =
isMobile
? "100%"
: "760px";

}


/* ======================================== */
/* VIDEO */
/* ======================================== */

if(type === "video"){

config.spacingTop =
isMobile
? 22
: 50;

config.spacingBottom =
isMobile
? 28
: 60;

config.stackGap =
isMobile
? 18
: 34;

config.maxWidth =
isMobile
? "100%"
: "920px";

}


/* ======================================== */
/* GALLERY */
/* ======================================== */

if(type === "gallery"){

config.spacingTop =
isMobile
? 20
: 44;

config.spacingBottom =
isMobile
? 26
: 56;

config.stackGap =
isMobile
? 20
: 36;

config.maxWidth =
isMobile
? "100%"
: "980px";

}


/* ======================================== */
/* TESTIMONIALS */
/* ======================================== */

if(type === "testimonials"){

config.spacingTop =
isMobile
? 34
: 84;

config.spacingBottom =
isMobile
? 30
: 72;

config.stackGap =
isMobile
? 24
: 42;

config.density = "airy";

config.maxWidth =
isMobile
? "100%"
: "760px";

}


/* ======================================== */
/* FAQ */
/* ======================================== */

if(type === "faq"){

config.spacingTop =
isMobile
? 26
: 62;

config.spacingBottom =
isMobile
? 26
: 62;

config.stackGap =
isMobile
? 18
: 30;

config.maxWidth =
isMobile
? "100%"
: "760px";

}


/* ======================================== */
/* PRICING */
/* ======================================== */

if(type === "pricing"){

config.spacingTop =
isMobile
? 40
: 96;

config.spacingBottom =
isMobile
? 42
: 100;

config.stackGap =
isMobile
? 26
: 44;

config.density = "conversion";

config.maxWidth =
isMobile
? "100%"
: "860px";

}


/* ======================================== */
/* MUSIC */
/* ======================================== */

if(type === "music"){

config.spacingTop =
isMobile
? 18
: 36;

config.spacingBottom =
isMobile
? 20
: 42;

config.stackGap =
isMobile
? 16
: 28;

config.maxWidth =
isMobile
? "100%"
: "680px";

}


return config;

}
