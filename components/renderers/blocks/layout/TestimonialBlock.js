"use client";

import GlassSurface
from "../surfaces/GlassSurface";

import designTokens
from "../../../../app/lib/designTokens";

export default function TestimonialBlock({

block

}){

const testimonials =
block?.data_json?.testimonials || [];

if(testimonials.length === 0){

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

{testimonials.map((item,index)=>(

<GlassSurface

key={index}

padding={designTokens.spacing.lg}

borderRadius={designTokens.radius.lg}

>

<div
style={{

fontSize:18,

lineHeight:1.7,

marginBottom:
designTokens.spacing.md

}}
>

“{item.quote}”

</div>

<div
style={{

fontWeight:700,

opacity:.78

}}
>

— {item.author}

</div>

</GlassSurface>

))}

</div>

);

}
