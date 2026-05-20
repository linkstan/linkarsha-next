"use client";

export default function TrustSignalBar({

signals

}){

if(!signals?.showTrustBar){

return null;

}

return(

<div
style={{

display:"flex",
flexWrap:"wrap",

gap:10,

marginTop:28

}}
>

<SignalChip>
Trusted Identity
</SignalChip>

<SignalChip>
Professional Presence
</SignalChip>

<SignalChip>
Premium Profile
</SignalChip>

</div>

);

}

function SignalChip({

children

}){

return(

<div
style={{

padding:"10px 14px",

borderRadius:999,

fontSize:12,
fontWeight:600,

letterSpacing:"-.01em",

background:"rgba(255,255,255,.06)",

border:"1px solid rgba(255,255,255,.08)",

backdropFilter:"blur(12px)"

}}
>

{children}

</div>

);

}
