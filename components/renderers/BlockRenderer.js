"use client";

import ButtonBlock
from "../ButtonBlock";

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

import {
getBlockPriority
} from "../../app/lib/blockPriorityEngine";

import PriorityBlockShell
from "./blocks/PriorityBlockShell";

import PriorityAccentBar
from "./blocks/PriorityAccentBar";

import CinematicMediaRenderer
from "./media/CinematicMediaRenderer";


export default function BlockRenderer({

block,
theme,
appearance,
index

}){

const type =
block?.data_json?.type || "button";

const background =
appearance?.background;

const layout =
appearance?.layout;

const priority =
getBlockPriority({

block,
index,
layout,
isMobile:false

});


/* ================================================= */
/* BUTTON */
/* ================================================= */

if(
type === "button"
||
type === "cta"
){

return(

<PriorityBlockShell
priority={priority}
>

<PriorityAccentBar
priority={priority}
/>

<ButtonBlock

block={block}

theme={theme}

appearance={appearance}

index={index}

featuredBlock={
block?.featuredBlock
}

/>

</PriorityBlockShell>

);

}


/* ================================================= */
/* VIDEO */
/* ================================================= */

if(type === "video"){

return(

<CinematicMediaRenderer

type="video"

block={block}

layout={layout}

background={background}

index={index}

priority={priority}

>

<VideoBlock
block={block}
/>

</CinematicMediaRenderer>

);

}


/* ================================================= */
/* MUSIC */
/* ================================================= */

if(type === "music"){

return(

<PriorityBlockShell
priority={priority}
>

<PriorityAccentBar
priority={priority}
/>

<MusicBlock
block={block}
/>

</PriorityBlockShell>

);

}


/* ================================================= */
/* GALLERY */
/* ================================================= */

if(type === "gallery"){

return(

<CinematicMediaRenderer

type="gallery"

block={block}

layout={layout}

background={background}

index={index}

priority={priority}

>

<GalleryBlock
block={block}
/>

</CinematicMediaRenderer>

);

}


/* ================================================= */
/* PRICING */
/* ================================================= */

if(type === "pricing"){

return(

<PriorityBlockShell
priority={priority}
>

<PriorityAccentBar
priority={priority}
/>

<PricingBlock
block={block}
/>

</PriorityBlockShell>

);

}


/* ================================================= */
/* TESTIMONIALS */
/* ================================================= */

if(type === "testimonials"){

return(

<PriorityBlockShell
priority={priority}
>

<PriorityAccentBar
priority={priority}
/>

<TestimonialBlock
block={block}
/>

</PriorityBlockShell>

);

}


/* ================================================= */
/* FAQ */
/* ================================================= */

if(type === "faq"){

return(

<PriorityBlockShell
priority={priority}
>

<PriorityAccentBar
priority={priority}
/>

<FAQBlock
block={block}
/>

</PriorityBlockShell>

);

}


/* ================================================= */
/* FALLBACK */
/* ================================================= */

return null;

}
