"use client";

export default function GeoMap({clickEvents=[]}){

const countries = {};

clickEvents.forEach(e=>{

const country = e.country || "Unknown";

countries[country] = (countries[country] || 0) + 1;

});

const sorted = Object.entries(countries)
.sort((a,b)=>b[1]-a[1]);

return(

<div className="card">

<h3>Audience Locations</h3>

{sorted.map(([c,v])=>(

<div key={c} className="row">

<span>{c}</span>

<span>{v}</span>

</div>

))}

<style jsx>{`

.card{
background:var(--card);
padding:25px;
border-radius:16px;
margin-bottom:30px;
border:1px solid var(--border);
color:var(--text);
}

.row{
display:flex;
justify-content:space-between;
margin-top:10px;
opacity:.85;
}

`}</style>

</div>

);

}
