export function detectPlatform(url){

const u = url.toLowerCase();

if(u.includes("instagram.com")) return "Instagram";
if(u.includes("youtube.com") || u.includes("youtu.be")) return "YouTube";
if(u.includes("tiktok.com")) return "TikTok";
if(u.includes("facebook.com")) return "Facebook";
if(u.includes("vk.com")) return "VK";
if(u.includes("twitter.com") || u.includes("x.com")) return "X";
if(u.includes("snapchat.com")) return "Snapchat";
if(u.includes("spotify.com")) return "Spotify";
if(u.includes("soundcloud.com")) return "SoundCloud";
if(u.includes("pinterest.com")) return "Pinterest";
if(u.includes("twitch.tv")) return "Twitch";

return "Website";

}
