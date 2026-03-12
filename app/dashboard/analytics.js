"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import Chart from "./chart";
import Heatmap from "./heatmap";
import AIInsights from "./ai-insights";
import Funnel from "./funnel";
import GeoMap from "./geo-map";

export default function Analytics({ links = [], clicks = {}, clickEvents = [] }) {

const [liveClicks,setLiveClicks] = useState(clicks || {});
const [events,setEvents] = useState(clickEvents || []);

const [mode,setMode] = useState("7d");

const [startDate,setStartDate] = useState("");
const [endDate,setEndDate] = useState("");

const [loading,setLoading] = useState(false);


/* LOAD EVENTS WHEN PAGE OPENS */

useEffect(()=>{
loadEvents();
},[]);

async function loadEvents(){

const { data } = await supabase
.from("events")
.select("*")
.eq("event_type","click");

if(data){
setEvents(data);
}

}


/* DATE FILTER */

function filterEvents(){

if(!events.length) return [];

let start=null;
let end=new Date();

if(mode==="today"){
start = new Date();
start.setHours(0,0,0,0);
}

else if(mode==="yesterday"){
start = new Date();
start.setDate(start.getDate()-1);
start.setHours(0,0,0,0);

end = new Date();
end.setDate(end.getDate()-1);
end.setHours(23,59,59,999);
}

else if(mode==="7d"){
start = new Date();
start.setDate(start.getDate()-7);
}

else if(mode==="30d"){
start = new Date();
start.setDate(start.getDate()-30);
}

else if(mode==="custom" && startDate && endDate){
start = new Date(startDate);
end = new Date(endDate);
}

else{
return events;
}

return events.filter(e=>{
const t = new Date(e.created_at);
return t >= start && t <= end;
});

}

const filtered = filterEvents();


/* CLICK COUNTS */

function buildClickCounts(){

const counts={};

links.forEach(l=>counts[l.id]=0);

filtered.forEach(e=>{
counts[e.block_id]=(counts[e.block_id]||0)+1;
});

setLiveClicks(counts);

}

useEffect(()=>{
buildClickCounts();
},[events,mode,startDate,endDate]);


/* REFRESH ANALYTICS */

async function refreshAnalytics(){

setLoading(true);

await loadEvents();

setMode("today");

setLoading(false);

}


/* TOTAL CLICKS */

function totalClicks(){
return Object.values(liveClicks).reduce((a,b)=>a+b,0);
}


/* TOP LINK */

function topLink(){

let max=0;
let name="None";

links.forEach(l=>{
if((liveClicks[l.id]||0)>max){
max=liveClicks[l.id];
name=l.title;
}
});

return name;

}


/* TRAFFIC SOURCES */

function trafficSources(){

const sources={
Instagram:0,
TikTok:0,
YouTube:0,
Facebook:0,
Twitter:0,
Direct:0,
Other:{}
};

filtered.forEach(e=>{

const ref=(e.referrer||"").toLowerCase();

if(ref.includes("instagram")) sources.Instagram++;
else if(ref.includes("tiktok")) sources.TikTok++;
else if(ref.includes("youtube")) sources.YouTube++;
else if(ref.includes("facebook")) sources.Facebook++;
else if(ref.includes("twitter")) sources.Twitter++;
else if(ref==="") sources.Direct++;

else{

const domain=ref.split("/")[2] || "unknown";
sources.Other[domain]=(sources.Other[domain]||0)+1;

}

});

return sources;

}

const sources = trafficSources();


/* CLICKS BY HOUR */

function clicksByHour(){

const hours = new Array(24).fill(0);

filtered.forEach(c=>{
const hour = new Date(c.created_at).getHours();
hours[hour]++;
});

return hours;

}

const hourly = clicksByHour();


/* GROWTH */

function growthRate(){

const total = totalClicks();

if(total<10) return "Early stage";
if(total<50) return "Growing";
if(total<200) return "Strong traction";

return "Viral growth";

}


return(

<>

<div className="topbar">

<div className="filters">

<button onClick={()=>setMode("today")}>Today</button>
<button onClick={()=>setMode("yesterday")}>Yesterday</button>
<button onClick={()=>setMode("7d")}>7 Days</button>
<button onClick={()=>setMode("30d")}>30 Days</button>
<button onClick={()=>setMode("custom")}>Custom</button>

</div>

{mode==="custom" && (

<div className="custom">

<input
type="datetime-local"
value={startDate}
onChange={(e)=>setStartDate(e.target.value)}
/>

<input
type="datetime-local"
value={endDate}
onChange={(e)=>setEndDate(e.target.value)}
/>

</div>

)}

<button onClick={refreshAnalytics}>
{loading ? "Refreshing..." : "🔁 Refresh"}
</button>

</div>

<div className="analytics-cards">

<div className="analytics-card glow">
<h4>Total Clicks</h4>
<div className="big">{totalClicks()}</div>
</div>

<div className="analytics-card glow">
<h4>Top Link</h4>
<div className="big">{topLink()}</div>
</div>

<div className="analytics-card glow">
<h4>Growth</h4>
<div className="big">{growthRate()}</div>
</div>

</div>

<div className="card">
<h3>Clicks per Link</h3>
<Chart links={links} clicks={liveClicks}/>
</div>

<div className="card">

<h3>Clicks by Hour</h3>

<div className="hour-grid">

{hourly.map((v,i)=>(

<div key={i} className="hour">

<div
className="bar"
style={{height:(v*6)+10}}
/>

<div className="label">{i}</div>

</div>

))}

</div>

</div>

<Heatmap clickEvents={filtered}/>

<div className="card">

<h3>Traffic Sources</h3>

<div className="sources">

<div>Instagram: {sources.Instagram}</div>
<div>TikTok: {sources.TikTok}</div>
<div>YouTube: {sources.YouTube}</div>
<div>Facebook: {sources.Facebook}</div>
<div>Twitter: {sources.Twitter}</div>
<div>Direct: {sources.Direct}</div>

</div>

{Object.entries(sources.Other).map(([d,v])=>(

<div key={d} className="other">
{d} — {v}
</div>

))}

</div>

<AIInsights clickEvents={filtered}/>
<Funnel links={links} clicks={liveClicks}/>
<GeoMap clickEvents={filtered}/>

</>

);

}
