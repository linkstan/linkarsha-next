"use client";

import { useEffect, useState } from "react";
import { supabase } from "../app/lib/supabase";
import ThemeRenderer from "./ThemeRenderer";

export default function PhonePreview(){

const [profile,setProfile] = useState(null);
const [blocks,setBlocks] = useState([]);
const [appearance,setAppearance] = useState({});

/* LOAD USER DATA */

useEffect(()=>{

loadPreview();

async function loadPreview(){

const { data:{ session } } =
await supabase.auth.getSession();

if(!session) return;

const uid = session.user.id;


/* PROFILE */

const { data:prof } = await supabase
.from("profiles")
.select("*")
.eq("id",uid)
.single();

setProfile(prof);


/* APPEARANCE */

setAppearance({
...(prof?.profile_settings || {}),
theme: prof?.theme
});


/* BLOCKS */

const { data:blockData } = await supabase
.from("blocks")
.select("*")
.eq("user_id",uid)
.order("position",{ ascending:true });

setBlocks(blockData || []);

}

},[]);


/* LIVE INSTANT UPDATES */

useEffect(()=>{

function updateAppearance(e){

setAppearance(prev=>({
...prev,
...e.detail
}));

}

function updateBlocks(e){

setBlocks(e.detail);

}

function updateTheme(e){

setAppearance(prev=>({
...prev,
theme:e.detail
}));

}


/* VERY IMPORTANT */
/* UPDATE PROFILE THEME TOO */

function updateProfileTheme(e){

setProfile(prev=>({
...prev,
theme:e.detail
}));

}


window.addEventListener(
"appearance-update",
updateAppearance
);

window.addEventListener(
"blocks-update",
updateBlocks
);

window.addEventListener(
"theme-change",
updateTheme
);

window.addEventListener(
"theme-change",
updateProfileTheme
);

return ()=>{

window.removeEventListener(
"appearance-update",
updateAppearance
);

window.removeEventListener(
"blocks-update",
updateBlocks
);

window.removeEventListener(
"theme-change",
updateTheme
);

window.removeEventListener(
"theme-change",
updateProfileTheme
);

};

},[]);


/* LOADING */

if(!profile) return null;


/* UI */

return(

<div
style={{
width:340,
height:"88vh",
background:"#111",
borderRadius:42,
padding:12,
boxShadow:"0 25px 60px rgba(0,0,0,.35)",
position:"sticky",
top:20
}}
>

{/* PHONE SCREEN */}

<div
style={{
width:"100%",
height:"100%",
borderRadius:32,
overflowY:"auto",
overflowX:"hidden",
background:"#fff",
position:"relative"
}}
>

{/* LIVE REAL PUBLIC PROFILE */}

<ThemeRenderer
profile={{
...profile,
theme:
appearance?.theme ||
profile?.theme
}}
appearance={appearance}
blocks={blocks}
/>

</div>

</div>

);

}
