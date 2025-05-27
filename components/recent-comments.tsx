"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MessageSquare } from "lucide-react"
import { createClient } from "@/utils/supabase/client"

type Comment = {
  id: string
  content: string
  created_at: string
  post_id: string
  user_id: string
}

type Post = {
  id: string
  title: string
}

type Profile = {
  id: string
  username: string
}

function timeAgo(dateString: string) {
  const now = new Date()
  const past = new Date(dateString)
  const diff = (now.getTime() - past.getTime()) / 1000 // in seconds

  if (diff < 60) return "baru saja"
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`
  if (diff < 172800) return "kemarin"
  return `${Math.floor(diff / 86400)} hari lalu`
}

export default function RecentComments() {
  const [comments, setComments] = useState<
    (Comment & { postTitle?: string; username?: string })[]
  >([])

  useEffect(() => {
    const supabase = createClient()

    const fetchData = async () => {
      const { data: commentData, error: commentError } = await supabase
        .from("comments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5)

      if (commentError || !commentData) return

      const postIds = [...new Set(commentData.map((c) => c.post_id))]
      const userIds = [...new Set(commentData.map((c) => c.user_id))]

      const [{ data: posts }, { data: profiles }] = await Promise.all([
        supabase.from("posts").select("id, title").in("id", postIds),
        supabase.from("profiles").select("id, username").in("id", userIds),
      ])

      const commentsWithMeta = commentData.map((c) => {
        const post = posts?.find((p) => p.id === c.post_id)
        const user = profiles?.find((u) => u.id === c.user_id)
        return {
          ...c,
          postTitle: post?.title ?? "Judul tidak ditemukan",
          username: user?.username ?? "Anonim",
        }
      })

      setComments(commentsWithMeta)
    }

    fetchData()
  }, [])

  return (
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
      <div className="bg-blue-700 text-white py-2 px-4">
        <h2 className="font-bold">Komentar Terbaru</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {comments.map((item) => (
          <div key={item.id} className="p-3 hover:bg-gray-50">
            <div className="flex items-start gap-2">
              <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-blue-700">
                    {item.username}
                  </span>
                  <span className="text-xs text-gray-500">
                    {timeAgo(item.created_at)}
                  </span>
                </div>
                <p className="text-sm mt-1 line-clamp-2">{item.content}</p>
                <Link
                  href={`/news/${item.post_id}`}
                  className="text-xs text-gray-500 mt-1 block hover:underline"
                >
                  di: {item.postTitle}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
