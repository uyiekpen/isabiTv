import { createClient, type SupabaseClient } from "@supabase/supabase-js"

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

class SupabaseManager {
  private client: SupabaseClient<Database> | null = null
  private initialized = false

  private initialize(): void {
    if (this.initialized) return

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      if (typeof window !== "undefined") {
        console.warn("Supabase environment variables are missing")
      }
      this.client = null
    } else {
      try {
        this.client = createClient<Database>(supabaseUrl, supabaseAnonKey)
      } catch (error) {
        console.error("Failed to create Supabase client:", error)
        this.client = null
      }
    }

    this.initialized = true
  }

  public getClient(): SupabaseClient<Database> {
    this.initialize()

    if (!this.client) {
      throw new Error("Supabase client is not available. Please check your environment variables.")
    }

    return this.client
  }

  public isAvailable(): boolean {
    this.initialize()
    return this.client !== null
  }
}

// Create singleton instance
const supabaseManager = new SupabaseManager()

// Export functions that always return a valid client or throw
export const getSupabase = () => supabaseManager.getClient()
export const isSupabaseAvailable = () => supabaseManager.isAvailable()
