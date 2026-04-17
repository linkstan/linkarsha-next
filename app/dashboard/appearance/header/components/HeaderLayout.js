"use client";

export default function HeaderLayout({
section,
theme,
settings,
updateSetting,
btn
}){

if(theme?.layout?.hero) return null;

return(

<div style={section}>

<h3>Layout</h3>

<div style={{display:"flex",gap:10}}>

<button
onClick={()=>updateSetting("layout","classic")}
style={btn(settings.layout==="classic")}
>
Classic
</button>

</div>

</div>

);

}
