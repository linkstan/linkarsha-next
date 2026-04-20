"use client";

export default function ArchwayTheme({
profile,
appearance,
blocks,
socialLinks,
buildSocialUrl
}){

const contactBlocks = blocks.slice(0,3);
const ctaBlock = blocks[5];

const headerImage =
appearance?.header?.heroImage ||
profile.avatar ||
"";

return(

<div
style={{
width:"100%",
minHeight:"100vh",
background:"#f3efe9",
position:"relative",
display:"flex",
justifyContent:"center"
}}
>

{/* HEADER BACKGROUND */}

<div
style={{
position:"absolute",
top:0,
left:0,
right:0,
height:260,
backgroundImage:`url(${headerImage})`,
backgroundSize:"cover",
backgroundPosition:"center",
zIndex:1
}}
/>


{/* MAIN CARD */}

<div
style={{
width:360,
maxWidth:"92%",
marginTop:120,
background:"#f3efe9",
display:"flex",
flexDirection:"column",
alignItems:"center",
paddingBottom:40,
zIndex:2
}}
>

{/* ARCH PROFILE */}

<div
style={{
width:170,
height:210,
marginTop:-90,
borderTopLeftRadius:120,
borderTopRightRadius:120,
borderBottomLeftRadius:20,
borderBottomRightRadius:20,
overflow:"hidden",
background:"#fff",
boxShadow:"0 10px 25px rgba(0,0,0,.08)"
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


{/* NAME BRUSH */}

<div
style={{
marginTop:20,
padding:"20px 40px",
backgroundImage:"url(/textures/brush.png)",
backgroundRepeat:"no-repeat",
backgroundSize:"contain",
backgroundPosition:"center",
textAlign:"center"
}}
>

<div
style={{
fontFamily:"Playfair Display",
fontSize:34,
color:"#1c1c1c"
}}
>
{profile.display_name || profile.username}
</div>

<div
style={{
fontSize:12,
letterSpacing:3,
marginTop:6,
opacity:.6
}}
>
{profile.subtitle || ""}
</div>

</div>


{/* CONTACT INFO */}

<div
style={{
marginTop:28,
display:"flex",
flexDirection:"column",
gap:14,
alignItems:"center"
}}
>

{contactBlocks.map((block)=>{

const title = block?.data_json?.title || "";
const url = block?.data_json?.url || "";

let icon="/icons/other.png";

if(url.includes("mailto")) icon="/icons/email.png";
if(url.includes("http")) icon="/icons/globe.png";
if(url.includes("tel")) icon="/icons/phone.png";

return(

<a
key={block.id}
href={url}
style={{
display:"flex",
alignItems:"center",
gap:12,
textDecoration:"none",
color:"#444",
fontSize:15
}}
>

<img
src={icon}
style={{width:18,height:18}}
/>

<span>{title}</span>

</a>

);

})}

</div>


{/* DIVIDER */}

<div
style={{
width:"100%",
height:1,
background:"#ddd",
margin:"28px 0"
}}
/>


{/* SOCIAL LINKS */}

<div
style={{
display:"flex",
flexDirection:"column",
gap:12,
alignItems:"center"
}}
>

{Object.entries(socialLinks).map(([platform,usernames]) =>
usernames?.map((username,i)=>{

return(

<a
key={platform+i}
href={buildSocialUrl(platform,username)}
target="_blank"
style={{
display:"flex",
alignItems:"center",
gap:10,
textDecoration:"none",
color:"#444"
}}
>

<img
src={`/icons/${platform}.png`}
style={{width:18,height:18}}
/>

<span>@{username}</span>

</a>

);

})
)}

</div>


{/* TAGLINE */}

{profile.bio && (

<div
style={{
marginTop:26,
fontStyle:"italic",
textAlign:"center",
maxWidth:260,
opacity:.7
}}
>
{profile.bio}
</div>

)}


{/* CTA BUTTON */}

{ctaBlock && (

<a
href={ctaBlock?.data_json?.url || "#"}
style={{
marginTop:28,
border:"1px solid #333",
padding:"12px 28px",
textDecoration:"none",
color:"#333",
letterSpacing:2,
fontSize:14
}}
>
{ctaBlock?.data_json?.title}
</a>

)}

</div>

</div>

);

}
