"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../lib/supabase";

export default function VerificationRequests(){

const [requests,setRequests]=useState([]);
const [loading,setLoading]=useState(true);

useEffect(()=>{
load();
},[]);

async function load(){

setLoading(true);

const {data} = await supabase
.from("verification_requests")
.select(`
id,
user_id,
status,
created_at,
profiles (
username,
avatar
)
`)
.order("created_at",{ascending:false});

setRequests(data || []);
setLoading(false);

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

async function deny(user_id){

await supabase
.from("verification_requests")
.update({status:"denied"})
.eq("user_id",user_id);

load();

}

return(

<div style={{maxWidth:700}}>

<h2>Verification Requests</h2>

{loading && (
<div style={{opacity:.6,marginTop:20}}>
Loading...
</div>
)}

{!loading && requests.length===0 && (
<div style={{opacity:.6,marginTop:20}}>
No verification requests
</div>
)}

{requests.map(r=>(

<div key={r.id} style={{
background:"#15151f",
padding:15,
borderRadius:10,
marginTop:10,
display:"flex",
alignItems:"center",
justifyContent:"space-between"
}}>

<div style={{display:"flex",alignItems:"center",gap:10}}>

<img
src={r.profiles?.avatar || "/default-avatar.png"}
style={{
width:36,
height:36,
borderRadius:"50%",
objectFit:"cover"
}}
/>

<div>

<div style={{fontWeight:600}}>
@{r.profiles?.username || "unknown"}
</div>

<div style={{opacity:.6,fontSize:12}}>
Status: {r.status}
</div>

</div>

</div>

{r.status==="pending" && (

<div style={{display:"flex",gap:10}}>

<button
onClick={()=>approve(r.user_id)}
style={{
background:"#1da1f2",
border:"none",
padding:"6px 12px",
borderRadius:6,
color:"white",
cursor:"pointer"
}}
>
Approve
</button>

<button
onClick={()=>deny(r.user_id)}
style={{
background:"#ff4d4d",
border:"none",
padding:"6px 12px",
borderRadius:6,
color:"white",
cursor:"pointer"
}}
>
Deny
</button>

</div>

)}

</div>

))}

</div>

);

}
