"use client";

export default function Insights({ links = [], clicks = {} }) {

let max = 0;
let best = null;

links.forEach(l=>{
const c = clicks[l.id] || 0;

if(c > max){
max = c;
best = l;
}
});

if(!best) return null;

return(

<div className="card">

<h3>Creator Insights</h3>

<div className="insight">

🔥 Most Engaging Link

</div>

<div className="value">

{best.title} — {max} clicks

</div>

<style jsx>{`

.insight{
opacity:.7;
margin-top:10px;
}

.value{
font-size:20px;
margin-top:6px;
font-weight:600;
}

`}</style>

</div>

);

}
