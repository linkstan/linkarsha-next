export function buildSocialUrl(platform,username){

if(!username) return "";

switch(platform){

case "instagram":
return `https://instagram.com/${username}`;

case "facebook":
return `https://facebook.com/${username}`;

case "tiktok":
return `https://tiktok.com/@${username}`;

case "youtube":
return `https://youtube.com/${username}`;

case "twitter":
return `https://x.com/${username}`;

case "telegram":
return `https://t.me/${username}`;

case "reddit":
return `https://reddit.com/u/${username}`;

case "threads":
return `https://threads.net/@${username}`;

case "github":
return `https://github.com/${username}`;

case "linkedin":
return `https://linkedin.com/in/${username}`;

case "pinterest":
return `https://pinterest.com/${username}`;

case "twitch":
return `https://twitch.tv/${username}`;

case "medium":
return `https://medium.com/@${username}`;

case "tumblr":
return `https://${username}.tumblr.com`;

case "whatsapp":
return `https://wa.me/${username}`;

case "email":
return `mailto:${username}`;

case "website":
return username;

default:
return username;

}

}
