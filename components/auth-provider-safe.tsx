"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { getSupabaseClient, isSupabaseAvailable } from "@/lib/supabase";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

interface User {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  role?: "viewer" | "creator" | "admin";
  isVerified?: boolean;
  avatar?: string | null;
  bio?: string | null;
}

interface SignUpResponse {
  success: boolean;
  message?: string;
}

interface SignUpParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  subscribeNewsletter: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoaded: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: SignUpParams) => Promise<SignUpResponse>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProviderSafe({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (!isSupabaseAvailable()) {
      console.warn(
        "Supabase client not initialized - missing environment variables"
      );
      setIsLoaded(true);
      return;
    }

    const supabase = getSupabaseClient();

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
        setIsLoaded(true);
      }
    };

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event, session: Session | null) => {
        console.log("Auth state changed:", event, session?.user?.email);

        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    if (!isSupabaseAvailable()) return;

    const supabase = getSupabaseClient();

    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", supabaseUser.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        if (error.code === "PGRST116") {
          console.log("Profile not found, creating basic profile");
          const { error: createError } = await supabase
            .from("profiles")
            .insert({
              id: supabaseUser.id,
              email: supabaseUser.email || "",
              first_name: supabaseUser.user_metadata?.first_name || "",
              last_name: supabaseUser.user_metadata?.last_name || "",
              role: supabaseUser.user_metadata?.role || "creator",
              is_verified: true,
            });

          if (createError) {
            console.error("Error creating profile:", createError);
          } else {
            const { data: newProfile } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", supabaseUser.id)
              .single();
            if (newProfile) {
              updateUserState(newProfile);
            }
          }
        }
        return;
      }

      if (profile) {
        updateUserState(profile);
      }
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
    }
  };

  const updateUserState = (profile: any) => {
    const userData = {
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      role: profile.role,
      isVerified: profile.is_verified,
      avatar: profile.avatar_url,
      bio: profile.bio,
      name: `${profile.first_name} ${profile.last_name}`.trim(),
    };
    setUser(userData);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: profile.id,
        email: profile.email,
        name: `${profile.first_name} ${profile.last_name}`.trim(),
      })
    );
  };

  const signUp = async (userData: SignUpParams): Promise<SignUpResponse> => {
    if (!isSupabaseAvailable()) {
      return {
        success: false,
        message:
          "Authentication service is not available. Please check your configuration.",
      };
    }

    setIsSigningUp(true);
    const supabase = getSupabaseClient();

    try {
      console.log("Starting signup process for:", userData.email);

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
        console.error("Auth signup error:", error);
        return {
          success: false,
          message: error.message,
        };
      }

      if (!data.user) {
        return {
          success: false,
          message: "No user data returned from signup",
        };
      }

      console.log("Auth signup successful, user ID:", data.user.id);

      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        role: userData.role,
        is_verified: true,
      });

      if (profileError) {
        console.error("Profile creation error:", profileError);
        return {
          success: false,
          message: "Account created but profile setup failed",
        };
      }

      return {
        success: true,
        message: "Account created successfully! You can now sign in.",
      };
    } catch (error: any) {
      console.error("Signup error:", error);
      return {
        success: false,
        message: error.message || "An error occurred during signup",
      };
    } finally {
      setIsSigningUp(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseAvailable()) {
      throw new Error(
        "Authentication service is not available. Please check your configuration."
      );
    }

    setIsSigningIn(true);
    const supabase = getSupabaseClient();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error("No user data returned from login");
      }

      await fetchUserProfile(data.user);
    } catch (error: any) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsSigningIn(false);
    }
  };

  const signOut = async () => {
    if (!isSupabaseAvailable()) {
      setUser(null);
      localStorage.removeItem("user");
      return;
    }

    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoaded,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isLoaded: false,
      signIn: async () => {
        throw new Error("Auth context not available");
      },
      signUp: async (): Promise<SignUpResponse> => ({
        success: false,
        message: "Auth context not available",
      }),
      signOut: async () => {},
    };
  }
  return context;
}
