import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ctaeolcyinfiwszipbmr.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your_anon_key_here'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  is_admin?: boolean
  created_at: string
  updated_at: string
}

export interface Video {
  id: string
  user_id: string
  title: string
  prompt: string
  status: 'generating' | 'completed' | 'failed'
  thumbnail_url?: string
  video_url?: string
  duration?: number
  progress?: number
  created_at: string
  updated_at: string
}

export interface Template {
  id: string
  name: string
  description: string
  category: string
  thumbnail_url: string
  duration_range: string
  rating: number
  uses_count: number
  is_premium: boolean
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan: 'starter' | 'pro' | 'enterprise'
  status: 'active' | 'cancelled' | 'expired'
  credits_remaining: number
  videos_this_month: number
  created_at: string
  expires_at: string
}
