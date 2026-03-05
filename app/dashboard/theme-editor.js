"use client";

export default function ThemeEditor(){

const themes = [
{
name:"Midnight",
bg:"#0b0b12",
card:"#1a1a25"
},
{
name:"Sunset",
bg:"#1a0d0d",
card:"#2b1414"
},
{
name:"Ocean",
bg:"#071a2b",
card:"#0e2c44"
}
];

function applyTheme(t){

document.body.style.background = t.bg;

const links = document.querySelectorAll(".phone-link");

links.forEach(l=>{
l.style.background = t.card;
});

}

return(

<div className="card">

<h2>Theme Marketplace</h2>

<p style={{opacity:.6,marginBottom:20}}>
Choose a theme for your link page
</p>

{themes.map(t=>(

<button
key={t.name}
onClick={()=>applyTheme(t)}
style={{
marginRight:10,
marginBottom:10,
padding:"10px 16px",
borderRadius:8,
background:"#1a1a25",
border:"1px solid #2a2a35",
color:"white",
cursor:"pointer"
}}
>

{t.name}

</button>

))}

<style jsx>{`

.card{
background:#111;
padding:25px;
border-radius:16px;
}

`}</style>

</div>

);

}
