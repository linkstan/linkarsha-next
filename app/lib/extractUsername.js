export default function extractUsername(input){

if(!input) return "";

let value=input.trim();

/* remove protocol */

value=value.replace("https://","");
value=value.replace("http://","");
value=value.replace("www.","");

/* remove domain if pasted */

if(value.includes("/")){
const parts=value.split("/");
value=parts[parts.length-1];
}

/* remove query params */

if(value.includes("?")){
value=value.split("?")[0];
}

/* remove @ */

value=value.replace("@","");

return value;

}
