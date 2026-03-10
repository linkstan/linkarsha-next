"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { supabase } from "../app/lib/supabase";

export default function AvatarUploader({ open, onClose, onUploaded }) {

const [step,setStep]=useState("select");
const [image,setImage]=useState(null);
const [file,setFile]=useState(null);

const [crop,setCrop]=useState({x:0,y:0});
const [zoom,setZoom]=useState(1);
const [croppedAreaPixels,setCroppedAreaPixels]=useState(null);

const [progress,setProgress]=useState(0);

if(!open) return null;

/* FILE SELECT */

function handleFile(e){

const f=e.target.files[0];
if(!f) return;

setFile(f);
setImage(URL.createObjectURL(f));

}

/* DRAG DROP */

function handleDrop(e){
e.preventDefault();

const f=e.dataTransfer.files[0];
if(!f) return;

setFile(f);
setImage(URL.createObjectURL(f));
}

/* CLEAR */

function clearFile(){
setFile(null);
setImage(null);
}

/* START CROP */

function startCrop(){
if(!file) return;
setStep("crop");
}

/* CROP COMPLETE */

const onCropComplete=useCallback((_,croppedPixels)=>{
setCroppedAreaPixels(croppedPixels);
},[]);

/* RESET */

function reset(){
setFile(null);
setImage(null);
setStep("select");
}

/* CREATE CROPPED IMAGE */

async function getCroppedBlob(){

const img=new Image();
img.src=image;

await new Promise(r=>img.onload=r);

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

/* UPLOAD */

async function upload(){

setStep("upload");

const blob=await getCroppedBlob();

const {data:{session}}=await supabase.auth.getSession();
const uid=session.user.id;

/* PROGRESS ANIMATION */

for(let i=0;i<=100;i+=5){
setProgress(i);
await new Promise(r=>setTimeout(r,70));
}

/* SUPABASE UPLOAD */

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
setProgress(0);
setFile(null);
setImage(null);
setStep("select");
onClose();
},600);

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
width:600,
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
style={{cursor:"pointer",fontSize:22}}
>
✕
</div>

</div>

{/* STEP 1 SELECT */}

{step==="select" && (

<div>

<div
onDrop={handleDrop}
onDragOver={(e)=>e.preventDefault()}
style={{
border:"2px dashed #ccc",
borderRadius:14,
padding:70,
textAlign:"center",
cursor:"pointer"
}}
>

<input
type="file"
accept="image/*"
onChange={handleFile}
/>

<p style={{marginTop:14,fontSize:18}}>
Select file to upload
</p>

<p style={{opacity:0.7}}>
or drag-and-drop file
</p>

<p style={{opacity:0.6,fontSize:13}}>
Allowed file types: JPEG, PNG, WEBP, GIF, SVG, BMP, AVIF
</p>

</div>

<div style={{
display:"flex",
justifyContent:"space-between",
marginTop:30
}}>

<button
onClick={clearFile}
style={{
padding:"12px 30px",
borderRadius:14,
border:"1px solid #ccc",
background:"#eee"
}}
>
Clear
</button>

<button
onClick={startCrop}
disabled={!file}
style={{
padding:"12px 30px",
borderRadius:14,
border:"none",
background:file ? "#6c3cf0" : "#ccc",
color:"#fff"
}}
>
Upload
</button>

</div>

</div>

)}

{/* STEP 2 CROP */}

{step==="crop" && (

<div>

<div style={{
display:"flex",
justifyContent:"flex-end",
marginBottom:10
}}>

<button onClick={reset}>
RESET
</button>

</div>

<div style={{
position:"relative",
width:"100%",
height:350,
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
borderRadius:14,
border:"1px solid #ccc",
background:"#eee"
}}
>
Delete
</button>

<button
onClick={upload}
style={{
padding:"12px 30px",
borderRadius:14,
border:"none",
background:"#6c3cf0",
color:"#fff"
}}
>
Crop
</button>

</div>

</div>

)}

{/* STEP 3 UPLOADING */}

{step==="upload" && (

<div style={{
textAlign:"center",
padding:60
}}>

<h3>Uploading...</h3>

<div style={{
height:10,
background:"#ddd",
borderRadius:20,
overflow:"hidden",
marginTop:20
}}>

<div style={{
width:`${progress}%`,
height:"100%",
background:"#6c3cf0"
}}/>

</div>

<div style={{marginTop:10}}>
{progress}%
</div>

<button style={{
marginTop:30,
padding:"14px 30px",
borderRadius:14,
border:"none",
background:"#eee"
}}>
Cancel upload
</button>

</div>

)}

</div>

</div>

);

}
