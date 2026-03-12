"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import Chart from "./chart";
import Heatmap from "./heatmap";
import AIInsights from "./ai-insights";
import Funnel from "./funnel";
import GeoMap from "./geo-map";

export default function Analytics({ links=[] }){

const [events,setEvents]=useState([]);
const [liveVisitors,setLiveVisitors]=useState(0);

/* LOAD EVENTS */

useEffect(()=>{

loadEvents();

const channel=supabase
.channel("events")
.on(
"postgres_changes",
{
event:"INSERT",
schema:"public",
table:"events"
},
payload=>{
setEvents(prev=>[payload.new,...prev]);
}
)
.subscribe();

return ()=>{
supabase.removeChannel(channel);
};

},[]);

async function loadEvents(){

const {data}=await supabase
.from("events")
.select("*")
.eq("event_type","click");

if(data) setEvents(data);

}

/* LIVE VISITORS */

useEffect(()=>{
setLiveVisitors(events.length);
},[events]);

/* CLICK COUNTS */

const clickCounts={};

links.forEach(l=>clickCounts[l.id]=0);

events.forEach(e=>{
clickCounts[e.block_id]=(clickCounts[e.block_id]||0)+1;
});

/* TOTAL CLICKS */

const totalClicks=Object.values(clickCounts).reduce((a,b)=>a+b,0);

/* TOP LINK */

let topLink="None";
let max=0;

links.forEach(l=>{
if((clickCounts[l.id]||0)>max){
max=clickCounts[l.id];
topLink=l.title;
}
});

/* DEVICES */

const devices={mobile:0,desktop:0,tablet:0};

events.forEach(e=>{
devices[e.device]=(devices[e.device]||0)+1;
});

/* BROWSERS */

const browsers={};

events.forEach(e=>{
browsers[e.browser]=(browsers[e.browser]||0)+1;
});

/* OS */

const systems={};

events.forEach(e=>{
systems[e.os]=(systems[e.os]||0)+1;
});

return(

<>

<div className="analytics-cards">

<div className="analytics-card">
<h4>Total Clicks</h4>
<div className="big">{totalClicks}</div>
</div>

<div className="analytics-card">
<h4>Top Link</h4>
<div className="big">{topLink}</div>
</div>

</div>

<div className="card">
<h3>Live Visitors</h3>
<div style={{fontSize:28,fontWeight:600}}>
{liveVisitors}
</div>
</div>

<div className="card">
<h3>Clicks per Link</h3>
<Chart links={links} clicks={clickCounts}/>
</div>

<div className="card">
<h3>Activity Heatmap</h3>
<Heatmap clickEvents={events}/>
</div>

<div className="card">
<h3>Devices</h3>
<div>Mobile: {devices.mobile}</div>
<div>Desktop: {devices.desktop}</div>
<div>Tablet: {devices.tablet}</div>
</div>

<div className="card">
<h3>Browsers</h3>
{Object.entries(browsers).map(([b,v])=>(
<div key={b}>{b} — {v}</div>
))}
</div>

<div className="card">
<h3>Operating Systems</h3>
{Object.entries(systems).map(([o,v])=>(
<div key={o}>{o} — {v}</div>
))}
</div>

<Funnel links={links} clicks={clickCounts}/>
<AIInsights clickEvents={events}/>
<GeoMap clickEvents={events}/>

</>

);

}
