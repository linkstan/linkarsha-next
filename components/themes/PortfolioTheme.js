"use client";

export default function PortfolioTheme({
profile,
appearance,
blocks
}){

const heroImage =
appearance?.hero?.image
||
appearance?.header?.heroImage
||
'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1600';

const featuredLinks = blocks.slice(0,4);

const secondaryLinks = blocks.slice(4,8);

return(

<div
style={{
minHeight:"100vh",

background:"#0f0f10",

fontFamily:"Inter, sans-serif",

color:"#ffffff",

overflow:"hidden",

position:"relative"
}}
>

{/* HERO IMAGE */}

<div
style={{
position:"absolute",
inset:0,

background:
`url("${heroImage}") center / cover no-repeat`,

transform:"scale(1.06)"
}}
/>

{/* DARK CINEMATIC OVERLAY */}

<div
style={{
position:"absolute",
inset:0,

background:
`
linear-gradient(
180deg,
rgba(0,0,0,.18) 0%,
rgba(0,0,0,.48) 42%,
rgba(8,8,10,.92) 100%
)
`
}}
/>

{/* ATMOSPHERIC LIGHT */}

<div
style={{
position:"absolute",

top:-240,
left:"50%",

transform:"translateX(-50%)",

width:920,
height:920,

borderRadius:"50%",

background:
"radial-gradient(circle, rgba(255,255,255,.10) 0%, transparent 72%)",

pointerEvents:"none"
}}
/>

{/* CONTENT */}

<div
style={{
position:"relative",

zIndex:2,

width:"100%",

maxWidth:1280,

margin:"0 auto",

padding:"110px 24px 120px"
}}
>

{/* TOP LABEL */}

<div
style={{
fontSize:12,

letterSpacing:".28em",

textTransform:"uppercase",

fontWeight:700,

opacity:.58,

marginBottom:26
}}
>
Visual Portfolio
</div>

{/* HERO GRID */}

<div
style={{
display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(320px,1fr))",

gap:54,

alignItems:"end"
}}
>

{/* LEFT SIDE */}

<div>

{/* NAME */}

<h1
style={{
fontSize:"clamp(64px,11vw,148px)",

lineHeight:.88,

letterSpacing:"-.08em",

fontWeight:700,

margin:0,

maxWidth:760
}}
>
{profile.display_name || profile.username}
</h1>

{/* USERNAME */}

<div
style={{
marginTop:24,

fontSize:14,

letterSpacing:".18em",

textTransform:"uppercase",

opacity:.42,

fontWeight:600
}}
>
@{profile.username}
</div>

{/* SUBTITLE */}

{appearance?.header?.subtitle && (

<div
style={{
marginTop:34,

maxWidth:640,

fontSize:"clamp(20px,4vw,34px)",

lineHeight:1.4,

opacity:.84,

fontWeight:500
}}
>
{appearance.header.subtitle}
</div>

)}

{/* BIO */}

{profile.bio && (

<div
style={{
marginTop:28,

maxWidth:620,

fontSize:17,

lineHeight:1.9,

opacity:.66
}}
>
{profile.bio}
</div>

)}

</div>

{/* RIGHT PANEL */}

<div
style={{
display:"flex",
justifyContent:"flex-end"
}}
>

<div
style={{
width:"100%",
maxWidth:420,

background:"rgba(255,255,255,.08)",

backdropFilter:"blur(20px)",

border:
"1px solid rgba(255,255,255,.10)",

borderRadius:40,

padding:"34px",

boxShadow:
"0 30px 80px rgba(0,0,0,.28)"
}}
>

{/* PROFILE */}

<div
style={{
display:"flex",
alignItems:"center",
gap:18,

marginBottom:30
}}
>

<div
style={{
width:72,
height:72,

borderRadius:"50%",

overflow:"hidden",

border:
"2px solid rgba(255,255,255,.35)"
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

<div>

<div
style={{
fontSize:18,
fontWeight:600
}}
>
{profile.display_name || profile.username}
</div>

<div
style={{
marginTop:6,

fontSize:13,

letterSpacing:".12em",

textTransform:"uppercase",

opacity:.48
}}
>
Creative Direction
</div>

</div>

</div>

{/* FEATURED LINKS */}

<div
style={{
display:"flex",
flexDirection:"column",
gap:16
}}
>

{featuredLinks.map((block,index)=>(

<a
key={block.id}

href={block?.data_json?.url || "#"}

target="_blank"

rel="noopener noreferrer"

style={{
display:"flex",

alignItems:"center",

justifyContent:"space-between",

padding:"22px 22px",

borderRadius:24,

textDecoration:"none",

background:

index===0

? "#ffffff"

: "rgba(255,255,255,.05)",

color:

index===0
? "#111111"
: "#ffffff",

border:
"1px solid rgba(255,255,255,.06)"
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

opacity:.4
}}
>
↗
</div>

</a>

))}

</div>

</div>

</div>


{/* SECONDARY SECTION */}

{secondaryLinks.length > 0 && (

<div
style={{
marginTop:120
}}
>

<div
style={{
fontSize:13,

letterSpacing:".24em",

textTransform:"uppercase",

opacity:.42,

marginBottom:34
}}
>
Selected Destinations
</div>

<div
style={{
display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(260px,1fr))",

gap:24
}}
>

{secondaryLinks.map((block,index)=>(

<a
key={block.id}

href={block?.data_json?.url || "#"}

target="_blank"

rel="noopener noreferrer"

style={{
minHeight:240,

padding:"30px",

borderRadius:34,

textDecoration:"none",

background:
"rgba(255,255,255,.04)",

border:
"1px solid rgba(255,255,255,.08)",

display:"flex",
flexDirection:"column",
justifyContent:"space-between",

backdropFilter:"blur(14px)"
}}
>

<div
style={{
fontSize:12,

letterSpacing:".16em",

textTransform:"uppercase",

opacity:.4
}}
>
0{index+1}
</div>

<div
style={{
marginTop:34,

fontSize:34,

lineHeight:1,

fontWeight:700,

letterSpacing:"-.06em",

color:"#ffffff"
}}
>
{block?.data_json?.title}
</div>

<div
style={{
marginTop:20,

fontSize:15,

lineHeight:1.7,

opacity:.62,

color:"#ffffff"
}}
>
{block?.data_json?.description
||
"Curated visual experience and premium destination."}
</div>

<div
style={{
marginTop:30,

fontSize:14,

letterSpacing:".14em",

textTransform:"uppercase",

opacity:.46,

color:"#ffffff"
}}
>
Open ↗
</div>

</a>

))}

        </div>

      </div>

    )}

  </div>

</div>

</div>

);

}
