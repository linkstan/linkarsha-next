export default function extractUsername(input){

if(!input) return "";

let value=input.trim();

value=value.replace("https://","");
value=value.replace("http://","");
value=value.replace("www.","");

if(value.includes("?")){
value=value.split("?")[0];
}

const parts=value.split("/").filter(Boolean);

/* instagram reel/post detection */

if(parts.includes("reel") || parts.includes("p") || parts.includes("tv")){
return parts[0];
}

/* tiktok video detection */

if(parts.includes("video")){
return parts[0].replace("@","");
}

/* twitter status detection */

if(parts.includes("status")){
return parts[0];
}

/* youtube watch link */

if(parts.includes("watch")){
return parts[0];
}

/* normal username */

let username=parts[parts.length-1];

username=username.replace("@","");

return username;

}
