"use client";

import { useState } from "react";

export default function TextAppearancePage(){

const [font,setFont] =
useState("Inter");

const [align,setAlign] =
useState("center");

const [nameSize,setNameSize] =
useState(56);


return(

<div
style={{
padding:40
}}
>

<h1
style={{
fontSize:48,
fontWeight:800,
marginBottom:30
}}
>
Typography
</h1>


{/* FONT FAMILY */}

<div
style={{
background:"#fff",
padding:24,
borderRadius:24,
border:"1px solid #ececec",
marginBottom:24
}}
>

<h2
style={{
fontSize:28,
marginBottom:20
}}
>
Font Family
</h2>

<div
style={{
display:"flex",
gap:12,
flexWrap:"wrap"
}}
>

{[
"Inter",
"Poppins",
"DM Sans",
"Sora",
"Outfit",
"Playfair Display"
].map((item)=>(

<button
key={item}

onClick={()=>{
setFont(item);
}}

style={{

padding:"12px 18px",

borderRadius:999,

border:
font === item
? "none"
: "1px solid #ddd",

background:
font === item
? "#000"
: "#fff",

color:
font === item
? "#fff"
: "#111",

cursor:"pointer",

fontFamily:item,

fontSize:15

}}
>

{item}

</button>

))}

</div>

</div>



{/* ALIGNMENT */}

<div
style={{
background:"#fff",
padding:24,
borderRadius:24,
border:"1px solid #ececec",
marginBottom:24
}}
>

<h2
style={{
fontSize:28,
marginBottom:20
}}
>
Alignment
</h2>

<div
style={{
display:"flex",
gap:12
}}
>

{[
"left",
"center",
"right"
].map((item)=>(

<button
key={item}

onClick={()=>{
setAlign(item);
}}

style={{

padding:"12px 18px",

borderRadius:999,

border:
align === item
? "none"
: "1px solid #ddd",

background:
align === item
? "#000"
: "#fff",

color:
align === item
? "#fff"
: "#111",

cursor:"pointer",

textTransform:"capitalize"

}}
>

{item}

</button>

))}

</div>

</div>



{/* NAME SIZE */}

<div
style={{
background:"#fff",
padding:24,
borderRadius:24,
border:"1px solid #ececec",
marginBottom:24
}}
>

<h2
style={{
fontSize:28,
marginBottom:20
}}
>
Name Size
</h2>

<input
type="range"
min="32"
max="90"

value={nameSize}

onChange={(e)=>{
setNameSize(e.target.value);
}}

style={{
width:"100%"
}}
/>

<div
style={{
marginTop:14,
fontSize:15,
opacity:.7
}}
>
{nameSize}px
</div>

</div>



{/* PREVIEW */}

<div
style={{
background:"#fff",
padding:40,
borderRadius:32,
border:"1px solid #ececec",
marginTop:40
}}
>

<div
style={{
textAlign:align
}}
>

<img
src="https://i.pravatar.cc/160"
alt="profile"

style={{
width:110,
height:110,
borderRadius:"50%",
objectFit:"cover",
marginBottom:24
}}
/>

<h1
style={{

fontFamily:font,

fontSize:Number(nameSize),

lineHeight:1,

marginBottom:16,

fontWeight:800

}}
>
Ghamandi
</h1>

<div
style={{
fontSize:22,
opacity:.6,
marginBottom:20
}}
>
@ghamandi
</div>

<p
style={{
fontSize:18,
opacity:.75
}}
>
Restaurant and Cafe focused creator
</p>

</div>

</div>

</div>

);

}
