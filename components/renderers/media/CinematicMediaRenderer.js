"use client";

import {
getMediaPresentation
} from "../../../app/lib/mediaPresentationEngine";

import {
getCinematicMedia
} from "../../../app/lib/cinematicMediaEngine";

import {
getMediaStack
} from "../../../app/lib/mediaStackEngine";

import {
getEditorialMediaRhythm
} from "../../../app/lib/editorialMediaRhythm";

import EditorialMediaLayout
from "../media/EditorialMediaLayout";

import FloatingMediaStack
from "../media/FloatingMediaStack";

import CinematicMediaFrame
from "../media/CinematicMediaFrame";

import CinematicMediaGlow
from "../media/CinematicMediaGlow";

import CinematicMediaMask
from "../media/CinematicMediaMask";

import PremiumMediaShell
from "../blocks/media/PremiumMediaShell";

import PriorityBlockShell
from "../blocks/PriorityBlockShell";

import PriorityAccentBar
from "../blocks/PriorityAccentBar";


export default function CinematicMediaRenderer({

type,
block,

layout,
background,

index,
priority,

children

}){

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

<PriorityAccentBar
priority={priority}
/>

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

{children}

</PremiumMediaShell>

</CinematicMediaMask>

</CinematicMediaFrame>

</FloatingMediaStack>

</EditorialMediaLayout>

</PriorityBlockShell>

);

}
