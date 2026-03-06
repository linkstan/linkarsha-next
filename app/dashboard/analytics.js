"use client";
import { useEffect, useState } from "react";
import Chart from "./chart";
import Heatmap from "./heatmap";
import AIInsights from "./ai-insights";
import Funnel from "./funnel";
import GeoMap from "./geo-map";

export default function Analytics({ links = [], clicks = {}, clickEvents = [] }) {

const [liveClicks, setLiveClicks] = useState(clicks || {});

/* update when props change */
useEffect(() => {
setLiveClicks(clicks || {});
}, [clicks]);

/* manual refresh */

async function refreshAnalytics(){

setLiveClicks({ ...clicks });

}

function totalClicks() {
return Object.values(liveClicks || {}).reduce((a, b) => a + b, 0);
}

function topLink() {

if (!links || links.length === 0) return "None";

let max = 0;
let name = "None";

links.forEach(l => {
if ((liveClicks[l.id] || 0) > max) {
max = liveClicks[l.id];
name = l.title;
}
});

return name;
}

/* audience attention score */

function engagementScore(id) {

const total = totalClicks();

if (total === 0) return 0;

return Math.round(((liveClicks[id] || 0) / total) * 100);

}

/* creator growth analytics */

function growthRate(){

const total = totalClicks();

if(total < 10) return "Early stage";
if(total < 50) return "Growing";
if(total < 200) return "Strong traction";

return "Viral growth";

}

/* ADVANCED TRAFFIC SOURCES */

function trafficSources(){

const sources = {
Instagram:0,
TikTok:0,
YouTube:0,
Facebook:0,
Twitter:0,
Direct:0,
Other:{}
};

(clickEvents || []).forEach(e=>{

const ref = (e.referrer || "").toLowerCase();

if(ref.includes("instagram")) sources.Instagram++;

else if(ref.includes("tiktok")) sources.TikTok++;

else if(ref.includes("youtube")) sources.YouTube++;

else if(ref.includes("facebook")) sources.Facebook++;

else if(ref.includes("twitter")) sources.Twitter++;

else if(ref==="") sources.Direct++;

else{

const domain = ref.split("/")[2] || "unknown";

sources.Other[domain] = (sources.Other[domain] || 0) + 1;

}

});

return sources;

}

const sources = trafficSources();

/* clicks by hour */

function clicksByHour(){

const hours = new Array(24).fill(0);

(clickEvents || []).forEach(c=>{
const hour = new Date(c.created_at).getHours();
hours[hour]++;
});

return hours;

}

const hourly = clicksByHour();

return (

<>

{/* refresh button */}

<div className="refresh-bar">

<button onClick={refreshAnalytics} className="refresh-btn">
🔁 Refresh
</button>

</div>

{/* analytics cards */}

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

{/* click graph */}

<div className="card">

<h3>Clicks per Link</h3>

<Chart links={links || []} clicks={liveClicks || {}} />

</div>

{/* clicks by hour */}

<div className="card">

<h3>Clicks by Hour</h3>

<div className="hour-grid">

{hourly.map((v,i)=>(

<div key={i} className="hour">

<div className="bar" style={{height:(v*6)+10}}></div>

<div className="label">{i}</div>

</div>

))}

</div>

</div>

{/* heatmap */}

<Heatmap clickEvents={clickEvents || []} />

{/* traffic sources */}

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

{/* other domains */}

{Object.entries(sources.Other).map(([domain,count])=>(

<div key={domain} className="other-source">

{domain} — {count}

</div>

))}

</div>

{/* AI Creator Insights */}

<AIInsights clickEvents={clickEvents || []} />

{/* Click Funnel */}

<Funnel links={links || []} clicks={liveClicks || {}} />

{/* Geographic Map */}

<GeoMap clickEvents={clickEvents || []} />

{/* attention analytics */}

<div className="card">

<h3>Audience Attention</h3>

{(links || [])
.slice()
.sort((a, b) => (liveClicks[b.id] || 0) - (liveClicks[a.id] || 0))
.map(l => (

<div key={l.id} className="link-row">

<div>
<div>{l.title}</div>
<div className="attention">
{engagementScore(l.id)}% audience attention
</div>
</div>

<div>
{liveClicks[l.id] || 0} clicks
</div>

</div>

))}

</div>

<style jsx>{`

.refresh-bar{
display:flex;
justify-content:flex-end;
margin-bottom:20px;
}

.refresh-btn{
background:#1a1a25;
border:none;
padding:8px 14px;
border-radius:8px;
color:white;
cursor:pointer;
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
transition:all .25s ease;
}

.analytics-card:hover{
transform:translateY(-6px);
border-color:#7c5cff;
}

.glow{
box-shadow:0 0 25px rgba(124,92,255,0.18);
}

.big{
font-size:30px;
margin-top:10px;
font-weight:600;
}

.card{
background:#111;
padding:25px;
border-radius:16px;
margin-bottom:30px;
}

.sources{
display:flex;
gap:20px;
margin-top:10px;
flex-wrap:wrap;
}

.other-source{
margin-top:6px;
opacity:.7;
font-size:13px;
}

.hour-grid{
display:flex;
align-items:flex-end;
gap:6px;
margin-top:20px;
height:120px;
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

.link-row{
display:flex;
justify-content:space-between;
padding:12px;
margin-top:10px;
background:#0f0f15;
border-radius:10px;
}

.attention{
font-size:12px;
opacity:.6;
margin-top:4px;
}

`}</style>

</>

);

}
