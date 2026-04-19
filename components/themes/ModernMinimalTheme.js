"use client";

export default function ModernMinimalTheme({
profile,
appearance,
blocks,
socialLinks,
buildSocialUrl
}){

const primary = blocks.slice(0,6);
const resources = blocks.slice(6);

return(

<div style={{
width:"100%",
background:"#b7aba0",
display:"flex",
flexDirection:"column",
alignItems:"center",
minHeight:"100vh"
}}>

{/* TITLE */}

<div style={{
fontFamily:"Playfair Display",
fontSize:36,
color:"#f1ece6",
marginTop:40,
letterSpacing:2
}}>
{profile.display_name || profile.username}
</div>


{/* HERO IMAGE */}

<div style={{
width:"100%",
maxWidth:420,
marginTop:20,
borderTopLeftRadius:220,
borderTopRightRadius:220,
overflow:"hidden"
}}>

<img
src={appearance?.header?.heroImage || profile.avatar || ""}
style={{
width:"100%",
height:340,
objectFit:"cover"
}}
/>

</div>


{/* SUBTITLE STRIP */}

{profile.bio && (

<div style={{
background:"#e9e1d8",
width:"100%",
maxWidth:420,
textAlign:"center",
padding:"20px 10px",
fontFamily:"Inter",
letterSpacing:1,
color:"#6c645d"
}}>
{profile.bio}
</div>

)}


{/* GRID BUTTONS */}

<div style={{
background:"#b7aba0",
width:"100%",
maxWidth:420,
padding:"20px 16px",
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:12
}}>

{primary.map((block)=>{

return(

<a
key={block.id}
href={block?.data_json?.url || "#"}
target="_blank"
style={{
border:"1px solid rgba(255,255,255,.6)",
padding:"12px",
textAlign:"center",
textDecoration:"none",
color:"#fff",
fontFamily:"Inter",
fontSize:14,
letterSpacing:1
}}
>
{block?.data_json?.title}
</a>

)

})}

</div>


{/* CONTACT SECTION */}

{Object.keys(socialLinks).length>0 && (

<div style={{
width:"100%",
maxWidth:420,
textAlign:"center",
padding:"30px 0",
background:"rgba(0,0,0,.15)"
}}>

<div style={{
fontFamily:"Inter",
color:"#fff",
letterSpacing:2,
marginBottom:15
}}>
CONTACT US
</div>

<div style={{
display:"flex",
justifyContent:"center",
gap:20
}}>

{Object.entries(socialLinks).map(([platform,usernames]) =>
usernames?.map((username,i)=>{

const icon = `/icons/${platform==="twitter"?"x":platform}.png`;

return(

<a
key={platform+i}
href={buildSocialUrl(platform,username)}
target="_blank"
>

<img
src={icon}
style={{
width:28,
height:28
}}
/>

</a>

);

})
)}

</div>

</div>

)}


{/* RESOURCE LIST */}

{resources.length>0 && (

<div style={{
width:"100%",
maxWidth:420,
background:"#e9e1d8",
padding:"20px 16px"
}}>

{resources.map(block=>(

<a
key={block.id}
href={block?.data_json?.url || "#"}
target="_blank"
style={{
display:"flex",
justifyContent:"space-between",
padding:"12px 0",
borderBottom:"1px solid rgba(0,0,0,.1)",
textDecoration:"none",
color:"#444",
fontFamily:"Inter"
}}
>

<span>
{block?.data_json?.title}
</span>

<span>→</span>

</a>

))}

</div>

)}

</div>

);

}
