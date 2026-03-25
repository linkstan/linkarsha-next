"use client";

import { useState,useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function Buttons(){

const [settings,setSettings]=useState({
style:"solid",
radius:"round",
colorMode:"theme",
color:"#ffffff",
textMode:"theme",
textColor:"#ffffff"
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

if(data?.profile_settings?.buttons){
setSettings(data.profile_settings.buttons);
}

}

async function updateSetting(key,value){

const newSettings={
...settings,
[key]:value
};

setSettings(newSettings);

window.dispatchEvent(
new CustomEvent("appearance-update",{detail:{buttons:newSettings}})
);

const {data:{session}}=await supabase.auth.getSession();
if(!session) return;

const {data:profile}=await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

const allSettings=profile?.profile_settings || {};
allSettings.buttons=newSettings;

await supabase
.from("profiles")
.update({profile_settings:allSettings})
.eq("id",session.user.id);

}

return(

<div style={{maxWidth:650,padding:20}}>

<h2>Buttons</h2>

<h3>Style</h3>

<button onClick={()=>updateSetting("style","solid")}>Solid</button>
<button onClick={()=>updateSetting("style","glass")}>Glass</button>
<button onClick={()=>updateSetting("style","outline")}>Outline</button>

<h3 style={{marginTop:25}}>Radius</h3>

<button onClick={()=>updateSetting("radius","square")}>Square</button>
<button onClick={()=>updateSetting("radius","round")}>Round</button>
<button onClick={()=>updateSetting("radius","rounder")}>Rounder</button>
<button onClick={()=>updateSetting("radius","full")}>Full</button>

</div>

);

}
