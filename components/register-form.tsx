"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signup } from "@/app/login/actions"

export function RegisterForm() {
  

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="nama@email.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Minimal 8 karakter"
          required
        />
        <p className="text-xs text-gray-500">
          Password harus terdiri dari minimal 8 karakter, termasuk huruf besar, huruf kecil, dan angka
        </p>
      </div>
      
      <Button formAction={signup} type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white" >
        Daftar
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
