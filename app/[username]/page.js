import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function PublicProfile({ params }) {

const username = params?.username;

/* GET PROFILE */

const { data: profile } = await supabase
.from("profiles")
.select("*")
.eq("username", username)
.single();

if (!profile) {
return (
<div style={{
minHeight:"100vh",
background:"#0b0b12",
color:"white",
display:"flex",
alignItems:"center",
justifyContent:"center"
}}>
User not found
</div>
);
}

/* GET BLOCKS */

const { data: blocks, error } = await supabase
.from("blocks")
.select("*")
.eq("user_id", profile.id);

console.log("BLOCKS RESULT:", blocks);
console.log("BLOCKS ERROR:", error);

/* PAGE */

return (
<div style={{
minHeight:"100vh",
background:"#0b0b12",
color:"white",
display:"flex",
alignItems:"center",
justifyContent:"center",
flexDirection:"column",
fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"
}}>

<div style={{
width:110,
height:110,
borderRadius:"50%",
overflow:"hidden",
background:"#222",
marginBottom:20
}}>
<img
src={profile.avatar || "/default-avatar.png"}
style={{
width:"100%",
height:"100%",
objectFit:"cover"
}}
/>
</div>

<h1 style={{fontSize:"42px"}}>
@{profile.username}
</h1>

<p style={{opacity:0.7, marginTop:10}}>
Welcome to Linkarsha 🚀
</p>

<div style={{marginTop:40,width:320}}>

<div style={{opacity:0.6,fontSize:12,marginBottom:20}}>
DEBUG blocks count: {blocks?.length || 0}
</div>

{blocks?.length > 0 ? (

blocks.map(block => {

const data = block.data_json || {};
const title = data.title || "Link";
const url = data.url || "#";

return (

<a
key={block.id}
href={url}
target="_blank"
rel="noopener noreferrer"
style={{
display:"block",
background:"#111",
padding:"16px",
marginTop:"12px",
borderRadius:"12px",
textAlign:"center",
textDecoration:"none",
color:"white",
fontWeight:"600"
}}
>
{title}
</a>

);

})

) : (

<div style={{opacity:0.5}}>No links yet</div>

)}

</div>

</div>
);

}
