import { themes } from "./themes";

/* ================================================= */
/* DEFAULT THEME */
/* ================================================= */

const defaultTheme = {

background:"#ffffff",
textColor:"#000000",

layout:{
hero:false,
avatarOverlap:false,
centered:true
},

avatar:{
size:110,
border:"none",
shadow:false
},

fonts:{
name:"Inter",
bio:"Inter",
buttons:"Inter"
},

hero:{
height:260,
text:"",
image:null,
overlay:null
},

buttons:{
radius:12,
bg:"#000000",
text:"#ffffff",
spacing:12,
padding:16,
fontWeight:600,
style:"solid",
shadowLift:false,
depthEffect:false,
hoverEffect:false,
pressEffect:false
},

features:{
hero:false,
heroImage:false,
heroText:false,
heroOpacity:false,
socialIcons:true,
username:true,
bio:true,
subtitle:true
}

};


/* ================================================= */
/* THEME ENGINE */
/* ================================================= */

export function getTheme(
themeName,
appearance={}
){

const baseTheme =
themes[themeName] ||
themes.minimal;

/* APPEARANCE */

const header =
appearance?.header || {};

const buttonAppearance =
appearance?.buttons || {};


/* ================================================= */
/* MERGED THEME */
/* ================================================= */

const mergedTheme = {

...defaultTheme,
...baseTheme,

layout:{
...defaultTheme.layout,
...(baseTheme.layout || {})
},

avatar:{
...defaultTheme.avatar,
...(baseTheme.avatar || {})
},

fonts:{
...defaultTheme.fonts,
...(baseTheme.fonts || {})
},

hero:{
...defaultTheme.hero,
...(baseTheme.hero || {})
},

buttons:{
...defaultTheme.buttons,
...(baseTheme.buttons || {})
},

features:{
...defaultTheme.features,
...(baseTheme.features || {})
}

};


/* ================================================= */
/* FINAL THEME */
/* ================================================= */

return{

...mergedTheme,

/* HERO */

hero:{
...mergedTheme.hero,

text:
header.heroText ??
mergedTheme.hero.text,

image:
header.heroImage ??
mergedTheme.hero.image,

overlay:
header.heroOverlay ??
mergedTheme.hero.overlay
},

/* BUTTONS */

buttons:{
...mergedTheme.buttons,

bg:
buttonAppearance.bg ??
mergedTheme.buttons.bg,

text:
buttonAppearance.text ??
mergedTheme.buttons.text,

radius:
buttonAppearance.radius ??
mergedTheme.buttons.radius,

spacing:
buttonAppearance.spacing ??
mergedTheme.buttons.spacing,

padding:
buttonAppearance.padding ??
mergedTheme.buttons.padding,

style:
buttonAppearance.style ??
mergedTheme.buttons.style,

shadowLift:
buttonAppearance.shadowLift ??
mergedTheme.buttons.shadowLift,

depthEffect:
buttonAppearance.depthEffect ??
mergedTheme.buttons.depthEffect,

hoverEffect:
buttonAppearance.hoverEffect ??
mergedTheme.buttons.hoverEffect,

pressEffect:
buttonAppearance.pressEffect ??
mergedTheme.buttons.pressEffect

},

/* FONTS */

fonts:{
...mergedTheme.fonts,

name:
header.nameFont ??
mergedTheme.fonts.name,

bio:
header.bioFont ??
mergedTheme.fonts.bio

}

};

}
