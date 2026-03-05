"use client";

import {
ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid
} from "recharts";

export default function Chart({links, clicks}){

const data = links.map(l => ({
name: l.title,
clicks: clicks[l.id] || 0
}));

return(

<div className="chart-wrapper">

<h3>Clicks per Link</h3>

<ResponsiveContainer width="100%" height={320}>

<BarChart
data={data}
margin={{top:20,right:20,left:0,bottom:5}}
>

<CartesianGrid strokeDasharray="3 3" stroke="#1e1e28"/>

<XAxis
dataKey="name"
stroke="#aaa"
/>

<YAxis stroke="#aaa"/>

<Tooltip
cursor={{fill:"rgba(255,255,255,0.05)"}}
contentStyle={{
background:"#0f0f15",
border:"1px solid #2a2a35",
borderRadius:10
}}
/>

<Bar
dataKey="clicks"
fill="#7c5cff"
radius={[6,6,0,0]}
animationDuration={900}
/>

</BarChart>

</ResponsiveContainer>

<style jsx>{`

.chart-wrapper{
background:rgba(255,255,255,0.04);
border:1px solid rgba(255,255,255,0.08);
backdrop-filter:blur(12px);
padding:30px;
border-radius:18px;
margin-bottom:30px;
}

h3{
margin-bottom:20px;
}

`}</style>

</div>

);

}
