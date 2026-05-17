import heroPresets
from "./heroPresets";

export function getActiveHeroPreset({

layout,
background

}){

const presetName =

layout?.heroPreset

||

background?.heroPreset

||

"minimal";

return (

heroPresets?.[
presetName
]

||

heroPresets.minimal

);

}
