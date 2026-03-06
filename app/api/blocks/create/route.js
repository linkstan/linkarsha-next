import { createClient } from "@supabase/supabase-js";

export async function POST(req){

const body = await req.json();

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const { user_id, type, data_json } = body;

const { error } = await supabase
.from("blocks")
.insert([
{
user_id,
type,
data_json
}
]);

if(error){

return new Response(
JSON.stringify({error:error.message}),
{status:500}
);

}

return new Response(
JSON.stringify({success:true}),
{status:200}
);

}
