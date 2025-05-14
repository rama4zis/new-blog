"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, terms: checked }))
    if (checked) {
      setErrors((prev) => ({ ...prev, terms: "" }))
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!formData.name) {
      newErrors.name = "Nama harus diisi"
      valid = false
    }

    if (!formData.email) {
      newErrors.email = "Email harus diisi"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
      valid = false
    }

    if (!formData.password) {
      newErrors.password = "Password harus diisi"
      valid = false
    } else if (formData.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter"
      valid = false
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password harus mengandung huruf besar, huruf kecil, dan angka"
      valid = false
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password harus diisi"
      valid = false
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok"
      valid = false
    }

    if (!formData.terms) {
      newErrors.terms = "Anda harus menyetujui syarat dan ketentuan"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to home page after successful registration
      router.push("/")
    }, 1500)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="name">Nama Lengkap</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Nama lengkap Anda"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="nama@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Minimal 8 karakter"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <p className="text-xs text-gray-500">
          Password harus terdiri dari minimal 8 karakter, termasuk huruf besar, huruf kecil, dan angka
        </p>
        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Ulangi password Anda"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
      </div>
      
      <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white" disabled={isLoading}>
        {isLoading ? "Memproses..." : "Daftar"}
      </Button>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-blue-700 hover:underline font-medium">
            Masuk
          </Link>
        </p>
      </div>
    </form>
  )
}
