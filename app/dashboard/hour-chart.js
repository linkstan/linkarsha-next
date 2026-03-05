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

export default function HourChart({ clickEvents = [] }) {

const hours = new Array(24).fill(0);

clickEvents.forEach(c=>{
const hour = new Date(c.created_at).getHours();
hours[hour]++;
});

const data = hours.map((v,i)=>({
hour: i+":00",
clicks: v
}));

return(

<div className="card">

<h3>Clicks by Hour</h3>

<ResponsiveContainer width="100%" height={280}>

<BarChart data={data}>

<CartesianGrid strokeDasharray="3 3" stroke="#1c1c25"/>

<XAxis dataKey="hour" stroke="#aaa"/>

<YAxis stroke="#aaa"/>

<Tooltip/>

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
