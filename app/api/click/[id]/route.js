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

/* save click event */

await supabase.from("events").insert({
block_id:id,
event:"click",
referrer,
device,
browser,
os
});

/* get destination URL from blocks */

const { data:block } = await supabase
.from("blocks")
.select("*")
.eq("id", id)
.single();

if(!block){
return NextResponse.json({error:"Block not found"},{status:404});
}

let url = block.data_json?.url;

if(!url){
return NextResponse.json({error:"URL missing"},{status:404});
}

if(!url.startsWith("http")){
url="https://"+url;
}

return NextResponse.redirect(url);

}
