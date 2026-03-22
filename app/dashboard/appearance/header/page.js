"use client";

import { useState,useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { saveAppearance } from "../../../lib/saveAppearance";
import { useRouter } from "next/navigation";

export default function HeaderEditor(){

const router = useRouter();

const [settings,setSettings]=useState({
layout:"classic",
showDisplayName:true,
showUsername:true,
font:"Inter",
fontWeight:"bold",
fontSize:22,
alignment:"center"
});

useEffect(()=>{
loadSettings();
},[]);

async function loadSettings(){

const {data:{session}}=await supabase.auth.getSession();
if(!session) return;

const {data}=await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

if(data?.profile_settings?.header){
setSettings(data.profile_settings.header);
}

}

function updateSetting(key,value){

const newSettings={
...settings,
[key]:value
};

setSettings(newSettings);

/* SAVE + LIVE PREVIEW */

saveAppearance("header",{[key]:value});

}

return(

<div style={{
padding:20,
maxWidth:650
}}>

{/* HEADER */}

<div style={{
display:"flex",
alignItems:"center",
gap:10,
marginBottom:20
}}>

<div
onClick={()=>router.back()}
style={{
cursor:"pointer",
fontSize:22
}}
>
←
</div>

<h2>Header</h2>

</div>


{/* LAYOUT */}

<h3>Layout</h3>

<div style={{display:"flex",gap:10,marginBottom:20}}>

<button
onClick={()=>updateSetting("layout","classic")}
style={{
padding:"8px 14px",
borderRadius:8,
border:"1px solid var(--border)"
}}
>
Classic
</button>

<button
onClick={()=>updateSetting("layout","hero")}
style={{
padding:"8px 14px",
borderRadius:8,
border:"1px solid var(--border)"
}}
>
Hero
</button>

</div>


{/* DISPLAY NAME */}

<h3>Display Name</h3>

<label style={{display:"block",marginBottom:20}}>

<input
type="checkbox"
checked={settings.showDisplayName}
onChange={(e)=>updateSetting("showDisplayName",e.target.checked)}
/>

 Show Display Name

</label>


{/* USERNAME */}

<h3>Username</h3>

<label style={{display:"block",marginBottom:20}}>

<input
type="checkbox"
checked={settings.showUsername}
onChange={(e)=>updateSetting("showUsername",e.target.checked)}
/>

 Show Username

</label>


{/* FONT */}

<h3>Font</h3>

<select
value={settings.font}
onChange={(e)=>updateSetting("font",e.target.value)}
style={{marginBottom:20}}
>

<option>Inter</option>
<option>Poppins</option>
<option>Montserrat</option>
<option>Playfair Display</option>
<option>Oswald</option>
<option>Manrope</option>

</select>


{/* FONT WEIGHT */}

<h3>Font Weight</h3>

<select
value={settings.fontWeight}
onChange={(e)=>updateSetting("fontWeight",e.target.value)}
style={{marginBottom:20}}
>

<option value="normal">Normal</option>
<option value="600">Semi Bold</option>
<option value="bold">Bold</option>

</select>


{/* FONT SIZE */}

<h3>Font Size</h3>

<input
type="range"
min="16"
max="40"
value={settings.fontSize}
onChange={(e)=>updateSetting("fontSize",Number(e.target.value))}
style={{marginBottom:20}}
/>


{/* ALIGNMENT */}

<h3>Alignment</h3>

<select
value={settings.alignment}
onChange={(e)=>updateSetting("alignment",e.target.value)}
>

<option value="left">Left</option>
<option value="center">Center</option>
<option value="right">Right</option>

</select>

</div>

);

}
