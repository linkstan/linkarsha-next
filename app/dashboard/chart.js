"use client";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
CartesianGrid
} from "recharts";

export default function Chart({ links, clicks }) {

const data = links.map(link => ({
name: link.title,
clicks: clicks[link.id] || 0
}));

return (

<div className="chart-wrapper">

<ResponsiveContainer width="100%" height={260}>

<BarChart data={data}>

<CartesianGrid strokeDasharray="3 3" stroke="#1c1c25"/>

<XAxis
dataKey="name"
stroke="#aaa"
/>

<YAxis stroke="#aaa"/>

<Tooltip
contentStyle={{
background:"#111",
border:"1px solid #333",
borderRadius:8
}}
/>

<Bar
dataKey="clicks"
fill="#7c5cff"
radius={[6,6,0,0]}
/>

</BarChart>

</ResponsiveContainer>

<style jsx>{`

.chart-wrapper{
background:#111;
padding:25px;
border-radius:16px;
margin-bottom:30px;
}

`}</style>

</div>

)

}
