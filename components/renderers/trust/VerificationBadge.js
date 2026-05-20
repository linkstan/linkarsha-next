"use client";

export default function VerificationBadge({

signals

}){

if(!signals?.verified){

return null;

}

return(

<div
style={{

width:22,
height:22,

borderRadius:"50%",

display:"flex",
alignItems:"center",
justifyContent:"center",

fontSize:12,
fontWeight:700,

background:
"linear-gradient(135deg,#4da3ff,#7bc2ff)",

color:"#fff",

boxShadow:
"0 10px 30px rgba(77,163,255,.28)"

}}
>

✓

</div>

);

}
