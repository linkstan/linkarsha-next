"use client";

export default function HeaderFonts({
section,
settings,
updateSetting
}){

return(

<div style={section}>

<h3>Fonts</h3>

<label>
<input
type="checkbox"
checked={settings.useDefaultFonts}
onChange={(e)=>updateSetting("useDefaultFonts",e.target.checked)}
/>
 Default Fonts
</label>

<div style={{fontSize:13,opacity:.7,marginBottom:10}}>
Display Name → Poppins<br/>
Username → Roboto<br/>
Bio → Lora
</div>

<label>
<input
type="checkbox"
checked={settings.advancedFonts}
onChange={(e)=>updateSetting("advancedFonts",e.target.checked)}
/>
 Show advanced font options
</label>

{settings.advancedFonts && (

<div style={{marginTop:15}}>

<h4>Display Name Font</h4>

<select
value={settings.displayFont}
onChange={(e)=>updateSetting("displayFont",e.target.value)}
>

<option>Montserrat</option>
<option>Poppins</option>
<option>Playfair Display</option>
<option>Raleway</option>
<option>Rubik</option>
<option>Josefin Sans</option>
<option>Oswald</option>
<option>Spectral</option>
<option>Lora</option>
<option>Bitter</option>
<option>Source Code Pro</option>
<option>Inconsolata</option>
<option>Roboto Condensed</option>
<option>Encode Sans Semi Condensed</option>
<option>Asap Condensed</option>
<option>Allura</option>
<option>Great Vibes</option>
<option>Pinyon Script</option>
<option>Dancing Script</option>
<option>Pacifico</option>
<option>Sacramento</option>

</select>

<h4 style={{marginTop:15}}>Username Font</h4>

<select
value={settings.usernameFont}
onChange={(e)=>updateSetting("usernameFont",e.target.value)}
>

<option>Roboto</option>
<option>Open Sans</option>
<option>Lato</option>
<option>Nunito</option>
<option>Source Sans 3</option>
<option>Karla</option>
<option>Assistant</option>
<option>Work Sans</option>
<option>Cabin</option>
<option>Rubik</option>

</select>

<h4 style={{marginTop:15}}>Bio Font</h4>

<select
value={settings.bioFont}
onChange={(e)=>updateSetting("bioFont",e.target.value)}
>

<option>Merriweather</option>
<option>Lora</option>
<option>PT Serif</option>
<option>Crimson Text</option>
<option>Libre Baskerville</option>
<option>Spectral</option>
<option>Domine</option>
<option>Gelasio</option>
<option>Alegreya</option>
<option>Bitter</option>
<option>Allura</option>
<option>Great Vibes</option>
<option>Pinyon Script</option>
<option>Dancing Script</option>
<option>Pacifico</option>
<option>Sacramento</option>

</select>

</div>

)}

</div>

);

}
