"use client";

export default function AIInsights({clickEvents=[]}){

if(!clickEvents.length) return null;

const hours = new Array(24).fill(0);

clickEvents.forEach(c=>{
const hour = new Date(c.created_at).getHours();
hours[hour]++;
});

const peakHour = hours.indexOf(Math.max(...hours));

const insight = `Your audience clicks most around ${peakHour}:00`;

return(

<div className="card">

<h3>AI Creator Insights</h3>

<div className="insight">

🤖 {insight}

</div>

<style jsx>{`

.card{
background:#111;
padding:25px;
border-radius:16px;
margin-bottom:30px;
}

.insight{
margin-top:10px;
font-size:16px;
opacity:.9;
}

`}</style>

</div>

);

}
