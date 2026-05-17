"use client";

export default function MusicBlock({

block

}){

const embedUrl =
block?.data_json?.embedUrl;

if(!embedUrl){

return null;

}

return(

<div
style={{

width:"100%",

borderRadius:24,

overflow:"hidden",

background:"#111111"

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

</div>

);

}
