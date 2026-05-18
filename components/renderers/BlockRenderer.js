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
getMediaPresentation
} from "../../app/lib/mediaPresentationEngine";

import PremiumMediaShell
from "./blocks/media/PremiumMediaShell";

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

const presentation =
getMediaPresentation({

type,
isHero:false,
isMobile:false

});

return(

<PremiumMediaShell
presentation={presentation}
background={appearance?.background}
>

<VideoBlock
block={block}
/>

</PremiumMediaShell>

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

const presentation =
getMediaPresentation({

type,
isHero:false,
isMobile:false

});

return(

<PremiumMediaShell
presentation={presentation}
background={appearance?.background}
>

<GalleryBlock
block={block}
/>

</PremiumMediaShell>

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
