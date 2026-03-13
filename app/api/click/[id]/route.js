import { createClient } from "@supabase/supabase-js";

export async function GET(req,{params}){

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const blockId=params.id;

/* GET BLOCK */

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

/* IP */

const ip =
req.headers.get("x-forwarded-for") ||
req.headers.get("x-real-ip") ||
"unknown";

/* FRAUD SCORE */

let fraudScore = 0;

if(isBot) fraudScore += 5;

/* DUPLICATE CLICK CHECK */

const tenSecondsAgo = new Date(Date.now() - 10000).toISOString();

const {data:recent}=await supabase
.from("events")
.select("*")
.eq("block_id",blockId)
.eq("ip",ip)
.gte("created_at",tenSecondsAgo);

if(recent && recent.length>0){
fraudScore += 2;
}

/* RAPID SPAM CHECK */

const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();

const {data:spamClicks}=await supabase
.from("events")
.select("id")
.eq("block_id",blockId)
.eq("ip",ip)
.gte("created_at",oneMinuteAgo);

if(spamClicks && spamClicks.length>5){
fraudScore += 3;
}

/* SAVE EVENT */

await supabase.from("events").insert({
user_id:block.user_id,
block_id:block.id,
event_type:"click",
device:device,
browser:browser,
os:os,
ip:ip,
is_bot:isBot,
fraud_score:fraudScore,
created_at:new Date()
});

/* REDIRECT */

return Response.redirect(block.data_json.url,302);

}
