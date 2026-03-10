"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../lib/supabase";
import AvatarUploader from "../../components/AvatarUploader";

export default function Dashboard(){

const [loading,setLoading] = useState(true);
const [profile,setProfile] = useState(null);

/* avatar modal */
const [avatarModal,setAvatarModal] = useState(false);

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

{/* PROFILE HEADER */}

<div style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
marginTop:20
}}>

{/* avatar */}

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

<div
onClick={()=>setAvatarModal(true)}
style={{
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
}}
>
+
</div>

</div>

{/* username */}

<div style={{
fontSize:34,
marginTop:20,
fontWeight:700
}}>
@{profile?.username}
</div>

{/* public link */}

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

{/* dashboard text */}

<div style={{
marginTop:60,
opacity:0.7,
textAlign:"center"
}}>
Welcome to Linkarsha.  
Use the sidebar to manage your links, blocks and analytics.
</div>

{/* AVATAR UPLOAD MODAL */}

<AvatarUploader
open={avatarModal}
onClose={()=>setAvatarModal(false)}
onUploaded={(url)=>setProfile({...profile,avatar:url})}
/>

</div>

);

}
