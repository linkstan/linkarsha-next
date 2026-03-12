"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Verified(){

const [enabled,setEnabled] = useState(false);

useEffect(()=>{
load();
},[]);

async function load(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const {data} = await supabase
.from("profiles")
.select("verified")
.eq("id",session.user.id)
.single();

setEnabled(data?.verified);

}

async function toggle(){

const {data:{session}} = await supabase.auth.getSession();

const newValue = !enabled;

setEnabled(newValue);

await supabase
.from("profiles")
.update({verified:newValue})
.eq("id",session.user.id);

}

return(

<div style={{maxWidth:500}}>

<h2>Get Verified</h2>

<div style={{
marginTop:20,
background:"#15151f",
padding:20,
borderRadius:12
}}>

<div style={{marginBottom:10}}>
Show verified badge on your profile
</div>

<label style={{
display:"flex",
alignItems:"center",
gap:10,
cursor:"pointer"
}}>

<input
type="checkbox"
checked={enabled}
onChange={toggle}
/>

<span>{enabled ? "Verified Enabled" : "Verified Disabled"}</span>

</label>

</div>

</div>

);

}
