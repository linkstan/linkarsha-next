"use client";

import Cropper from "react-easy-crop";
import { useState } from "react";

export default function HeroCropModal({
image,
onCancel,
onComplete
}){

const [crop,setCrop]=useState({x:0,y:0});
const [zoom,setZoom]=useState(1);
const [croppedArea,setCroppedArea]=useState(null);

return(

<div style={{
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,.75)",
display:"flex",
alignItems:"center",
justifyContent:"center",
zIndex:9999
}}>

<div style={{
width:640,
height:240,
position:"relative",
background:"#000"
}}>

<Cropper
image={image}
crop={crop}
zoom={zoom}
aspect={16/6}
onCropChange={setCrop}
onZoomChange={setZoom}
onCropComplete={(a,b)=>setCroppedArea(b)}
/>

</div>

<div style={{marginTop:20,display:"flex",gap:10}}>

<button onClick={onCancel}>
Cancel
</button>

<button onClick={()=>onComplete(croppedArea,zoom)}>
Save
</button>

</div>

</div>

);
}
