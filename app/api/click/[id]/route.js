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

/* IF BLOCK NOT FOUND */

if(!block || !block.data_json?.url){

return new Response("Not found",{status:404});

}

/* RECORD CLICK EVENT */

await supabase.from("events").insert({
user_id:block.user_id,
block_id:block.id,
event_type:"click"
});

/* REDIRECT TO REAL URL */

return Response.redirect(block.data_json.url,302);

}
