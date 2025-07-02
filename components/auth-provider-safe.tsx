"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { getSupabaseClient, isSupabaseAvailable } from "@/lib/supabase"
import type { User as SupabaseUser, Session } from "@supabase/supabase-js"

type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "viewer" | "creator" | "admin"
  isVerified: boolean
  avatar?: string | null
  bio?: string | null
  name: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (userData: SignupData) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
  isLoading: boolean
}

type SignupData = {
  email: string
  password: string
  firstName: string
  lastName: string
  role: "viewer" | "creator" | "admin"
  subscribeNewsletter?: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProviderSafe({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Don't initialize if Supabase client is not available
    if (!isSupabaseAvailable()) {
      console.warn("Supabase client not initialized - missing environment variables")
      setIsLoading(false)
      return
    }

    const supabase = getSupabaseClient()

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
        }

        if (data?.session?.user) {
          await fetchUserProfile(data.session.user)
        }
      } catch (error) {
        console.error("Error in getInitialSession:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session: Session | null) => {
      console.log("Auth state changed:", event, session?.user?.email)

      if (session?.user) {
        await fetchUserProfile(session.user)
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    if (!isSupabaseAvailable()) return

    const supabase = getSupabaseClient()

    try {
      const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", supabaseUser.id).single()

      if (error) {
        console.error("Error fetching profile:", error)
        // If profile doesn't exist, create a basic one
        if (error.code === "PGRST116") {
          console.log("Profile not found, creating basic profile")
          const { error: createError } = await supabase.from("profiles").insert({
            id: supabaseUser.id,
            email: supabaseUser.email || "",
            first_name: supabaseUser.user_metadata?.first_name || "",
            last_name: supabaseUser.user_metadata?.last_name || "",
            role: supabaseUser.user_metadata?.role || "creator",
            is_verified: true,
          })

          if (createError) {
            console.error("Error creating profile:", createError)
          } else {
            // Fetch the newly created profile
            const { data: newProfile } = await supabase.from("profiles").select("*").eq("id", supabaseUser.id).single()
            if (newProfile) {
              setUser({
                id: newProfile.id,
                email: newProfile.email,
                firstName: newProfile.first_name,
                lastName: newProfile.last_name,
                role: newProfile.role,
                isVerified: newProfile.is_verified,
                avatar: newProfile.avatar_url,
                bio: newProfile.bio,
                name: `${newProfile.first_name} ${newProfile.last_name}`.trim(),
              })
            }
          }
        }
        return
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
          name: `${profile.first_name} ${profile.last_name}`.trim(),
        })
      }
    } catch (error) {
      console.error("Error in fetchUserProfile:", error)
    }
  }

  const signup = async (userData: SignupData): Promise<{ success: boolean; message?: string }> => {
    if (!isSupabaseAvailable()) {
      return {
        success: false,
        message: "Authentication service is not available. Please check your configuration.",
      }
    }

    const supabase = getSupabaseClient()

    try {
      console.log("Starting signup process for:", userData.email)

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
      })

      if (error) {
        console.error("Auth signup error:", error)
        throw new Error(error.message)
      }

      if (!data.user) {
        throw new Error("No user data returned from signup")
      }

      console.log("Auth signup successful, user ID:", data.user.id)

      // Create profile in database immediately
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        role: userData.role,
        is_verified: true,
      })

      if (profileError) {
        console.error("Profile creation error:", profileError)
      }

      return {
        success: true,
        message: "Account created successfully! You can now sign in.",
      }
    } catch (error: any) {
      console.error("Signup error:", error)
      return {
        success: false,
        message: error.message || "An error occurred during signup",
      }
    }
  }

  const login = async (email: string, password: string) => {
    if (!isSupabaseAvailable()) {
      throw new Error("Authentication service is not available. Please check your configuration.")
    }

    const supabase = getSupabaseClient()

    console.log("Attempting login for:", email)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) {
        console.error("Login error:", error)
        throw new Error(error.message)
      }

      if (!data.user) {
        throw new Error("No user data returned from login")
      }

      console.log("Login successful for:", email)
    } catch (error: any) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const logout = async () => {
    if (!isSupabaseAvailable()) {
      throw new Error("Authentication service is not available")
    }

    const supabase = getSupabaseClient()

    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
