import { createClient } from "@supabase/supabase-js";

export async function GET(req,{params}){

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const blockId = params.id;

/* GET BLOCK */

const {data:block} = await supabase
.from("blocks")
.select("*")
.eq("id",blockId)
.single();

if(!block || !block.data_json?.url){
return new Response("Not found",{status:404});
}

/* USER AGENT */

const ua = req.headers.get("user-agent") || "";

/* BOT DETECTION */

const isBot =
ua.includes("bot") ||
ua.includes("crawler") ||
ua.includes("spider");

/* DEVICE DETECTION */

let device="Desktop";

if(/mobile/i.test(ua)) device="Mobile";
if(/tablet/i.test(ua)) device="Tablet";

/* OS DETECTION */

let os="Unknown";

if(/android/i.test(ua)) os="Android";
else if(/iphone|ipad/i.test(ua)) os="iOS";
else if(/windows/i.test(ua)) os="Windows";
else if(/mac/i.test(ua)) os="Mac";

/* BROWSER */

let browser="Unknown";

if(/chrome/i.test(ua)) browser="Chrome";
else if(/safari/i.test(ua)) browser="Safari";
else if(/firefox/i.test(ua)) browser="Firefox";

/* LOCATION FROM VERCEL */

const country = req.headers.get("x-vercel-ip-country") || "Unknown";
const city = req.headers.get("x-vercel-ip-city") || "Unknown";

/* SAVE EVENT */

await supabase.from("events").insert({

user_id:block.user_id,
block_id:block.id,
event_type:"click",

country,
city,
device,
os,
browser,
is_bot:isBot

});

/* REDIRECT */

return Response.redirect(block.data_json.url,302);

}
