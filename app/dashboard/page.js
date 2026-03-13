"use client";

import { useEffect,useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard(){

const [loading,setLoading] = useState(true);
const [profile,setProfile] = useState(null);

useEffect(()=>{
init();
},[]);

async function init(){

const {data:{session}} = await supabase.auth.getSession();

if(!session){
window.location="/login";
return;
}

const uid=session.user.id;

/* detect user timezone */

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

/* save timezone */

await supabase
.from("profiles")
.update({timezone})
.eq("id",uid);

/* load profile */

const {data:prof} = await supabase
.from("profiles")
.select("*")
.eq("id",uid)
.single();

/* onboarding protection */

if(!prof || !prof.user_type){
window.location="/setup";
return;
}

setProfile(prof);
setLoading(false);

}

/* share profile */

function shareProfile(){

const url=`https://linkarsha-next.vercel.app/${profile.username}`;

navigator.clipboard.writeText(url);

alert("Profile link copied");

}

/* upload avatar */

async function uploadAvatar(e){

const file = e.target.files[0];
if(!file) return;

const {data:{session}} = await supabase.auth.getSession();

const uid = session.user.id + ".jpg";

/* upload */

await supabase.storage
.from("avatars")
.upload(uid,file,{upsert:true});

/* public url */

const {data} = supabase.storage
.from("avatars")
.getPublicUrl(uid);

/* update profile */

await supabase
.from("profiles")
.update({avatar:data.publicUrl})
.eq("id",session.user.id);

setProfile({...profile,avatar:data.publicUrl});

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

<div style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
marginTop:20
}}>

<div style={{
position:"relative",
width:120,
height:120
}}>

<img
src={profile?.avatar || "/default-avatar.png"}
style={{
width:120,
height:120,
borderRadius:"50%",
objectFit:"cover",
border:"4px solid #999"
}}
/>

<label style={{
position:"absolute",
right:-6,
bottom:-6,
width:36,
height:36,
borderRadius:"50%",
background:"#00d26a",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:22,
cursor:"pointer",
color:"#000"
}}>
+
<input
type="file"
accept="image/*"
hidden
onChange={uploadAvatar}
/>
</label>

</div>

<div style={{
fontSize:34,
marginTop:20,
fontWeight:700
}}>
@{profile?.username}
</div>

<div style={{
marginTop:20,
display:"flex",
borderRadius:14,
overflow:"hidden",
border:"1px solid #333"
}}>

<div style={{
padding:"14px 20px",
background:"#111",
fontWeight:600
}}>
linkarsha-next.vercel.app/{profile?.username}
</div>

<button
onClick={shareProfile}
style={{
padding:"14px 20px",
background:"#1a1a25",
border:"none",
color:"white",
cursor:"pointer"
}}
>
Share
</button>

</div>

</div>

<div style={{
marginTop:60,
opacity:0.7,
textAlign:"center"
}}>
Welcome to Linkarsha.  
Use the sidebar to manage your links, blocks and analytics.
</div>

</div>

);

}
