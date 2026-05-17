"use client";

import ButtonBlockRenderer
from "./blocks/ButtonBlockRenderer";

export default function BlockRenderer({

block,
theme,
appearance,
index

}){

const type =
block?.data_json?.type || "button";


/* ================================================= */
/* BUTTONS */
/* ================================================= */

if(
type === "button"
||
type === "cta"
){

return(

<ButtonBlockRenderer

block={block}

theme={theme}

appearance={appearance}

index={index}

/>

);

}


/* ================================================= */
/* FUTURE MEDIA */
/* ================================================= */

if(type === "video"){

return null;

}

if(type === "gallery"){

return null;

}

if(type === "music"){

return null;

}

if(type === "product"){

return null;

}


/* ================================================= */
/* FALLBACK */
/* ================================================= */

return null;

}
