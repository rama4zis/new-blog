"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/utils/supabase/client"

type Post = {
  id: string
  title: string
  image_url?: string
}

export default function PopularNews() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const supabase = createClient()

    const fetchRandomPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")

      if (!error && data) {
        // Acak secara client-side
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 5)
        setPosts(shuffled)
      }

    }

    fetchRandomPosts()
  }, [])

  return (
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
      <div className="bg-blue-700 text-white py-2 px-4">
        <h2 className="font-bold">Berita Populer</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {posts.map((item, index) => (
          <Link key={item.id} href={`/news/${item.id}`}>
            <div className="p-3 hover:bg-gray-50 flex gap-3 group">
              <div className="relative flex-shrink-0">
                <Image
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.title}
                  width={120}
                  height={80}
                  className="w-20 h-14 object-cover rounded"
                />
                <div className="absolute top-0 left-0 bg-blue-700 text-white text-xs px-1.5 py-0.5 rounded-br">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium line-clamp-2 group-hover:text-blue-700">
                  {item.title}
                </h3>
                {/* <div className="text-xs text-gray-500 mt-1">
                  {item.views ? `${item.views.toLocaleString()} dibaca` : "0 dibaca"}
                </div> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
