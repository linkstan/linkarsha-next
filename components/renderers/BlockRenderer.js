"use client";

import ButtonBlockRenderer
from "./blocks/ButtonBlockRenderer";

import VideoBlock
from "./blocks/media/VideoBlock";

import MusicBlock
from "./blocks/media/MusicBlock";

import GalleryBlock
from "./blocks/media/GalleryBlock";

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

<ButtonBlockRenderer

block={block}

theme={theme}

appearance={appearance}

index={index}

/>

);

}


/* ================================================= */
/* VIDEO */
/* ================================================= */

if(type === "video"){

return(

<VideoBlock
block={block}
/>

);

}


/* ================================================= */
/* MUSIC */
/* ================================================= */

if(type === "music"){

return(

<MusicBlock
block={block}
/>

);

}


/* ================================================= */
/* GALLERY */
/* ================================================= */

if(type === "gallery"){

return(

<GalleryBlock
block={block}
/>

);

}


/* ================================================= */
/* FALLBACK */
/* ================================================= */

return null;

}
