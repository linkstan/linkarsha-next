"use client";

export default function ModernMinimalTheme({
profile,
appearance,
blocks,
socialLinks,
buildSocialUrl
}){

const containerWidth = 380;

const primary = blocks.slice(0,6);
const resources = blocks.slice(6);

return(

<div
style={{
width:"100%",
background:"#b7aba0",
display:"flex",
flexDirection:"column",
alignItems:"center",
minHeight:"100vh"
}}
>

{/* TITLE */}

<div
style={{
fontFamily:"Playfair Display",
fontSize:36,
color:"#f1ece6",
marginTop:40,
letterSpacing:2,
textAlign:"center",
width:"100%",
maxWidth:containerWidth
}}
>
{profile.display_name || profile.username}
</div>


{/* PROFILE HERO IMAGE (ARCH SHAPE) */}

<div
style={{
width:"100%",
maxWidth:containerWidth,
marginTop:20,
borderTopLeftRadius:220,
borderTopRightRadius:220,
borderBottomLeftRadius:0,
borderBottomRightRadius:0,
overflow:"hidden"
}}
>

<img
src={profile.avatar || ""}
style={{
width:"100%",
height:380,
objectFit:"cover"
}}
/>

</div>


{/* SUBTITLE STRIP */}

{profile.bio && (

<div
style={{
background:"#e9e1d8",
width:"100%",
textAlign:"center",
padding:"16px 10px",
marginTop:-2,
fontFamily:"Inter",
letterSpacing:1,
color:"#6c645d"
}}
>
{profile.bio}
</div>

)}


{/* GRID BUTTONS */}

<div
style={{
background:"#b7aba0",
width:"100%",
maxWidth:containerWidth,
padding:"22px 16px",
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:14
}}
>

{primary.map((block)=>{

return(

<a
key={block.id}
href={block?.data_json?.url || "#"}
target="_blank"
style={{
border:"1px solid rgba(255,255,255,.6)",
padding:"13px 8px",
textAlign:"center",
textDecoration:"none",
color:"#fff",
fontFamily:"Inter",
fontSize:15,
letterSpacing:1,
background:"transparent"
}}
>
{block?.data_json?.title}
</a>

)

})}

</div>


{/* CONTACT SECTION */}

<div
style={{
width:"100%",
marginTop:30
}}
>

<div
style={{
backgroundImage:`url(${appearance?.header?.heroImage || ""})`,
backgroundSize:"cover",
backgroundPosition:"center",
height:210,
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
position:"relative"
}}
>

<div
style={{
position:"absolute",
inset:0,
background:"rgba(0,0,0,0.25)"
}}
/>

<div
style={{
border:"1px solid rgba(255,255,255,.7)",
padding:"10px 25px",
color:"#fff",
fontFamily:"Inter",
letterSpacing:2,
zIndex:2
}}
>
CONTACT US
</div>


{/* SOCIAL ICONS */}

<div
style={{
display:"flex",
gap:18,
marginTop:15,
zIndex:2
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
width:38,
height:38,
borderRadius:"50%",
background:"rgba(255,255,255,.9)",
display:"flex",
alignItems:"center",
justifyContent:"center"
}}
>

<img
src={`/icons/theme/${platform}.svg`}
style={{
width:18,
height:18
}}
/>

</a>

);

})
)}

</div>

</div>

</div>



{/* RESOURCES HEADER SECTION */}

<div
style={{
width:"100%",
maxWidth:containerWidth,
background:"#e9e1d8",
padding:"28px 18px"
}}
>

<div
style={{
fontFamily:"Playfair Display",
fontSize:22,
letterSpacing:2,
color:"#7b726a",
textAlign:"center",
marginBottom:20
}}
>
ALL THE RESOURCES
</div>


{/* RESOURCE LIST */}

{resources.map((block)=>(

<a
key={block.id}
href={block?.data_json?.url || "#"}
target="_blank"
style={{
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"14px 0",
borderBottom:"1px solid rgba(0,0,0,.15)",
textDecoration:"none",
color:"#444"
}}
>

<div
style={{
display:"flex",
alignItems:"center",
gap:12
}}
>

<div
style={{
width:36,
height:36,
borderRadius:6,
background:"#ddd",
overflow:"hidden"
}}
>

{block?.data_json?.image && (

<img
src={block.data_json.image}
style={{
width:"100%",
height:"100%",
objectFit:"cover"
}}
/>

)}

</div>

<div
style={{
fontFamily:"Inter",
fontSize:14
}}
>
{block?.data_json?.title}
</div>

</div>

<div
style={{
opacity:.6
}}
>
→
</div>

</a>

))}

</div>


</div>

);

}
