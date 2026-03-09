"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../lib/supabase";

export default function SettingsPage(){

const [profile,setProfile] = useState(null);

useEffect(()=>{
loadProfile();
},[]);

async function loadProfile(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const {data} = await supabase
.from("profiles")
.select("*")
.eq("id",session.user.id)
.single();

setProfile(data);

}

return(

<div style={{display:"flex",gap:40}}>

{/* SETTINGS MENU */}

<div style={{width:260}}>

<h3>Settings</h3>

<div style={{marginTop:20,display:"flex",flexDirection:"column",gap:10}}>

<div>My Account</div>
<div>Payment & Billing</div>
<div>Terms of Service</div>
<div>Privacy Policy</div>
<div>Cookies Policy</div>
<div>Community Standards</div>

</div>

</div>

{/* SETTINGS CONTENT */}

<div style={{flex:1}}>

<h2>My Account</h2>

<div style={{marginTop:20}}>

<div>Name</div>
<input value={profile?.display_name || ""} readOnly />

<div style={{marginTop:10}}>Username</div>
<input value={profile?.username || ""} readOnly />

<div style={{marginTop:10}}>Email</div>
<input value={profile?.email || ""} readOnly />

</div>

<h2 style={{marginTop:40}}>Payment & Billing</h2>

<div style={{
display:"flex",
gap:20,
marginTop:20
}}>

<div style={{
border:"1px solid #333",
padding:20,
borderRadius:12,
width:220
}}>

<h3>Free</h3>

<p>
Beta Test Version Plan
Free Forever for first 50,000 users
</p>

</div>

<div style={{
border:"1px solid #333",
padding:20,
borderRadius:12,
width:220
}}>

<h3>Pro</h3>

<p>Coming Soon</p>

</div>

</div>

</div>

</div>

);

}
