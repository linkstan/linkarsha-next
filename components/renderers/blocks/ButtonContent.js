"use client";

export default function ButtonContent({

block,
isHeroBlock,
isHero

}){

return(

<>

<div>

{block?.data_json?.title || "Link"}

</div>

{block?.data_json?.subtitle && (

<div
style={{

fontSize:

isHeroBlock
? 15

: isHero
? 13
: 12,

opacity:.72,

marginTop:4,

fontWeight:500

}}
>

{block.data_json.subtitle}

</div>

)}

</>

);

}
