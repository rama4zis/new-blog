'use client'
import { useState } from 'react'

export default function UploadForm() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    setImageUrl(data.url)
  }

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <input type="file" name="image" accept="image/*" required />
      <button type="submit">Upload</button>

      {imageUrl && (
        <div>
          <p>Uploaded image:</p>
          <img src={imageUrl} alt="Uploaded" className="max-w-xs mt-2" />
        </div>
      )}
    </form>
  )
}
