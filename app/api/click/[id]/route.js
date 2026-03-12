import { createClient } from "@supabase/supabase-js";

export async function GET(req,{params}){

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const blockId=params.id;

const {data:block}=await supabase
.from("blocks")
.select("*")
.eq("id",blockId)
.single();

if(!block){
return new Response("Not found",{status:404});
}

/* USER AGENT */

const ua=req.headers.get("user-agent")||"";

/* DEVICE */

let device="desktop";

if(/mobile/i.test(ua)) device="mobile";
if(/tablet/i.test(ua)) device="tablet";

/* BROWSER */

let browser="unknown";

if(/chrome/i.test(ua)) browser="chrome";
else if(/safari/i.test(ua)) browser="safari";
else if(/firefox/i.test(ua)) browser="firefox";
else if(/edge/i.test(ua)) browser="edge";

/* OS */

let os="unknown";

if(/android/i.test(ua)) os="android";
else if(/iphone|ipad/i.test(ua)) os="ios";
else if(/windows/i.test(ua)) os="windows";
else if(/mac/i.test(ua)) os="mac";

/* BOT DETECTION */

let isBot=false;

if(/bot|crawl|spider/i.test(ua)) isBot=true;

/* SAVE EVENT */

await supabase.from("events").insert({
user_id:block.user_id,
block_id:block.id,
event_type:"click",
device:device,
browser:browser,
os:os,
is_bot:isBot,
created_at:new Date()
});

/* REDIRECT */

return Response.redirect(block.data_json.url,302);

}
