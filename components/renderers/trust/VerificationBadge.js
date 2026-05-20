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
"rgba(255,255,255,.12)",

backdropFilter:"blur(10px)",

border:
"1px solid rgba(255,255,255,.16)"

}}
>

✓

</div>

);

}
