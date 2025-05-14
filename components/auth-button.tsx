"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function AuthButtons() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)
    router.push("/login")
  }

  const handleRegister = () => {
    setIsLoading(true)
    router.push("/register")
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        className="bg-blue-700 hover:bg-blue-800 text-white rounded-full"
        onClick={handleRegister}
        disabled={isLoading}
      >
        Daftar
      </Button>
      <Button
        variant="outline"
        className="border-blue-700 text-blue-700 hover:bg-blue-50 rounded-full"
        onClick={handleLogin}
        disabled={isLoading}
      >
        Masuk
      </Button>
    </div>
  )
}
