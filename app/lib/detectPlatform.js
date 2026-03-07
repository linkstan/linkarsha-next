export function detectPlatform(url){

const u = url.toLowerCase();

if(u.includes("instagram")) return "Instagram";
if(u.includes("youtube")) return "YouTube";
if(u.includes("vk.com")) return "VK";
if(u.includes("tiktok")) return "TikTok";
if(u.includes("facebook")) return "Facebook";
if(u.includes("twitter") || u.includes("x.com")) return "X";
if(u.includes("pinterest")) return "Pinterest";
if(u.includes("snapchat")) return "Snapchat";
if(u.includes("twitch")) return "Twitch";
if(u.includes("spotify")) return "Spotify";
if(u.includes("soundcloud")) return "SoundCloud";
if(u.includes("threads")) return "Threads";
if(u.includes("whatsapp")) return "WhatsApp";

return "Website";

}
