export function generateTheme(name,config={}){

return {
name,

hero: config.hero ?? false,
avatarOverlap: config.avatarOverlap ?? false,

heroHeight: config.heroHeight || 240,
heroText: config.heroText || "",
heroImage: config.heroImage || null,

background: config.background || "#ffffff",

nameFont: config.nameFont || "Inter",
bioFont: config.bioFont || "Inter",
buttonFont: config.buttonFont || "Inter",

avatarSize: config.avatarSize || 100,

buttonRadius: config.buttonRadius ?? 12,
buttonColor: config.buttonColor || "#111111",
buttonText: config.buttonText || "#ffffff"

};

}
