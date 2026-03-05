"use client";

export default function Chart({ clicks }){

const data = Object.values(clicks);

const max = Math.max(...data,1);

return(

<div className="chart">

{data.map((v,i)=>{

const height = (v/max)*120;

return(
<div key={i} className="bar-wrapper">

<div
className="bar"
style={{height:height}}
/>

</div>
)

})}

<style jsx>{`

.chart{
display:flex;
align-items:flex-end;
height:140px;
gap:10px;
padding-top:20px;
}

.bar-wrapper{
flex:1;
display:flex;
align-items:flex-end;
}

.bar{
width:100%;
background:linear-gradient(180deg,#7c5cff,#4b32ff);
border-radius:6px;
transition:all .3s;
}

.bar:hover{
transform:scaleY(1.05);
}

`}</style>

</div>

)

}
