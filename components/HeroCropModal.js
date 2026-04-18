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
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
zIndex:9999
}}>

{/* CROPPER PREVIEW */}

<div style={{
width:"360px",                 // mobile width preview
aspectRatio:"16 / 6",          // EXACT same ratio as hero header
position:"relative",
background:"#000",
borderRadius:12,
overflow:"hidden"
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

{/* BUTTONS */}

<div style={{
marginTop:20,
display:"flex",
gap:12
}}>

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
