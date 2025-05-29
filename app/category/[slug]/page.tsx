import { createClient } from "@/utils/supabase/client"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"
import Navigation from "@/components/nav"
import PopularNews from "@/components/popular-news"
import RecentComments from "@/components/recent-comments"

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = createClient()

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("id, name")
    .eq("slug", (await params).slug)
    .single()

  if (categoryError || !category) notFound()

  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, image_url, created_at, categories(name)")
    .eq("category_id", category.id)
    .order("created_at", { ascending: false })

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Konten utama */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-4">Kategori: {category.name}</h1>

            {posts && posts.length > 0 ? (
              <div className="divide-y divide-gray-200 bg-white border border-gray-200 rounded-md overflow-hidden">
                <div className="bg-blue-700 text-white py-2 px-4">
                  <h2 className="font-bold">Daftar Berita</h2>
                </div>
                {posts.map((item) => (
                  <Link key={item.id} href={`/news/${item.slug}`}>
                    <div className="p-3 hover:bg-gray-50 flex gap-3 group">
                      <div className="flex-shrink-0">
                        <Image
                          src={item.image_url || "/placeholder.svg"}
                          alt={item.title}
                          width={90}
                          height={60}
                          className="w-[90px] h-[60px] object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium line-clamp-2 group-hover:text-blue-700">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span className="text-blue-700">{category.name}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{formatTimeAgo(item.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Tidak ada postingan dalam kategori ini.</p>
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

// Formatter waktu relatif
function formatTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / 60000)

  if (diff < 1) return "Baru saja"
  if (diff < 60) return `${diff} menit lalu`
  const hours = Math.floor(diff / 60)
  if (hours < 24) return `${hours} jam lalu`
  const days = Math.floor(hours / 24)
  return `${days} hari lalu`
}
