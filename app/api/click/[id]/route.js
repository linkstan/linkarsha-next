import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(request,{ params }){

const id = params.id;

/* get link */

const { data: link } = await supabase
.from("links")
.select("*")
.eq("id", id)
.single();

/* log click */

await supabase
.from("clicks")
.insert({
link_id:id
});

/* redirect */

let url = link.url;

if(!url.startsWith("http")){
url=`https://${url}`;
}

return NextResponse.redirect(url);

}
