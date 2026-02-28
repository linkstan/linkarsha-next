import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(req) {
  try {
    const { username } = await req.json()

    if (!username || username.length < 3) {
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
  } catch (e) {
    return Response.json({ available: true })
  }
}
