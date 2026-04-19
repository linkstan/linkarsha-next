"use client";

import ButtonBlock from "../ButtonBlock";

export default function ModernMinimalTheme({
profile,
appearance,
blocks,
socialLinks,
buildSocialUrl
}){

/* split links */

const primaryLinks = blocks.slice(0,6);
const resourceLinks = blocks.slice(6);

return(

<div
style={{
width:"100%",
display:"flex",
flexDirection:"column",
alignItems:"center",
background:"#efe8e1",
minHeight:"100vh"
}}
>

{/* HERO SECTION */}

<div
style={{
width:"100%",
maxWidth:420,
margin:"0 auto",
textAlign:"center"
}}
>

<div
style={{
width:"100%",
height:220,
borderBottomLeftRadius:140,
borderBottomRightRadius:140,
overflow:"hidden"
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

<div style={{marginTop:16}}>

<h1 style={{fontSize:28,fontFamily:"Playfair Display"}}>
{profile.display_name || profile.username}
</h1>

{profile.bio && (

<p
style={{
opacity:.8,
maxWidth:320,
margin:"8px auto"
}}
>
{profile.bio}
</p>

)}

</div>

</div>


{/* PRIMARY GRID LINKS */}

<div
style={{
width:"100%",
maxWidth:420,
marginTop:20,
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:10,
padding:"0 16px"
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

{Object.keys(socialLinks).length > 0 && (

<div
style={{
display:"flex",
justifyContent:"center",
gap:18,
marginTop:28
}}
>

{Object.entries(socialLinks).map(([platform,usernames]) =>
usernames?.map((username,i)=>{

const icon =
`/icons/${platform==="twitter"?"x":platform}.png`;

return(

<a
key={platform+i}
href={buildSocialUrl(platform,username)}
target="_blank"
rel="noopener noreferrer"
>

<img
src={icon}
style={{width:24,height:24}}
/>

</a>

);

})
)}

</div>

)}


{/* RESOURCE LINKS */}

<div
style={{
width:"100%",
maxWidth:420,
marginTop:28,
padding:"0 16px"
}}
>

{resourceLinks.map(block=>(

<a
key={block.id}
href={block?.data_json?.url || "#"}
target="_blank"
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"14px 0",
borderBottom:"1px solid rgba(0,0,0,.15)",
textDecoration:"none",
color:"#000"
}}
>

<span>
{block?.data_json?.title}
</span>

<span style={{opacity:.6}}>
→
</span>

</a>

))}

</div>

</div>

);

}
