"use client";
import { useEffect,useState } from "react";
import Chart from "./chart";

export default function Analytics({links,clicks}){

const [liveClicks,setLiveClicks]=useState(clicks);

useEffect(()=>{
setLiveClicks(clicks);
},[clicks]);

function totalClicks(){
return Object.values(liveClicks).reduce((a,b)=>a+b,0);
}

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

/* attention score */

function attentionScore(id){

const total = totalClicks();

if(total===0) return 0;

return Math.round(((liveClicks[id]||0)/total)*100);

}

return(

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

<div className="big">{links.length}</div>

</div>

</div>

{/* click graph */}

<div className="card">

<h3>Click Activity</h3>

<Chart links={links} clicks={liveClicks}/>

</div>

{/* attention analytics */}

<div className="card">

<h3>Audience Attention</h3>

{[...links]
.sort((a,b)=>(liveClicks[b.id]||0)-(liveClicks[a.id]||0))
.map(l=>(

<div key={l.id} className="link-row">

<div>

<div>{l.title}</div>

<div className="attention">

{attentionScore(l.id)}% audience attention

</div>

</div>

<div>

{liveClicks[l.id]||0} clicks

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
background:rgba(255,255,255,0.04);
backdrop-filter:blur(10px);
padding:20px;
border-radius:14px;
flex:1;
text-align:center;
border:1px solid rgba(255,255,255,0.05);
transition:all .25s;
}

.analytics-card:hover{
transform:translateY(-5px);
}

.glow{
box-shadow:0 0 20px rgba(124,92,255,0.15);
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

)

}
