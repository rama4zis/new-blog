"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type Comment = {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
}

type Profile = {
  id: string
  username: string | null
  avatar_url: string | null
}

type CommentWithProfile = Comment & {
  profile?: Profile
}

export default function CommentsSection({ postId }: { postId: string }) {
  const supabase = createClient()
  const [comments, setComments] = useState<CommentWithProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const fetchComments = async () => {
    const { data: rawComments, error: commentError } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: false })

    if (commentError || !rawComments) return

    const userIds = [...new Set(rawComments.map((c) => c.user_id))]
    const { data: profiles, error: profileError } = await supabase
      .from("profiles")
      .select("id, username, avatar_url")
      .in("id", userIds)

    if (profileError || !profiles) return

    const profileMap = Object.fromEntries(profiles.map(p => [p.id, p]))

    const mergedComments = rawComments.map((c) => ({
      ...c,
      profile: profileMap[c.user_id],
    }))

    setComments(mergedComments)
    setLoading(false)
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setSubmitting(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("You must be logged in to comment.")
      setSubmitting(false)
      return
    }

    const { error } = await supabase.from("comments").insert({
      post_id: postId,
      user_id: user.id,
      content: newComment.trim(),
    })

    if (!error) {
      setNewComment("")
      await fetchComments() // Refresh
    } else {
      console.error(error)
      alert("Failed to post comment.")
    }

    setSubmitting(false)
  }

  if (loading) return <p>Loading comments...</p>

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-lg font-semibold">Komentar</h2>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Tulis komentar..."
          className="resize-none"
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? "Mengirim..." : "Kirim"}
        </Button>
      </form>

      {/* Comment List */}
      {comments.map((c) => {
        const username = c.profile?.username ?? "Anonim"
        const avatarUrl = c.profile?.avatar_url ?? "/default-avatar.png"

        return (
          <div key={c.id} className="border rounded p-4 flex gap-3 items-start">
            <Avatar>
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="text-2xl">
                {username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{username}</p>
              <p className="text-sm text-gray-600">{new Date(c.created_at).toLocaleString()}</p>
              <p className="mt-2">{c.content}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
