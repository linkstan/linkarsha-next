import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://kgsunydafbgnivstjhcs.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnc3VueWRhZmJnbml2c3RqaGNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNzk3MTEsImV4cCI6MjA4Nzc1NTcxMX0.oTvJcbbsnXPdSq0wc7rSyjJIezCZUxTz1Xe6FoC6ybs"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
