"use client";

import { useEffect,useState } from "react";
import QRCode from "qrcode";
import { supabase } from "../../../lib/supabase";

export default function QRGenerator(){

const [url,setUrl]=useState("");
const [qr,setQr]=useState("");

useEffect(()=>{
load();
},[]);

async function load(){

const {data:{session}} = await supabase.auth.getSession();

const {data} = await supabase
.from("profiles")
.select("username")
.eq("id",session.user.id)
.single();

const link=`https://linkarsha-next.vercel.app/${data.username}`;

setUrl(link);

generate(link);

}

async function generate(link){

const data = await QRCode.toDataURL(link);

setQr(data);

}

function download(){

const a=document.createElement("a");
a.href=qr;
a.download="linkarsha-qr.png";
a.click();

}

return(

<div style={{maxWidth:600}}>

<h2>QR Code Generator</h2>

<p style={{opacity:.7}}>
Share your Linkarsha profile with a QR code.
</p>

<div style={{marginTop:20}}>

{qr && (

<img
src={qr}
style={{
width:220,
height:220,
background:"white",
padding:10,
borderRadius:10
}}
/>

)}

</div>

<button
onClick={download}
style={{
marginTop:20,
background:"#00d26a",
border:"none",
padding:"10px 16px",
borderRadius:8
}}
>
Download QR
</button>

</div>

);

}
