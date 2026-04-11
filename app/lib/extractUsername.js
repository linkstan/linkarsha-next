export default function extractUsername(input){

if(!input) return "";

let value=input.trim();

/* remove protocol */
value=value.replace("https://","");
value=value.replace("http://","");
value=value.replace("www.","");

/* remove query params */
if(value.includes("?")){
value=value.split("?")[0];
}

/* split url path */
const parts=value.split("/").filter(Boolean);

/* instagram reel/post */
if(parts.includes("reel") || parts.includes("p") || parts.includes("tv")){
return parts[0];
}

/* tiktok video */
if(parts.includes("video")){
return parts[0].replace("@","");
}

/* twitter status */
if(parts.includes("status")){
return parts[0];
}

/* youtube watch */
if(parts.includes("watch")){
return parts[0];
}

/* normal username */
let username=parts[parts.length-1];

username=username.replace("@","");

return username;

}
