"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Category = {
  id: string
  name: string
  slug: string
}

export default function EditPostForm() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string

  const supabase = createClient()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data: categoriesData } = await supabase
        .from("categories")
        .select("id, name, slug")

      if (categoriesData) setCategories(categoriesData)

      const { data: post } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single()

      if (post) {
        setTitle(post.title)
        setContent(post.content)
        setCategoryId(post.category_id)
        setImageUrl(post.image_url)
      }
    }

    fetchData()
  }, [slug, supabase])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setUploading(true)

    let newImageUrl = imageUrl

    if (imageFile) {
      const formData = new FormData()
      formData.append("image", imageFile)

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Upload gagal")

        newImageUrl = data.url
      } catch (err) {
        alert("Gagal upload gambar")
        console.error(err)
        setUploading(false)
        return
      }
    }

    const { error } = await supabase
      .from("posts")
      .update({
        title,
        slug: title.toLowerCase().replace(/\s+/g, "-"),
        content,
        category_id: categoryId,
        image_url: newImageUrl,
      })
      .eq("slug", slug)

    setUploading(false)

    if (error) {
      console.error("Gagal memperbarui postingan:", error)
      alert("Gagal memperbarui postingan")
    } else {
      alert("Postingan berhasil diperbarui!")
    //   router.push(`/news/${slug}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6 border rounded-xl shadow bg-white">
      <h2 className="text-2xl font-bold">Edit Postingan</h2>

      <div className="space-y-2">
        <Label htmlFor="title">Judul</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Kategori</Label>
        <Select value={categoryId} onValueChange={(value) => setCategoryId(value)}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Pilih kategori" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Konten</Label>
        <Textarea
          id="content"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Ganti Gambar</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
      </div>

      {(imageFile || imageUrl) && (
        <div className="mt-4">
          <p className="text-sm">Pratinjau gambar:</p>
          <img
            src={imageFile ? URL.createObjectURL(imageFile) : imageUrl || "/placeholder.svg"}
            alt="Preview"
            className="max-h-48 rounded border mt-2"
          />
        </div>
      )}

      <Button type="submit" disabled={uploading} className="bg-blue-600 text-white hover:bg-blue-700">
        {uploading ? "Menyimpan..." : "Simpan Perubahan"}
      </Button>
    </form>
  )
}
