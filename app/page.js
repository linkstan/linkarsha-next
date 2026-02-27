export default function Home() {
  return (
    <div dangerouslySetInnerHTML={{__html: `
    
<style>
 *{margin:0;padding:0;box-sizing:border-box}
html,body{
max-width:100%;
overflow-x:hidden;
}
body{
font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
background:#0b0b12;
color:white;
overflow-x:hidden;
}

/* ===== Background ===== */
.bg{
position:fixed;
inset:0;
z-index:-2;
background:linear-gradient(270deg,#0f0c29,#1a1a2e,#24243e,#302b63,#0f0c29);
background-size:800% 800%;
animation:move 18s ease infinite;
}
@keyframes move{
0%{background-position:0% 50%}
50%{background-position:100% 50%}
100%{background-position:0% 50%}
}

.blob{
position:absolute;
width:600px;height:600px;
border-radius:50%;
filter:blur(140px);
opacity:.25;
z-index:-1;
}
.blob1{background:#7c3aed;top:-200px;left:-200px;}
.blob2{background:#6366f1;bottom:-200px;right:-200px;}

/* ===== Navbar ===== */
.topbar{
position:fixed;
top:18px;
left:50%;
transform:translateX(-50%);
width:92%;
max-width:1100px;
z-index:9999;
background:rgba(255,255,255,0.08);
backdrop-filter:blur(18px);
border-radius:28px;
padding:14px 18px;
display:flex;
align-items:center;
justify-content:space-between;
border:1px solid rgba(255,255,255,0.12);
}

.logoText{font-size:20px;font-weight:700;}
.topActions{display:flex;align-items:center;gap:12px;}

.loginBtn{
padding:10px 18px;
border-radius:14px;
background:rgba(255,255,255,0.15);
text-decoration:none;
font-weight:600;
color:white;
}

.signupBtn{
padding:11px 22px;
border-radius:18px;
background:linear-gradient(90deg,#6a5cff,#8f7bff);
color:white;
text-decoration:none;
font-weight:700;
}

.menuBtn{
font-size:22px;
padding:8px 12px;
border-radius:10px;
background:rgba(255,255,255,0.12);
}

/* ===== HERO ===== */
.hero{
display:flex;
min-height:100vh;
padding-top:90px;
align-items:center;
}

.hero-left{width:50%;padding:60px;}

.headline{font-size:64px;line-height:1.05;font-weight:900;}

.sub{
margin-top:20px;
font-size:18px;
color:#bbb;
max-width:520px;
}

/* ===== CLAIM BOX ===== */
.claim-box{
margin-top:35px;
background:rgba(255,255,255,0.06);
backdrop-filter:blur(16px);
border-radius:22px;
padding:18px;
display:flex;
align-items:center;
gap:16px;
position:relative;
width:fit-content;
}

.claim-left{
font-size:18px;
color:#aaa;
}
.claim-left span{color:white;font-weight:700;}

.claim-btn{
background:linear-gradient(90deg,#6a5cff,#8f7bff);
border:none;
padding:14px 22px;
color:white;
border-radius:16px;
font-weight:600;
cursor:pointer;
}

.free-badge{
position:absolute;
top:-12px;
right:18px;
background:linear-gradient(90deg,#00ffa3,#00c3ff);
color:black;
font-size:12px;
padding:4px 10px;
border-radius:20px;
font-weight:700;
}

/* ===== Flip Card ===== */
.hero-right{
width:50%;
display:flex;
justify-content:center;
align-items:center;
}

.scene{width:280px;height:520px;perspective:1200px;}

.card{
width:100%;
height:100%;
position:relative;
transform-style:preserve-3d;
}

.face{
position:absolute;
width:100%;
height:100%;
backface-visibility:hidden;
border-radius:35px;
overflow:hidden;
box-shadow:0 40px 80px rgba(0,0,0,0.45);
}

.face img{width:100%;height:100%;object-fit:cover;}
.back{transform:rotateY(180deg);}
.flip{animation:flipAnim 1.2s ease forwards;}

@keyframes flipAnim{
0%{transform:rotateY(0deg);}
100%{transform:rotateY(180deg);}
}

/* ===== PAGE 2 ===== */
.premium-section{
display:flex;
align-items:center;
justify-content:space-between;
padding:120px 8%;
min-height:100vh;
}

.premium-left{width:45%;}
.premium-left h2{font-size:56px;font-weight:900;margin-bottom:20px;}
.premium-left p{color:#aaa;font-size:20px;margin-bottom:30px;}
.premium-features div{margin:14px 0;color:#ddd;font-size:18px;}

.premium-btn{
display:inline-block;
margin-top:30px;
padding:16px 34px;
background:white;
color:black;
border-radius:14px;
font-weight:700;
text-decoration:none;
}

/* ===== PAGE 3 FLOW ===== */
.flow-section{
display:flex;
align-items:center;
justify-content:space-between;
padding:100px 8%;
min-height:100vh;
}

.flow-left{width:45%;}
.flow-left h2{font-size:48px;font-weight:900;margin-bottom:20px;}
.flow-left p{color:#aaa;font-size:18px;margin-bottom:25px;line-height:1.6;}

.flow-btn{
display:inline-block;
padding:14px 28px;
background:white;
color:black;
border-radius:14px;
font-weight:700;
text-decoration:none;
}

.flow-right{width:50%;display:flex;justify-content:center;}

.flow-stage{position:relative;width:700px;height:350px;}

.flow-card{
position:absolute;
width:200px;height:200px;
border-radius:28px;
left:50%;top:50%;
transform:translate(-50%,-50%);
box-shadow:0 40px 90px rgba(0,0,0,0.4);
opacity:0;
display:flex;
flex-direction:column;
align-items:center;
justify-content:flex-start;
padding-top:18px;
}

.profile{
width:50px;height:50px;border-radius:50%;
background:rgba(255,255,255,0.95);
margin-bottom:14px;
display:flex;align-items:center;justify-content:center;
font-size:22px;color:black;
}

.logo{font-size:28px;color:white;margin-top:6px;}

.tag{
position:absolute;
right:-70px;
bottom:35px;
padding:6px 12px;
border-radius:20px;
font-size:12px;
font-weight:bold;
color:#fff;
box-shadow:0 8px 18px rgba(0,0,0,.2);
}

.c1{background:#E1306C;}
.c2{background:#1877F2;}
.c3{background:#25D366;}
.c4{background:#111;}
.c5{background:#FFFC00;color:black;}
.c6{background:#4C75A3;}

.t1{background:#E1306C;}
.t2{background:#1877F2;}
.t3{background:#25D366;}
.t4{background:#111;}
.t5{background:#FFFC00;color:black;}
.t6{background:#4C75A3;}

@keyframes flow{
0%{transform:translate(-50%,-50%) translateX(-350px) scale(.8);opacity:0;}
15%{opacity:1;}
50%{transform:translate(-50%,-50%) translateX(0px) scale(1);}
85%{transform:translate(-50%,-50%) translateX(350px) scale(.8);opacity:0;}
100%{opacity:0;}
}

.flow-card:nth-child(1){animation:flow 12s linear infinite;}
.flow-card:nth-child(2){animation:flow 12s linear infinite 2s;}
.flow-card:nth-child(3){animation:flow 12s linear infinite 4s;}
.flow-card:nth-child(4){animation:flow 12s linear infinite 6s;}
.flow-card:nth-child(5){animation:flow 12s linear infinite 8s;}
.flow-card:nth-child(6){animation:flow 12s linear infinite 10s;}

/* ===== PAGE 4 ANALYTICS ===== */
.analytics-section{
display:flex;
align-items:center;
justify-content:space-between;
padding:120px 8%;
min-height:100vh;
}

.analytics-left{width:45%;}
.analytics-left h2{font-size:54px;font-weight:900;margin-bottom:20px;}
.analytics-left p{color:#aaa;font-size:18px;line-height:1.6;margin-bottom:30px;}

.analytics-btn{
padding:16px 34px;
background:#d8b4e2;
color:black;
border-radius:30px;
font-weight:700;
text-decoration:none;
}

.analytics-right{width:50%;display:flex;justify-content:center;}

.dash-grid{
display:grid;
grid-template-columns:220px 220px;
gap:22px;
}

.dash-card{
border-radius:26px;
padding:26px;
color:white;
box-shadow:0 30px 60px rgba(0,0,0,.35);
animation:float 6s ease-in-out infinite;
}

.dash-card:nth-child(2){animation-delay:.5s}
.dash-card:nth-child(3){animation-delay:1s}
.dash-card:nth-child(4){animation-delay:1.5s}

@keyframes float{
0%{transform:translateY(0)}
50%{transform:translateY(-14px)}
100%{transform:translateY(0)}
}

.green{background:#6b734a;}
.purple{background:#c6a6cc;color:#111;}
.pink{background:linear-gradient(180deg,#ff00cc,#a100ff);}
.blue{background:#172a9c;}
.wide{grid-column:span 2;}

.num{font-size:34px;font-weight:800;margin-top:10px}
.big{font-size:46px}
.label{opacity:.8;margin-top:6px}

@media(max-width:900px){
.hero,.premium-section,.flow-section,.analytics-section{flex-direction:column;text-align:center}
.hero-left,.hero-right,.premium-left,.flow-left,.flow-right,.analytics-left,.analytics-right{width:100%}
}
  /* ===== PAGE 5 RIGHT HALF INSERT ===== */
.page5-wrap{
width:100%;
display:flex;
}

.page5-left{
width:50%;
}

.page5-right{
width:50%;
display:flex;
align-items:center;
justify-content:center;
}

/* 3D CARD SYSTEM */
.linkarsha-scene{
width:340px;
height:620px;
position:relative;
transform-style:preserve-3d;
animation: godSpeed2 3.8s infinite linear;
}

@keyframes godSpeed2{
0%{transform:rotateY(-40deg) rotateX(12deg);}
55%{transform:rotateY(-15deg) rotateX(12deg);}
100%{transform:rotateY(320deg) rotateX(12deg);}
}

.lcard{
position:absolute;
left:50%;
transform-style:preserve-3d;
overflow:hidden;
}

/* card1 */
.lcard1{
width:300px;
height:600px;
margin-left:-150px;
top:10px;
border-radius:32px;
transform:translateZ(120px);
box-shadow:0 60px 120px rgba(0,0,0,.45);
}

/* card2 */
.lcard2{
width:255px;
height:250px;
margin-left:-127.5px;
top:340px;
border-radius:22px;
transform:translateZ(200px) rotateX(10deg);
box-shadow:0 40px 80px rgba(0,0,0,.4);
}

/* card3 */
.lcard3{
width:70px;
height:70px;
border-radius:18px;
right:40px;
top:380px;
transform:translateZ(260px) rotateY(-20deg);
box-shadow:0 20px 40px rgba(0,0,0,.4);
}

/* image slides */
.lslide{
position:absolute;
width:100%;
height:100%;
background-size:cover;
background-position:center;
opacity:0;
animation: imgCycle2 19s infinite;
}

@keyframes imgCycle2{
0%,18%{opacity:1}
20%,38%{opacity:0}
40%,58%{opacity:1}
60%,78%{opacity:0}
80%,98%{opacity:1}
100%{opacity:0}
}
  /* ===== PAGE 6 PRICING ===== */

.pricing-section{
min-height:100vh;
padding:120px 8%;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
}

.pricing-title{
font-size:56px;
font-weight:900;
margin-bottom:10px;
text-align:center;
}

.pricing-subtitle{
color:#aaa;
font-size:18px;
margin-bottom:60px;
text-align:center;
max-width:700px;
}

.pricing-grid{
display:grid;
grid-template-columns:1fr 1fr;
gap:30px;
width:100%;
max-width:900px;
}

.pricing-card{
background:rgba(255,255,255,0.05);
backdrop-filter:blur(18px);
border-radius:28px;
padding:40px;
border:1px solid rgba(255,255,255,0.12);
box-shadow:0 30px 70px rgba(0,0,0,.35);
display:flex;
flex-direction:column;
position:relative;
}

.plan-name{
font-size:24px;
font-weight:800;
}

.plan-price{
font-size:42px;
font-weight:900;
margin:10px 0;
}

.plan-desc{
color:#aaa;
margin-bottom:20px;
}

.plan-features{
line-height:2;
font-size:16px;
flex:1;
}

.plan-btn{
margin-top:20px;
padding:16px;
border-radius:14px;
border:none;
background:rgba(255,255,255,0.15);
color:white;
font-weight:700;
cursor:pointer;
}

.pro-plan{
background:linear-gradient(180deg,#6a5cff,#8f7bff);
box-shadow:0 40px 90px rgba(106,92,255,.35);
}

.pro-btn{
background:black;
font-weight:900;
}

.badge{
position:absolute;
top:-12px;
right:20px;
background:#00ffa3;
color:black;
font-weight:800;
padding:5px 12px;
border-radius:20px;
font-size:12px;
}

.muted{
opacity:.5;
}

/* ===== MOBILE VERSION ===== */

@media(max-width:768px){

.pricing-section{
padding:80px 5%;
}

.pricing-title{
font-size:32px;
}

.pricing-subtitle{
font-size:14px;
margin-bottom:30px;
}

.pricing-grid{
gap:15px;
}

.pricing-card{
padding:20px;
border-radius:20px;
}

.plan-name{
font-size:18px;
}

.plan-price{
font-size:28px;
}

.plan-features{
font-size:13px;
line-height:1.7;
}

.plan-btn{
padding:12px;
font-size:14px;
}

.badge{
font-size:9px;
padding:3px 8px;
}

}
  /* FAQ */
.faqItem{
background:rgba(255,255,255,0.05);
border:1px solid rgba(255,255,255,0.1);
margin-bottom:16px;
border-radius:18px;
backdrop-filter:blur(12px);
overflow:hidden;
}

.faqQ{
padding:20px;
font-size:clamp(15px,2vw,18px);
font-weight:600;
cursor:pointer;
display:flex;
justify-content:space-between;
align-items:center;
}

.faqQ span{
transition:.3s;
}

.faqA{
max-height:0;
overflow:hidden;
padding:0 20px;
color:#bbb;
line-height:1.7;
transition:.4s;
font-size:clamp(14px,1.8vw,16px);
}

.faqItem.active .faqA{
max-height:300px;
padding:0 20px 20px 20px;
}

.faqItem.active .faqQ span{
transform:rotate(180deg);
}
  /* NEW PAGE 3 RIGHT ANIMATION */

.flow-right .card{
position:absolute;
width:240px;
height:270px;
border-radius:30px;
left:50%;
top:50%;
transform:translate(-50%,-50%) scale(.2);
box-shadow:0 60px 140px rgba(0,0,0,.7);
opacity:0;
overflow:visible;
padding:20px;
}

.flow-right .profile{
width:60px;
height:60px;
border-radius:50%;
background:url('https://randomuser.me/api/portraits/men/32.jpg');
background-size:cover;
border:3px solid rgba(255,255,255,.6);
position:absolute;
top:18px;
left:18px;
}

.flow-right .logo{
position:absolute;
top:22px;
right:22px;
font-size:38px;
}

.flow-right .logo svg{
width:32px;
height:32px;
}

.flow-right .lines{
position:absolute;
top:110px;
left:50%;
transform:translateX(-50%);
width:150px;
}
.flow-right .lines div{
height:6px;
background:rgba(255,255,255,.35);
margin:8px 0;
border-radius:4px;
}

.flow-right .tag{
position:absolute;
right:-95px;
bottom:28px;
padding:12px 22px;
border-radius:22px;
font-weight:900;
font-size:18px;
color:white;
border:2px solid #fff;
box-shadow:0 0 0 2px rgba(0,0,0,.7);
}

/* COLORS */
.flow-right .c1{background:#E1306C;}
.flow-right .c2{background:#1877F2;}
.flow-right .c3{background:#25D366;}
.flow-right .c4{background:#FFFC00;color:black;}
.flow-right .c5{background:#000;}
.flow-right .c6{background:#4C75A3;}

.flow-right .c1 .tag{background:#E1306C;}
.flow-right .c2 .tag{background:#1877F2;}
.flow-right .c3 .tag{background:#25D366;}
.flow-right .c4 .tag{background:#FFFC00;color:black;border-color:black;}
.flow-right .c5 .tag{background:#000;}
.flow-right .c6 .tag{background:#4C75A3;}

/* ANIMATION */
@keyframes assemble{
0%{transform:translate(-50%,-50%) scale(.2);opacity:0;}
15%{opacity:1;transform:translate(-50%,-50%) scale(1);}
35%{transform:translate(-50%,-50%) scale(1);}
60%{transform:translate(-150%,-50%) scale(.85);opacity:.9;}
80%{transform:translate(120%,-50%) scale(.85);opacity:.9;}
100%{opacity:0;transform:translate(260%,-50%) scale(.6);}
}

.flow-right .card:nth-child(1){animation:assemble 14s infinite;}
.flow-right .card:nth-child(2){animation:assemble 14s infinite 2.2s;}
.flow-right .card:nth-child(3){animation:assemble 14s infinite 4.4s;}
.flow-right .card:nth-child(4){animation:assemble 14s infinite 6.6s;}
.flow-right .card:nth-child(5){animation:assemble 14s infinite 8.8s;}
.flow-right .card:nth-child(6){animation:assemble 14s infinite 11s;}
  /* ===== IPHONE PAGE 2 ===== */

.scene{
width:320px;
height:540px;
perspective:1200px;
position:relative;
}

.phone{
width:250px;
height:500px;
background:linear-gradient(180deg,#1a1a2e,#111);
border-radius:55px;
position:relative;
box-shadow:
0 60px 120px rgba(0,0,0,.7),
inset 0 0 0 2px rgba(255,255,255,.08);
animation:phoneFloat 12s infinite ease-in-out;
}

.phone:before{
content:"";
position:absolute;
inset:0;
border-radius:55px;
padding:2px;
background:linear-gradient(120deg,rgba(255,255,255,.4),transparent,rgba(255,255,255,.25));
-webkit-mask:
linear-gradient(#000 0 0) content-box,
linear-gradient(#000 0 0);
-webkit-mask-composite:xor;
mask-composite:exclude;
pointer-events:none;
}

.island{
position:absolute;
top:10px;
left:50%;
transform:translateX(-50%);
width:110px;
height:26px;
background:black;
border-radius:20px;
z-index:5;
}

.screen{
position:absolute;
top:22px;
bottom:22px;
left:14px;
right:14px;
border-radius:40px;
background:#0b0b12;
overflow:hidden;
padding-top:35px;
}

.screen-bg{
position:absolute;
inset:0;
border-radius:40px;
z-index:0;
background-size:cover;
background-position:center;
opacity:.9;
}

.step{
width:80%;
margin:10px auto;
padding:10px 12px;
border-radius:12px;
background:linear-gradient(90deg,#6a5cff,#8f7bff);
font-size:13px;
opacity:0;
transform:translateY(15px);
position:relative;
z-index:2;
}

.arrow{
width:6px;
height:28px;
background:#8f7bff;
margin:-6px auto -2px auto;
border-radius:6px;
opacity:0;
position:relative;
z-index:2;
}

.arrow:after{
content:"";
position:absolute;
bottom:-6px;
left:50%;
transform:translateX(-50%);
border-left:9px solid transparent;
border-right:9px solid transparent;
border-top:12px solid #8f7bff;
}

.s1{animation:show .6s forwards 1s;}
.a1{animation:show .4s forwards 2s;}
.s2{animation:show .6s forwards 2.6s;}
.a2{animation:show .4s forwards 3.6s;}
.s3{animation:show .6s forwards 4.2s;}
.a3{animation:show .4s forwards 5.2s;}
.s4{animation:show .6s forwards 5.8s;}
.a4{animation:show .4s forwards 6.8s;}
.s5{animation:show .6s forwards 7.4s;}

@keyframes show{to{opacity:1;transform:translateY(0);}}

.hideAll{animation:hideAll .4s forwards;}
@keyframes hideAll{to{opacity:0;}}

.live{
position:absolute;
inset:0;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
opacity:0;
z-index:3;
}

.circle{
width:150px;
height:150px;
border-radius:50%;
background:radial-gradient(circle,#00ffa3,#00c37a);
display:flex;
align-items:center;
justify-content:center;
font-weight:900;
font-size:16px;
text-align:center;
padding:15px;
color:black;
box-shadow:0 0 60px #00ffa3,0 0 120px #00ffa3;
transform:scale(.5);
}

.live.show{animation:liveIn .7s forwards;}
@keyframes liveIn{to{opacity:1;}}
.live.show .circle{animation:pop .5s forwards;}
@keyframes pop{to{transform:scale(1);}}
.live.hide{animation:fadeOut .35s forwards;}
@keyframes fadeOut{to{opacity:0;}}

@keyframes phoneFloat{
0%{transform:translateY(0) rotateY(-18deg) rotateX(6deg);}
50%{transform:translateY(-10px) rotateY(10deg) rotateX(6deg);}
100%{transform:translateY(0) rotateY(-18deg) rotateX(6deg);}
}
</style>

<div class="bg"></div>
<div class="blob blob1"></div>
<div class="blob blob2"></div>

<!-- NAVBAR -->
<div class="topbar">
<div class="logoText">Linkarsha</div>
<div class="topActions">
<a href="#" class="loginBtn">Log in</a>
<a href="#" class="signupBtn">Sign up free</a>
<div class="menuBtn">☰</div>
</div>
</div>

<!-- HERO -->
<section class="hero">
<div class="hero-left">
<h1 class="headline">The Creator Economy OS.<br>Not just a link.</h1>
<p class="sub">
Sell. Monetize. Grow. Linkarsha powers your entire creator business from one powerful link.
</p>
</div>
</section>

<script>
console.log("homepage working");
</script>

    `}} />
  );
}
