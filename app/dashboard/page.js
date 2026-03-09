"use client";

import { useEffect,useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard(){

const [loading,setLoading] = useState(true);

useEffect(()=>{
checkUser();
},[]);

async function checkUser(){

const {data:{session}} = await supabase.auth.getSession();

if(!session){
window.location="/login";
return;
}

const {data:prof} = await supabase
.from("profiles")
.select("user_type")
.eq("id",session.user.id)
.single();

/* IMPORTANT LOGIC */

if(!prof || !prof.user_type){
window.location="/setup";
return;
}

setLoading(false);

}

if(loading){

return(
<div style={{
background:"#0b0b12",
height:"100vh",
display:"flex",
alignItems:"center",
justifyContent:"center",
color:"white"
}}>
Loading...
</div>
)

}

return(

<div>

<h1 style={{fontSize:28}}>
Welcome to Linkarsha
</h1>

<p style={{opacity:0.7,marginTop:10}}>
Use the sidebar to manage your links, blocks and analytics.
</p>

</div>

);

}
