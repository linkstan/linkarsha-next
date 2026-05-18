export function getEditorialMediaRhythm({

index,
isMobile

}){

return{

marginTop:

index % 2 === 0

? 0

: (
isMobile
? 24
: 80
),

alignment:

index % 2 === 0
? "left"
: "right",

width:

isMobile
? "100%"
: (
index % 2 === 0
? "92%"
: "82%"
),

visualWeight:

index === 0
? 1.2
: 1

};

}
