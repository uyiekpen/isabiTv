"use client"

import type React from "react"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2, Shield, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AdminGuardProps {
  children: React.ReactNode
  requiredRole?: "admin" | "moderator" | "super_admin"
}

export function AdminGuard({ children, requiredRole = "admin" }: AdminGuardProps) {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded) return

    if (!user) {
      router.push("/auth/signin")
      return
    }

    // Check if user has admin role in their metadata
    const userRole = user.publicMetadata?.role as string
    const adminRoles = ["admin", "moderator", "super_admin"]

    if (!adminRoles.includes(userRole)) {
      setIsAuthorized(false)
      setIsLoading(false)
      return
    }

    // Check specific role requirements
    if (requiredRole === "super_admin" && userRole !== "super_admin") {
      setIsAuthorized(false)
      setIsLoading(false)
      return
    }

    if (requiredRole === "admin" && !["admin", "super_admin"].includes(userRole)) {
      setIsAuthorized(false)
      setIsLoading(false)
      return
    }

    setIsAuthorized(true)
    setIsLoading(false)
  }, [user, isLoaded, router, requiredRole])

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying access permissions...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-xl">Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access the admin panel. This area is restricted to authorized administrators
              only.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 justify-center">
                <Shield className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-800">Required Role: {requiredRole}</span>
              </div>
              <p className="text-xs text-amber-700 mt-1">
                Contact your system administrator if you believe this is an error.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button asChild variant="outline" className="flex-1 bg-transparent">
                <Link href="/">Return Home</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}

// Hook to check admin permissions
export function useAdminRole() {
  const { user } = useUser()

  const userRole = user?.publicMetadata?.role as string
  const isAdmin = ["admin", "super_admin"].includes(userRole)
  const isModerator = ["moderator", "admin", "super_admin"].includes(userRole)
  const isSuperAdmin = userRole === "super_admin"

  return {
    userRole,
    isAdmin,
    isModerator,
    isSuperAdmin,
    hasPermission: (requiredRole: string) => {
      switch (requiredRole) {
        case "super_admin":
          return isSuperAdmin
        case "admin":
          return isAdmin
        case "moderator":
          return isModerator
        default:
          return false
      }
    },
  }
}
