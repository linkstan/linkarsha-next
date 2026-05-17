"use client";

export default function VideoBlock({

block

}){

const videoUrl =
block?.data_json?.videoUrl;

if(!videoUrl){

return null;

}

return(

<div
style={{

width:"100%",

borderRadius:28,

overflow:"hidden",

position:"relative",

aspectRatio:"16 / 9",

background:"#000000"

}}
>

<iframe
src={videoUrl}
allowFullScreen

style={{

width:"100%",
height:"100%",

border:"none",

position:"absolute",
inset:0

}}
/>

</div>

);

}
