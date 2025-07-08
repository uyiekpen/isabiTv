"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSupabase, isSupabaseAvailable } from "@/lib/supabase-client";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "viewer" | "creator" | "admin";
  isVerified: boolean;
  avatar?: string | null;
  bio?: string | null;
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    userData: SignupData
  ) => Promise<{ success: boolean; message?: string; user?: User }>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

type SignupData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "viewer" | "creator" | "admin";
  subscribeNewsletter?: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseAvailable()) {
      console.warn(
        "Supabase client not initialized - missing environment variables"
      );
      setIsLoading(false);
      return;
    }

    const supabase = getSupabase();

    const getInitialSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
        }

        if (data?.session?.user) {
          await fetchUserProfile(data.session.user);
        }
      } catch (error) {
        console.error("Error in getInitialSession:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (
    supabaseUser: SupabaseUser
  ): Promise<User | null> => {
    if (!isSupabaseAvailable()) return null;

    try {
      const supabase = getSupabase();
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", supabaseUser.id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          return await createUserProfile(supabaseUser);
        }
        throw error;
      }

      if (profile) {
        const userProfile = formatUserProfile(profile);
        setUser(userProfile);
        return userProfile;
      }
      return null;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  };

  const formatUserProfile = (profile: any): User => ({
    id: profile.id,
    email: profile.email,
    firstName: profile.first_name,
    lastName: profile.last_name,
    role: profile.role,
    isVerified: profile.is_verified,
    avatar: profile.avatar_url,
    bio: profile.bio,
    name: `${profile.first_name} ${profile.last_name}`.trim(),
  });

  const createUserProfile = async (
    supabaseUser: SupabaseUser
  ): Promise<User | null> => {
    if (!isSupabaseAvailable()) return null;

    try {
      const supabase = getSupabase();
      const firstName = supabaseUser.user_metadata?.first_name || "User";
      const lastName = supabaseUser.user_metadata?.last_name || "";
      const role = supabaseUser.user_metadata?.role || "creator";

      const { data: newProfile, error } = await supabase
        .from("profiles")
        .insert({
          id: supabaseUser.id,
          email: supabaseUser.email || "",
          first_name: firstName,
          last_name: lastName,
          role,
          is_verified: true,
        })
        .select()
        .single();

      if (error) throw error;

      if (newProfile) {
        const userProfile = formatUserProfile(newProfile);
        setUser(userProfile);
        return userProfile;
      }
      return null;
    } catch (error) {
      console.error("Error creating profile:", error);
      return null;
    }
  };

  const signup = async (userData: SignupData) => {
    if (!isSupabaseAvailable()) {
      return {
        success: false,
        message: "Authentication service is not available",
      };
    }

    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: userData.role,
          },
        },
      });

      if (error) throw error;
      if (!data.user) throw new Error("No user created");

      const userProfile = await createUserProfile(data.user);
      return {
        success: true,
        message: "Account created successfully!",
        user: userProfile || undefined,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Signup failed",
      };
    }
  };

  const login = async (email: string, password: string) => {
    if (!isSupabaseAvailable()) {
      throw new Error("Authentication service is not available");
    }

    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) throw error;
    if (!data.user) throw new Error("Login failed");
  };

  const logout = async () => {
    if (!isSupabaseAvailable()) {
      throw new Error("Authentication service is not available");
    }

    const supabase = getSupabase();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
