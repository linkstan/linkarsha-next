"use client";

export default function MobileDrawer({
openMore,
setOpenMore,
profile,
logout
}){

if(!openMore) return null;

return(

<div
onClick={()=>setOpenMore(false)}
style={{
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.35)",
zIndex:300
}}
>

<div
onClick={(e)=>e.stopPropagation()}
style={{
position:"absolute",
right:0,
top:0,
width:280,
height:"100%",
background:"var(--sidebar)",
padding:20,
borderLeft:"1px solid var(--border)",
transform:"translateX(0)",
transition:"0.25s ease"
}}
>

{/* PROFILE */}

<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:15}}>

<img
src={profile?.avatar || "/default-avatar.png"}
style={{
width:38,
height:38,
borderRadius:"50%"
}}
/>

<div>

<div style={{fontWeight:600}}>
{profile?.username}
</div>

<div style={{fontSize:12,opacity:0.7}}>
linkarsha.com/{profile?.username}
</div>

</div>

</div>

<hr style={{margin:"15px 0"}}/>

<div style={{padding:"10px 0"}}>Blocks</div>

<div style={{padding:"10px 0"}}>Bio Generator</div>
<div style={{padding:"10px 0"}}>QR Code Generator</div>
<div style={{padding:"10px 0"}}>Export Data</div>

<hr style={{margin:"15px 0"}}/>

<div style={{padding:"10px 0"}}>Referrals</div>
<div style={{padding:"10px 0"}}>Settings</div>

<hr style={{margin:"15px 0"}}/>

<div style={{padding:"10px 0"}}>Ask Question</div>
<div style={{padding:"10px 0"}}>Help Center</div>
<div style={{padding:"10px 0"}}>Contact Support</div>

<div
onClick={logout}
style={{
marginTop:20,
padding:"10px 12px",
color:"#ff5e5e",
cursor:"pointer",
borderRadius:8
}}
>
Sign Out
</div>

</div>

</div>

);

}
