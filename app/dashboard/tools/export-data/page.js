"use client";

import { supabase } from "../../../lib/supabase";

export default function ExportData(){

async function exportCSV(){

const {data:{session}} = await supabase.auth.getSession();

const {data} = await supabase
.from("events")
.select("*")
.eq("user_id",session.user.id);

if(!data){
alert("No data");
return;
}

let csv="date,link,device,city\n";

data.forEach(e=>{
csv+=`${e.created_at},${e.block_id},${e.device},${e.city}\n`;
});

const blob = new Blob([csv],{type:"text/csv"});
const url = URL.createObjectURL(blob);

const a = document.createElement("a");
a.href=url;
a.download="analytics.csv";
a.click();

}

return(

<div style={{maxWidth:600}}>

<h2>Export Analytics Data</h2>

<p style={{opacity:.7}}>
Download your click analytics data.
</p>

<button
onClick={exportCSV}
style={{
marginTop:20,
background:"#00d26a",
border:"none",
padding:"12px 20px",
borderRadius:10
}}
>
Download CSV
</button>

</div>

);

}
