"use client";

export default function Links({
links,
clicks,
title,
url,
editing,
setTitle,
setUrl,
addLink,
updateLink,
deleteLink,
startEdit,
handleDragStart,
handleDrop
}){

return(

<>

<div className="card">

<h3>{editing ? "Edit link" : "Add link"}</h3>

<input
placeholder="Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<input
placeholder="URL"
value={url}
onChange={(e)=>setUrl(e.target.value)}
/>

<button onClick={editing ? updateLink : addLink}>
{editing ? "Update" : "Add"}
</button>

</div>

<div className="card">

<h3>Your links</h3>

{links.map((l,index)=>(

<div
key={l.id}
className="link-row"
draggable
onDragStart={()=>handleDragStart(index)}
onDragOver={(e)=>e.preventDefault()}
onDrop={()=>handleDrop(index)}
>

<div>
<div>{l.title}</div>
<div style={{fontSize:12,opacity:0.6}}>
{clicks[l.id]||0} clicks
</div>
</div>

<div className="actions">

<button onClick={()=>startEdit(l)}>Edit</button>

<button onClick={()=>deleteLink(l.id)}>
Delete
</button>

</div>

</div>

))}

</div>

<style jsx>{`

.card{
background:#111;
padding:25px;
border-radius:16px;
margin-bottom:30px;
}

.link-row{
display:flex;
justify-content:space-between;
padding:10px;
margin-top:10px;
background:#0f0f15;
border-radius:10px;
}

input{
width:100%;
padding:12px;
margin-top:10px;
background:#0f0f15;
border:1px solid #222;
color:white;
border-radius:8px;
}

button{
margin-top:15px;
padding:12px;
background:white;
color:black;
width:100%;
border-radius:8px;
}

.actions button{
margin-left:10px;
width:auto;
padding:6px 10px;
}

`}</style>

</>

)

}
