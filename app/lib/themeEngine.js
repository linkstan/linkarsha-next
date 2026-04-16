import { themes } from "./themes";

/* merge theme + user appearance */

export function getTheme(themeName, appearance={}){

const baseTheme = themes[themeName] || themes.minimal;

/* header overrides */

const header = appearance?.header || {};

return{

...baseTheme,

hero:{
...baseTheme.hero,
text: header.heroText || baseTheme.hero.text,
image: header.heroImage || baseTheme.hero.image
},

buttons:{
...baseTheme.buttons,
bg: appearance?.buttons?.color || baseTheme.buttons.bg
}

};

}
