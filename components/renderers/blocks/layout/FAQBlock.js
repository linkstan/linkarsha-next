"use client";

import GlassSurface
from "../surfaces/GlassSurface";

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

gap:18,

width:"100%"

}}
>

{faqs.map((faq,index)=>(

<GlassSurface

key={index}

padding={24}

borderRadius={24}

>

<div
style={{

fontWeight:800,

marginBottom:10,

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
