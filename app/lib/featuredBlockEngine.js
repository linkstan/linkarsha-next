export function getFeaturedBlock({

block,
index,
layout

}){

const type =
block?.data_json?.type;

const featured =

block?.data_json?.featured

||

(
layout?.heroPreset === "cinematic"
&&
index === 0
)

||

(
layout?.heroPreset === "luxury"
&&
index === 0
);

const emphasis =

featured

? "primary"

: index <= 2

? "secondary"

: "normal";

return {

featured,
emphasis,

isCTA:
type === "cta"

};

}
