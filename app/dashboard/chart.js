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

export default function Chart({ links = [], clicks = {} }) {

if (!links || links.length === 0) {
return (
<div style={{
background:"#111",
padding:"25px",
borderRadius:"16px"
}}>
No analytics data yet
</div>
);
}

const data = links.map(link => ({
name: link.title || "Link",
clicks: clicks?.[link.id] || 0
}));

return (

<div style={{
background:"rgba(255,255,255,0.04)",
border:"1px solid rgba(255,255,255,0.08)",
borderRadius:"16px",
padding:"25px",
backdropFilter:"blur(10px)"
}}>

<h3 style={{marginBottom:20}}>
Clicks per Link
</h3>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={data}>

<CartesianGrid strokeDasharray="3 3" stroke="#1c1c25"/>

<XAxis dataKey="name" stroke="#aaa"/>

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

</div>

);

}
