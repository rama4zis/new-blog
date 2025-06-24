import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { promisify } from "util"

const readFile = promisify(fs.readFile)
const stat = promisify(fs.stat)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params
    const imagePath = resolvedParams.path.join("/")
    const filePath = path.join(process.cwd(), "public", "uploads", imagePath)

    // Check if file exists
    const stats = await stat(filePath)
    if (!stats.isFile()) {
      return new NextResponse("File not found", { status: 404 })
    }

    // Read the file
    const fileBuffer = await readFile(filePath)

    // Get file extension to determine content type
    const ext = path.extname(filePath).toLowerCase()
    const contentType = getContentType(ext)

    // Return the file with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Length": stats.size.toString(),
      },
    })
  } catch (error) {
    console.error("Error serving image:", error)
    return new NextResponse("File not found", { status: 404 })
  }
}

function getContentType(ext: string): string {
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg"
    case ".png":
      return "image/png"
    case ".gif":
      return "image/gif"
    case ".webp":
      return "image/webp"
    case ".svg":
      return "image/svg+xml"
    default:
      return "image/jpeg"
  }
}
