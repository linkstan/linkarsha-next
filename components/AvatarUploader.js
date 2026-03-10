"use client";

import { useState } from "react";
import Cropper from "react-easy-crop";
import { supabase } from "../app/lib/supabase";

export default function AvatarUploader({open,onClose,onUploaded}){

const [image,setImage]=useState(null);
const [crop,setCrop]=useState({x:0,y:0});
const [zoom,setZoom]=useState(1);
const [uploading,setUploading]=useState(false);
const [progress,setProgress]=useState(0);

if(!open) return null;

/* select file */

function handleFile(e){

const file=e.target.files[0];
if(!file) return;

setImage(URL.createObjectURL(file));

}

/* upload avatar */

async function uploadAvatar(){

setUploading(true);
setProgress(10);

const {data:{session}}=await supabase.auth.getSession();

const uid=session.user.id;

setProgress(40);

const response=await fetch(image);
const blob=await response.blob();

setProgress(70);

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

setProgress(100);

onUploaded(data.publicUrl);

setUploading(false);
onClose();

}

return(

<div style={{
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.6)",
display:"flex",
alignItems:"center",
justifyContent:"center",
zIndex:999
}}>

<div style={{
width:500,
background:"#fff",
borderRadius:20,
padding:30
}}>

<h2 style={{textAlign:"center"}}>
Upload Profile Image
</h2>

{/* STEP 1 — SELECT FILE */}

{!image && !uploading && (

<div style={{
border:"2px dashed #ccc",
padding:40,
textAlign:"center",
marginTop:20
}}>

<input type="file" accept="image/*" onChange={handleFile}/>

<p style={{marginTop:10}}>
Select file to upload or drag-and-drop
</p>

</div>

)}

{/* STEP 2 — CROP */}

{image && !uploading && (

<div style={{marginTop:20}}>

<div style={{position:"relative",height:300}}>

<Cropper
image={image}
crop={crop}
zoom={zoom}
aspect={1}
onCropChange={setCrop}
onZoomChange={setZoom}
/>

</div>

<button
onClick={uploadAvatar}
style={{
marginTop:20,
width:"100%",
background:"#7b2ff7",
color:"#fff",
padding:"14px",
borderRadius:12
}}
>
Upload
</button>

</div>

)}

{/* STEP 3 — UPLOADING */}

{uploading && (

<div style={{textAlign:"center",marginTop:40}}>

<div>Uploading...</div>
<div style={{marginTop:10}}>{progress}%</div>

</div>

)}

</div>

</div>

);

}
