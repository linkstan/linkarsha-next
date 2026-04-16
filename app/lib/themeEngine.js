import { themes } from "./themes";

export function getTheme(themeName, appearance = {}) {

const baseTheme = themes[themeName] || themes.minimal;

const headerSettings = appearance.header || {};
const buttonSettings = appearance.buttons || {};
const colorSettings = appearance.colors || {};

return {

...baseTheme,

hero:{
...baseTheme.hero,
text: headerSettings.heroText ?? baseTheme.hero.text,
image: headerSettings.heroImage ?? baseTheme.hero.image,
opacity: headerSettings.heroOpacity ?? 1
},

buttons:{
...baseTheme.buttons,
...buttonSettings
},

colors:{
background: colorSettings.background ?? baseTheme.background,
text: colorSettings.text ?? "#ffffff",
title: colorSettings.title ?? "#ffffff"
}

};

}
