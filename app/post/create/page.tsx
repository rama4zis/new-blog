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
  const [categoryId, setCategoryId] = useState<string>("") // Ganti dari slug ke ID

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

    let imageUrl: string | null = null

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

        imageUrl = data.url
      } catch (err) {
        alert("Gagal upload gambar")
        console.error(err)
        setUploading(false)
        return
      }
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    
    if (userError || !user) {
      alert("Tidak dapat mengambil data pengguna.")
      setUploading(false)
      return
    }
    
    const { error } = await supabase.from("posts").insert([
      {
        title,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        content,
        category_id: categoryId,
        image_url: imageUrl,
        published: true,
        user_id: user.id,
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
      setCategoryId("")
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

      {imageFile && (
        <div className="mt-4">
          <p className="text-sm">Pratinjau gambar:</p>
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="max-h-48 rounded border mt-2"
          />
        </div>
      )}


      <Button type="submit" disabled={uploading} className="bg-blue-600 text-white hover:bg-blue-700">
        {uploading ? "Menyimpan..." : "Simpan Postingan"}
      </Button>
    </form>
  )
}