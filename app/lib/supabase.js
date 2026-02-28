import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://kgsunydafbgnivstjhcs.supabase.co"
const supabaseAnonKey = "PASTE_YOUR_PUBLIC_ANON_KEY"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
