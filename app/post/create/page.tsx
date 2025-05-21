"use client"

import { useEffect, useState } from "react"
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

export default function CreatePostForm() {
  const supabase = createClient()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, slug")
      if (!error && data) setCategories(data)
    }

    fetchCategories()
  }, [supabase])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setUploading(true)

    let imageUrl = null

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.floor(Math.random() * 10000)}.png`

      const filePath = `post-images/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(filePath, imageFile)

      if (uploadError) {
        alert("Gagal mengunggah gambar")
        console.error(uploadError)
        setUploading(false)
        return
      }

      const { data } = supabase.storage
        .from("post-images")
        .getPublicUrl(filePath)

      imageUrl = data.publicUrl
    }

    const { error } = await supabase.from("posts").insert([
      {
        title,
        content,
        category_slug: category,
        image_url: imageUrl,
      },
    ])

    setUploading(false)

    if (error) {
      console.error("Gagal menyimpan postingan:", error)
      alert("Gagal menyimpan postingan")
    } else {
      alert("Postingan berhasil disimpan!")
      setTitle("")
      setContent("")
      setCategory("")
      setImageFile(null)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6 border rounded-xl shadow bg-white">
      <h2 className="text-2xl font-bold">Buat Postingan Baru</h2>

      <div className="space-y-2">
        <Label htmlFor="title">Judul</Label>
        <Input
          id="title"
          placeholder="Masukkan judul postingan"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Kategori</Label>
        <Select value={category} onValueChange={(value) => setCategory(value)}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Pilih kategori" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
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
          placeholder="Tulis isi postingan di sini..."
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Upload Gambar</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
      </div>

      <Button type="submit" disabled={uploading} className="bg-blue-600 text-white hover:bg-blue-700">
        {uploading ? "Menyimpan..." : "Simpan Postingan"}
      </Button>
    </form>
  )
}
