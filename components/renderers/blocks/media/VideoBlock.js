"use client";

import GlassSurface
from "../surfaces/GlassSurface";

export default function VideoBlock({

block

}){

const videoUrl =
block?.data_json?.videoUrl;

if(!videoUrl){

return null;

}

return(

<GlassSurface

borderRadius={28}

padding={0}

style={{

width:"100%"

}}

>

<div
style={{

position:"relative",

aspectRatio:"16 / 9",

width:"100%"

}}
>

<iframe
src={videoUrl}
allowFullScreen

style={{

position:"absolute",
inset:0,

width:"100%",
height:"100%",

border:"none"

}}
/>

</div>

</GlassSurface>

);

}
