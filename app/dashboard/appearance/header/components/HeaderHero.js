"use client";

export default function HeaderHero({
section,
settings,
themeFeatures,
updateSetting,
heroUploading,
uploadHero
}){

if(!themeFeatures.hero) return null;

return(

<div style={section}>

<h3>Hero</h3>

<div style={{marginBottom:20}}>

<div style={{marginBottom:6}}>Hero Image</div>

<label style={{
padding:"8px 14px",
border:"1px solid var(--border)",
borderRadius:20,
cursor:"pointer"
}}>

{heroUploading ? "Uploading..." : "Upload Image"}

<input
type="file"
accept="image/*"
onChange={uploadHero}
style={{display:"none"}}
/>

</label>

{settings.heroImage && (

<div style={{marginTop:10}}>
<img
src={settings.heroImage}
style={{width:"100%",borderRadius:10}}
/>
</div>

)}

</div>

{themeFeatures.heroText && (

<>
<div style={{marginBottom:6}}>Hero Text</div>

<input
type="text"
value={settings.heroText || ""}
onChange={(e)=>updateSetting("heroText",e.target.value)}
style={{
width:"100%",
padding:"10px",
borderRadius:"10px",
border:"1px solid var(--border)"
}}
/>

</>

)}

{themeFeatures.heroOpacity && (

<div style={{marginTop:20}}>

<div>Hero Opacity ({settings.heroOpacity || 100}%)</div>

<input
type="range"
min="0"
max="100"
value={settings.heroOpacity || 100}
onChange={(e)=>updateSetting("heroOpacity",Number(e.target.value))}
style={{width:"100%"}}
/>

</div>

)}

</div>

);

}
