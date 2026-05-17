"use client";

import ButtonBlock
from "../ButtonBlock";

export default function BlockRenderer({

block,
theme,
appearance,
index

}){

const type =
block?.data_json?.type || "button";


/* ================================================= */
/* BUTTON */
/* ================================================= */

if(
type === "button"
||
type === "cta"
){

return(

<ButtonBlock

block={block}

theme={theme}

appearance={appearance}

index={index}

/>

);

}


/* ================================================= */
/* FALLBACK */
/* ================================================= */

return null;

}
