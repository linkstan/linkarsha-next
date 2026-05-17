"use client";

import GlassSurface
from "../surfaces/GlassSurface";

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

gap:20,

width:"100%"

}}
>

{testimonials.map((item,index)=>(

<GlassSurface

key={index}

padding={26}

borderRadius={28}

>

<div
style={{

fontSize:18,

lineHeight:1.7,

marginBottom:18

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
