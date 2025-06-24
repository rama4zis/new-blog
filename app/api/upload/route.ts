import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get("image") as File

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadDir = path.join(process.cwd(), "public", "uploads")
  await fs.mkdir(uploadDir, { recursive: true })

  const ext = file.name.split(".").pop()
  const fileName = `${Date.now()}-${Math.floor(Math.random() * 10000)}.${ext}`
  const filePath = path.join(uploadDir, fileName)

  await fs.writeFile(filePath, buffer)
  
  // Ensure file is written and accessible
  await new Promise(resolve => setTimeout(resolve, 100))

  // Use API route instead of static file path for production compatibility
  const imageUrl = `/api/images/${fileName}`

  return NextResponse.json({ url: imageUrl }, { status: 200 })
}
