"use client";

import { useState } from "react";
import Cropper from "react-easy-crop";

export default function AvatarCropModal({
image,
shape,
onCancel,
onComplete
}){

const [crop,setCrop]=useState({x:0,y:0});
const [zoom,setZoom]=useState(1);
const [croppedAreaPixels,setCroppedAreaPixels]=useState(null);

return(

<div style={{
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.7)",
display:"flex",
alignItems:"center",
justifyContent:"center",
zIndex:9999
}}>

<div style={{
width:320,
height:320,
background:"#111",
position:"relative"
}}>

<Cropper
image={image}
crop={crop}
zoom={zoom}
aspect={1}
cropShape={shape}
onCropChange={setCrop}
onZoomChange={setZoom}
onCropComplete={(croppedArea, croppedAreaPixels)=>{
setCroppedAreaPixels(croppedAreaPixels);
}}
/>

</div>

<div style={{marginTop:20,display:"flex",gap:10}}>

<button onClick={onCancel}>Cancel</button>

<button onClick={()=>onComplete(croppedAreaPixels,zoom)}>
Save
</button>

</div>

</div>

);

}
