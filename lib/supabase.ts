import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

export type Database = {
  public: {
    Tables: {
profiles: {
  Row: {
    id: string
    email: string
    name: string
    full_name: string | null
    bio: string | null
    specialization: string | null
    role: 'admin' | 'asatidz' | 'user'
    type: string
    created_at: string
    updated_at: string | null
  }

  Insert: {
    id: string
    email: string
    name: string
    full_name?: string | null
    bio?: string | null
    specialization?: string | null
    role: 'admin' | 'asatidz' | 'user'
    type?: string
    created_at?: string
    updated_at?: string | null
  }

  Update: {
    full_name?: string | null
    bio?: string | null
    specialization?: string | null
    updated_at?: string | null
  }

  Relationships: []
}
      donations: { 
        Row: {
          id: string
          amount: number
          purpose_id: string
          payment_method: string
          proof_url: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          amount: number
          purpose_id: string
          payment_method: string
          proof_url: string
          status?: string
          created_at?: string
        }
      }

      muamalat_practices: {
        Row: {
          id: string
          created_at: string
          student_name: string
          student_contact: string
          youtube_url: string
          status: 'pending' | 'success'
          admin_notes: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          student_name: string
          student_contact: string
          youtube_url: string
          status?: 'pending' | 'success'
          admin_notes?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          student_name?: string
          student_contact?: string
          youtube_url?: string
          status?: 'pending' | 'success'
          admin_notes?: string | null
          user_id?: string | null
        }
      }
    }
  }
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      flowType: 'pkce'
    }
  }
)