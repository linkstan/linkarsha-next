"use client";

export default function Funnel({links=[],clicks={}}){

const total = Object.values(clicks).reduce((a,b)=>a+b,0);

return(

<div className="card">

<h3>Click Funnel</h3>

{links.map(l=>{

const c = clicks[l.id] || 0;

const percent = total ? Math.round((c/total)*100) : 0;

return(

<div key={l.id} className="funnel-row">

<div className="label">{l.title}</div>

<div className="bar-wrap">

<div
className="bar"
style={{width:percent+"%"}}
/>

</div>

<div className="value">
{percent}%
</div>

</div>

);

})}

<style jsx>{`

.card{
background:var(--card);
padding:25px;
border-radius:16px;
margin-bottom:30px;
border:1px solid var(--border);
color:var(--text);
}

.funnel-row{
display:flex;
align-items:center;
margin-top:12px;
gap:10px;
}

.label{
width:120px;
font-size:14px;
}

.bar-wrap{
flex:1;
background:var(--bg);
border-radius:6px;
overflow:hidden;
}

.bar{
height:12px;
background:#7c5cff;
}

.value{
width:40px;
font-size:12px;
opacity:.7;
}

`}</style>

</div>

);

}
