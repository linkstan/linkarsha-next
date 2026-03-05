"use client";

export default function Heatmap({clickEvents}){

const hours = new Array(24).fill(0);

clickEvents.forEach(c=>{
const hour = new Date(c.created_at).getHours();
hours[hour]++;
});

return(

<div className="card">

<h3>Audience Activity</h3>

<div className="grid">

{hours.map((v,i)=>(

<div
key={i}
className="cell"
style={{
opacity:0.2 + v*0.2
}}
>

{i}

</div>

))}

</div>

<style jsx>{`

.grid{
display:grid;
grid-template-columns:repeat(12,1fr);
gap:6px;
margin-top:20px;
}

.cell{
background:#7c5cff;
height:32px;
border-radius:6px;
display:flex;
align-items:center;
justify-content:center;
font-size:11px;
}

.card{
background:#111;
padding:25px;
border-radius:16px;
margin-bottom:30px;
}

`}</style>

</div>

)

}
