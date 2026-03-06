"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Setup(){

const [user,setUser]=useState(null);
const [step,setStep]=useState(1);
const [userType,setUserType]=useState("");

useEffect(()=>{
init();
},[]);

async function init(){

const {data:{session}} = await supabase.auth.getSession();

if(!session){
window.location="/login";
return;
}

setUser(session.user);

}

async function saveProfile(type, field){

await supabase
.from("profiles")
.update({
user_type:type,
industry:field
})
.eq("id",user.id);

window.location="/dashboard";

}

return(

<div style={{
minHeight:"100vh",
background:"#0b0b12",
color:"white",
display:"flex",
alignItems:"center",
justifyContent:"center",
flexDirection:"column",
fontFamily:"-apple-system"
}}>

<h1 style={{marginBottom:"20px"}}>
Setup your Linkarsha
</h1>

{step===1 && (

<div>

<h2>Who are you?</h2>

<div style={{marginTop:"20px",display:"flex",flexDirection:"column",gap:"10px"}}>

<button onClick={()=>{setUserType("creator");setStep(2);}}>
Creator
</button>

<button onClick={()=>{setUserType("business");setStep(2);}}>
Business
</button>

<button onClick={()=>{setUserType("personal");setStep(2);}}>
Personal
</button>

</div>

</div>

)}

{step===2 && (

<div>

<h2>Select your field</h2>

<div style={{
marginTop:"20px",
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"10px"
}}>

<button onClick={()=>saveProfile(userType,"artist")}>
Artist
</button>

<button onClick={()=>saveProfile(userType,"athlete")}>
Athlete
</button>

<button onClick={()=>saveProfile(userType,"youtuber")}>
YouTuber
</button>

<button onClick={()=>saveProfile(userType,"musician")}>
Musician
</button>

<button onClick={()=>saveProfile(userType,"restaurant")}>
Restaurant
</button>

<button onClick={()=>saveProfile(userType,"cafe")}>
Cafe
</button>

<button onClick={()=>saveProfile(userType,"store")}>
Online Store
</button>

<button onClick={()=>saveProfile(userType,"healthcare")}>
Healthcare
</button>

<button onClick={()=>saveProfile(userType,"photographer")}>
Photographer
</button>

<button onClick={()=>saveProfile(userType,"coach")}>
Coach
</button>

</div>

</div>

)}

</div>

)

}
