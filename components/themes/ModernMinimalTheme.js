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

<div style={{
width:"100%",
maxWidth:420,
marginTop:30,
position:"relative"
}}>

<div style={{
backgroundImage:`url(${appearance?.header?.heroImage || profile.avatar || ""})`,
backgroundSize:"cover",
backgroundPosition:"center",
height:200,
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
position:"relative"
}}>

<div style={{
position:"absolute",
inset:0,
background:"rgba(0,0,0,0.25)"
}}/>

<div style={{
border:"1px solid rgba(255,255,255,.7)",
padding:"10px 25px",
color:"#fff",
fontFamily:"Inter",
letterSpacing:2,
zIndex:2
}}>
CONTACT US
</div>

<div style={{
display:"flex",
gap:18,
marginTop:15,
zIndex:2
}}>

{Object.entries(socialLinks).map(([platform,usernames]) =>
usernames?.map((username,i)=>{

const icon=`/icons/${platform==="twitter"?"x":platform}.png`;

return(

<a
key={platform+i}
href={buildSocialUrl(platform,username)}
target="_blank"
style={{
width:36,
height:36,
borderRadius:"50%",
background:"#fff",
display:"flex",
alignItems:"center",
justifyContent:"center"
}}
>

<img
src={icon}
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



{/* RESOURCE SECTION */}

<div style={{
width:"100%",
maxWidth:420,
background:"#e9e1d8",
padding:"25px 18px"
}}>

<div style={{
fontFamily:"Playfair Display",
fontSize:20,
letterSpacing:1,
color:"#7b726a",
marginBottom:15
}}>
ALL THE RESOURCES
</div>

{resources.map((block,i)=>(

<a
key={block.id}
href={block?.data_json?.url || "#"}
target="_blank"
style={{
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"12px 0",
borderBottom:"1px solid rgba(0,0,0,.15)",
textDecoration:"none",
color:"#444"
}}
>

<div style={{
display:"flex",
alignItems:"center",
gap:12
}}>

<div style={{
width:36,
height:36,
borderRadius:6,
background:"#ddd",
overflow:"hidden"
}}>

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

<div style={{
fontFamily:"Inter",
fontSize:14
}}>
{block?.data_json?.title}
</div>

</div>

<div style={{
opacity:.6
}}>
→
</div>

</a>

))}

</div>
</div>

);

}
