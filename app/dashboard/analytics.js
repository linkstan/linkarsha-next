"use client";
import Chart from "./chart";

export default function Analytics({links,clicks}){

function totalClicks(){
return Object.values(clicks).reduce((a,b)=>a+b,0);
}

function topLink(){

let max=0;
let name="None";

links.forEach(l=>{
if((clicks[l.id]||0)>max){
max=clicks[l.id];
name=l.title;
}
});

return name;

}

return(

<>

<div className="analytics-cards">

<div className="analytics-card">
<h4>Total Clicks</h4>
<div className="big">{totalClicks()}</div>
</div>

<div className="analytics-card">
<h4>Top Link</h4>
<div className="big">{topLink()}</div>
</div>

<div className="analytics-card">
<h4>Links Created</h4>
<div className="big">{links.length}</div>
</div>

</div>

<div className="card">

<h3>Click Activity</h3>

<Chart links={links} clicks={clicks}/>

</div>

<div className="card">

<h3>Top Performing Links</h3>

{links
.sort((a,b)=>(clicks[b.id]||0)-(clicks[a.id]||0))
.map(l=>(

<div key={l.id} className="link-row">

<span>{l.title}</span>
<span>{clicks[l.id]||0} clicks</span>

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
}

.big{
font-size:28px;
margin-top:10px;
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
padding:10px;
margin-top:10px;
background:#0f0f15;
border-radius:10px;
}

`}</style>

</>

)

}
