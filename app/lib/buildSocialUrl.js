export function buildSocialUrl(platform, identifier){

if(!identifier) return "#";

const id = identifier.trim();

const map = {

instagram: `https://instagram.com/${id}`,

facebook: `https://facebook.com/${id}`,

whatsapp: `https://wa.me/${id}`,

tiktok: `https://tiktok.com/@${id}`,

youtube: `https://youtube.com/@${id}`,

twitter: `https://x.com/${id}`,

snapchat: `https://snapchat.com/add/${id}`,

pinterest: `https://pinterest.com/${id}`,

linkedin: `https://linkedin.com/in/${id}`,

telegram: id.startsWith("+")
? `https://t.me/${id}`
: `https://t.me/${id}`,

github: `https://github.com/${id}`,

threads: `https://threads.net/@${id}`,

twitch: `https://twitch.tv/${id}`,

tumblr: `https://${id}.tumblr.com`,

vk: `https://vk.com/${id}`,

onlyfans: `https://onlyfans.com/${id}`,

reddit: `https://reddit.com/u/${id}`,

discord: `https://discord.com/users/${id}`,

koo: `https://kooapp.com/profile/${id}`,

ok: `https://ok.ru/profile/${id}`,

sharechat: `https://sharechat.com/profile/${id}`,

qq: `https://user.qzone.qq.com/${id}`,

weibo: `https://weibo.com/${id}`,

douyin: `https://www.douyin.com/user/${id}`,

signal: `https://signal.me/#p/+${id}`,

dailymotion: `https://www.dailymotion.com/${id}`,

website: id.startsWith("http") ? id : `https://${id}`,

email: `mailto:${id}`

};

return map[platform] || id;

}
