"use client";

export default function BlueprintTheme({
profile,
appearance,
blocks,
socialLinks,
buildSocialUrl
}){

const primary = blocks.slice(0,6);

return(

<div
style={{
width:"100%",
minHeight:"100vh",

background:
"linear-gradient(180deg,#2f5668 0%,#264958 100%)",

display:"flex",
flexDirection:"column",
alignItems:"center",

position:"relative",
overflow:"hidden"
}}
>

{/* GRID BACKGROUND */}

<div
style={{
position:"absolute",
inset:0,

backgroundImage:
`
linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px),
linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)
`,

backgroundSize:"42px 42px",

opacity:.55,

pointerEvents:"none"
}}
/>


{/* TOP PANEL */}

<div
style={{
width:"100%",
height:320,

background:
"linear-gradient(180deg,#efe6dc 0%,#e4d7c8 100%)",

position:"relative",

overflow:"hidden",

borderBottom:
"1px solid rgba(0,0,0,.08)"
}}
>

{/* BLUEPRINT LINES */}

<div
style={{
position:"absolute",
inset:0,

backgroundImage:
`
linear-gradient(rgba(47,86,104,.08) 1px, transparent 1px),
linear-gradient(90deg, rgba(47,86,104,.08) 1px, transparent 1px)
`,

backgroundSize:"34px 34px"
}}
/>


{/* TECHNICAL LABEL */}

<div
style={{
position:"absolute",
top:28,
left:28,

fontSize:12,
letterSpacing:".24em",
textTransform:"uppercase",

color:"rgba(47,86,104,.58)",

fontWeight:700
}}
>
Blueprint Identity
</div>


{/* DISPLAY NAME */}

<div
style={{
position:"absolute",

left:"50%",
top:110,

transform:"translateX(-50%)",

width:"100%",
padding:"0 24px",

textAlign:"center"
}}
>

<div
style={{
fontSize:"clamp(44px,9vw,92px)",

fontWeight:700,

letterSpacing:"-.07em",

lineHeight:.92,

color:"#23424f"
}}
>
{profile.display_name || profile.username}
</div>


<div
style={{
marginTop:18,

fontSize:14,

letterSpacing:".18em",

textTransform:"uppercase",

color:"rgba(47,86,104,.62)",

fontWeight:600
}}
>
@{profile.username}
</div>

</div>


{/* BOTTOM CURVE */}

<svg
viewBox="0 0 1440 320"
preserveAspectRatio="none"
style={{
position:"absolute",
bottom:0,
left:0,
width:"100%",
height:170
}}
>

<path
fill="#2f5668"
d="
M0,220
C220,170 360,250 620,210
C860,175 1080,80 1440,20
L1440,320
L0,320
Z"
/>

</svg>

</div>


{/* AVATAR */}

<div
style={{
marginTop:-78,
marginBottom:52,
zIndex:5,
position:"relative"
}}
>

{/* OUTER FRAME */}

<div
style={{
position:"absolute",
inset:-14,

border:
"1px solid rgba(255,255,255,.18)",

borderRadius:"50%"
}}
/>

<div
style={{
width:128,
height:128,

borderRadius:"50%",

border:"8px solid #d9c8b7",

overflow:"hidden",

background:"#ffffff",

boxShadow:
"0 20px 50px rgba(0,0,0,.22)"
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

</div>


{/* BIO */}

{profile.bio && (

<div
style={{
maxWidth:620,

padding:"0 28px",

textAlign:"center",

fontSize:17,

lineHeight:1.8,

color:"rgba(255,255,255,.78)",

marginBottom:54
}}
>
{profile.bio}
</div>

)}


{/* TECHNICAL GRID */}

<div
style={{
width:"100%",
maxWidth:920,

padding:"0 24px 120px",

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(240px,1fr))",

gap:24
}}
>

{primary.map((block,index)=>{

return(

<a
key={block.id}

href={block?.data_json?.url || "#"}

target="_blank"

rel="noopener noreferrer"

style={{

position:"relative",

minHeight:150,

padding:"28px",

background:
"rgba(255,255,255,.04)",

border:
"1px solid rgba(255,255,255,.10)",

backdropFilter:"blur(8px)",

textDecoration:"none",

display:"flex",
flexDirection:"column",
justifyContent:"space-between",

transition:
"transform .22s ease, border-color .22s ease",

overflow:"hidden"
}}
>

{/* CORNER LINES */}

<div
style={{
position:"absolute",
top:14,
left:14,
width:22,
height:22,

borderTop:
"1px solid rgba(255,255,255,.32)",

borderLeft:
"1px solid rgba(255,255,255,.32)"
}}
/>

<div
style={{
position:"absolute",
bottom:14,
right:14,
width:22,
height:22,

borderBottom:
"1px solid rgba(255,255,255,.32)",

borderRight:
"1px solid rgba(255,255,255,.32)"
}}
/>


{/* INDEX */}

<div
style={{
fontSize:12,

letterSpacing:".18em",

textTransform:"uppercase",

color:"rgba(255,255,255,.42)",

marginBottom:24
}}
>
0{index+1}
</div>


{/* TITLE */}

<div
style={{
fontSize:24,

lineHeight:1.05,

fontWeight:700,

letterSpacing:"-.05em",

color:"#f2e7da",

maxWidth:180
}}
>
{block?.data_json?.title}
</div>


{/* DESCRIPTION */}

<div
style={{
marginTop:18,

fontSize:14,

lineHeight:1.7,

color:"rgba(255,255,255,.62)"
}}
>
{block?.data_json?.description ||
"Technical destination link"}
</div>


{/* FOOTER */}

<div
style={{
marginTop:30,

display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<div
style={{
fontSize:12,

letterSpacing:".16em",

textTransform:"uppercase",

color:"rgba(255,255,255,.42)"
}}
>
Open Link
</div>

<div
style={{
fontSize:22,

color:"rgba(255,255,255,.42)"
}}
>
↗
</div>

</div>

</a>

);

})}

</div>

</div>

);

}
