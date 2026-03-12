import { createClient } from "@supabase/supabase-js";

export async function GET(req,{params}){

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const blockId = params.id;

/* GET BLOCK */

const {data:block,error} = await supabase
.from("blocks")
.select("*")
.eq("id",blockId)
.single();

if(!block || !block.data_json?.url){

return new Response("Not found",{status:404});

}

/* GET REFERRER */

const referrer = req.headers.get("referer") || "direct";

/* INSERT EVENT */

await supabase.from("events").insert({
user_id:block.user_id,
block_id:block.id,
event_type:"click",
referrer:referrer
});

/* REDIRECT */

return Response.redirect(block.data_json.url,302);

}
