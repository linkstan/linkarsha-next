import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(req,{params}){

const blockId = params.id;

/* get block */

const {data:block,error} = await supabase
.from("blocks")
.select("id,user_id,data_json")
.eq("id",blockId)
.single();

if(error || !block){
return redirect("/");
}

/* record click */

await supabase.from("events").insert({
user_id:block.user_id,
block_id:block.id,
event_type:"click"
});

/* redirect */

const url = block?.data_json?.url;

if(!url){
return redirect("/");
}

return redirect(url);

}
