"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "viewer" | "creator" | "admin";
  isVerified: boolean;
  avatar?: string | null;
  bio?: string | null;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
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
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchUserProfile(session.user);
      }
      setIsLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
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

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", supabaseUser.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      if (profile) {
        setUser({
          id: profile.id,
          email: profile.email,
          firstName: profile.first_name,
          lastName: profile.last_name,
          role: profile.role,
          isVerified: profile.is_verified,
          avatar: profile.avatar_url,
          bio: profile.bio,
        });
      }
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
    }
  };

  const signup = async (userData: SignupData) => {
    try {
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

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        // Create profile in database
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          role: userData.role,
          is_verified: false,
        });

        if (profileError) {
          console.error("Error creating profile:", profileError);
          throw new Error("Failed to create user profile");
        }

        // If newsletter subscription is requested, you can handle it here
        if (userData.subscribeNewsletter) {
          // Add newsletter subscription logic
          console.log("User subscribed to newsletter");
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
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
