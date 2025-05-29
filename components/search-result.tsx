"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import Link from "next/link"

type News = {
  id: string
  title: string
  slug: string
  created_at: string
}

export default function SearchResult({ query }: { query: string }) {
  const [results, setResults] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, created_at")
        .ilike("title", `%${query}%`)
        .order("created_at", { ascending: false })

      if (!error && data) {
        setResults(data)
      }
      setLoading(false)
    }

    if (query) fetchResults()
  }, [query, supabase])

  if (loading) return <p>Loading...</p>
  if (!results.length) return <p>Tidak ada hasil ditemukan.</p>

  return (
    <ul className="space-y-4">
      {results.map((news) => (
        <li key={news.id}>
          <Link
            href={`/news/${news.slug}`}
            className="text-lg font-semibold text-blue-700 hover:underline"
          >
            {news.title}
          </Link>
          <p className="text-sm text-gray-500">{new Date(news.created_at).toLocaleDateString()}</p>
        </li>
      ))}
    </ul>
  )
}
