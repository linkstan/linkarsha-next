export default function BlockRenderer({ block }) {

const data = block.data_json || {};

if (block.type === "link") {

return (
<a
href={data.url}
target="_blank"
rel="noopener noreferrer"
style={{
display:"block",
background:"#111",
padding:"16px",
marginTop:"12px",
borderRadius:"12px",
textAlign:"center",
textDecoration:"none",
color:"white",
fontWeight:"600"
}}
>
{data.title}
</a>
);

}

if (block.type === "video") {

return (
<div style={{marginTop:20}}>
<iframe
width="320"
height="180"
src={data.url}
title="video"
frameBorder="0"
allowFullScreen
/>
</div>
);

}

return null;

}
