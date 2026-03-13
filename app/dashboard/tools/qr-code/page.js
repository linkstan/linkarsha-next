"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../../lib/supabase";
import QRCode from "qrcode";

export default function QRGenerator(){

const [username,setUsername]=useState("");
const [inputUrl,setInputUrl]=useState("");
const [qr,setQr]=useState("");

const [color,setColor]=useState("#000000");
const [bgColor,setBgColor]=useState("#ffffff");

const [logo,setLogo]=useState(null);
const [loading,setLoading]=useState(false);

useEffect(()=>{
loadProfile();
},[]);

async function loadProfile(){

const {data:{session}} = await supabase.auth.getSession();

const {data}=await supabase
.from("profiles")
.select("username")
.eq("id",session.user.id)
.single();

setUsername(data.username);

const profileLink=`https://linkarsha-next.vercel.app/${data.username}`;

generateQR(profileLink);

}

async function generateQR(url){

setLoading(true);

const qrData = await QRCode.toDataURL(url,{
color:{
dark:color,
light:bgColor
},
margin:2,
width:500
});

setQr(qrData);

setLoading(false);

}

/* QUICK GENERATORS */

function profileQR(){

const link=`https://linkarsha-next.vercel.app/${username}`;
generateQR(link);

}

function instagramQR(){

const link=`https://instagram.com/${username}`;
generateQR(link);

}

function youtubeQR(){

const link=`https://youtube.com/@${username}`;
generateQR(link);

}

function customQR(){

if(!inputUrl){
alert("Enter URL");
return;
}

generateQR(inputUrl);

}

/* DOWNLOAD */

function download(){

const a=document.createElement("a");
a.href=qr;
a.download="linkarsha-qr.png";
a.click();

}

/* LOGO UPLOAD */

function handleLogo(e){

const file=e.target.files[0];
if(!file) return;

const reader=new FileReader();

reader.onload=()=>{
setLogo(reader.result);
};

reader.readAsDataURL(file);

}

return(

<div style={{maxWidth:700}}>

<h2>QR Code Generator</h2>

<p style={{opacity:.7}}>
Create QR codes for your profile or any link.
</p>

{/* QUICK BUTTONS */}

<div style={{marginTop:20,display:"flex",gap:10,flexWrap:"wrap"}}>

<button onClick={profileQR} style={btn}>Profile QR</button>
<button onClick={instagramQR} style={btn}>Instagram QR</button>
<button onClick={youtubeQR} style={btn}>YouTube QR</button>

</div>

{/* CUSTOM URL */}

<div style={{marginTop:20}}>

<input
placeholder="Enter custom URL"
value={inputUrl}
onChange={(e)=>setInputUrl(e.target.value)}
style={input}
/>

<button onClick={customQR} style={{...btn,marginTop:10}}>
Generate QR
</button>

</div>

{/* COLOR SETTINGS */}

<div style={{marginTop:30,display:"flex",gap:20}}>

<div>
<label>QR Color</label>
<input type="color" value={color} onChange={(e)=>setColor(e.target.value)}/>
</div>

<div>
<label>Background</label>
<input type="color" value={bgColor} onChange={(e)=>setBgColor(e.target.value)}/>
</div>

</div>

{/* LOGO UPLOAD */}

<div style={{marginTop:20}}>

<label>Logo inside QR</label>

<input
type="file"
accept="image/*"
onChange={handleLogo}
/>

</div>

{/* QR PREVIEW */}

<div style={{marginTop:30}}>

{qr && (

<div style={{
width:260,
height:260,
background:bgColor,
display:"flex",
alignItems:"center",
justifyContent:"center",
position:"relative",
borderRadius:12
}}>

<img
src={qr}
style={{
width:240,
height:240
}}
/>

{logo && (

<img
src={logo}
style={{
width:60,
height:60,
position:"absolute",
borderRadius:10
}}
/>

)}

</div>

)}

</div>

{/* DOWNLOAD */}

<button
onClick={download}
style={{...btn,marginTop:20}}
>
Download QR
</button>

</div>

);

}

const btn={
background:"#00d26a",
border:"none",
padding:"10px 16px",
borderRadius:8,
cursor:"pointer"
};

const input={
width:"100%",
padding:12,
background:"#111",
border:"1px solid #333",
color:"white",
marginTop:10
};
