"use client";

import ButtonBlock from "../ButtonBlock";

export default function ModernMinimalTheme({
profile,
appearance,
blocks,
socialLinks,
buildSocialUrl
}){

const primaryLinks = blocks.slice(0,6);
const resourceLinks = blocks.slice(6);

return(

<div style={{width:"100%",maxWidth:420,margin:"0 auto"}}>

{/* HERO */}

<div style={{textAlign:"center",paddingTop:30}}>

<h1 style={{fontSize:28,marginBottom:10}}>
{profile.display_name || profile.username}
</h1>

<div
style={{
width:"100%",
height:220,
borderBottomLeftRadius:140,
borderBottomRightRadius:140,
overflow:"hidden",
marginBottom:16
}}
>

<img
src={profile.avatar || ""}
style={{
width:"100%",
height:"100%",
objectFit:"cover"
}}
/>

</div>

{profile.bio && (
<p style={{opacity:.8}}>
{profile.bio}
</p>
)}

</div>

{/* PRIMARY GRID */}

<div
style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:10,
marginTop:20
}}
>

{primaryLinks.map(block=>(
<ButtonBlock
key={block.id}
block={block}
/>
))}

</div>

{/* SOCIAL ICONS */}

<div
style={{
display:"flex",
justifyContent:"center",
gap:16,
marginTop:30
}}
>

{Object.entries(socialLinks).map(([platform,usernames]) =>
usernames?.map((username,i)=>{

return(

<a
key={platform+i}
href={buildSocialUrl(platform,username)}
target="_blank"
rel="noopener noreferrer"
>

<img
src={`/icons/${platform==="twitter"?"x":platform}.png`}
style={{width:24,height:24}}
/>

</a>

);

})
)}

</div>

{/* RESOURCE LINKS */}

<div style={{marginTop:30}}>

{resourceLinks.map(block=>(

<a
key={block.id}
href={block?.data_json?.url || "#"}
target="_blank"
style={{
display:"flex",
justifyContent:"space-between",
padding:"14px 4px",
borderBottom:"1px solid rgba(0,0,0,.15)",
textDecoration:"none"
}}
>

<span>{block?.data_json?.title}</span>

<span>→</span>

</a>

))}

</div>

</div>

);

}
