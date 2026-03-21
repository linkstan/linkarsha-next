"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../lib/supabase";
import Analytics from "../analytics";

export default function AnalyticsPage(){

const [links,setLinks] = useState([]);
const [clicks,setClicks] = useState({});
const [clickEvents,setClickEvents] = useState([]);

useEffect(()=>{
init();
},[]);

async function init(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const uid = session.user.id;

/* LOAD LINKS */

const {data:blocks} = await supabase
.from("blocks")
.select("*")
.eq("user_id",uid)
.eq("type","link")
.order("position",{ascending:true});

if(blocks){

const linkList = blocks.map(b=>({
id:b.id,
title:b.data_json?.title || "Link",
url:b.data_json?.url
}));

setLinks(linkList);

}

/* LOAD EVENTS */

loadEvents(uid);

/* REALTIME UPDATES */

supabase
.channel("events")
.on(
"postgres_changes",
{event:"INSERT",schema:"public",table:"events"},
payload=>{
if(payload.new.user_id===uid){
loadEvents(uid);
}
}
)
.subscribe();

}

async function loadEvents(uid){

const {data} = await supabase
.from("events")
.select("*")
.eq("user_id",uid)
.eq("event_type","click");

if(!data) return;

setClickEvents(data);

/* COUNT CLICKS PER LINK */

const counts={};

data.forEach(e=>{
counts[e.block_id]=(counts[e.block_id]||0)+1;
});

setClicks(counts);

}

return(

<div style={{
background:"var(--bg)",
color:"var(--text)"
}}>

<Analytics
links={links}
clicks={clicks}
clickEvents={clickEvents}
/>

</div>

);

}
