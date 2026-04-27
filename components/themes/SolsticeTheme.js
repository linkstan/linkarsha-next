"use client";

export default function SolsticeTheme({
profile,
appearance,
blocks
}){

const heroLinks = blocks.slice(0,3);
const extraLinks = blocks.slice(3,6);

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

<div
style={{
position:"absolute",
width:400,
height:400,
top:40,
left:"50%",
transform:"translateX(-50%)",
background:"radial-gradient(circle,#a74d1b22 10%,transparent 60%)",
borderRadius:"50%"
}}
/>

<div style={{letterSpacing:4,fontSize:12,opacity:.8}}>
A DESIGN AGENCY
</div>

<h1
style={{
fontSize:52,
margin:"12px 0 40px",
color:"#e6d2ad"
}}
>
{profile.display_name || "Solstice"}
</h1>

{heroLinks.map((block)=>(
<a
key={block.id}
href={block?.data_json?.url || "#"}
target="_blank"
style={{
display:"block",
width:"85%",
margin:"14px auto",
padding:14,
borderRadius:35,
border:"2px solid #caa77c",
color:"#f5e5cc",
textDecoration:"none"
}}
>
{block?.data_json?.title}
</a>
))}

</section>

{/* MAIL SECTION */}

<section
style={{
background:"#4d2200",
color:"#f2e5cd",
display:"flex",
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

<div
key={block.id}
style={{
padding:16,
borderRadius:40,
margin:"18px 0",
background: dark ? "#6a2600" : "#efe7da",
color: dark ? "#f4e5cd" : "#5c2a00"
}}
>
{block?.data_json?.title}
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

<div style={{marginTop:15,fontSize:22}}>
<span style={{margin:"0 12px"}}>f</span>
<span style={{margin:"0 12px"}}>◎</span>
<span style={{margin:"0 12px"}}>t</span>
<span style={{margin:"0 12px"}}>▶</span>
<span style={{margin:"0 12px"}}>♪</span>
<span style={{margin:"0 12px"}}>p</span>
<span style={{margin:"0 12px"}}>in</span>
</div>

</section>

</div>

)

}
