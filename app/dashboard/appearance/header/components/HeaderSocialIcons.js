"use client";

export default function HeaderSocialIcons({
section,
settings,
updateSetting,
themeFeatures
}){

if(!themeFeatures.socialIcons) return null;

return(

<div style={section}>

<h3>Social Icons</h3>

<label>
<input
type="checkbox"
checked={settings.showSocialIcons}
onChange={(e)=>updateSetting("showSocialIcons",e.target.checked)}
/>
 Show Social Icons
</label>

{settings.showSocialIcons && (

<div style={{marginTop:12}}>

<div style={{fontSize:14,marginBottom:6}}>Show in:</div>

<label style={{marginRight:12}}>
<input
type="radio"
checked={settings.socialPosition==="header"}
onChange={()=>updateSetting("socialPosition","header")}
/>
 Header
</label>

<label>
<input
type="radio"
checked={settings.socialPosition==="bottom"}
onChange={()=>updateSetting("socialPosition","bottom")}
/>
 Bottom of Links
</label>

</div>
<div style={{marginTop:12}}>

<div style={{fontSize:14,marginBottom:6}}>Icon Style</div>

<label style={{marginRight:12}}>
<input
type="radio"
checked={settings.socialIconStyle==="theme"}
onChange={()=>updateSetting("socialIconStyle","theme")}
/>
 Theme Icons
</label>

<label>
<input
type="radio"
checked={settings.socialIconStyle==="official"}
onChange={()=>updateSetting("socialIconStyle","official")}
/>
 Official Logos
</label>

</div>

)}

</div>

);

}
