/* ------------------------------------------------ */
/* THEME BUILDER                                    */
/* allows creating themes with very small configs   */
/* ------------------------------------------------ */

function createTheme(config={}){

return {

name: config.name || "Theme",

/* layout system */

layout:{
hero: config.hero ?? false,
avatarOverlap: config.avatarOverlap ?? false
},

/* feature system (controls customize panel) */

features:{
hero: config.hero ?? false,
heroImage: config.heroImageFeature ?? config.hero ?? false,
heroText: config.heroTextFeature ?? config.hero ?? false,
heroOpacity: config.heroOpacityFeature ?? config.hero ?? false,
socialIcons: config.socialIconsFeature ?? true,
subtitle: config.subtitleFeature ?? true
},

/* hero settings */

hero:{
height: config.heroHeight || 240,
text: config.heroText || "",
image: config.heroImage || null,
overlay: config.heroOverlay || null
},

/* page background */

background: config.background || "#ffffff",

/* fonts */

fonts:{
name: config.nameFont || "Inter",
bio: config.bioFont || "Inter",
buttons: config.buttonFont || "Inter"
},

/* avatar */

avatar:{
size: config.avatarSize || 100,
border: config.avatarBorder || "none"
},

/* buttons */

buttons:{
radius: config.buttonRadius ?? 12,
bg: config.buttonColor || "#111111",
text: config.buttonText || "#ffffff",
shadow: config.buttonShadow || false,
spacing: config.buttonSpacing || 12,
padding: config.buttonPadding || 12,
fontWeight: config.buttonWeight || 600
}

};

}


/* ------------------------------------------------ */
/* THEMES                                           */
/* ------------------------------------------------ */

export const themes = {

/* ---------- MINIMAL ---------- */

minimal: createTheme({

name:"Minimal",

layout:"classic",

features:{
hero:false,
socialIcons:false,
subtitle:false,
bio:true,
username:true
},

customizable:{
fonts:true,
buttons:true,
colors:true
},

background:"#ffffff",

nameFont:"Inter",
bioFont:"Inter",
buttonFont:"Inter",

avatarSize:90,

buttonRadius:4,
buttonColor:"#111111",
buttonText:"#ffffff"

}),



/* ---------- SAMIRA ---------- */

samira: createTheme({

name:"Samira Coach",

layout:"hero",

features:{
hero:true,
heroImage:true,
heroText:true,
heroOpacity:true,
socialIcons:true,
subtitle:true,
bio:true,
username:true
},

customizable:{
fonts:true,
fontSize:true,
buttons:true,
colors:true,
heroImage:true
},

heroHeight:260,
heroText:"Hi there!",
heroImage:"/samira-hero.jpg",
heroOverlay:"rgba(255,255,255,0.6)",

background:"#e9ded9",

nameFont:"Playfair Display",
bioFont:"Dancing Script",
buttonFont:"Inter",

avatarSize:120,

buttonRadius:999,
buttonColor:"#e8bcbc",
buttonText:"#2d2d2d",
buttonSpacing:16,
buttonPadding:16,
buttonWeight:600

})

};
