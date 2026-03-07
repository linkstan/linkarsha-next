"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../lib/supabase";
import Analytics from "../analytics";

export default function AnalyticsPage(){

const [links,setLinks] = useState([]);
const [clicks,setClicks] = useState({});
const [events,setEvents] = useState([]);

useEffect(()=>{
init();
},[]);

async function init(){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const uid = session.user.id;

/* load links */

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

/* load click events */

const {data:clickEvents} = await supabase
.from("clicks")
.select("*")
.eq("user_id",uid);

if(clickEvents){

setEvents(clickEvents);

const counts={};

clickEvents.forEach(c=>{
counts[c.link_id]=(counts[c.link_id]||0)+1;
});

setClicks(counts);

}

}

return(

<Analytics
links={links}
clicks={clicks}
clickEvents={events}
/>

);

}
