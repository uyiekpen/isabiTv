"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { isSupabaseAvailable } from "@/lib/supabase-client"

export function EnvironmentCheck() {
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    if (!isSupabaseAvailable()) {
      setShowWarning(true)
    }
  }, [])

  if (!showWarning) return null

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Configuration Required</AlertTitle>
      <AlertDescription>
        Supabase environment variables are missing. Please configure NEXT_PUBLIC_SUPABASE_URL and
        NEXT_PUBLIC_SUPABASE_ANON_KEY to enable authentication features.
      </AlertDescription>
    </Alert>
  )
}
