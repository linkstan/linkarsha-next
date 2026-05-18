import advancedHeroLayouts
from "./advancedHeroLayouts";

export function getAdvancedHeroLayout({

layout

}){

const heroStyle =
layout?.heroStyle
|| "minimal";

return(

advancedHeroLayouts[
heroStyle
]

||

advancedHeroLayouts.minimal

);

}
