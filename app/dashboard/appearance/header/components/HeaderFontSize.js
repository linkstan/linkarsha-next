"use client";

export default function HeaderFontSize({
section,
settings,
updateSetting
}){

return(

<div style={section}>

<h3>Font Size</h3>

<div>Display Name ({settings.displaySize}px)</div>

<input
type="range"
min="16"
max="40"
value={settings.displaySize}
onChange={(e)=>updateSetting("displaySize",Number(e.target.value))}
/>

<div style={{marginTop:15}}>
Username ({settings.usernameSize}px)
</div>

<input
type="range"
min="10"
max="20"
value={settings.usernameSize}
onChange={(e)=>updateSetting("usernameSize",Number(e.target.value))}
/>

<div style={{marginTop:15}}>
Bio ({settings.bioSize}px)
</div>

<input
type="range"
min="10"
max="20"
value={settings.bioSize}
onChange={(e)=>updateSetting("bioSize",Number(e.target.value))}
/>

</div>

);

}
