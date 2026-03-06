import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(request,{ params }){

const id = params.id;

const referrer = request.headers.get("referer") || "";
const ua = request.headers.get("user-agent") || "";

/* detect device */

let device="Desktop";

if(/mobile/i.test(ua)) device="Mobile";
if(/tablet/i.test(ua)) device="Tablet";

/* detect browser */

let browser="Unknown";

if(ua.includes("Chrome")) browser="Chrome";
else if(ua.includes("Safari")) browser="Safari";
else if(ua.includes("Firefox")) browser="Firefox";

/* detect OS */

let os="Unknown";

if(ua.includes("Windows")) os="Windows";
else if(ua.includes("Mac")) os="MacOS";
else if(ua.includes("Android")) os="Android";
else if(ua.includes("iPhone")) os="iOS";

/* save click */

await supabase.from("clicks").insert({
link_id:id,
referrer,
device,
browser,
os
});

/* get destination url */

const { data: link } = await supabase
.from("links")
.select("url")
.eq("id", id)
.single();

if(!link){
return NextResponse.json({error:"Link not found"},{status:404});
}

/* redirect */

let url = link.url;

if(!url.startsWith("http")){
url = "https://" + url;
}

return NextResponse.redirect(url);

}
