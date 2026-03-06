import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {

const body = await req.json();

const { user_id, type, data_json } = body;

const { data, error } = await supabase
.from("blocks")
.insert([
{
user_id,
type,
data_json
}
]);

if (error) {
return new Response(JSON.stringify({ error }), { status: 500 });
}

return new Response(JSON.stringify({ success: true }), { status: 200 });

}
