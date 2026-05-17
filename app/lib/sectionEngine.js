export function buildSections(blocks = []){

const sections = [];

let currentSection = {

type:"default",
blocks:[]

};

blocks.forEach((block,index)=>{

const variant =
block?.data_json?.variant;

const size =
block?.data_json?.size;

const type =
block?.data_json?.type;


/* ================================================= */
/* HERO SECTION */
/* ================================================= */

if(
size === "hero"
||
variant === "spotlight"
){

if(currentSection.blocks.length){

sections.push(currentSection);

}

sections.push({

type:"hero",
blocks:[block]

});

currentSection = {

type:"default",
blocks:[]

};

return;

}


/* ================================================= */
/* FEATURE SECTION */
/* ================================================= */

if(
size === "feature"
||
variant === "feature"
){

if(currentSection.blocks.length){

sections.push(currentSection);

}

sections.push({

type:"feature",
blocks:[block]

});

currentSection = {

type:"default",
blocks:[]

};

return;

}


/* ================================================= */
/* NORMAL GROUPING */
/* ================================================= */

currentSection.blocks.push(block);

});


if(currentSection.blocks.length){

sections.push(currentSection);

}

return sections;

}
