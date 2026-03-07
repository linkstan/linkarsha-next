"use client";

import { useState } from "react";

export default function CreatorSetup(){

const [step,setStep] = useState(1);

const [theme,setTheme] = useState("");
const [platform,setPlatform] = useState("");

const [username,setUsername] = useState("");
const [multiLinks,setMultiLinks] = useState(["","",""]);

function continueStep(){

if(step===1 && !theme){
alert("Select a theme");
return;
}

if(step===2 && !platform){
alert("Select a platform");
return;
}

if(step===3){

if(platform!=="multi" && username.trim()===""){
alert("Enter username or profile URL");
return;
}

if(platform==="multi"){
const valid = multiLinks.filter(l=>l.trim()!=="");
if(valid.length===0){
alert("Add at least one link");
return;
}
}

}

setStep(step+1);

}

function updateMultiLink(i,val){

const arr=[...multiLinks];
arr[i]=val;
setMultiLinks(arr);

}

function addMultiLink(){

if(multiLinks.length>=7){
alert("Maximum 7 links allowed");
return;
}

setMultiLinks([...multiLinks,""]);

}

return(

<div style={{
minHeight:"100vh",
background:"#0b0b12",
color:"white",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"
}}>

<h1 style={{marginBottom:30}}>
Creator Setup
</h1>

{/* STEP 1 THEME */}

{step===1 &&(

<div style={{textAlign:"center"}}>

<h2>Select a Theme</h2>

<div style={{
marginTop:30,
display:"grid",
gridTemplateColumns:"repeat(3,120px)",
gap:20
}}>

<div
onClick={()=>setTheme("dark")}
style={{
height:180,
borderRadius:20,
cursor:"pointer",
background:"#111",
border:theme==="dark"?"2px solid #00d26a":"1px solid #333"
}}
></div>

<div
onClick={()=>setTheme("gradient")}
style={{
height:180,
borderRadius:20,
cursor:"pointer",
background:"linear-gradient(180deg,#4f46e5,#9333ea)",
border:theme==="gradient"?"2px solid #00d26a":"1px solid #333"
}}
></div>

<div
onClick={()=>setTheme("light")}
style={{
height:180,
borderRadius:20,
cursor:"pointer",
background:"#ddd",
border:theme==="light"?"2px solid #00d26a":"1px solid #333"
}}
></div>

</div>

<button
onClick={continueStep}
style={{
marginTop:40,
padding:"14px 40px",
borderRadius:10,
border:"none",
background:theme?"#00d26a":"#333",
color:"white",
fontWeight:600,
cursor:theme?"pointer":"not-allowed",
opacity:theme?1:0.6
}}
>
Continue
</button>

</div>

)}

{/* STEP 2 PLATFORM */}

{step===2 &&(

<div style={{textAlign:"center"}}>

<h2>Where is your audience?</h2>

<div style={{
marginTop:30,
display:"grid",
gridTemplateColumns:"repeat(2,160px)",
gap:15
}}>

<button onClick={()=>setPlatform("instagram")}>Instagram</button>
<button onClick={()=>setPlatform("vk")}>VK</button>
<button onClick={()=>setPlatform("facebook")}>Facebook</button>
<button onClick={()=>setPlatform("youtube")}>YouTube</button>
<button onClick={()=>setPlatform("tiktok")}>TikTok</button>
<button onClick={()=>setPlatform("multi")}>Multiple Platforms</button>

</div>

<button
onClick={continueStep}
style={{
marginTop:40,
padding:"14px 40px",
borderRadius:10,
border:"none",
background:platform?"#00d26a":"#333",
color:"white",
fontWeight:600,
cursor:platform?"pointer":"not-allowed",
opacity:platform?1:0.6
}}
>
Continue
</button>

</div>

)}

{/* STEP 3 USERNAME INPUT */}

{step===3 &&(

<div style={{width:340,textAlign:"center"}}>

<h2>Add your profile</h2>

{platform!=="multi" &&(

<input
placeholder="@username or profile URL"
value={username}
onChange={(e)=>setUsername(e.target.value)}
style={{
marginTop:20,
padding:12,
width:"100%",
background:"#111",
border:"1px solid #333",
color:"white"
}}
/>

)}

{platform==="multi" &&(

<div>

{multiLinks.map((l,i)=>(

<input
key={i}
placeholder="https://profile-link"
value={l}
onChange={(e)=>updateMultiLink(i,e.target.value)}
style={{
marginTop:10,
padding:12,
width:"100%",
background:"#111",
border:"1px solid #333",
color:"white"
}}
/>

))}

<button
onClick={addMultiLink}
style={{marginTop:10}}
>
+ Add link
</button>

</div>

)}

<button
onClick={continueStep}
style={{
marginTop:30,
padding:"14px 40px",
borderRadius:10,
border:"none",
background:"#00d26a",
color:"white",
fontWeight:600
}}
>
Continue
</button>

</div>

)}

{/* STEP 4 NEXT */}

{step===4 &&(

<div style={{textAlign:"center"}}>

<h2>Profile info coming next</h2>

</div>

)}

</div>

);

}
