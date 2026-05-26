"use client";

export default function SamiraTheme({
profile,
appearance,
blocks,
socialLinks,
buildSocialUrl
}){

const heroImage =
appearance?.header?.heroImage
||
appearance?.hero?.image
||
profile.avatar
||
"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1400";

const primaryLinks = blocks.slice(0,4);

return(

<div
style={{
minHeight:"100vh",

background:
"linear-gradient(180deg,#f4ebe7 0%,#eadad3 100%)",

fontFamily:"Inter, sans-serif",

overflow:"hidden",

color:"#2d2424"
}}
>

{/* HERO */}

<section
style={{
position:"relative",

padding:"clamp(100px,12vw,160px) 24px var(--space-4xl)",

overflow:"hidden"
}}
>

{/* IMAGE */}

<div
style={{
position:"absolute",
inset:0,

background:
`url("${heroImage}") center / cover no-repeat`,

filter:"brightness(.88)"
}}
/>

{/* OVERLAY */}

<div
style={{
position:"absolute",
inset:0,

background:
"linear-gradient(180deg, rgba(255,255,255,.55) 0%, rgba(244,235,231,.92) 100%)"
}}
/>

{/* CONTENT */}

<div
style={{
position:"relative",

zIndex:2,

maxWidth:980,

margin:"0 auto",

textAlign:"center"
}}
>

<div
style={{
fontSize:12,

letterSpacing:".28em",

textTransform:"uppercase",

fontWeight:700,

opacity:.46
}}
>
Personal Brand Experience
</div>

<h1
style={{
fontSize:"clamp(58px,11vw,128px)",

lineHeight:.88,

letterSpacing:"-.08em",

fontWeight:700,

margin:"var(--space-lg) auto var(--space-md)",

maxWidth:760
}}
>
{profile.display_name || profile.username}
</h1>

<div
style={{
fontSize:15,

letterSpacing:".14em",

textTransform:"uppercase",

opacity:.42,

fontWeight:600
}}
>
@{profile.username}
</div>

{profile.bio && (

<div
style={{
maxWidth:700,

margin:"var(--space-xl) auto 0",

fontSize:"clamp(18px,3vw,26px)",

lineHeight:1.7,

opacity:.76
}}
>
{profile.bio}
</div>

)}

</div>

</section>


{/* MAIN CARD */}

<section
style={{
position:"relative",

marginTop:"calc(var(--space-3xl) * -1)",

padding:"0 24px var(--space-4xl)",

zIndex:4
}}
>

<div
style={{
maxWidth:760,

margin:"0 auto",

background:"rgba(255,255,255,.68)",

backdropFilter:"blur(20px)",

border:
"1px solid rgba(255,255,255,.45)",

borderRadius:42,

padding:"38px",

boxShadow:
"0 30px 90px rgba(0,0,0,.10)"
}}
>

{/* PROFILE */}

<div
style={{
display:"flex",

flexDirection:"column",

alignItems:"center",

textAlign:"center"
}}
>

<img
src={profile.avatar || ""}

style={{
width:126,
height:126,

borderRadius:"50%",

objectFit:"cover",

boxShadow:
"0 18px 50px rgba(0,0,0,.10)"
}}
/>

<div
style={{
marginTop:24,

fontSize:34,

fontWeight:700,

letterSpacing:"-.05em"
}}
>
{profile.display_name || profile.username}
</div>

</div>


{/* CTA LINKS */}

<div
style={{
display:"flex",
flexDirection:"column",

gap:"var(--space-md)",

marginTop:"var(--space-xl)"
}}
>

{primaryLinks.map((block,index)=>(

<a
key={block.id}

href={block?.data_json?.url || "#"}

target="_blank"

rel="noopener noreferrer"

style={{
padding:"24px 26px",

borderRadius:28,

background:

index===0
? "#2d2424"
: "#ffffff",

color:

index===0
? "#ffffff"
: "#2d2424",

textDecoration:"none",

display:"flex",

alignItems:"center",

justifyContent:"space-between",

border:
"1px solid rgba(0,0,0,.05)",

boxShadow:

index===0

? "0 18px 50px rgba(0,0,0,.12)"

: "0 10px 30px rgba(0,0,0,.04)"
}}
>

<div>

<div
style={{
fontSize:18,

fontWeight:600,

letterSpacing:"-.03em"
}}
>
{block?.data_json?.title}
</div>

{block?.data_json?.description && (

<div
style={{
marginTop:8,

fontSize:14,

lineHeight:1.6,

opacity:.62
}}
>
{block?.data_json?.description}
</div>

)}

</div>

<div
style={{
fontSize:20,

opacity:.38
}}
>
↗
</div>

</a>

))}

</div>


{/* SOCIALS */}

{Object.keys(socialLinks || {}).length > 0 && (

<div
style={{
display:"flex",

justifyContent:"center",

flexWrap:"wrap",

gap:14,

marginTop:42
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
padding:"12px 18px",

borderRadius:999,

background:"rgba(255,255,255,.75)",

border:
"1px solid rgba(0,0,0,.05)",

textDecoration:"none",

color:"#2d2424",

fontSize:14,

fontWeight:500
}}
>
{platform}
</a>

))

)}

</div>

)}

</div>

</section>

</div>

);

}
