import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce',
    debug: __DEV__,
  },
  global: {
    headers: {
      'X-Client-Info': 'ngaji-app',
    },
  },
});

export type Database = {
  public: {
    Tables: {
      profiles: { 
     Row: {
          id: string;
          email: string;
          name: string;
          role: 'admin' | 'asatidz' | 'user';
          type: string;
          created_at?: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          role: 'admin' | 'asatidz' | 'user';
          type?: string;
          created_at?: string;
        };
      };
      donations: { 
        Row: {
          id: string;
          amount: number;
          purpose_id: string;
          payment_method: string;
          proof_url: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          amount: number;
          purpose_id: string;
          payment_method: string;
          proof_url: string;
          status?: string;
          created_at?: string;
        };
      };
    };
  };
};