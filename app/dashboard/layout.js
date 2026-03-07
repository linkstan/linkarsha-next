"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {

const pathname = usePathname();

const menu = [
{title:"Home",url:"/dashboard"},
{title:"Links",url:"/dashboard/links"},
{title:"Blocks",url:"/dashboard/blocks"},
{title:"Appearance",url:"/dashboard/appearance"},
{title:"Analytics",url:"/dashboard/analytics"},
{title:"Settings",url:"/dashboard/settings"}
];

return(

<div style={{
display:"flex",
minHeight:"100vh",
background:"#0b0b12",
color:"white"
}}>

<div style={{
width:220,
padding:20,
borderRight:"1px solid #1c1c25"
}}>

<h2 style={{marginBottom:30}}>Linkarsha</h2>

{menu.map(item=>(

<Link
key={item.url}
href={item.url}
style={{
display:"block",
padding:"10px 12px",
marginBottom:6,
borderRadius:8,
textDecoration:"none",
color:"white",
background:pathname===item.url?"#1a1a25":"transparent"
}}
>

{item.title}

</Link>

))}

</div>

<div style={{
flex:1,
padding:40
}}>

{children}

</div>

</div>

);

}
