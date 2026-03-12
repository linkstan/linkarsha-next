"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LinkHistory(){

const [items,setItems] = useState([]);

useEffect(()=>{
load();
},[]);

async function load(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const {data} = await supabase
.from("link_history")
.select("*")
.eq("user_id",session.user.id)
.order("created_at",{ascending:false});

setItems(data || []);

}

return(

<div style={{maxWidth:600}}>

<h2>Link History</h2>

{items.length === 0 && (
<div style={{opacity:.6,marginTop:20}}>
No link history yet
</div>
)}

{items.map(item=>(

<div key={item.id} style={{
background:"#15151f",
padding:14,
borderRadius:10,
marginTop:10
}}>

<div style={{fontWeight:600}}>
{item.title}
</div>

<div style={{fontSize:13,opacity:.7}}>
{item.action} • {item.url}
</div>

<div style={{fontSize:12,opacity:.5}}>
{new Date(item.created_at).toLocaleString()}
</div>

</div>

))}

</div>

);

}
