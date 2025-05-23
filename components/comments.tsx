// components/comments.tsx
"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { MessageCircle } from "lucide-react"

interface Comment {
  id: string
  content: string
  created_at: string
  users: {
    email: string
  } | null
}

export default function Comments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchComments = async () => {
      const supabase = createClient()

      const { data, error } = await supabase
        .from("comments")
        .select(`
          id,
          content,
          created_at,
          users:auth.users ( email )
        `)
        .eq("post_id", postId)
        .order("created_at", { ascending: false })

      if (!error && data) {
        setComments(data)
      }

      setLoading(false)
    }

    fetchComments()
  }, [postId])

  return (
    <section>
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5" />
        Komentar ({comments.length})
      </h2>

      {loading ? (
        <p>Memuat komentar...</p>
      ) : comments.length === 0 ? (
        <p>Belum ada komentar. Jadilah yang pertama!</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="border rounded-lg p-4">
              <p className="text-gray-700 mb-2">{comment.content}</p>
              <div className="text-sm text-gray-500">
                {comment.users?.email ?? "Anonim"} •{" "}
                {new Date(comment.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
