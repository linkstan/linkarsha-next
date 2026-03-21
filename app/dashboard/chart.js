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
background:"var(--card)",
padding:"25px",
borderRadius:"16px",
border:"1px solid var(--border)",
color:"var(--text)"
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
background:"var(--card)",
border:"1px solid var(--border)",
borderRadius:"16px",
padding:"25px",
color:"var(--text)"
}}>

<h3 style={{marginBottom:20}}>
Clicks per Link
</h3>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={data}>

<CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>

<XAxis dataKey="name" stroke="var(--text)"/>

<YAxis stroke="var(--text)"/>

<Tooltip
contentStyle={{
background:"var(--card)",
border:"1px solid var(--border)",
borderRadius:8,
color:"var(--text)"
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
