import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          first_name: string;
          last_name: string;
          role: "viewer" | "creator" | "admin";
          is_verified: boolean;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          first_name: string;
          last_name: string;
          role?: "viewer" | "creator" | "admin";
          is_verified?: boolean;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          first_name?: string;
          last_name?: string;
          role?: "viewer" | "creator" | "admin";
          is_verified?: boolean;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      videos: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          video_url: string;
          thumbnail_url: string | null;
          creator_id: string;
          category: string | null;
          tags: string[] | null;
          views: number;
          likes: number;
          is_contest_entry: boolean;
          status: "draft" | "published" | "archived";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          video_url: string;
          thumbnail_url?: string | null;
          creator_id: string;
          category?: string | null;
          tags?: string[] | null;
          views?: number;
          likes?: number;
          is_contest_entry?: boolean;
          status?: "draft" | "published" | "archived";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          video_url?: string;
          thumbnail_url?: string | null;
          creator_id?: string;
          category?: string | null;
          tags?: string[] | null;
          views?: number;
          likes?: number;
          is_contest_entry?: boolean;
          status?: "draft" | "published" | "archived";
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
