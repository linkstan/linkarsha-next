"use client";

import GlassSurface
from "../surfaces/GlassSurface";

import designTokens
from "../../../../app/lib/designTokens";

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

gap:designTokens.spacing.lg,

width:"100%"

}}
>

{plans.map((plan,index)=>(

<GlassSurface

key={index}

padding={designTokens.spacing.lg}

borderRadius={designTokens.radius.xl}

>

<div
style={{

fontSize:
designTokens.typography.cardTitle,

fontWeight:800,

marginBottom:
designTokens.spacing.sm

}}
>

{plan.title}

</div>

<div
style={{

fontSize:42,
fontWeight:900,

marginBottom:
designTokens.spacing.md

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
