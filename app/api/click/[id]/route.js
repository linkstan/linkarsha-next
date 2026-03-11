import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(req,{params}){

const blockId = params.id;

const {data:block} = await supabase
.from("blocks")
.select("*")
.eq("id",blockId)
.single();

if(!block){
return redirect("/");
}

/* record click */

await supabase.from("events").insert({
user_id:block.user_id,
block_id:block.id,
event_type:"click"
});

/* redirect */

return redirect(block.data_json.url);

}
