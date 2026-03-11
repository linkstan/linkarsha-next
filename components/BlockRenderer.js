export default function BlockRenderer({ block }) {

const data = block.data_json || {};
const url = data.url || "";
const title = data.title || "Website";

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

const icon = icons[title];

/* =========================
   YOUTUBE EMBED
========================= */

if(url.includes("youtube.com") || url.includes("youtu.be")){

let videoId="";

if(url.includes("watch?v=")){
videoId=url.split("watch?v=")[1].split("&")[0];
}

if(url.includes("youtu.be/")){
videoId=url.split("youtu.be/")[1];
}

return (

<div style={{marginTop:16}}>

<iframe
width="100%"
height="200"
src={`https://www.youtube.com/embed/${videoId}`}
title="YouTube video"
loading="lazy"
referrerPolicy="no-referrer"
allowFullScreen
style={{borderRadius:12}}
/>

</div>

);

}

/* =========================
   SPOTIFY EMBED
========================= */

if(url.includes("spotify.com")){

let embedUrl=url.replace("open.spotify.com","open.spotify.com/embed");

return (

<div style={{marginTop:16}}>

<iframe
src={embedUrl}
width="100%"
height="80"
loading="lazy"
style={{borderRadius:12}}
/>

</div>

);

}

/* =========================
   INSTAGRAM PROFILE
========================= */

if(url.includes("instagram.com")){

return (

<a
href={url}
target="_blank"
rel="noopener noreferrer"
style={{
display:"flex",
alignItems:"center",
gap:12,
background:"#1a1a25",
padding:14,
borderRadius:12,
marginTop:12,
textDecoration:"none",
color:"white",
fontWeight:600
}}
>

<img
src="/icons/instagram.png"
style={{width:22,height:22}}
/>

Open Instagram

</a>

);

}

/* =========================
   WEBSITE PREVIEW CARD
========================= */

if(url.startsWith("http")){

let domain="";

try{
domain = new URL(url).hostname.replace("www.","");
}catch(e){}

return (

<a
href={`/api/click/${block.id}`}
target="_blank"
rel="noopener noreferrer"
style={{
display:"block",
background:"#1a1a25",
borderRadius:12,
marginTop:12,
overflow:"hidden",
textDecoration:"none",
color:"white"
}}
>

<div style={{
padding:14,
display:"flex",
alignItems:"center",
gap:12
}}>

{icon && (
<img
src={icon}
style={{width:22,height:22}}
/>
)}

<div>

<div style={{fontWeight:600}}>
{title}
</div>

<div style={{
opacity:.6,
fontSize:12
}}>
{domain}
</div>

</div>

</div>

</a>

);

}

/* =========================
   IMAGE BLOCK
========================= */

if (block.type === "image") {

return (
<img
src={data.url}
style={{
width:"100%",
marginTop:16,
borderRadius:12
}}
/>
);

}

/* =========================
   TEXT BLOCK
========================= */

if (block.type === "text") {

return (
<p style={{
marginTop:16,
lineHeight:1.6,
opacity:.9
}}>
{data.text}
</p>
);

}

return null;

}
