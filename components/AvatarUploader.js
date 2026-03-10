"use client";

import { useState } from "react";
import Cropper from "react-easy-crop";
import { supabase } from "../app/lib/supabase";

export default function AvatarUploader({open,onClose,onUploaded}){

const [step,setStep]=useState("select");
const [image,setImage]=useState(null);
const [crop,setCrop]=useState({x:0,y:0});
const [zoom,setZoom]=useState(1);
const [uploading,setUploading]=useState(false);
const [progress,setProgress]=useState(0);

if(!open) return null;

function handleFile(e){

const file=e.target.files[0];
if(!file) return;

setImage(URL.createObjectURL(file));
setStep("crop");

}

function reset(){
setImage(null);
setStep("select");
}

async function upload(){

setStep("uploading");
setUploading(true);

const {data:{session}}=await supabase.auth.getSession();
const uid=session.user.id;

const response=await fetch(image);
const blob=await response.blob();

setProgress(30);

await supabase.storage
.from("avatars")
.upload(uid,blob,{upsert:true});

setProgress(70);

const {data}=supabase.storage
.from("avatars")
.getPublicUrl(uid);

await supabase
.from("profiles")
.update({avatar:data.publicUrl})
.eq("id",uid);

setProgress(100);

onUploaded(data.publicUrl);

setUploading(false);

setTimeout(()=>{
onClose();
setStep("select");
setImage(null);
},800);

}

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
zIndex:999
}}>

<div style={{
width:560,
background:"#fff",
borderRadius:20,
padding:30
}}>

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:20
}}>

<h2>Upload Profile Image</h2>

<div
onClick={onClose}
style={{
cursor:"pointer",
fontSize:22
}}
>
✕
</div>

</div>

{/* STEP 1 SELECT */}

{step==="select" && (

<div style={{
border:"2px dashed #ccc",
borderRadius:12,
padding:60,
textAlign:"center"
}}>

<input
type="file"
accept="image/*"
onChange={handleFile}
/>

<p style={{marginTop:12}}>
Select file to upload, or drag-and-drop file
</p>

<p style={{opacity:0.6,fontSize:14}}>
Allowed file types: JPEG, PNG, WEBP, GIF, SVG, BMP, AVIF
</p>

<div style={{
display:"flex",
justifyContent:"space-between",
marginTop:30
}}>

<button style={{
padding:"12px 30px",
borderRadius:12,
border:"1px solid #ddd",
background:"#eee"
}}>
Clear
</button>

<button style={{
padding:"12px 30px",
borderRadius:12,
border:"none",
background:"#ddd"
}}>
Upload
</button>

</div>

</div>

)}

{/* STEP 2 CROP */}

{step==="crop" && (

<div>

<div style={{
position:"relative",
width:"100%",
height:340,
background:"#333"
}}>

<Cropper
image={image}
crop={crop}
zoom={zoom}
aspect={1}
onCropChange={setCrop}
onZoomChange={setZoom}
/>

</div>

<div style={{
display:"flex",
justifyContent:"space-between",
marginTop:20
}}>

<button
onClick={reset}
style={{
padding:"12px 30px",
borderRadius:12,
border:"1px solid #ddd",
background:"#eee"
}}
>
Delete
</button>

<button
onClick={upload}
style={{
padding:"12px 30px",
borderRadius:12,
border:"none",
background:"#7b2ff7",
color:"#fff"
}}
>
Crop
</button>

</div>

</div>

)}

{/* STEP 3 UPLOADING */}

{step==="uploading" && (

<div style={{
textAlign:"center",
padding:60
}}>

<div style={{fontSize:20}}>
Uploading...
</div>

<div style={{
marginTop:20,
fontSize:28
}}>
{progress}%
</div>

<div style={{
marginTop:30,
padding:16,
borderRadius:12,
background:"#eee"
}}>
Cancel upload
</div>

</div>

)}

</div>

</div>

);

}
