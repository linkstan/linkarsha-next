"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home(){

const [username,setUsername]=useState("");
const [previewName,setPreviewName]=useState("creator");
const [count,setCount]=useState(0);
const router=useRouter();

function handleClaim(){
if(!username) return;
router.push(`/signup?username=${username}`);
}

function goLogin(){
router.push("/login");
}

/* live preview username */

useEffect(()=>{
if(!username){
setPreviewName("creator");
return;
}
setPreviewName(username);
},[username]);

/* animated counter */

useEffect(()=>{
let i=0;
const interval=setInterval(()=>{
i+=5;
if(i>=1200){
i=1200;
clearInterval(interval);
}
setCount(i);
},10);
return ()=>clearInterval(interval);
},[]);

return(

<div className="home">

{/* NAVBAR */}

<div className="navbar">

<div className="logo">
Linkarsha
</div>

<button className="login-btn" onClick={goLogin}>
Login
</button>

</div>


{/* HERO */}

<div className="hero">

<div className="hero-left">

<h1>
One link.<br/>
All your content.
</h1>

<p>
Create a beautiful link page for Instagram,
TikTok and everywhere else.
</p>

<div className="claim-box">

<input
placeholder="yourname"
value={username}
onChange={(e)=>setUsername(e.target.value.toLowerCase())}
/>

<button onClick={handleClaim}>
Claim
</button>

</div>

</div>


{/* PHONE PREVIEW */}

<div className="hero-right">

<div className="glow"></div>

<div className="phone">

<div className="phone-user">
@{previewName}
</div>

<div className="phone-link">Instagram</div>
<div className="phone-link">YouTube</div>
<div className="phone-link">My Website</div>

</div>

</div>

</div>


{/* STATS */}

<div className="stats">

<div className="stat">
<h2>{count}+</h2>
<p>Creators</p>
</div>

<div className="stat">
<h2>2M+</h2>
<p>Clicks</p>
</div>

<div className="stat">
<h2>50+</h2>
<p>Themes</p>
</div>

</div>


{/* CREATOR EXAMPLES */}

<div className="examples">

<h2>Creators using Linkarsha</h2>

<div className="example-grid">

<div className="example">
<div className="avatar"></div>
<div>@fitnesscoach</div>
</div>

<div className="example">
<div className="avatar"></div>
<div>@musicartist</div>
</div>

<div className="example">
<div className="avatar"></div>
<div>@photographer</div>
</div>

</div>

</div>


{/* THEME PREVIEWS */}

<div className="themes">

<h2>Beautiful Themes</h2>

<div className="theme-grid">

<div className="theme-card dark"></div>
<div className="theme-card purple"></div>
<div className="theme-card light"></div>

</div>

</div>


{/* CTA */}

<div className="cta-section">

<h2>Start building your creator page</h2>

<button onClick={handleClaim} className="cta-btn">
Create your Linkarsha
</button>

</div>


<style jsx>{`

.home{
min-height:100vh;
color:white;
font-family:-apple-system,BlinkMacSystemFont,sans-serif;
background:linear-gradient(135deg,#0b0b12,#151520,#0b0b12);
overflow:hidden;
}

/* NAVBAR */

.navbar{
display:flex;
justify-content:space-between;
align-items:center;
padding:25px 40px;
}

.logo{
font-size:22px;
font-weight:700;
}

.login-btn{
background:transparent;
border:none;
color:#aaa;
cursor:pointer;
font-size:14px;
}

/* HERO */

.hero{
display:flex;
align-items:center;
justify-content:center;
gap:80px;
padding:80px 40px;
flex-wrap:wrap;
}

.hero-left{
max-width:480px;
}

.hero-left h1{
font-size:60px;
line-height:1.1;
margin-bottom:20px;
}

.hero-left p{
opacity:.7;
margin-bottom:30px;
}

/* CLAIM */

.claim-box{
display:flex;
gap:10px;
}

.claim-box input{
padding:14px;
width:220px;
background:#111;
border:1px solid #222;
color:white;
border-radius:10px;
}

.claim-box button{
padding:14px;
border-radius:10px;
font-weight:600;
border:none;
cursor:pointer;
background:linear-gradient(45deg,#6a5cff,#9c8cff);
color:white;
}

/* PHONE */

.hero-right{
position:relative;
}

.glow{
position:absolute;
width:320px;
height:320px;
background:radial-gradient(circle,rgba(120,120,255,0.4),transparent 70%);
top:50%;
left:50%;
transform:translate(-50%,-50%);
filter:blur(60px);
}

.phone{
width:260px;
height:480px;
background:rgba(255,255,255,0.05);
backdrop-filter:blur(20px);
border-radius:30px;
padding:20px;
border:1px solid rgba(255,255,255,0.08);
box-shadow:0 0 60px rgba(120,120,255,0.25);
animation:float 6s ease-in-out infinite;
position:relative;
z-index:2;
}

.phone-user{
text-align:center;
margin-bottom:20px;
font-weight:600;
}

.phone-link{
background:#1a1a25;
padding:12px;
border-radius:10px;
margin-top:10px;
text-align:center;
}

/* FLOAT */

@keyframes float{
0%{transform:translateY(0px);}
50%{transform:translateY(-15px);}
100%{transform:translateY(0px);}
}

/* STATS */

.stats{
display:flex;
justify-content:center;
gap:60px;
padding:60px 20px;
text-align:center;
}

.stat h2{
font-size:36px;
}

/* CREATOR EXAMPLES */

.examples{
text-align:center;
padding:80px 20px;
}

.example-grid{
display:flex;
justify-content:center;
gap:30px;
margin-top:40px;
flex-wrap:wrap;
}

.example{
background:#111;
padding:20px;
border-radius:14px;
width:150px;
}

.avatar{
width:60px;
height:60px;
border-radius:50%;
background:#222;
margin:auto;
margin-bottom:10px;
}

/* THEMES */

.themes{
text-align:center;
padding:80px 20px;
}

.theme-grid{
display:flex;
justify-content:center;
gap:30px;
margin-top:40px;
flex-wrap:wrap;
}

.theme-card{
width:160px;
height:220px;
border-radius:20px;
}

.theme-card.dark{
background:#111;
}

.theme-card.purple{
background:linear-gradient(135deg,#6a5cff,#9c8cff);
}

.theme-card.light{
background:#eee;
}

/* CTA */

.cta-section{
text-align:center;
padding:80px 20px;
}

.cta-btn{
padding:16px 28px;
border-radius:12px;
border:none;
cursor:pointer;
font-weight:600;
background:linear-gradient(45deg,#6a5cff,#9c8cff);
color:white;
}

@media(max-width:768px){

.hero-left h1{
font-size:42px;
}

.hero{
padding-top:40px;
}

.claim-box{
flex-direction:column;
}

.claim-box input{
width:100%;
}

.stats{
flex-direction:column;
gap:20px;
}

}

`}</style>

</div>

)

}
