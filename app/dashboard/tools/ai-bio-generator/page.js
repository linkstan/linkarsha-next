"use client";

import { useState,useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function AIBioGenerator(){

const [niche,setNiche]=useState("");
const [style,setStyle]=useState("Professional");
const [keywords,setKeywords]=useState("");
const [bios,setBios]=useState([]);

const [saving,setSaving]=useState(false);

function generate(){

if(!niche){
alert("Enter niche");
return;
}

const words = keywords.split(",");

const generated = [
`🔥 ${niche} creator sharing insights`,
`🚀 Helping people with ${niche}`,
`💡 ${niche} tips & strategies`,
`📈 Level up your ${niche} game`,
`🎯 ${niche} focused creator`,
`✨ Passionate about ${niche}`,
`⚡ ${niche} ideas daily`
];

setBios(generated);

}

async function saveBio(text){

setSaving(true);

const {data:{session}} = await supabase.auth.getSession();

await supabase
.from("profiles")
.update({bio:text})
.eq("id",session.user.id);

setSaving(false);

alert("Bio updated");

}

return(

<div style={{maxWidth:700}}>

<h2>AI Bio Generator</h2>

<div style={{marginTop:20}}>

<input
placeholder="Your niche (fitness, tech, gaming)"
value={niche}
onChange={(e)=>setNiche(e.target.value)}
style={{
width:"100%",
padding:12,
background:"#111",
border:"1px solid #333",
color:"white"
}}
/>

<select
value={style}
onChange={(e)=>setStyle(e.target.value)}
style={{
width:"100%",
padding:12,
marginTop:10,
background:"#111",
border:"1px solid #333",
color:"white"
}}
>
<option>Professional</option>
<option>Casual</option>
<option>Funny</option>
</select>

<input
placeholder="Keywords (comma separated)"
value={keywords}
onChange={(e)=>setKeywords(e.target.value)}
style={{
width:"100%",
padding:12,
marginTop:10,
background:"#111",
border:"1px solid #333",
color:"white"
}}
/>

<button
onClick={generate}
style={{
marginTop:12,
background:"#00d26a",
border:"none",
padding:"10px 16px",
borderRadius:8
}}
>
Generate Bios
</button>

</div>

<div style={{marginTop:30}}>

{bios.map((b,i)=>(

<div key={i} style={{
background:"#15151f",
padding:14,
borderRadius:10,
marginTop:10
}}>

<div>{b}</div>

<div style={{marginTop:10}}>

<button
onClick={()=>navigator.clipboard.writeText(b)}
style={{
marginRight:10,
background:"#333",
border:"none",
padding:"6px 12px",
borderRadius:6,
color:"white"
}}
>
Copy
</button>

<button
onClick={()=>saveBio(b)}
style={{
background:"#1da1f2",
border:"none",
padding:"6px 12px",
borderRadius:6,
color:"white"
}}
>
{saving ? "Saving..." : "Use this Bio"}
</button>

</div>

</div>

))}

</div>

</div>

);

}
