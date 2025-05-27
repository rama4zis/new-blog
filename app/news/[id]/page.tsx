import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Share2 } from "lucide-react"
import PopularNews from "@/components/popular-news"
import RecentComments from "@/components/recent-comments"
import { notFound } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import Comments from "@/components/comments"

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = createClient()

  // Ambil post dengan join ke kategori dan user
  const { data: post, error } = await supabase
    .from("posts")
    .select(`*`)
    .eq("id", (await params).id)
    .single()

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, avatar_url")
    .eq("id", post.user_id)
    .single()

    const {data: category} = await supabase
    .from("categories")
    .select("name")
    .eq("id", post.category_id)
    .single()

  if (error || !post || !profile || !category) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Kembali</span>
            </Link>
          </Button>

          <Link href="/">
            <div className="flex items-end">
              <span className="text-2xl font-bold text-blue-800">NewBlog</span>
              <span className="text-2xl font-bold text-red-500">com</span>
            </div>
          </Link>

          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Bagikan</span>
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 justify-between">
          <article className="flex-1 max-w-3xl">
            <div className="mb-4">
              <span className="text-blue-700 font-medium">{category.name ?? "Tanpa Kategori"}</span>
            </div>

            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

            <div className="flex items-center text-gray-500 mb-6 text-sm">
              <span>{profile?.username ?? "Anonim"}</span>
              <span className="mx-2">-</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{new Date(post.created_at).toLocaleDateString("id-ID", {
                  day: "numeric", month: "long", year: "numeric"
                })}</span>
              </div>
            </div>


            <div className="mb-6">
              <Image
                src={post.image_url || "/placeholder.svg"}
                alt={post.title}
                width={1000}
                height={500}
                className="w-full h-auto rounded-md"
              />
            </div>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <Comments postId={post.id} />

          </article>

          <div className="lg:w-80 space-y-6">
            <PopularNews />
            <RecentComments />
          </div>
        </div>
      </div>
    </main>
  )
}
