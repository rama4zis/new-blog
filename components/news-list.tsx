"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"
import { createClient } from "@/utils/supabase/client"

type Post = {
  id: string
  title: string
  image_url: string | null
  created_at: string
  categories: {
    name: string
  } | null
}

export default function NewsList() {
  const [posts, setPosts] = useState<Post[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, image_url, created_at, categories(name)")
        .order("created_at", { ascending: false })
        .limit(10)

      if (error) {
        console.error("Gagal mengambil data:", error)
      } else {
        setPosts(data)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
      <div className="bg-blue-700 text-white py-2 px-4">
        <h2 className="font-bold">Berita Terbaru</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {posts.map((item) => (
          <Link key={item.id} href={`/news/${item.id}`}>
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
  )
}

// Simple relative time formatter
function formatTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / 60000) // in minutes

  if (diff < 1) return "Baru saja"
  if (diff < 60) return `${diff} menit lalu`
  const hours = Math.floor(diff / 60)
  if (hours < 24) return `${hours} jam lalu`
  const days = Math.floor(hours / 24)
  return `${days} hari lalu`
}
