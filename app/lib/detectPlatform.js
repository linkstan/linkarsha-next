export function detectPlatform(url){

if(!url) return null;

const u = url.toLowerCase();

/* PLATFORM DETECTION */

if(u.includes("instagram")) return "instagram";
if(u.includes("facebook")) return "facebook";
if(u.includes("tiktok")) return "tiktok";
if(u.includes("youtube") || u.includes("youtu.be")) return "youtube";
if(u.includes("twitter") || u.includes("x.com")) return "twitter";
if(u.includes("snapchat")) return "snapchat";
if(u.includes("vk.com")) return "vk";
if(u.includes("pinterest")) return "pinterest";
if(u.includes("linkedin")) return "linkedin";
if(u.includes("telegram")) return "telegram";
if(u.includes("whatsapp")) return "whatsapp";
if(u.includes("onlyfans")) return "onlyfans";
if(u.includes("discord")) return "discord";
if(u.includes("reddit")) return "reddit";
if(u.includes("threads")) return "threads";
if(u.includes("twitch")) return "twitch";
if(u.includes("tumblr")) return "tumblr";
if(u.includes("medium")) return "medium";
if(u.includes("github")) return "github";
if(u.includes("koo")) return "koo";
if(u.includes("ok.ru")) return "ok";
if(u.includes("sharechat")) return "sharechat";
if(u.includes("qq.com")) return "qq";
if(u.includes("weibo")) return "weibo";
if(u.includes("douyin")) return "douyin";
if(u.includes("wordpress")) return "wordpress";
if(u.includes("signal")) return "signal";
if(u.includes("dailymotion")) return "dailymotion";

/* EMAIL */

if(u.includes("@") && !u.includes("http")) return "email";

/* WEBSITE FALLBACK */

if(u.includes(".")) return "website";

return null;

}
