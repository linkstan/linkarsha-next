"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function Appearance(){

const [user,setUser]=useState(null);
const [theme,setTheme]=useState("dark");

useEffect(()=>{
init();
},[]);

async function init(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

setUser(session.user);

const {data:prof} = await supabase
.from("profiles")
.select("theme")
.eq("id",session.user.id)
.single();

if(prof?.theme) setTheme(prof.theme);

}

async function saveTheme(t){

setTheme(t);

await supabase
.from("profiles")
.update({theme:t})
.eq("id",user.id);

}

return(

<div>

<h2>Appearance</h2>

<div style={{
display:"flex",
gap:20,
marginTop:20
}}>

<div
onClick={()=>saveTheme("dark")}
style={{
padding:20,
borderRadius:10,
background:"#111",
border:theme==="dark"?"2px solid #00d26a":"1px solid #333",
cursor:"pointer"
}}
>

Dark

</div>

<div
onClick={()=>saveTheme("gradient")}
style={{
padding:20,
borderRadius:10,
background:"linear-gradient(45deg,#ff00cc,#3333ff)",
border:theme==="gradient"?"2px solid #00d26a":"1px solid #333",
cursor:"pointer"
}}
>

Gradient

</div>

<div
onClick={()=>saveTheme("light")}
style={{
padding:20,
borderRadius:10,
background:"#f4f4f4",
color:"#000",
border:theme==="light"?"2px solid #00d26a":"1px solid #333",
cursor:"pointer"
}}
>

Light

</div>

</div>

</div>

);

}
