"use client";

export default function GalleryBlock({

block

}){

const images =
block?.data_json?.images || [];

if(images.length === 0){

return null;

}

return(

<div
style={{

display:"grid",

gridTemplateColumns:
"repeat(2,minmax(0,1fr))",

gap:14,

width:"100%"

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

borderRadius:22,

display:"block"

}}
/>

))}

</div>

);

}
