import cinematicHeroPresets
from "./cinematicHeroPresets";

export function getActiveHeroPreset({

layout,
background

}){

const heroStyle =
layout?.heroStyle
|| "minimal";


return(

cinematicHeroPresets[
heroStyle
]

||

cinematicHeroPresets.minimal

);

}
