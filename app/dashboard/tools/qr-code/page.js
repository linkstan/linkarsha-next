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
const [style,setStyle]=useState("classic");
const [profileUrl,setProfileUrl]=useState("");

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

const link=`https://linkarsha-next.vercel.app/${data.username}`;

setProfileUrl(link);

generateQR(link);

}

useEffect(()=>{
if(profileUrl){
generateQR(inputUrl || profileUrl);
}
},[color,bgColor,style]);

async function generateQR(link){

const qrData = await QRCode.toDataURL(link,{
color:{
dark:color,
light:bgColor
},
margin:2,
width:500
});

setQr(qrData);

}

function profileQR(){
setInputUrl(profileUrl);
generateQR(profileUrl);
}

function instagramQR(){
const link=`https://instagram.com/${username}`;
setInputUrl(link);
generateQR(link);
}

function youtubeQR(){
const link=`https://youtube.com/@${username}`;
setInputUrl(link);
generateQR(link);
}

function customQR(){

if(!inputUrl){
alert("Enter URL");
return;
}

generateQR(inputUrl);

}

function download(){

const a=document.createElement("a");
a.href=qr;
a.download="linkarsha-qr.png";
a.click();

}

function handleLogo(e){

const file=e.target.files[0];
if(!file) return;

const reader=new FileReader();

reader.onload=()=>{
setLogo(reader.result);
};

reader.readAsDataURL(file);

}

function getStyle(){

if(style==="rounded"){
return {borderRadius:40};
}

if(style==="soft"){
return {filter:"blur(0.4px)"};
}

return {};

}

return(

<div style={{maxWidth:720,color:"var(--text)"}}>

<h2>QR Code Generator</h2>

<p style={{opacity:.7}}>
Create QR codes for your profile or any link.
</p>

<div style={{display:"flex",gap:10,marginTop:20,flexWrap:"wrap"}}>

<button onClick={profileQR} style={btn}>Profile</button>
<button onClick={instagramQR} style={btn}>Instagram</button>
<button onClick={youtubeQR} style={btn}>YouTube</button>

</div>

<div style={{marginTop:20}}>

<input
placeholder="Enter custom URL"
value={inputUrl}
onChange={(e)=>setInputUrl(e.target.value)}
style={input}
/>

<button
onClick={customQR}
style={{...btn,marginTop:10}}
>
Generate QR
</button>

</div>

<div style={{marginTop:35}}>

{qr && (

<div style={{
width:280,
height:280,
background:bgColor,
display:"flex",
alignItems:"center",
justifyContent:"center",
borderRadius:16,
position:"relative",
border:"1px solid var(--border)"
}}>

<img
src={qr}
style={{
width:240,
height:240,
...getStyle()
}}
/>

{logo && (

<div style={{
position:"absolute",
background:"#fff",
padding:8,
borderRadius:12
}}>

<img
src={logo}
style={{
width:60,
height:60,
borderRadius:10
}}
/>

</div>

)}

</div>

)}

</div>

<button
onClick={download}
style={{...btn,marginTop:25}}
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
background:"var(--card)",
border:"1px solid var(--border)",
color:"var(--text)"
};
