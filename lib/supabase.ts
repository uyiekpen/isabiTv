import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create the Supabase client or null if environment variables are missing
export const supabase: SupabaseClient | null = (() => {
  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window !== "undefined") {
      console.warn("Supabase environment variables are missing")
    }
    return null
  }

  try {
    return createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error("Failed to create Supabase client:", error)
    return null
  }
})()

// Type guard to check if supabase client is available
export function isSupabaseAvailable(): boolean {
  return supabase !== null
}

// Helper function to get a guaranteed Supabase client (throws if not available)
export function getSupabaseClient(): SupabaseClient {
  if (!supabase) {
    throw new Error("Supabase client is not available. Please check your environment variables.")
  }
  return supabase
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          role: "viewer" | "creator" | "admin"
          is_verified: boolean
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name: string
          last_name: string
          role?: "viewer" | "creator" | "admin"
          is_verified?: boolean
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          role?: "viewer" | "creator" | "admin"
          is_verified?: boolean
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      videos: {
        Row: {
          id: string
          title: string
          description: string | null
          video_url: string
          thumbnail_url: string | null
          creator_id: string
          category: string | null
          tags: string[] | null
          views: number
          likes: number
          is_contest_entry: boolean
          status: "draft" | "published" | "archived"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          video_url: string
          thumbnail_url?: string | null
          creator_id: string
          category?: string | null
          tags?: string[] | null
          views?: number
          likes?: number
          is_contest_entry?: boolean
          status?: "draft" | "published" | "archived"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          video_url?: string
          thumbnail_url?: string | null
          creator_id?: string
          category?: string | null
          tags?: string[] | null
          views?: number
          likes?: number
          is_contest_entry?: boolean
          status?: "draft" | "published" | "archived"
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
