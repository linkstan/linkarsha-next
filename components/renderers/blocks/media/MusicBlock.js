"use client";

import GlassSurface
from "../surfaces/GlassSurface";

export default function MusicBlock({

block

}){

const embedUrl =
block?.data_json?.embedUrl;

if(!embedUrl){

return null;

}

return(

<GlassSurface

borderRadius={24}

padding={0}

style={{

width:"100%"

}}

>

<iframe
src={embedUrl}

allow="autoplay; clipboard-write; encrypted-media; fullscreen"

style={{

width:"100%",
height:160,

border:"none"

}}
/>

</GlassSurface>

);

}
