import { NextResponse } from "next/server"
import * as cheerio from "cheerio"

export async function GET(req){

  const { searchParams } = new URL(req.url)
  const url = searchParams.get("url")

  if(!url){
    return NextResponse.json({})
  }

  try{

    const res = await fetch(url,{
      headers:{
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      },
      redirect:"follow"
    })

    const html = await res.text()
    const $ = cheerio.load(html)

    /* TITLE */

    let title =
      $('meta[property="og:title"]').attr("content") ||
      $('meta[name="twitter:title"]').attr("content") ||
      $("title").text() ||
      ""

    /* IMAGE */

    let image =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      $('link[rel="image_src"]').attr("href") ||
      ""

    /* FAVICON FALLBACK */

    if(!image){

      const icon =
        $('link[rel="icon"]').attr("href") ||
        $('link[rel="shortcut icon"]').attr("href")

      if(icon){
        try{
          const u = new URL(url)
          image = icon.startsWith("http")
            ? icon
            : `${u.origin}${icon}`
        }catch{}
      }

    }

    /* CLEARBIT FALLBACK */

    if(!image){
      try{
        const u = new URL(url)
        image = `https://logo.clearbit.com/${u.hostname}`
      }catch{}
    }

    /* ABSOLUTE URL FIX */

    if(image && !image.startsWith("http")){
      try{
        const u = new URL(url)
        image = `${u.origin}${image}`
      }catch{}
    }

    return NextResponse.json({
      title,
      image
    })

  }catch{

    return NextResponse.json({})

  }

}
