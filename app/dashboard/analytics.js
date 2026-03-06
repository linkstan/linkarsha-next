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

const [startDate,setStartDate] = useState("");
const [endDate,setEndDate] = useState("");

const [loading,setLoading] = useState(false);

/* DATE FILTER */

function filterEvents(){

if(!events.length) return [];

let start=null;
let end=null;

if(startDate && endDate){

start = new Date(startDate);
end = new Date(endDate);

}else{

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
counts[e.link_id]=(counts[e.link_id]||0)+1;
});

setLiveClicks(counts);

}

useEffect(()=>{
buildClickCounts();
},[events,startDate,endDate]);

/* REFRESH ANALYTICS */

async function refreshAnalytics(){

setLoading(true);

const { data } = await supabase
.from("clicks")
.select("*");

if(data){
setEvents(data);
}

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

<input
type="datetime-local"
placeholder="Start date & time"
value={startDate}
onChange={(e)=>setStartDate(e.target.value)}
/>

<input
type="datetime-local"
placeholder="Till date & time"
value={endDate}
onChange={(e)=>setEndDate(e.target.value)}
/>

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

<style jsx>{`

.topbar{
display:flex;
gap:10px;
align-items:center;
margin-bottom:20px;
}

.analytics-cards{
display:flex;
gap:20px;
margin-bottom:30px;
}

.analytics-card{
background:rgba(255,255,255,0.05);
border:1px solid rgba(255,255,255,0.08);
backdrop-filter:blur(14px);
padding:24px;
border-radius:16px;
flex:1;
text-align:center;
}

.big{
font-size:30px;
margin-top:10px;
}

.card{
background:#111;
padding:25px;
border-radius:16px;
margin-bottom:30px;
}

.hour-grid{
display:flex;
align-items:flex-end;
gap:6px;
height:120px;
margin-top:20px;
}

.hour{
flex:1;
display:flex;
flex-direction:column;
align-items:center;
}

.bar{
width:100%;
background:#7c5cff;
border-radius:4px 4px 0 0;
}

.label{
font-size:10px;
opacity:.6;
margin-top:4px;
}

.sources{
display:flex;
gap:20px;
flex-wrap:wrap;
}

.other{
margin-top:6px;
font-size:13px;
opacity:.7;
}

`}</style>

</>

);

}
