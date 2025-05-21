import { NextRequest, NextResponse } from 'next/server'
import { IncomingForm } from 'formidable'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

export const config = {
  api: {
    bodyParser: false,
  },
}

const uploadDir = path.join(process.cwd(), 'public', 'uploads')
const mkdir = promisify(fs.mkdir)

export async function POST(req: NextRequest) {
  if (!fs.existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true })
  }

  const form = new IncomingForm({
    multiples: false,
    uploadDir: uploadDir,
    keepExtensions: true,
  })

  const parseForm = () =>
    new Promise<{ fields: any; files: any }>((resolve, reject) => {
      form.parse(req as any, (err, fields, files) => {
        if (err) return reject(err)
        resolve({ fields, files })
      })
    })

  try {
    const { files } = await parseForm()

    const file = files.image[0]
    const ext = path.extname(file.originalFilename || '.png')
    const newFileName = `${Date.now()}-${Math.floor(Math.random() * 10000)}${ext}`
    const newPath = path.join(uploadDir, newFileName)

    await fs.promises.rename(file.filepath, newPath)

    const imageUrl = `/uploads/${newFileName}`

    return NextResponse.json({ url: imageUrl }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
