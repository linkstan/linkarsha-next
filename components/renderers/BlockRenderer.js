"use client";

import ButtonBlockRenderer
from "./blocks/ButtonBlockRenderer";

import VideoBlock
from "./blocks/media/VideoBlock";

import MusicBlock
from "./blocks/media/MusicBlock";

import GalleryBlock
from "./blocks/media/GalleryBlock";

import PricingBlock
from "./blocks/layout/PricingBlock";

import TestimonialBlock
from "./blocks/layout/TestimonialBlock";

import FAQBlock
from "./blocks/layout/FAQBlock";

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

featuredBlock={
block?.featuredBlock
}

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
/* PRICING */
/* ================================================= */

if(type === "pricing"){

return(

<PricingBlock
block={block}
/>

);

}


/* ================================================= */
/* TESTIMONIALS */
/* ================================================= */

if(type === "testimonials"){

return(

<TestimonialBlock
block={block}
/>

);

}


/* ================================================= */
/* FAQ */
/* ================================================= */

if(type === "faq"){

return(

<FAQBlock
block={block}
/>

);

}


/* ================================================= */
/* FALLBACK */
/* ================================================= */

return null;

}
