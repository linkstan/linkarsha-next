export default function BlockRenderer({ block }) {

const data = block.data_json || {};
const url = data.url || "";

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

const title = data.title || "Website";

/* YOUTUBE EMBED */

if(url.includes("youtube.com") || url.includes("youtu.be")){

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

/* SPOTIFY EMBED */

if(url.includes("spotify.com")){

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

/* NORMAL LINK */

if (block.type === "link") {

const icon = icons[title];

return (

<a
href={`/api/click/${block.id}`}
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
height:22
}}
/>

)}

<span>{title}</span>

</a>

);

}

return null;

}
