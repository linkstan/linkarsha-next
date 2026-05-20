export default function PremiumMetadataRow({
signals
}){

return(

<div
style={{

display:"flex",
flexWrap:"wrap",

gap:12,

marginTop:18,

opacity:.74,

fontSize:13,

letterSpacing:".02em"

}}
>

<div>
{signals?.role}
</div>

<div>
• {signals?.location}
</div>

<div>
• {signals?.response}
</div>

</div>

);

}
