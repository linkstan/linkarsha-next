"use client";

export default function HeaderProfileImage({
section,
avatar,
avatarUploading,
uploadAvatar
}){

return(

<div style={section}>

<h3>Profile Image</h3>

<div style={{display:"flex",gap:20,alignItems:"center"}}>

<div style={{
width:70,
height:70,
borderRadius:"50%",
overflow:"hidden"
}}>
<img
src={avatar || "/default-avatar.png"}
style={{width:"100%",height:"100%",objectFit:"cover"}}
/>
</div>

<label style={{
padding:"8px 14px",
border:"1px solid var(--border)",
borderRadius:20,
cursor:"pointer"
}}>

{avatarUploading ? "Uploading..." : "Upload"}

<input
type="file"
accept="image/*"
onChange={uploadAvatar}
style={{display:"none"}}
/>

</label>

</div>

</div>

);

}
