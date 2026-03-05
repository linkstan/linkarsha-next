"use client";

export default function ThemeEditor(){

const themes = [

{
name:"Midnight",
bg:"#0b0b12",
card:"#1a1a25",
accent:"#7c5cff"
},

{
name:"Sunset",
bg:"#1a0d0d",
card:"#2b1414",
accent:"#ff7b54"
},

{
name:"Ocean",
bg:"#071a2b",
card:"#0e2c44",
accent:"#2ec4ff"
},

{
name:"Emerald",
bg:"#041a13",
card:"#0b2e24",
accent:"#00ffa3"
}

];

function applyTheme(t){

document.body.style.background = t.bg;

document.querySelectorAll(".phone-link").forEach(el=>{
el.style.background = t.card;
});

document.querySelectorAll(".analytics-card").forEach(el=>{
el.style.borderColor = t.accent;
});

}

return(

<div className="card">

<h3>Theme Marketplace</h3>

<div className="themes">

{themes.map(t=>(

<div
key={t.name}
className="theme"
onClick={()=>applyTheme(t)}
>

<div
className="preview"
style={{background:t.card}}
/>

<div>{t.name}</div>

</div>

))}

</div>

<style jsx>{`

.card{
background:#111;
padding:25px;
border-radius:16px;
}

.themes{
display:flex;
gap:20px;
margin-top:20px;
}

.theme{
cursor:pointer;
text-align:center;
}

.preview{
width:60px;
height:60px;
border-radius:12px;
margin-bottom:6px;
}

`}</style>

</div>

);

}
