"use client";

export default function HeaderFontAlignment({
section,
settings,
setSettings,
updateSetting,
move,
arrow
}){

if(settings.layout !== "hero") return null;

return(

<div style={section}>

<h3>Font Alignment</h3>

<label>
<input
type="radio"
name="alignmentMode"
checked={!settings.displayAdvanced}
onChange={()=>{
const newSettings={
...settings,
displayAdvanced:false,
displayAlign:{x:0,y:0},
usernameAlign:{x:0,y:0}
};

setSettings(newSettings);

window.dispatchEvent(
new CustomEvent("appearance-update",{detail:{header:newSettings}})
);

updateSetting("displayAdvanced",false);
}}
/>
 Default
</label>

<br/>

<label>
<input
type="radio"
name="alignmentMode"
checked={settings.displayAdvanced === true}
onChange={()=>updateSetting("displayAdvanced",true)}
/>
 Advanced Font Alignment
</label>

</div>

);

}
