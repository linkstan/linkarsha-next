"use client";

import { themes } from "../../../lib/themes";
import { useState,useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";
import HeroCropModal from "../../../../components/HeroCropModal";
import AvatarCropModal from "../../../../components/AvatarCropModal";

/* HEADER COMPONENTS */

import HeaderProfileImage from "./components/HeaderProfileImage";
import HeaderHero from "./components/HeaderHero";
import HeaderLayout from "./components/HeaderLayout";
import HeaderSocialIcons from "./components/HeaderSocialIcons";
import HeaderDisplayOptions from "./components/HeaderDisplayOptions";
import HeaderFonts from "./components/HeaderFonts";
import HeaderFontSize from "./components/HeaderFontSize";
import HeaderFontAlignment from "./components/HeaderFontAlignment";

export default function HeaderEditor(){

const router = useRouter();

const [themeName,setThemeName]=useState("minimal");
const [theme,setTheme]=useState(null);
const themeFeatures = theme?.features ?? {
hero:false,
heroText:false,
heroOpacity:false,
socialIcons:true,
username:true,
bio:true,
subtitle:true
};

const [avatarUploading,setAvatarUploading]=useState(false);
const [heroUploading,setHeroUploading]=useState(false);

const [settings,setSettings]=useState({
layout:"classic",

showDisplayName:true,
showUsername:true,
showBio:false,

showSocialIcons:false,
socialPosition:"header",
socialIconStyle:"theme",

displayAlign:{x:0,y:0},
usernameAlign:{x:0,y:0},
bioAlign:{x:0,y:0},

displayAdvanced:false,
usernameAdvanced:false,
bioAdvanced:false,

useDefaultFonts:true,
advancedFonts:false,

displayFont:"Poppins",
usernameFont:"Roboto",
bioFont:"Lora",

displaySize:22,
usernameSize:14,
bioSize:15,

subtitle:"",

heroText:"",
heroImage:null,
heroOpacity:100
});

const [avatar,setAvatar]=useState(null);
const [cropImage,setCropImage]=useState(null);
const [avatarCropImage,setAvatarCropImage]=useState(null);

useEffect(()=>{
loadSettings();
loadProfile();
},[]);

async function loadSettings(){

const {data:{session}}=await supabase.auth.getSession();
if(!session) return;

const {data}=await supabase
.from("profiles")
.select("profile_settings, theme")
.eq("id",session.user.id)
.single();

if(data?.theme){
setThemeName(data.theme);
setTheme(themes[data.theme] || themes.minimal);
}

if(data?.profile_settings?.header){

setSettings(prev=>({
...prev,
displayAdvanced:false,
...data.profile_settings.header
}));

}

}

async function loadProfile(){

const {data:{session}}=await supabase.auth.getSession();
if(!session) return;

const {data}=await supabase
.from("profiles")
.select("avatar")
.eq("id",session.user.id)
.single();

if(data?.avatar){
setAvatar(data.avatar);
}

}

async function updateSetting(key,value){

const newSettings={
...settings,
[key]:value
};

if(key==="useDefaultFonts" && value===true){
newSettings.displayFont="Poppins";
newSettings.usernameFont="Roboto";
newSettings.bioFont="Lora";
newSettings.advancedFonts=false;
}

if(key==="advancedFonts" && value===true){
newSettings.useDefaultFonts=false;
}

setSettings(newSettings);

window.dispatchEvent(
new CustomEvent("appearance-update",{detail:{header:newSettings}})
);

const {data:{session}}=await supabase.auth.getSession();
if(!session) return;

const {data:profile}=await supabase
.from("profiles")
.select("profile_settings")
.eq("id",session.user.id)
.single();

const allSettings = profile?.profile_settings || {};

if(!allSettings.header){
allSettings.header = {};
}

allSettings.header = newSettings;

await supabase
.from("profiles")
.update({profile_settings:allSettings})
.eq("id",session.user.id);

}

/* AVATAR UPLOAD */

async function uploadAvatar(e){

const file=e.target.files[0];
if(!file) return;

const reader=new FileReader();

reader.onload=()=>{
setAvatarCropImage(reader.result);
};

reader.readAsDataURL(file);

}

/* SAVE AVATAR AFTER CROP */

async function saveAvatarCrop(croppedAreaPixels, zoom){

setAvatarUploading(true);

const { default:getCroppedImg } = await import("../../../lib/cropImage");

const blob = await getCroppedImg(avatarCropImage, croppedAreaPixels, zoom);

const {data:{session}} = await supabase.auth.getSession();

const path = `avatars/${session.user.id}_${Date.now()}.jpg`;

await supabase.storage
.from("avatars")
.upload(path, blob);

const {data} = supabase.storage
.from("avatars")
.getPublicUrl(path);

await supabase
.from("profiles")
.update({ avatar: data.publicUrl })
.eq("id", session.user.id);

setAvatar(data.publicUrl);

setAvatarUploading(false);

setAvatarCropImage(null);

window.dispatchEvent(
new CustomEvent("appearance-update",{detail:{avatar:data.publicUrl}})
);

}

/* HERO CROP SAVE */

async function saveCroppedHero(crop,zoom){

setHeroUploading(true);

const { default: getCroppedImg } = await import("../../../lib/cropImage");

const blob = await getCroppedImg(cropImage,crop,zoom);

const {data:{session}} = await supabase.auth.getSession();

const path = `hero/${session.user.id}_${Date.now()}.jpg`;

await supabase.storage
.from("hero")
.upload(path,blob);

const {data} = supabase.storage
.from("hero")
.getPublicUrl(path);

updateSetting("heroImage",data.publicUrl);

setHeroUploading(false);

setCropImage(null);

}

/* HERO UPLOAD */

async function uploadHero(e){

const file = e.target.files[0];
if(!file) return;

const reader = new FileReader();

reader.onload = ()=>{
setCropImage(reader.result);
};

reader.readAsDataURL(file);

}

const section={
background:"var(--card)",
border:"1px solid var(--border)",
borderRadius:14,
padding:20,
marginBottom:20
};

const arrow={
width:40,
height:40,
borderRadius:10,
border:"1px solid var(--border)",
background:"var(--card)",
cursor:"pointer",
fontSize:16
};

const btn=(active)=>({
padding:"8px 16px",
borderRadius:20,
border:"1px solid var(--border)",
background:active?"var(--text)":"var(--card)",
color:active?"#fff":"var(--text)",
cursor:"pointer"
});

return(

<div style={{maxWidth:650}}>

<div style={{
display:"flex",
alignItems:"center",
gap:12,
marginBottom:20
}}>

<div
onClick={()=>router.back()}
style={{
width:36,
height:36,
borderRadius:"50%",
border:"1px solid var(--border)",
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer"
}}
>
←
</div>

<h2>Header</h2>

</div>

<HeaderProfileImage
section={section}
avatar={avatar}
avatarUploading={avatarUploading}
uploadAvatar={uploadAvatar}
/>

<HeaderHero
section={section}
settings={settings}
themeFeatures={themeFeatures}
updateSetting={updateSetting}
heroUploading={heroUploading}
uploadHero={uploadHero}
/>

<HeaderLayout
section={section}
theme={theme}
settings={settings}
updateSetting={updateSetting}
btn={btn}
/>

<HeaderSocialIcons
section={section}
settings={settings}
updateSetting={updateSetting}
themeFeatures={themeFeatures}
/>

<HeaderDisplayOptions
section={section}
settings={settings}
updateSetting={updateSetting}
themeFeatures={themeFeatures}
/>

<HeaderFonts
section={section}
settings={settings}
updateSetting={updateSetting}
/>

<HeaderFontSize
section={section}
settings={settings}
updateSetting={updateSetting}
/>

<HeaderFontAlignment
section={section}
settings={settings}
setSettings={setSettings}
updateSetting={updateSetting}
/>

{cropImage && (

<HeroCropModal
image={cropImage}
onCancel={()=>setCropImage(null)}
onComplete={saveCroppedHero}
/>

)}

{avatarCropImage && (

<AvatarCropModal
image={avatarCropImage}
shape={settings.layout==="classic" ? "round" : "rect"}
onCancel={()=>setAvatarCropImage(null)}
onComplete={saveAvatarCrop}
/>

)}

</div>

);

}
