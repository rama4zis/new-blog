import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Masuk</h2>
        <LoginForm />
      </div>
    </div>
  )
}
