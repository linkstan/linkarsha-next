export default function Home() {
  return (
    <div dangerouslySetInnerHTML={{__html: `

<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{max-width:100%;overflow-x:hidden;}
body{
font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
background:#0b0b12;color:white;overflow-x:hidden;
}

/* ===== Background ===== */
.bg{position:fixed;inset:0;z-index:-2;
background:linear-gradient(270deg,#0f0c29,#1a1a2e,#24243e,#302b63,#0f0c29);
background-size:800% 800%;animation:move 18s ease infinite;}
@keyframes move{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

.blob{position:absolute;width:600px;height:600px;border-radius:50%;filter:blur(140px);opacity:.25;z-index:-1;}
.blob1{background:#7c3aed;top:-200px;left:-200px;}
.blob2{background:#6366f1;bottom:-200px;right:-200px;}

.topbar{position:fixed;top:18px;left:50%;transform:translateX(-50%);
width:92%;max-width:1100px;z-index:9999;background:rgba(255,255,255,0.08);
backdrop-filter:blur(18px);border-radius:28px;padding:14px 18px;display:flex;
align-items:center;justify-content:space-between;border:1px solid rgba(255,255,255,0.12);}

.logoText{font-size:20px;font-weight:700;}
.topActions{display:flex;align-items:center;gap:12px;}

.loginBtn{padding:10px 18px;border-radius:14px;background:rgba(255,255,255,0.15);
text-decoration:none;font-weight:600;color:white;}

.signupBtn{padding:11px 22px;border-radius:18px;background:linear-gradient(90deg,#6a5cff,#8f7bff);
color:white;text-decoration:none;font-weight:700;}

.menuBtn{font-size:22px;padding:8px 12px;border-radius:10px;background:rgba(255,255,255,0.12);}

.hero{display:flex;min-height:100vh;padding-top:90px;align-items:center;}
.hero-left{width:50%;padding:60px;}
.headline{font-size:64px;line-height:1.05;font-weight:900;}
.sub{margin-top:20px;font-size:18px;color:#bbb;max-width:520px;}

@media(max-width:900px){
.hero{flex-direction:column;text-align:center}
.hero-left{width:100%}
}
</style>

<div class="bg"></div>
<div class="blob blob1"></div>
<div class="blob blob2"></div>

<div class="topbar">
<div class="logoText">Linkarsha</div>
<div class="topActions">
<a href="#" class="loginBtn">Log in</a>
<a href="#" class="signupBtn">Sign up free</a>
<div class="menuBtn">☰</div>
</div>
</div>

<section class="hero">
<div class="hero-left">
<h1 class="headline">The Creator Economy OS.<br>Not just a link.</h1>
<p class="sub">
Sell. Monetize. Grow. Linkarsha powers your entire creator business from one powerful link.
</p>
</div>
</section>

<script>
console.log("Linkarsha loaded");
</script>

    `}} />
  );
}
