export default function BlockRenderer({ block }) {

const data = block?.data_json || {};
const url = data?.url || "";

const icons = {
Instagram:"/icons/instagram.png",
Facebook:"/icons/facebook.png",
VK:"/icons/vk.png",
YouTube:"/icons/youtube.png",
TikTok:"/icons/tiktok.png",
WhatsApp:"/icons/whatsapp.png",
Website:"/icons/website.png",
X:"/icons/x.png",
Pinterest:"/icons/pinterest.png",
Threads:"/icons/threads.png",
Snapchat:"/icons/snapchat.png",
Twitch:"/icons/twitch.png",
SoundCloud:"/icons/soundcloud.png",
Spotify:"/icons/spotify.png"
};

const title = data?.title || "Website";

/* =========================
   YOUTUBE EMBED
========================= */

if(url && (url.includes("youtube.com") || url.includes("youtu.be"))){

let videoId="";

if(url.includes("watch?v=")){
videoId=url.split("watch?v=")[1].split("&")[0];
}

if(url.includes("youtu.be/")){
videoId=url.split("youtu.be/")[1];
}

return (

<div style={{marginTop:"16px"}}>

<iframe
width="100%"
height="200"
src={`https://www.youtube.com/embed/${videoId}`}
title="YouTube video"
loading="lazy"
allowFullScreen
style={{borderRadius:"12px"}}
/>

</div>

);

}

/* =========================
   SPOTIFY EMBED
========================= */

if(url && url.includes("spotify.com")){

let embedUrl=url.replace("open.spotify.com","open.spotify.com/embed");

return (

<div style={{marginTop:"16px"}}>

<iframe
src={embedUrl}
width="100%"
height="80"
loading="lazy"
style={{borderRadius:"12px"}}
/>

</div>

);

}

/* =========================
   TWITTER / X EMBED
========================= */

if(url && (url.includes("twitter.com") || url.includes("x.com"))){

return (

<div style={{
marginTop:"16px",
background:"#1a1a25",
padding:"16px",
borderRadius:"12px"
}}>

<a
href={url}
target="_blank"
rel="noopener noreferrer"
style={{
color:"white",
textDecoration:"none"
}}
>

View Tweet

</a>

</div>

);

}

/* =========================
   NORMAL LINK BUTTON
========================= */

if (block?.type === "link") {

const icon = icons[title];
const blockId = block?.id;

if(!blockId || !url){
return null;
}

return (

<a
href={`/api/click/${blockId}`}
target="_blank"
rel="noopener noreferrer"
style={{
display:"flex",
alignItems:"center",
gap:"12px",
background:"#1a1a25",
padding:"14px",
marginTop:"12px",
borderRadius:"12px",
textDecoration:"none",
color:"white",
fontWeight:"600"
}}
>

{icon && (

<img
src={icon}
style={{
width:22,
height:22,
objectFit:"contain"
}}
/>

)}

<span>{title}</span>

</a>

);

}

/* =========================
   IMAGE BLOCK
========================= */

if (block?.type === "image") {

return (
<img
src={data.url}
loading="lazy"
style={{
width:"100%",
marginTop:"16px",
borderRadius:"12px"
}}
/>
);

}

/* =========================
   TEXT BLOCK
========================= */

if (block?.type === "text") {

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

return null;

}
