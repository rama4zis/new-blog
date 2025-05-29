"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import Navigation from "@/components/nav"
import PopularNews from "@/components/popular-news"
import RecentComments from "@/components/recent-comments"

type News = {
  id: string
  title: string
  slug: string
  image_url: string | null
  created_at: string
  categories: {
    name: string
  } | null
}

export default function SearchPage() {
  const supabase = createClient()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<News[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query) return

    async function fetchSearchResults() {
      setLoading(true)
      const { data, error } = await supabase
        .from("posts")
        .select("*, categories(name)")
        .ilike("title", `%${query}%`)
        .order("created_at", { ascending: false })

      if (!error) {
        setResults(data)
      }

      setLoading(false)
    }

    fetchSearchResults()
  }, [query, supabase])

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold mb-4">
              Hasil pencarian untuk:{" "}
              <span className="text-blue-700">"{query}"</span>
            </h1>

            {loading && <p>Mencari berita...</p>}

            {!loading && results.length === 0 && (
              <p className="text-gray-500">Tidak ada hasil ditemukan.</p>
            )}

            <div className="divide-y divide-gray-200 bg-white border border-gray-200 rounded-md overflow-hidden">
              {!loading && results.length > 0 && (
                <div className="bg-blue-700 text-white py-2 px-4">
                  <h2 className="font-bold">Hasil Pencarian</h2>
                </div>
              )}
              {results.map((item) => (
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
                      <h3 className="font-medium line-clamp-2 group-hover:text-blue-700">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <span className="text-blue-700">{item.categories?.name || "Umum"}</span>
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
          </div>

          <div className="lg:w-80 space-y-6 my-8">
            <PopularNews />
            <RecentComments />
          </div>
        </div>
      </div>
    </main>
  )
}

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
