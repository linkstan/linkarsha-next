"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../lib/supabase";
import Analytics from "../analytics";

export default function AnalyticsPage(){

const [links,setLinks]=useState([]);
const [clicks,setClicks]=useState({});
const [events,setEvents]=useState([]);

useEffect(()=>{
init();
},[]);

async function init(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const uid=session.user.id;

/* LOAD LINKS */

const {data:blocks} = await supabase
.from("blocks")
.select("*")
.eq("user_id",uid)
.eq("type","link")
.order("position",{ascending:true});

if(blocks){

const linksData = blocks.map(b=>({
id:b.id,
title:b.data_json?.title,
url:b.data_json?.url
}));

setLinks(linksData);

}

/* LOAD EVENTS */

loadEvents(uid);

/* REALTIME LISTENER */

supabase
.channel("events")
.on(
"postgres_changes",
{
event:"INSERT",
schema:"public",
table:"events"
},
payload=>{

if(payload.new.user_id===uid){

loadEvents(uid);

}

}
)
.subscribe();

}

async function loadEvents(uid){

const {data:eventData} = await supabase
.from("events")
.select("*")
.eq("user_id",uid)
.eq("event_type","click");

if(!eventData) return;

setEvents(eventData);

/* COUNT CLICKS PER LINK */

const counts={};

eventData.forEach(e=>{

if(!e.block_id) return;

counts[e.block_id]=(counts[e.block_id]||0)+1;

});

setClicks(counts);

}

return(

<Analytics
links={links}
clicks={clicks}
clickEvents={events}
/>

);

}
