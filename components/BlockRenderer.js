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

if (block.type === "music") {

return (
<div style={{marginTop:20}}>
<iframe
src={data.url}
width="320"
height="80"
frameBorder="0"
allow="autoplay; clipboard-write; encrypted-media"
loading="lazy"
/>
</div>
);

}

if (block.type === "image") {

return (
<img
src={data.url}
style={{
width:"100%",
marginTop:"16px",
borderRadius:"12px"
}}
/>
);

}

if (block.type === "text") {

return (
<p style={{
marginTop:"16px",
lineHeight:"1.6",
opacity:"0.9"
}}>
{data.text}
</p>
);

}

if (block.type === "product") {

return (
<div style={{
background:"#111",
padding:"16px",
marginTop:"16px",
borderRadius:"12px"
}}>
<img
src={data.image}
style={{
width:"100%",
borderRadius:"8px"
}}
/>

<h3 style={{marginTop:10}}>
{data.title}
</h3>

<p style={{opacity:0.7}}>
${data.price}
</p>

<a
href={data.url}
target="_blank"
style={{
display:"block",
background:"#222",
padding:"10px",
marginTop:"10px",
borderRadius:"8px",
textAlign:"center",
textDecoration:"none",
color:"white"
}}
>
Buy
</a>

</div>
);

}

return null;

}
