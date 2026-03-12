"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function GetVerified(){

const [loading,setLoading]=useState(false);
const [sent,setSent]=useState(false);

async function apply(){

setLoading(true);

const {data:{session}} = await supabase.auth.getSession();

if(!session){
alert("Login required");
return;
}

await supabase.from("verification_requests").insert({
user_id:session.user.id
});

setSent(true);
setLoading(false);

}

return(

<div style={{maxWidth:600}}>

<h2>Get Verified</h2>

<p style={{opacity:0.7,marginTop:10}}>
Verified accounts receive a blue tick showing authenticity and trust.
</p>

<ul style={{marginTop:20,opacity:0.8}}>
<li>✓ Authentic identity</li>
<li>✓ Trusted public presence</li>
<li>✓ Premium credibility</li>
</ul>

{!sent ? (

<button
onClick={apply}
disabled={loading}
style={{
marginTop:30,
padding:"12px 18px",
background:"#1da1f2",
border:"none",
borderRadius:8,
color:"white",
cursor:"pointer"
}}
>
{loading ? "Submitting..." : "Apply for Verification"}
</button>

):(

<div style={{
marginTop:30,
background:"#15151f",
padding:15,
borderRadius:10
}}>
Application submitted. We will review it soon.
</div>

)}

</div>

);

}
