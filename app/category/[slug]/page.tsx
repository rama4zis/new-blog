import { createClient } from "@/utils/supabase/client"
import { notFound } from "next/navigation"
import { AuthButtons } from "@/components/auth-button"
import PopularNews from "@/components/popular-news"
import RecentComments from "@/components/recent-comments"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Search, Clock } from "lucide-react"
import Link from "next/link"

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("id, name")
    .eq("slug", params.slug)
    .single()

  if (categoryError || !category) notFound()

  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, created_at, image_url")
    .eq("category_id", category.id)
    .order("created_at", { ascending: false })

  return (
    <main className="min-h-screen">
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
          <div className="relative w-full max-w-md mx-4">
            <Input
              type="search"
              placeholder="Cari berita anda"
              className="pl-3 pr-10 rounded-full border-gray-300"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <AuthButtons />
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

      {/* Navbar */}
      <nav className="bg-blue-700 text-white">
        <div className="container mx-auto px-4 overflow-x-auto">
          <div className="flex space-x-6 py-3 whitespace-nowrap">
            {/* Hardcoded kategori list, bisa juga dinamis */}
            {["detikNews", "detikFinance", "detikHot", "detikInet", "detikSport", "detikOto", "detikTravel", "detikFood", "detikHealth", "Wolipop", "20detik", "Daerah"].map((name) => (
              <Link key={name} href="#" className="font-medium hover:text-blue-200">
                {name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Konten */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-6">Kategori: {category.name}</h1>
            {posts && posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link
                    href={`/news/${post.slug}`}
                    key={post.id}
                    className="border rounded-lg overflow-hidden shadow hover:shadow-md transition"
                  >
                    <img
                      src={post.image_url || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold">{post.title}</h2>
                      <div className="text-gray-500 text-sm flex items-center mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(post.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p>Tidak ada postingan dalam kategori ini.</p>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6 my-8">
            <PopularNews />
            <RecentComments />
          </div>
        </div>
      </div>
    </main>
  )
}
