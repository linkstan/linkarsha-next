"use client";

import GlassSurface
from "../surfaces/GlassSurface";

export default function PricingBlock({

block

}){

const plans =
block?.data_json?.plans || [];

if(plans.length === 0){

return null;

}

return(

<div
style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(240px,1fr))",

gap:20,

width:"100%"

}}
>

{plans.map((plan,index)=>(

<GlassSurface

key={index}

padding={28}

borderRadius={30}

>

<div
style={{

fontSize:24,
fontWeight:800,

marginBottom:10

}}
>

{plan.title}

</div>

<div
style={{

fontSize:42,
fontWeight:900,

marginBottom:18

}}
>

{plan.price}

</div>

<div
style={{

opacity:.72,

lineHeight:1.7

}}
>

{plan.description}

</div>

</GlassSurface>

))}

</div>

);

}
