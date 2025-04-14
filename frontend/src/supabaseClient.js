import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cwifwvahtpldoallzzxl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aWZ3dmFodHBsZG9hbGx6enhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NDU4MTQsImV4cCI6MjA2MDIyMTgxNH0.Ff7FMI9DL3WrBB0zHm1UDH5QSAl_FME1ZIhQlOsTdBI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
