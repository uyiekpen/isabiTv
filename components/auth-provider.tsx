"use client";

import type React from "react";
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
    // Don't initialize if Supabase client is not available
    if (!isSupabaseAvailable()) {
      console.warn(
        "Supabase client not initialized - missing environment variables"
      );
      setIsLoading(false);
      return;
    }

    const supabase = getSupabase();

    // Get initial session
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

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event, session: Session | null) => {
        console.log("Auth state changed:", event, session?.user?.email);

        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (
    supabaseUser: SupabaseUser
  ): Promise<User | null> => {
    if (!isSupabaseAvailable()) return null;

    try {
      const supabase = getSupabase();
      console.log("Fetching profile for user:", supabaseUser.id);

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", supabaseUser.id)
        .single();

      console.log("Profile fetch result:", { profile, error });

      if (error) {
        console.error("Error fetching profile:", error);

        // Check if it's a "no rows" error (profile doesn't exist)
        if (error.code === "PGRST116" || error.message?.includes("No rows")) {
          console.log("Profile not found, creating new profile...");
          return await createUserProfile(supabaseUser);
        }

        // For other errors, try to create profile anyway
        console.log("Unknown error, attempting to create profile...");
        return await createUserProfile(supabaseUser);
      }

      if (profile) {
        console.log("Profile found:", profile);
        const userProfile = {
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
        setUser(userProfile);
        return userProfile;
      } else {
        console.log("No profile data returned, creating new profile...");
        return await createUserProfile(supabaseUser);
      }
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
      // Try to create profile as fallback
      return await createUserProfile(supabaseUser);
    }
  };

  const createUserProfile = async (
    supabaseUser: SupabaseUser
  ): Promise<User | null> => {
    if (!isSupabaseAvailable()) return null;

    try {
      const supabase = getSupabase();

      // Extract names from metadata or use defaults
      const firstName =
        supabaseUser.user_metadata?.first_name ||
        supabaseUser.user_metadata?.firstName ||
        "User";
      const lastName =
        supabaseUser.user_metadata?.last_name ||
        supabaseUser.user_metadata?.lastName ||
        "";
      const role = supabaseUser.user_metadata?.role || "creator";

      console.log("Creating profile with data:", {
        id: supabaseUser.id,
        email: supabaseUser.email,
        first_name: firstName,
        last_name: lastName,
        role: role,
      });

      const { data: newProfile, error: createError } = await supabase
        .from("profiles")
        .insert({
          id: supabaseUser.id,
          email: supabaseUser.email || "",
          first_name: firstName,
          last_name: lastName,
          role: role,
          is_verified: true,
        })
        .select()
        .single();

      if (createError) {
        console.error("Error creating profile:", createError);

        // If profile already exists, try to fetch it again
        if (createError.code === "23505") {
          // Unique constraint violation
          console.log("Profile already exists, fetching...");
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", supabaseUser.id)
            .single();

          if (existingProfile) {
            const userProfile = {
              id: existingProfile.id,
              email: existingProfile.email,
              firstName: existingProfile.first_name,
              lastName: existingProfile.last_name,
              role: existingProfile.role,
              isVerified: existingProfile.is_verified,
              avatar: existingProfile.avatar_url,
              bio: existingProfile.bio,
              name: `${existingProfile.first_name} ${existingProfile.last_name}`.trim(),
            };
            setUser(userProfile);
            return userProfile;
          }
        }
        return null;
      }

      if (newProfile) {
        console.log("Profile created successfully:", newProfile);
        const userProfile = {
          id: newProfile.id,
          email: newProfile.email,
          firstName: newProfile.first_name,
          lastName: newProfile.last_name,
          role: newProfile.role,
          isVerified: newProfile.is_verified,
          avatar: newProfile.avatar_url,
          bio: newProfile.bio,
          name: `${newProfile.first_name} ${newProfile.last_name}`.trim(),
        };
        setUser(userProfile);
        return userProfile;
      }
    } catch (error) {
      console.error("Error in createUserProfile:", error);
    }
    return null;
  };

  const signup = async (
    userData: SignupData
  ): Promise<{ success: boolean; message?: string; user?: User }> => {
    if (!isSupabaseAvailable()) {
      return {
        success: false,
        message:
          "Authentication service is not available. Please check your configuration.",
      };
    }

    try {
      const supabase = getSupabase();
      console.log("Starting signup process for:", userData.email);

      // Sign up the user with Supabase Auth
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
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error("No user data returned from signup");
      }

      console.log("Auth signup successful, user ID:", data.user.id);

      // Create the profile immediately
      const userProfile = await createUserProfile(data.user);

      if (!userProfile) {
        throw new Error("Failed to create user profile");
      }

      // If the user is automatically signed in (email confirmation disabled)
      if (data.session) {
        console.log("User automatically signed in after signup");
        return {
          success: true,
          message: "Account created successfully! Welcome to iSabiTV!",
          user: userProfile,
        };
      }

      // If email confirmation is required, try to sign them in manually
      console.log("Attempting to sign in user after signup...");
      try {
        const { data: signInData, error: signInError } =
          await supabase.auth.signInWithPassword({
            email: userData.email,
            password: userData.password,
          });

        if (signInError) {
          console.log("Auto sign-in failed:", signInError.message);
          return {
            success: true,
            message:
              "Account created successfully! Please sign in to continue.",
          };
        }

        if (signInData.user) {
          console.log("Auto sign-in successful");
          return {
            success: true,
            message: "Account created successfully! Welcome to iSabiTV!",
            user: userProfile,
          };
        }
      } catch (signInError) {
        console.log("Auto sign-in failed:", signInError);
      }

      return {
        success: true,
        message: "Account created successfully! Please sign in to continue.",
      };
    } catch (error: any) {
      console.error("Signup error:", error);
      return {
        success: false,
        message: error.message || "An error occurred during signup",
      };
    }
  };

  const login = async (email: string, password: string) => {
    if (!isSupabaseAvailable()) {
      throw new Error(
        "Authentication service is not available. Please check your configuration."
      );
    }

    try {
      const supabase = getSupabase();
      console.log("Attempting login for:", email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error("Login error:", error);

        // Handle email not confirmed error specifically
        if (
          error.message.includes("Email not confirmed") ||
          error.code === "email_not_confirmed"
        ) {
          console.log("Attempting to resolve email confirmation issue...");
          throw new Error(
            "Account activation required. Please run the SQL fix script in your Supabase dashboard or contact support."
          );
        }

        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error("No user data returned from login");
      }

      console.log("Login successful for:", email);
    } catch (error: any) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    if (!isSupabaseAvailable()) {
      throw new Error("Authentication service is not available");
    }

    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        // Don't throw here, just log the error
      }
    } catch (error: any) {
      console.error("Logout error:", error);
    } finally {
      // Always clear the user state
      setUser(null);
    }
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

// Also export as default for alternative import syntax
export default useAuth;
