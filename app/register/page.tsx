import Navigation from "@/components/nav"
import { RegisterForm } from "@/components/register-form"

export default function RegisterPage() {
  return (
    <>
      <Navigation />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h1 className="text-2xl font-semibold mb-6 text-center">Daftar Akun</h1>
          <RegisterForm />
        </div>
      </div>
    </>
  )
}
