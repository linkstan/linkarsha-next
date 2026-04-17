"use client";

export default function HeaderDisplayOptions({
section,
settings,
updateSetting,
themeFeatures
}){

return(

<div style={section}>

<label>
<input
type="checkbox"
checked={settings.showDisplayName}
onChange={(e)=>updateSetting("showDisplayName",e.target.checked)}
/>
 Show Display Name
</label>

<br/><br/>

{themeFeatures.username && (
<label>
<input
type="checkbox"
checked={settings.showUsername}
onChange={(e)=>updateSetting("showUsername",e.target.checked)}
/>
 Show Username
</label>
)}

{themeFeatures.bio && (
<label>
<input
type="checkbox"
checked={settings.showBio}
onChange={(e)=>updateSetting("showBio",e.target.checked)}
/>
 Show Bio
</label>
)}

{themeFeatures.subtitle && (

<>

<label>
<input
type="checkbox"
checked={!!settings.subtitle}
onChange={(e)=>updateSetting("subtitle",e.target.checked ? "Example subtitle" : "")}
/>
 Show Subtitle
</label>

{!!settings.subtitle && (

<input
type="text"
placeholder="Example: business coach"
value={settings.subtitle || ""}
onChange={(e)=>updateSetting("subtitle",e.target.value)}
style={{
width:"100%",
padding:"10px",
borderRadius:"10px",
border:"1px solid var(--border)",
marginTop:"6px"
}}
/>

)}

</>

)}

</div>

);

}
