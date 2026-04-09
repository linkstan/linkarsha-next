export function detectPlatform(url){

const u = url.toLowerCase();

if(u.includes("instagram.com")) return "instagram";
if(u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
if(u.includes("tiktok.com")) return "tiktok";
if(u.includes("facebook.com")) return "facebook";
if(u.includes("vk.com")) return "vk";
if(u.includes("twitter.com") || u.includes("x.com")) return "twitter";
if(u.includes("snapchat.com")) return "snapchat";
if(u.includes("pinterest.com")) return "pinterest";
if(u.includes("twitch.tv")) return "twitch";
if(u.includes("reddit.com")) return "reddit";
if(u.includes("threads.net")) return "threads";
if(u.includes("discord.com")) return "discord";
if(u.includes("github.com")) return "github";
if(u.includes("medium.com")) return "medium";
if(u.includes("tumblr.com")) return "tumblr";
if(u.includes("linkedin.com")) return "linkedin";
if(u.includes("t.me")) return "telegram";
if(u.includes("wa.me") || u.includes("whatsapp")) return "whatsapp";
if(u.includes("onlyfans.com")) return "onlyfans";
if(u.includes("tinder.com")) return "tinder";
if(u.includes("bumble.com")) return "bumble";
if(u.includes("kooapp.com")) return "koo";
if(u.includes("ok.ru")) return "ok";
if(u.includes("sharechat.com")) return "sharechat";
if(u.includes("qq.com")) return "qq";
if(u.includes("weibo.com")) return "weibo";
if(u.includes("douyin.com")) return "douyin";
if(u.includes("wordpress.com")) return "wordpress";
if(u.includes("signal.org")) return "signal";
if(u.includes("dailymotion.com")) return "dailymotion";

if(u.includes("@")) return "email";
if(u.includes("http")) return "website";

return null;

}
