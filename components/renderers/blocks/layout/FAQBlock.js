"use client";

import GlassSurface
from "../surfaces/GlassSurface";

import designTokens
from "../../../../app/lib/designTokens";

export default function FAQBlock({

block

}){

const faqs =
block?.data_json?.faqs || [];

if(faqs.length === 0){

return null;

}

return(

<div
style={{

display:"grid",

gap:designTokens.spacing.md,

width:"100%"

}}
>

{faqs.map((faq,index)=>(

<GlassSurface

key={index}

padding={designTokens.spacing.lg}

borderRadius={designTokens.radius.lg}

>

<div
style={{

fontWeight:800,

marginBottom:
designTokens.spacing.sm,

fontSize:18

}}
>

{faq.question}

</div>

<div
style={{

opacity:.72,

lineHeight:1.7

}}
>

{faq.answer}

</div>

</GlassSurface>

))}

</div>

);

}
