"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

const [username,setUsername] = useState("");
const router = useRouter();

function handleClaim(){
if(!username) return;
router.push(`/signup?username=${username}`);
}

function goLogin(){
router.push("/login");
}

return (

<div className="home">

{/* NAVBAR */}

<div className="navbar">

<div className="logo">
Linkarsha
</div>

<div className="nav-right">

<button className="login-btn" onClick={goLogin}>
Login
</button>

</div>

</div>


{/* HERO SECTION */}

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

<div className="phone">

<div className="phone-user">
@creator
</div>

<div className="phone-link">Instagram</div>
<div className="phone-link">YouTube</div>
<div className="phone-link">My Website</div>

</div>

</div>

</div>


{/* FEATURES */}

<div className="features">

<div className="feature">
<h3>⚡ Fast Setup</h3>
<p>Create your page in seconds.</p>
</div>

<div className="feature">
<h3>🎨 Custom Design</h3>
<p>Customize your creator page.</p>
</div>

<div className="feature">
<h3>📊 Analytics</h3>
<p>Track clicks and engagement.</p>
</div>

</div>


{/* FINAL CTA */}

<div className="cta-section">

<h2>
Start building your creator page
</h2>

<button onClick={handleClaim} className="cta-btn">
Create your Linkarsha
</button>

</div>


<style jsx>{`

.home{
min-height:100vh;
background:#0b0b12;
color:white;
font-family:-apple-system,BlinkMacSystemFont,sans-serif;
}

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
background:white;
color:black;
border-radius:10px;
font-weight:600;
border:none;
cursor:pointer;
}

.hero-right{
position:relative;
}

.phone{
width:260px;
height:480px;
background:#111;
border-radius:30px;
padding:20px;
box-shadow:0 0 60px rgba(120,120,255,0.25);
animation:float 6s ease-in-out infinite;
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

.features{
display:flex;
justify-content:center;
gap:40px;
padding:60px 40px;
flex-wrap:wrap;
}

.feature{
background:#111;
padding:30px;
border-radius:16px;
width:220px;
text-align:center;
border:1px solid #1c1c25;
}

.feature p{
opacity:.7;
}

.cta-section{
text-align:center;
padding:80px 20px;
}

.cta-btn{
background:white;
color:black;
padding:16px 26px;
border-radius:12px;
font-size:18px;
font-weight:600;
border:none;
cursor:pointer;
}

@keyframes float{
0%{transform:translateY(0px);}
50%{transform:translateY(-12px);}
100%{transform:translateY(0px);}
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

}

`}</style>

</div>

)

}
