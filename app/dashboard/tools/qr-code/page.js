"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../../lib/supabase";
import QRCode from "qrcode";

export default function QRGenerator(){

const [username,setUsername]=useState("");
const [url,setUrl]=useState("");
const [qr,setQr]=useState("");

const [color,setColor]=useState("#000000");
const [bgColor,setBgColor]=useState("#ffffff");

const [logo,setLogo]=useState(null);

const [style,setStyle]=useState("square");
const [frame,setFrame]=useState(false);

/* LOAD USER */

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

setUrl(profileLink);

}

/* AUTO REGENERATE QR */

useEffect(()=>{
if(url){
generateQR(url);
}
},[url,color,bgColor,logo,style]);

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

/* QUICK LINKS */

function profileQR(){
setUrl(`https://linkarsha-next.vercel.app/${username}`);
}

function instagramQR(){
setUrl(`https://instagram.com/${username}`);
}

function youtubeQR(){
setUrl(`https://youtube.com/@${username}`);
}

function customQR(){
if(!url){
alert("Enter URL");
return;
}
generateQR(url);
}

/* DOWNLOAD */

function download(){

const a=document.createElement("a");
a.href=qr;
a.download="linkarsha-qr.png";
a.click();

}

/* LOGO */

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

<div style={{maxWidth:720}}>

<h2>QR Code Generator</h2>

<p style={{opacity:.7}}>
Create branded QR codes for your profile or links.
</p>

{/* QUICK BUTTONS */}

<div style={{display:"flex",gap:10,marginTop:20,flexWrap:"wrap"}}>

<button onClick={profileQR} style={btn}>Profile</button>
<button onClick={instagramQR} style={btn}>Instagram</button>
<button onClick={youtubeQR} style={btn}>YouTube</button>

</div>

{/* CUSTOM URL */}

<div style={{marginTop:20}}>

<input
placeholder="Enter custom URL"
value={url}
onChange={(e)=>setUrl(e.target.value)}
style={input}
/>

</div>

{/* COLORS */}

<div style={{marginTop:25,display:"flex",gap:30}}>

<div>
<div style={{fontSize:12,opacity:.7}}>QR Color</div>
<input type="color" value={color} onChange={(e)=>setColor(e.target.value)} />
</div>

<div>
<div style={{fontSize:12,opacity:.7}}>Background</div>
<input type="color" value={bgColor} onChange={(e)=>setBgColor(e.target.value)} />
</div>

</div>

{/* STYLE */}

<div style={{marginTop:25}}>

<div style={{fontSize:12,opacity:.7}}>Dot Style</div>

<select
value={style}
onChange={(e)=>setStyle(e.target.value)}
style={{
marginTop:5,
padding:8,
background:"#111",
color:"white",
border:"1px solid #333"
}}
>
<option value="square">Square</option>
<option value="rounded">Rounded</option>
<option value="dots">Dots</option>
</select>

</div>

{/* FRAME */}

<div style={{marginTop:20}}>

<label style={{display:"flex",gap:8,alignItems:"center"}}>

<input
type="checkbox"
checked={frame}
onChange={(e)=>setFrame(e.target.checked)}
/>

Add Frame

</label>

</div>

{/* LOGO */}

<div style={{marginTop:20}}>

<div style={{fontSize:12,opacity:.7}}>Logo inside QR</div>

<input
type="file"
accept="image/*"
onChange={handleLogo}
/>

</div>

{/* QR PREVIEW */}

<div style={{marginTop:35}}>

{qr && (

<div style={{
width:280,
height:280,
background:bgColor,
display:"flex",
alignItems:"center",
justifyContent:"center",
borderRadius:frame ? 20 : 10,
border: frame ? "8px solid #000" : "none",
position:"relative"
}}>

<img
src={qr}
style={{
width:240,
height:240,
borderRadius: style==="rounded" ? 20 : 0
}}
/>

{logo && (

<img
src={logo}
style={{
width:70,
height:70,
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
background:"#111",
border:"1px solid #333",
color:"white"
};
