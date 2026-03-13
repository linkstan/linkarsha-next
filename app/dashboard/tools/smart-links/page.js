"use client";

import { useState,useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function SmartLinks(){

const [mobile,setMobile]=useState("");
const [desktop,setDesktop]=useState("");

async function create(){

const {data:{session}} = await supabase.auth.getSession();

const slug=Math.random().toString(36).substring(2,8);

await supabase
.from("smart_links")
.insert({
user_id:session.user.id,
slug,
mobile_url:mobile,
desktop_url:desktop
});

alert("Smart link created");

}

return(

<div style={{maxWidth:600}}>

<h2>Create Smart Link</h2>

<input
placeholder="Mobile URL"
value={mobile}
onChange={(e)=>setMobile(e.target.value)}
style={{
width:"100%",
padding:12,
background:"#111",
border:"1px solid #333",
color:"white"
}}
/>

<input
placeholder="Desktop URL"
value={desktop}
onChange={(e)=>setDesktop(e.target.value)}
style={{
width:"100%",
padding:12,
marginTop:10,
background:"#111",
border:"1px solid #333",
color:"white"
}}
/>

<button
onClick={create}
style={{
marginTop:12,
background:"#1da1f2",
border:"none",
padding:"10px 16px",
borderRadius:8
}}
>
Create Smart Link
</button>

</div>

);

}
