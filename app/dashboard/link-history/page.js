"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LinkHistory(){

const [history,setHistory] = useState([]);

useEffect(()=>{
loadHistory();
},[]);

async function loadHistory(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const {data} = await supabase
.from("link_history")
.select("*")
.eq("user_id",session.user.id)
.order("created_at",{ascending:false})
.limit(100);

setHistory(data || []);

}

return(

<div style={{maxWidth:600}}>

<h2>Link History</h2>

{history.map(item => (

<div key={item.id} style={{
background:"#15151f",
padding:14,
borderRadius:10,
marginTop:10
}}>

<div style={{fontWeight:600}}>
{item.title}
</div>

<div style={{opacity:.7,fontSize:13}}>
{item.action} • {item.url}
</div>

<div style={{opacity:.5,fontSize:12}}>
{new Date(item.created_at).toLocaleString()}
</div>

</div>

))}

</div>

);

}
