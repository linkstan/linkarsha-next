"use client";

import designTokens
from "../../../../app/lib/designTokens";

export default function GlassSurface({

children,

background,

isDarkBackground,

surfaceDepth = 1,

borderRadius,

padding,

style = {}

}){

return(

<div
style={{

position:"relative",

overflow:"hidden",

borderRadius:
borderRadius ||
designTokens.radius.lg,

padding:
padding ??
designTokens.spacing.glassPadding,

background:`rgba(
255,
255,
255,
${
isDarkBackground
? .10
: .18
}
)`,

backdropFilter:
`blur(${
(background?.glassBlur || 26)
}px)`,

WebkitBackdropFilter:
`blur(${
(background?.glassBlur || 26)
}px)`,

border:`1px solid rgba(
255,
255,
255,
${
isDarkBackground
? .14
: .24
}
)`,

boxShadow:
`
0 ${
18 * surfaceDepth
}px ${
60 * surfaceDepth
}px rgba(
0,
0,
0,
${
isDarkBackground
? .28
: .10
}
)
`,

...style

}}
>

<div
style={{

position:"absolute",
inset:0,

background:
"linear-gradient(180deg,rgba(255,255,255,.20),rgba(255,255,255,.04))",

pointerEvents:"none"

}}
/>

<div
style={{

position:"relative",
zIndex:2

}}
>

{children}

</div>

</div>

);

}
