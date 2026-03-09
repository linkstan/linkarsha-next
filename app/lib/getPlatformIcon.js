export default function getPlatformIcon(title){

const t = title.toLowerCase();

if(t.includes("instagram")) return "/icons/instagram.png";
if(t.includes("youtube")) return "/icons/youtube.png";
if(t.includes("vk")) return "/icons/vk.png";
if(t.includes("tiktok")) return "/icons/tiktok.png";
if(t.includes("facebook")) return "/icons/facebook.png";
if(t.includes("spotify")) return "/icons/spotify.png";
if(t.includes("soundcloud")) return "/icons/soundcloud.png";
if(t.includes("snapchat")) return "/icons/snapchat.png";
if(t.includes("threads")) return "/icons/threads.png";
if(t.includes("pinterest")) return "/icons/pinterest.png";
if(t.includes("twitch")) return "/icons/twitch.png";
if(t.includes("x")) return "/icons/x.png";
if(t.includes("website")) return "/icons/website.png";

return "/icons/link.png";

}
