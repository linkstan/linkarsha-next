"use client";

export default function PremiumMetadataRow({

signals

}){

if(!signals?.showMetadata){

return null;

}

return(

<div
style={{

display:"flex",
flexWrap:"wrap",

gap:12,

marginTop:18,

opacity:.82,

fontSize:13,

letterSpacing:"-.01em"

}}
>

{signals?.creatorLabel && (

<div>
{signals.creatorLabel}
</div>

)}

{signals?.availability && (

<div>
• {signals.availability}
</div>

)}

{signals?.responseTime && (

<div>
• {signals.responseTime}
</div>

)}

</div>

);

}
