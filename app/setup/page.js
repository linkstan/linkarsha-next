"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Setup(){

const [user,setUser]=useState(null);
const [step,setStep]=useState(1);
const [userType,setUserType]=useState("");
const [industry,setIndustry]=useState("");

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

async function saveProfile(){

await supabase
.from("profiles")
.update({
user_type:userType,
industry:industry
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

<button onClick={()=>{setIndustry("artist");saveProfile();}}>
Artist
</button>

<button onClick={()=>{setIndustry("athlete");saveProfile();}}>
Athlete
</button>

<button onClick={()=>{setIndustry("youtuber");saveProfile();}}>
YouTuber
</button>

<button onClick={()=>{setIndustry("musician");saveProfile();}}>
Musician
</button>

<button onClick={()=>{setIndustry("restaurant");saveProfile();}}>
Restaurant
</button>

<button onClick={()=>{setIndustry("cafe");saveProfile();}}>
Cafe
</button>

<button onClick={()=>{setIndustry("store");saveProfile();}}>
Online Store
</button>

<button onClick={()=>{setIndustry("healthcare");saveProfile();}}>
Healthcare
</button>

<button onClick={()=>{setIndustry("photographer");saveProfile();}}>
Photographer
</button>

<button onClick={()=>{setIndustry("coach");saveProfile();}}>
Coach
</button>

</div>

</div>

)}

</div>

)

}
