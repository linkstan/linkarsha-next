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

import {
getCinematicMedia
} from "../../app/lib/cinematicMediaEngine";

import {
getMediaStack
} from "../../app/lib/mediaStackEngine";

import {
getEditorialMediaRhythm
} from "../../app/lib/editorialMediaRhythm";

import CinematicMediaFrame
from "./media/CinematicMediaFrame";

import CinematicMediaGlow
from "./media/CinematicMediaGlow";

import FloatingMediaStack
from "./media/FloatingMediaStack";

import CinematicMediaMask
from "./media/CinematicMediaMask";

import EditorialMediaLayout
from "./media/EditorialMediaLayout";

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

const cinematic =
getCinematicMedia({

block,
layout,
background,
isMobile:false

});

const mediaStack =
getMediaStack({

block,
layout,
background,
index,
isMobile:false

});

const editorialRhythm =
getEditorialMediaRhythm({

block,
layout,
index,
isMobile:false

});

return(

<EditorialMediaLayout
rhythm={editorialRhythm}
>

<FloatingMediaStack
stack={mediaStack}
>

<CinematicMediaFrame

cinematic={cinematic}

background={background}

>

<CinematicMediaGlow
cinematic={cinematic}
/>

<CinematicMediaMask
cinematic={cinematic}
>

<PremiumMediaShell
presentation={presentation}
background={background}
>

<VideoBlock
block={block}
/>

</PremiumMediaShell>

</CinematicMediaMask>

</CinematicMediaFrame>

</FloatingMediaStack>

</EditorialMediaLayout>

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

const cinematic =
getCinematicMedia({

block,
layout,
background,
isMobile:false

});

const mediaStack =
getMediaStack({

block,
layout,
background,
index,
isMobile:false

});

const editorialRhythm =
getEditorialMediaRhythm({

block,
layout,
index,
isMobile:false

});

return(

<EditorialMediaLayout
rhythm={editorialRhythm}
>

<FloatingMediaStack
stack={mediaStack}
>

<CinematicMediaFrame

cinematic={cinematic}

background={background}

>

<CinematicMediaGlow
cinematic={cinematic}
/>

<CinematicMediaMask
cinematic={cinematic}
>

<PremiumMediaShell
presentation={presentation}
background={background}
>

<GalleryBlock
block={block}
/>

</PremiumMediaShell>

</CinematicMediaMask>

</CinematicMediaFrame>

</FloatingMediaStack>

</EditorialMediaLayout>

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
