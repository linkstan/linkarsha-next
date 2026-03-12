"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../lib/supabase";

export default function VerificationRequests(){

const [requests,setRequests]=useState([]);

useEffect(()=>{
load();
},[]);

async function load(){

const {data} = await supabase
.from("verification_requests")
.select("*")
.order("created_at",{ascending:false});

setRequests(data || []);

}

async function approve(user_id){

await supabase
.from("profiles")
.update({verified:true})
.eq("id",user_id);

await supabase
.from("verification_requests")
.update({status:"approved"})
.eq("user_id",user_id);

load();

}

return(

<div style={{maxWidth:700}}>

<h2>Verification Requests</h2>

{requests.map(r=>(

<div key={r.id} style={{
background:"#15151f",
padding:15,
borderRadius:10,
marginTop:10
}}>

<div>User ID: {r.user_id}</div>

<div style={{opacity:.6,fontSize:13}}>
Status: {r.status}
</div>

{r.status==="pending" && (

<button
onClick={()=>approve(r.user_id)}
style={{
marginTop:10,
background:"#1da1f2",
border:"none",
padding:"6px 12px",
borderRadius:6,
color:"white"
}}
>
Approve
</button>

)}

</div>

))}

</div>

);

}
