export default function CreatorIdentityStrip({
signals
}){

return(

<div
style={{

display:"flex",
alignItems:"center",

gap:10,

marginBottom:20,

fontSize:12,

letterSpacing:".12em",

textTransform:"uppercase",

opacity:.62

}}
>

<div>
Premium Creator
</div>

<div>
• 
</div>

<div>
{signals?.availability}
</div>

</div>

);

}
