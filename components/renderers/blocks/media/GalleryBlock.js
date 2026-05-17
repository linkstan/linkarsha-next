"use client";

import GlassSurface
from "../surfaces/GlassSurface";

export default function GalleryBlock({

block

}){

const images =
block?.data_json?.images || [];

if(images.length === 0){

return null;

}

return(

<GlassSurface

padding={18}

borderRadius={30}

style={{

width:"100%"

}}

>

<div
style={{

display:"grid",

gridTemplateColumns:
"repeat(2,minmax(0,1fr))",

gap:14

}}
>

{images.map((image,index)=>(

<img
key={index}

src={image}

alt="Gallery"

style={{

width:"100%",

aspectRatio:"1 / 1",

objectFit:"cover",

borderRadius:20,

display:"block"

}}
/>

))}

</div>

</GlassSurface>

);

}
