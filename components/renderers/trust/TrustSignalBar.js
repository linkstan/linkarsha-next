export default function TrustSignalBar({
signals
}){

if(!signals?.showBar){

return null;

}

return(

<div
style={{

display:"flex",
flexWrap:"wrap",

gap:12,

marginTop:28

}}
>

<div
style={{

padding:"10px 14px",

borderRadius:999,

background:
"rgba(255,255,255,.08)",

border:
"1px solid rgba(255,255,255,.10)",

fontSize:13

}}
>

Verified Identity

</div>

<div
style={{

padding:"10px 14px",

borderRadius:999,

background:
"rgba(255,255,255,.08)",

border:
"1px solid rgba(255,255,255,.10)",

fontSize:13

}}
>

Professional Profile

</div>

<div
style={{

padding:"10px 14px",

borderRadius:999,

background:
"rgba(255,255,255,.08)",

border:
"1px solid rgba(255,255,255,.10)",

fontSize:13

}}
>

Business Ready

</div>

</div>

);

}
