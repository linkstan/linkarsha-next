import { NextResponse } from "next/server";

export async function GET(req){

const { searchParams } = new URL(req.url);
const url = searchParams.get("url");

if(!url){
return NextResponse.json({error:"No URL"});
}

try{

const res = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
const data = await res.json();

return NextResponse.json({
title:data.data.title,
description:data.data.description,
image:data.data.image?.url
});

}catch(e){

return NextResponse.json({error:true});

}

}
