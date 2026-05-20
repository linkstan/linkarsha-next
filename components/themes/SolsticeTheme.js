"use client";

import ButtonBlock from "../ButtonBlock";

export default function SolsticeTheme({
profile,
appearance,
blocks,
socialLinks,
buildSocialUrl
}){

const heroLinks = blocks.slice(0,2);
const extraLinks = blocks.slice(2,5);

const header = appearance?.header || {};

return(

<div
style={{
width:"100%",
minHeight:"100vh",

background:
"linear-gradient(180deg,#f4ede3 0%,#eadbc8 100%)",

fontFamily:"Inter, sans-serif",

color:"#4d2200",

overflow:"hidden"
}}
>

{/* HERO */}

<section
style={{
position:"relative",

padding:
"130px 24px 110px",

textAlign:"center",

background:
"linear-gradient(180deg,#6f2500 0%,#8a3200 100%)",

color:"#f4e7d4",

overflow:"hidden"
}}
>

{/* ATMOSPHERIC GLOW */}

<div
style={{
position:"absolute",

width:620,
height:620,

borderRadius:"50%",

background:
"radial-gradient(circle, rgba(255,210,140,.22) 0%, transparent 70%)",

top:-260,
left:"50%",

transform:"translateX(-50%)"
}}
/>

{/* NOISE */}

<div
style={{
position:"absolute",
inset:0,

opacity:.06,

backgroundImage:
"url('https://grainy-gradients.vercel.app/noise.svg')"
}}
/>

{/* LABEL */}

<div
style={{
position:"relative",

fontSize:12,

letterSpacing:".28em",

textTransform:"uppercase",

opacity:.62,

fontWeight:700
}}
>
Luxury Creative Studio
</div>

{/* NAME */}

<h1
style={{
position:"relative",

fontSize:"clamp(56px,10vw,118px)",

lineHeight:.88,

letterSpacing:"-.08em",

fontWeight:700,

margin:"18px auto 18px",

maxWidth:920,

color:"#f6e7d1"
}}
>
{profile.display_name || profile.username}
</h1>

{/* USERNAME */}

<div
style={{
position:"relative",

fontSize:14,

letterSpacing:".16em",

textTransform:"uppercase",

opacity:.58,

fontWeight:600
}}
>
@{profile.username}
</div>

{/* BIO */}

{profile.bio && (

<div
style={{
position:"relative",

maxWidth:700,

margin:"34px auto 0",

fontSize:"clamp(17px,3vw,24px)",

lineHeight:1.7,

opacity:.82
}}
>
{profile.bio}
</div>

)}

{/* CTA BUTTONS */}

<div
style={{
position:"relative",

display:"flex",
flexDirection:"column",

gap:18,

maxWidth:620,

margin:"58px auto 0"
}}
>

{heroLinks.map((block,index)=>(

<div
key={block.id}

style={{
transform:
index===0
? "scale(1)"
: "scale(.96)",

opacity:
index===0
? 1
: .82
}}
>

<ButtonBlock
block={block}
buttons={appearance?.buttons}
themeBackground="#7a2c00"
themeName="solstice"
/>

</div>

))}

</div>

</section>


{/* EDITORIAL DIVIDER */}

<div
style={{
height:140,

background:
"linear-gradient(180deg,#8a3200 0%, #f4ede3 100%)"
}}
/>


{/* FEATURE SECTION */}

<section
style={{
maxWidth:1200,

margin:"0 auto",

padding:"0 24px 120px"
}}
>

<div
style={{
display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(280px,1fr))",

gap:28
}}
>

{extraLinks.map((block,index)=>(

<a
key={block.id}

href={block?.data_json?.url || "#"}

target="_blank"

rel="noopener noreferrer"

style={{
background:
index===1
? "#6f2500"
: "rgba(255,255,255,.45)",

color:
index===1
? "#f5e7d2"
: "#4d2200",

padding:"40px 34px",

borderRadius:34,

textDecoration:"none",

display:"flex",
flexDirection:"column",

justifyContent:"space-between",

minHeight:260,

boxShadow:
index===1

? "0 30px 80px rgba(90,30,0,.22)"

: "0 18px 50px rgba(0,0,0,.06)",

border:
index===1
? "none"
: "1px solid rgba(0,0,0,.05)"
}}
>

<div
style={{
fontSize:13,

letterSpacing:".18em",

textTransform:"uppercase",

opacity:.58,

marginBottom:26
}}
>
Featured Experience
</div>

<div
style={{
fontSize:34,

lineHeight:1.02,

fontWeight:700,

letterSpacing:"-.06em",

maxWidth:220
}}
>
{block?.data_json?.title}
</div>

<div
style={{
marginTop:22,

fontSize:15,

lineHeight:1.8,

opacity:.74
}}
>
{block?.data_json?.description ||
"Luxury visual destination crafted for modern creators and premium brands."}
</div>

<div
style={{
marginTop:34,

fontSize:14,

letterSpacing:".14em",

textTransform:"uppercase",

opacity:.54
}}
>
Explore ↗
</div>

</a>

))}

</div>

</section>


{/* SOCIAL FOOTER */}

<section
style={{
padding:"0 24px 90px",

textAlign:"center"
}}
>

<div
style={{
fontSize:13,

letterSpacing:".24em",

textTransform:"uppercase",

opacity:.42,

marginBottom:28
}}
>
Connect Everywhere
</div>

<div
style={{
display:"flex",

justifyContent:"center",

flexWrap:"wrap",

gap:16
}}
>

{Object.entries(socialLinks).map(([platform,usernames])=>

usernames?.map((username,i)=>(

<a
key={platform+i}

href={buildSocialUrl(platform,username)}

target="_blank"

rel="noopener noreferrer"

style={{
padding:"14px 20px",

borderRadius:999,

background:"rgba(255,255,255,.5)",

border:"1px solid rgba(0,0,0,.05)",

textDecoration:"none",

color:"#4d2200",

fontSize:14,

fontWeight:600,

letterSpacing:"-.01em"
}}
>
{platform}
</a>

))

)}

</div>

</section>

</div>

);

}
