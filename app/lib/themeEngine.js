import { themes } from "./themes";

/* DEFAULT THEME STRUCTURE (PROTECTION LAYER) */

const defaultTheme = {
background:"#ffffff",
textColor:"#000",

layout:{
hero:false,
avatarOverlap:false
},

avatar:{
size:110,
border:"none"
},

fonts:{
name:"Inter",
bio:"Inter"
},

hero:{
height:260,
text:"",
image:null
},

buttons:{
bg:"#000"
},

features:{
hero:false,
heroText:false,
heroOpacity:false,
socialIcons:true,
username:true,
bio:true,
subtitle:true
}
};

/* merge theme + user appearance */

export function getTheme(themeName, appearance={}){

const baseTheme = themes[themeName] || themes.minimal;

/* merge with defaults */

const mergedTheme = {
...defaultTheme,
...baseTheme,

layout:{
...defaultTheme.layout,
...baseTheme.layout
},

avatar:{
...defaultTheme.avatar,
...baseTheme.avatar
},

fonts:{
...defaultTheme.fonts,
...baseTheme.fonts
},

hero:{
...defaultTheme.hero,
...baseTheme.hero
},

buttons:{
...defaultTheme.buttons,
...baseTheme.buttons
},

features:{
...defaultTheme.features,
...baseTheme.features
}
};

/* header overrides */

const header = appearance?.header || {};

return{

...mergedTheme,

hero:{
...mergedTheme.hero,
text: header.heroText || mergedTheme.hero.text,
image: header.heroImage || mergedTheme.hero.image
},

buttons:{
...mergedTheme.buttons,
bg: appearance?.buttons?.color || mergedTheme.buttons.bg
}

};

}
