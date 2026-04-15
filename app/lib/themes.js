/* ------------------------------------------------ */
/* THEME BUILDER                                    */
/* allows creating themes with very small configs   */
/* ------------------------------------------------ */

function createTheme(config={}){

return {

name: config.name || "Theme",

layout:{
hero: config.hero ?? false,
avatarOverlap: config.avatarOverlap ?? false
},

hero:{
height: config.heroHeight || 240,
text: config.heroText || "",
image: config.heroImage || null,
overlay: config.heroOverlay || null
},

background: config.background || "#ffffff",

fonts:{
name: config.nameFont || "Inter",
bio: config.bioFont || "Inter",
buttons: config.buttonFont || "Inter"
},

avatar:{
size: config.avatarSize || 100,
border: config.avatarBorder || "0px solid transparent"
},

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

background:"#ffffff",

nameFont:"Inter",
bioFont:"Inter",
buttonFont:"Inter",

avatarSize:90,
avatarBorder:"0px solid transparent",

buttonRadius:12,
buttonColor:"#111111",
buttonText:"#ffffff",
buttonSpacing:12

}),



/* ---------- SAMIRA COACH ---------- */

samira: createTheme({

name:"Samira Coach",

hero:true,
avatarOverlap:true,

heroHeight:260,
heroText:"Hi there!",
heroImage:"/samira-hero.jpg",
heroOverlay:"rgba(255,255,255,0.6)",

background:"#e9ded9",

nameFont:"Playfair Display",
bioFont:"Dancing Script",
buttonFont:"Inter",

avatarSize:120,
avatarBorder:"6px solid #ffffff",

buttonRadius:999,
buttonColor:"#e8bcbc",
buttonText:"#2d2d2d",
buttonSpacing:16,
buttonPadding:16,
buttonWeight:600

})

};
