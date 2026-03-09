"use client";

import { useEffect,useState } from "react";
import { supabase } from "../lib/supabase";

export default function DashboardHome(){

const [profile,setProfile] = useState(null);

useEffect(()=>{
loadProfile();
},[]);

async function loadProfile(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const {data:prof} = await supabase
.from("profiles")
.select("*")
.eq("id",session.user.id)
.single();

setProfile(prof);

}

return(

<div>

<h1 style={{fontSize:28}}>Welcome to Linkarsha</h1>

<div style={{marginTop:10,opacity:0.7}}>
Manage your profile, links and analytics from the sidebar.
</div>

<div style={{
marginTop:30,
background:"#15151f",
padding:20,
borderRadius:12,
width:420
}}>

<div style={{fontWeight:600}}>
Your Public Profile
</div>

<div style={{marginTop:8,opacity:0.7}}>
linkarsha-next.vercel.app/{profile?.username}
</div>

</div>

</div>

);

}
