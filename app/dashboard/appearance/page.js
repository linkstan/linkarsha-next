"use client";

import { useState } from "react";

export default function Appearance(){

const [page,setPage] = useState("main");

const card = {
background:"#151827",
padding:"18px",
borderRadius:"14px",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
marginBottom:"14px",
cursor:"pointer"
};

const sectionTitle={
fontSize:"20px",
fontWeight:"600",
marginTop:"30px",
marginBottom:"10px"
};

const inputRow={
background:"#0d1020",
border:"1px solid #333",
borderRadius:"30px",
padding:"14px 18px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"22px"
};



/* MAIN PAGE */

if(page==="main"){

return(

<div style={{maxWidth:650}}>

<h2 style={{marginBottom:15}}>Theme</h2>

<div style={{
background:"#1b1e30",
padding:"20px",
borderRadius:"18px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"25px"
}}>

<div style={{display:"flex",alignItems:"center",gap:15}}>
<div style={{
width:55,
height:55,
borderRadius:"12px",
background:"linear-gradient(45deg,#ff7a18,#ffb347)"
}}></div>

<div>Custom</div>
</div>

<div style={{opacity:.7}}>More &gt;</div>

</div>


<h3 style={sectionTitle}>Customize theme</h3>

<div style={card} onClick={()=>setPage("header")}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{
width:36,
height:36,
borderRadius:"50%",
background:"#888"
}}></div>
<div>Header</div>
</div>

<div style={{opacity:.6}}>Classic &gt;</div>
</div>


<div style={card} onClick={()=>setPage("wallpaper")}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{
width:36,
height:36,
borderRadius:"10px",
background:"linear-gradient(45deg,#ff7a18,#ffd000)"
}}></div>
<div>Wallpaper</div>
</div>

<div style={{opacity:.6}}>Gradient &gt;</div>
</div>



<div style={card} onClick={()=>setPage("buttons")}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{
width:38,
height:18,
border:"2px solid white",
borderRadius:"6px"
}}></div>

<div>Buttons</div>
</div>

<div style={{opacity:.6}}>Outline &gt;</div>
</div>



<div style={card} onClick={()=>setPage("text")}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{fontSize:20}}>Aa</div>
<div>Text</div>
</div>

<div style={{opacity:.6}}>Summer Glow &gt;</div>
</div>



<div style={card} onClick={()=>setPage("colors")}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{
width:30,
height:30,
background:"#fff",
borderRadius:"6px"
}}></div>

<div>Colors</div>
</div>

<div>&gt;</div>
</div>


</div>

);

}



/* HEADER PAGE */

if(page==="header"){

return(

<div style={{maxWidth:650}}>

<div style={{cursor:"pointer"}} onClick={()=>setPage("main")}>
&lt; Header
</div>


<h3 style={{marginTop:25}}>Profile image</h3>

<div style={{
display:"flex",
alignItems:"center",
gap:15,
marginBottom:25
}}>

<div style={{
width:60,
height:60,
borderRadius:"50%",
background:"#888"
}}></div>

<button style={{
background:"#000",
color:"#fff",
borderRadius:"25px",
padding:"10px 18px",
border:"none"
}}>
+ Add
</button>

</div>


<h3>Profile image layout</h3>

<div style={{display:"flex",gap:12,marginBottom:25}}>
<button>Classic</button>
<button>Hero</button>
</div>



<h3>Display Name</h3>

<input
defaultValue="@username"
style={{
width:"100%",
padding:"12px",
borderRadius:"8px",
border:"1px solid #333",
background:"#111",
color:"#fff"
}}
/>



<h3 style={{marginTop:20}}>Display Name style</h3>

<div style={{display:"flex",gap:10}}>
<button>Text</button>
<button>Logo</button>
</div>



<h3 style={{marginTop:20}}>Display Name Font</h3>

<select style={{width:"100%",padding:10}}>
<option>Inter</option>
<option>Montserrat</option>
<option>Poppins</option>
<option>Roboto</option>
<option>Open Sans</option>
</select>



<h3 style={{marginTop:20}}>Display name color</h3>

<input type="color"/>


</div>

);

}



/* WALLPAPER */

if(page==="wallpaper"){

return(

<div style={{maxWidth:650}}>

<div onClick={()=>setPage("main")} style={{cursor:"pointer"}}>
&lt; Wallpaper
</div>


<h3 style={{marginTop:25}}>Wallpaper style</h3>

<div style={{
display:"grid",
gridTemplateColumns:"1fr 1fr 1fr",
gap:20
}}>

<div>
<div style={{height:70,background:"#ccc"}}></div>
<div>Fill</div>
</div>

<div>
<div style={{height:70,background:"linear-gradient(45deg,orange,red)"}}></div>
<div>Gradient</div>
</div>

<div>
<div style={{height:70,background:"#aaa"}}></div>
<div>Blur</div>
</div>

<div>
<div style={{height:70,background:"#ddd"}}></div>
<div>Pattern</div>
</div>

<div>
<div style={{height:70,background:"#444"}}></div>
<div>Image</div>
</div>

<div>
<div style={{height:70,background:"#000"}}></div>
<div>Video</div>
</div>

</div>


<h3 style={{marginTop:30}}>Gradient style</h3>

<div style={{display:"flex",gap:15}}>
<button>Custom</button>
<button>Pre-made</button>
</div>


</div>

);

}



/* BUTTONS */

if(page==="buttons"){

return(

<div style={{maxWidth:650}}>

<div onClick={()=>setPage("main")} style={{cursor:"pointer"}}>
&lt; Buttons
</div>


<h3 style={{marginTop:25}}>Button style</h3>

<div style={{display:"flex",gap:15}}>
<button>Solid</button>
<button>Glass</button>
<button>Outline</button>
</div>



<h3 style={{marginTop:30}}>Corner roundness</h3>

<div style={{display:"flex",gap:15}}>
<button>Square</button>
<button>Round</button>
<button>Rounder</button>
<button>Full</button>
</div>



<h3 style={{marginTop:30}}>Button color</h3>

<div style={inputRow}>
<div>#FFFFFF</div>
<div>&gt;</div>
</div>



<h3>Button text color</h3>

<div style={inputRow}>
<div>#000000</div>
<div>&gt;</div>
</div>


</div>

);

}



/* TEXT */

if(page==="text"){

return(

<div style={{maxWidth:650}}>

<div onClick={()=>setPage("main")} style={{cursor:"pointer"}}>
&lt; Text
</div>



<h3 style={{marginTop:25}}>Page font</h3>

<select style={{width:"100%",padding:10}}>
<option>Link Sans</option>
<option>Inter</option>
<option>Montserrat</option>
<option>Poppins</option>
</select>



<h3 style={{marginTop:25}}>Page text color</h3>

<div style={inputRow}>
<div>#FFFFFF</div>
<div>&gt;</div>
</div>


</div>

);

}



/* COLORS */

if(page==="colors"){

return(

<div style={{maxWidth:650}}>

<div onClick={()=>setPage("main")} style={{cursor:"pointer"}}>
&lt; Colors
</div>



<h3 style={{marginTop:25}}>Buttons</h3>

<div style={inputRow}>
<div>#FFFFFF</div>
<div>&gt;</div>
</div>



<h3>Button Text</h3>

<div style={inputRow}>
<div>#000000</div>
<div>&gt;</div>
</div>



<h3>Page Text</h3>

<div style={inputRow}>
<div>#FFFFFF</div>
<div>&gt;</div>
</div>



<h3>Title Text</h3>

<div style={inputRow}>
<div>#FFFFFF</div>
<div>&gt;</div>
</div>


</div>

);

}

}
