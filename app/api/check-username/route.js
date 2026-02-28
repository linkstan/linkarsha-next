import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// GET for browser testing
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get("username")

  if (!username) {
    return Response.json({ error: "No username" })
  }

  const { data } = await supabase
    .from('users')
    .select('username')
    .eq('username', username)
    .single()

  if (data) {
    return Response.json({ available: false })
  }

  return Response.json({ available: true })
}

// POST for signup page
export async function POST(req) {
  const { username } = await req.json()

  if (!username) {
    return Response.json({ available: false })
  }

  const { data } = await supabase
    .from('users')
    .select('username')
    .eq('username', username)
    .single()

  if (data) {
    return Response.json({ available: false })
  }

  return Response.json({ available: true })
}
