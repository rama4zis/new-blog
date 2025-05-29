"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, User } from "lucide-react";
import { AuthButtons } from "@/components/auth-button";
import { useRouter } from "next/navigation"

type Category = {
    id: string
    name: string
    slug: string
}

export default function Navigation() {
    const [categories, setCategories] = useState<Category[]>([])
    const [user, setUser] = useState<any>(null)
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")

    const supabase = createClient()

    useEffect(() => {
        async function fetchUserAndCategories() {
            const { data: categoriesData, error } = await supabase
                .from("categories")
                .select("id, name, slug")
                .order("name", { ascending: true })

            if (!error && categoriesData) setCategories(categoriesData)

            const { data: userData } = await supabase.auth.getUser()
            setUser(userData?.user)
        }

        fetchUserAndCategories()
    }, [supabase])

    function handleSearchSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    return (
        <>
            {/* Header */}
            <header>
                <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Menu</span>
                        </Button>
                        <span className="hidden md:inline font-medium">MENU</span>
                    </div>
                    <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md mx-4">
                        <Input
                            type="search"
                            placeholder="Cari berita anda"
                            className="pl-3 pr-10 rounded-full border-gray-300"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit">
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </button>
                    </form>

                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                <Link href="/account">
                                    <Button variant="ghost" size="icon">
                                        <User className="w-5 h-5" />
                                        <span className="sr-only">Akun Saya</span>
                                    </Button>
                                </Link>
                                <form action="/auth/signout" method="post">
                                    <Button
                                        variant="outline"
                                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                        type="submit"
                                    >
                                        Logout
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <AuthButtons />
                        )}
                    </div>

                </div>
            </header>

            {/* Logo */}
            <div className="container mx-auto px-4 py-6 flex justify-center">
                <Link href="/">
                    <div className="flex items-end">
                        <span className="text-5xl font-bold text-blue-800">NewBlog</span>
                        <span className="text-5xl font-bold text-red-500">com</span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="bg-blue-700 text-white mb-5">
                <div className="container mx-auto px-4 overflow-x-auto">
                    <div className="flex space-x-6 py-3 whitespace-nowrap">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/category/${cat.slug}`}
                                className="font-medium hover:text-blue-200"
                            >
                                {cat.name.toUpperCase()}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    )
}
