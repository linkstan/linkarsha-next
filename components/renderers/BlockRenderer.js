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

import {
getBlockPriority
} from "../../app/lib/blockPriorityEngine";

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

import PriorityBlockShell
from "./blocks/PriorityBlockShell";

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

<PriorityBlockShell
priority={priority}
>

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

</PriorityBlockShell>

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

<PriorityBlockShell
priority={priority}
>

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

</PriorityBlockShell>

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
