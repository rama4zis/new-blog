"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

// Load komponen client secara dinamis TANPA SSR
const SearchPageClient = dynamic(() => import("./SearchPageClient"), {
  ssr: false,
  loading: () => <p>Memuat hasil pencarian...</p>,
})

export default function SearchPageWrapper() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SearchPageClient />
    </Suspense>
  )
}
