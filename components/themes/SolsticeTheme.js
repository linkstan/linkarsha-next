"use client";

import ButtonBlock from "../ButtonBlock";

export default function SolsticeTheme({
profile,
appearance,
blocks,
socialLinks,
buildSocialUrl
}){

const heroLinks = blocks.slice(0,3);
const extraLinks = blocks.slice(3,6);

const header = appearance?.header || {};
const buttons = appearance?.buttons || {};

return(

<div
style={{
width:"100%",
minHeight:"100vh",
background:"#efe9df",
fontFamily:"Arial, sans-serif",
color:"#4d2200"
}}
>

{/* HERO */}

<section
style={{
background:"#7a2c00",
color:"#f3e3c7",
textAlign:"center",
padding:"70px 25px",
position:"relative"
}}
>

{/* SUNBURST */}

<div
style={{
position:"absolute",
width:420,
height:420,
top:30,
left:"50%",
transform:"translateX(-50%)",
background:
"repeating-conic-gradient(from 0deg, rgba(255,200,150,.15) 0deg 10deg, transparent 10deg 20deg)",
borderRadius:"50%",
opacity:.35
}}
/>

<div style={{letterSpacing:4,fontSize:12,opacity:.8}}>
A DESIGN AGENCY
</div>


{/* DISPLAY NAME */}

{header.showDisplayName !== false && (
<h1
style={{
fontSize:52,
margin:"12px 0 10px",
color:"#e6d2ad"
}}
>
{profile.display_name || profile.username}
</h1>
)}


{/* USERNAME */}

{header.showUsername !== false && (
<div style={{opacity:.7,marginBottom:10}}>
@{profile.username}
</div>
)}


{/* BIO */}

{header.showBio && profile.bio && (
<p
style={{
maxWidth:320,
margin:"0 auto 20px",
opacity:.9
}}
>
{profile.bio}
</p>
)}


{/* SOCIAL ICONS */}

{header.showSocialIcons && (

<div
style={{
display:"flex",
gap:14,
justifyContent:"center",
marginBottom:20,
flexWrap:"wrap"
}}
>

{Object.entries(socialLinks).map(([platform,usernames]) =>
usernames?.map((username,i)=>{

const iconSrc =
header.socialIconStyle==="theme"
? `/icons/theme/${platform}.svg`
: `/icons/${platform==="twitter"?"x":platform}.png`;

return(

<a
key={platform+i}
href={buildSocialUrl(platform,username)}
target="_blank"
rel="noopener noreferrer"
>

<img
src={iconSrc}
style={{width:22,height:22}}
onError={(e)=>{e.currentTarget.src="/icons/other.png"}}
/>

</a>

);

})
)}

</div>

)}


{/* HERO BUTTONS */}

{heroLinks.map((block)=>(
<div key={block.id} style={{width:"85%",margin:"14px auto"}}>
<ButtonBlock
block={block}
buttons={appearance?.buttons}
themeBackground="#7a2c00"
themeName="solstice"
/>
</div>
))}

</section>


{/* MAIL SECTION */}

<section
style={{
background:"#4d2200",
color:"#f2e5cd",
display:"flex",
flexWrap:"wrap",
gap:20,
justifyContent:"space-between",
alignItems:"center",
padding:"45px 30px"
}}
>

<div>

<h2 style={{fontSize:36,margin:"0 0 12px"}}>
join our<br/>mailing list.
</h2>

<p style={{fontSize:13,lineHeight:1.5,opacity:.9}}>
Join the mailing list for exclusive business tips,
insights, and updates to help you grow and succeed.
</p>

</div>

<div style={{textAlign:"center"}}>

<div style={{fontSize:55}}>✉</div>

<div
style={{
background:"#efe7da",
color:"#4d2200",
padding:"10px 22px",
borderRadius:30,
display:"inline-block",
marginTop:15
}}
>
SUBSCRIBE
</div>

</div>

</section>


{/* DIVIDER */}

<div
style={{
height:12,
background:"#efe7da"
}}
/>


{/* ADDITIONAL LINKS */}

<section
style={{
background:"#d7b78e",
padding:"45px 30px",
textAlign:"center"
}}
>

{extraLinks.map((block,i)=>{

const dark = i===1;

return(

<div key={block.id} style={{margin:"18px 0"}}>
<ButtonBlock
block={block}
buttons={appearance?.buttons}
themeBackground={dark ? "#6a2600" : "#efe7da"}
themeName="solstice"
/>
</div>

)

})}

</section>


{/* DISCOUNT */}

<section
style={{
display:"flex",
background:"#efe7da"
}}
>

<div
style={{
flex:1,
padding:"45px 20px",
textAlign:"center",
borderRight:"1px solid #d7c6ab"
}}
>

<div style={{fontSize:32}}>✷</div>

<p>
USE THE CODE<br/>
<b>DISCOUNT20</b>
</p>

<div
style={{
background:"#e2c79a",
padding:"12px 26px",
borderRadius:30,
display:"inline-block",
marginTop:10
}}
>
SHOP NOW
</div>

</div>

<div
style={{
flex:1,
padding:"45px 20px",
textAlign:"center"
}}
>

<h2
style={{
fontSize:32,
lineHeight:1.2
}}
>
take 20%<br/>
off your<br/>
purchase.
</h2>

</div>

</section>


{/* FOOTER */}

<section
style={{
background:"#7a2c00",
color:"#f3e4cc",
textAlign:"center",
padding:30
}}
>

<div>follow us on socials.</div>

<div
style={{
display:"flex",
justifyContent:"center",
gap:18,
marginTop:15
}}
>

<img src="/icons/facebook.png" width="22"/>
<img src="/icons/instagram.png" width="22"/>
<img src="/icons/x.png" width="22"/>
<img src="/icons/youtube.png" width="22"/>
<img src="/icons/tiktok.png" width="22"/>
<img src="/icons/pinterest.png" width="22"/>
<img src="/icons/linkedin.png" width="22"/>

</div>

</section>

</div>

)

}
