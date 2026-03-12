"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LinkHistory(){

const [events,setEvents] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{
loadHistory();
},[]);

async function loadHistory(){

const {data:{session}} = await supabase.auth.getSession();

if(!session){
return;
}

const {data,error} = await supabase
.from("events")
.select("*")
.eq("user_id",session.user.id)
.order("created_at",{ascending:false})
.limit(50);

setEvents(data || []);
setLoading(false);

}

if(loading){

return(
<div style={{padding:20}}>
Loading history...
</div>
)

}

return(

<div style={{maxWidth:600}}>

<h2>Link History</h2>

{events.length === 0 && (
<div style={{opacity:.6,marginTop:20}}>
No activity yet
</div>
)}

{events.map(event=>(

<div
key={event.id}
style={{
background:"#15151f",
padding:14,
borderRadius:10,
marginTop:10
}}
>

<div style={{fontWeight:600}}>
{event.event_type === "click" ? "Link Clicked" : "Profile Viewed"}
</div>

<div style={{fontSize:12,opacity:.7}}>
Block ID: {event.block_id || "profile"}
</div>

<div style={{fontSize:12,opacity:.5}}>
{new Date(event.created_at).toLocaleString()}
</div>

</div>

))}

</div>

);

}
