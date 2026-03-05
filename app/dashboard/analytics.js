"use client";
import { useEffect, useState } from "react";
import Chart from "./chart";

export default function Analytics({ links = [], clicks = {} }) {

const [liveClicks, setLiveClicks] = useState(clicks || {});

/* update when props change */
useEffect(() => {
setLiveClicks(clicks || {});
}, [clicks]);

/* live refresh every 15 seconds */
useEffect(() => {
const interval = setInterval(() => {
location.reload();
}, 15000);

return () => clearInterval(interval);
}, []);

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

/* creator intelligence */

function creatorInsight(){

if(!links || links.length === 0) return null;

let max = 0;
let best = null;

links.forEach(l=>{
const c = liveClicks[l.id] || 0;

if(c > max){
max = c;
best = l;
}
});

if(!best) return null;

return {
title: best.title,
clicks: max,
score: engagementScore(best.id)
};

}

const insight = creatorInsight();

return (

<>

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
<h4>Links Created</h4>
<div className="big">{links?.length || 0}</div>
</div>

</div>

{/* click graph */}

<div className="card">

<h3>Click Activity</h3>

<Chart links={links || []} clicks={liveClicks || {}} />

</div>

{/* creator intelligence panel */}

{insight && (

<div className="card intelligence">

<h3>Creator Intelligence</h3>

<div className="insight-row">

<div className="insight-title">
🔥 Most Engaging Link
</div>

<div className="insight-value">
{insight.title}
</div>

</div>

<div className="insight-row">

<div>
{insight.clicks} clicks
</div>

<div className="score">
{insight.score}% audience attention
</div>

</div>

</div>

)}

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
position:relative;
overflow:hidden;
}

.analytics-card:hover{
transform:translateY(-6px);
border-color:#7c5cff;
}

.analytics-card::before{
content:"";
position:absolute;
top:0;
left:0;
right:0;
height:2px;
background:linear-gradient(90deg,#7c5cff,#9f7cff,#7c5cff);
opacity:.8;
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

.intelligence{
border:1px solid rgba(124,92,255,0.25);
box-shadow:0 0 30px rgba(124,92,255,0.15);
}

.insight-row{
display:flex;
justify-content:space-between;
margin-top:10px;
}

.insight-title{
opacity:.7;
}

.insight-value{
font-size:18px;
font-weight:600;
}

.score{
color:#7c5cff;
font-weight:600;
}

.link-row{
display:flex;
justify-content:space-between;
align-items:center;
padding:12px;
margin-top:10px;
background:#0f0f15;
border-radius:10px;
transition:.2s;
}

.link-row:hover{
background:#15151f;
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
