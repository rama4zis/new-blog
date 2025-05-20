"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/app/login/actions"

export function LoginForm() {
  // const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  //   remember: false,
  // })
  // const [errors, setErrors] = useState({
  //   email: "",
  //   password: "",
  // })

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target
  //   setFormData((prev) => ({ ...prev, [name]: value }))
  //   // Clear error when user types
  //   if (errors[name as keyof typeof errors]) {
  //     setErrors((prev) => ({ ...prev, [name]: "" }))
  //   }
  // }

  // const validateForm = () => {
  //   let valid = true
  //   const newErrors = { ...errors }
  //   console.log(formData)

  //   if (!formData.email) {
  //     newErrors.email = "Email harus diisi"
  //     valid = false
  //   }

  //   if (!formData.password) {
  //     newErrors.password = "Password harus diisi"
  //     valid = false
  //   }

  //   setErrors(newErrors)
  //   return valid
  // }

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="nama@email.com"
          // value={formData.email}
          // onChange={handleChange}
          required
        />
        {/* {errors.email && <p className="text-sm text-red-500">{errors.email}</p>} */}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link href="/forgot-password" className="text-sm text-blue-700 hover:underline">
            Lupa Password?
          </Link>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          // value={formData.password}
          // onChange={handleChange}
          required
        />
        {/* {errors.password && <p className="text-sm text-red-500">{errors.password}</p>} */}
      </div>

      <Button formAction={login} type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white" disabled={isLoading}>
        {isLoading ? "Memproses..." : "Masuk"}
      </Button>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link href="/register" className="text-blue-700 hover:underline font-medium">
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </form>
  )
}
