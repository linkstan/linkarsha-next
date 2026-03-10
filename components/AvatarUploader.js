"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { supabase } from "../app/lib/supabase";

export default function AvatarUploader({ open, onClose, onUploaded }) {

const [step,setStep]=useState("select");
const [image,setImage]=useState(null);

const [crop,setCrop]=useState({x:0,y:0});
const [zoom,setZoom]=useState(1);
const [croppedAreaPixels,setCroppedAreaPixels]=useState(null);

const [progress,setProgress]=useState(0);

if(!open) return null;

function onFileChange(e){

const file=e.target.files[0];
if(!file) return;

setImage(URL.createObjectURL(file));
setStep("crop");

}

const onCropComplete=useCallback((_,croppedPixels)=>{
setCroppedAreaPixels(croppedPixels);
},[]);

function reset(){
setImage(null);
setStep("select");
}

async function getCroppedBlob(){

const img=new Image();
img.src=image;

await new Promise(res=>img.onload=res);

const canvas=document.createElement("canvas");
canvas.width=croppedAreaPixels.width;
canvas.height=croppedAreaPixels.height;

const ctx=canvas.getContext("2d");

ctx.drawImage(
img,
croppedAreaPixels.x,
croppedAreaPixels.y,
croppedAreaPixels.width,
croppedAreaPixels.height,
0,
0,
croppedAreaPixels.width,
croppedAreaPixels.height
);

return new Promise(resolve=>{
canvas.toBlob(blob=>resolve(blob),"image/jpeg");
});

}

async function upload(){

setStep("upload");

const blob=await getCroppedBlob();

const {data:{session}}=await supabase.auth.getSession();
const uid=session.user.id;

for(let i=0;i<=100;i+=10){
setProgress(i);
await new Promise(r=>setTimeout(r,80));
}

await supabase.storage
.from("avatars")
.upload(uid,blob,{upsert:true});

const {data}=supabase.storage
.from("avatars")
.getPublicUrl(uid);

await supabase
.from("profiles")
.update({avatar:data.publicUrl})
.eq("id",uid);

onUploaded(data.publicUrl);

setTimeout(()=>{
setStep("select");
setProgress(0);
setImage(null);
onClose();
},500);

}

return(

<div style={{
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.75)",
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

<div style={{cursor:"pointer"}} onClick={onClose}>
✕
</div>

</div>

{step==="select" && (

<div style={{
border:"2px dashed #ccc",
borderRadius:14,
padding:60,
textAlign:"center"
}}>

<input
type="file"
accept="image/*"
onChange={onFileChange}
/>

<p style={{marginTop:14}}>
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

<button
onClick={reset}
style={{
padding:"12px 28px",
borderRadius:12,
border:"1px solid #ddd",
background:"#eee"
}}>
Clear
</button>

<button style={{
padding:"12px 28px",
borderRadius:12,
border:"none",
background:"#ddd"
}}>
Upload
</button>

</div>

</div>

)}

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
onCropComplete={onCropComplete}
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
}}>
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
}}>
Crop
</button>

</div>

</div>

)}

{step==="upload" && (

<div style={{
textAlign:"center",
padding:60
}}>

<div style={{fontSize:22}}>
Uploading...
</div>

<div style={{
fontSize:32,
marginTop:20
}}>
{progress}%
</div>

<div style={{
marginTop:30,
padding:16,
background:"#eee",
borderRadius:12
}}>
Cancel upload
</div>

</div>

)}

</div>

</div>

);

}
