export default function BlockRenderer({ block }) {

const data = block.data_json || {};

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

if (block.type === "link") {

const icon = icons[data.title];

return (
<a
href={data.url}
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

<span>{data.title}</span>

</a>
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

return null;

}
