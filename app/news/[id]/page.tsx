import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Share2 } from "lucide-react"
import PopularNews from "@/components/popular-news"
import RecentComments from "@/components/recent-comments"

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  // Dalam implementasi nyata, data akan diambil dari API berdasarkan ID
  const newsData = {
    id: params.id,
    title: "Pemprov DKI Bakal Jadikan Pencak Silat Ekskul Wajib di Sekolah",
    image: "/placeholder.svg?height=500&width=1000",
    category: "detikNews",
    date: "Selasa, 13 Mei 2025 14:30 WIB",
    author: "Ahmad Rizki",
    content: `
      <p>Jakarta - Pemerintah Provinsi DKI Jakarta berencana menjadikan pencak silat sebagai ekstrakurikuler wajib di sekolah-sekolah. Hal ini disampaikan langsung oleh Gubernur DKI Jakarta dalam kunjungan kerjanya ke Padepokan Pencak Silat Indonesia di Taman Mini Indonesia Indah, Jakarta Timur.</p>
      
      <p>"Pencak silat adalah warisan budaya Indonesia yang harus kita lestarikan. Dengan menjadikannya sebagai ekstrakurikuler wajib, kita harapkan generasi muda Jakarta bisa lebih mengenal dan mencintai budaya bangsa sendiri," ujar Gubernur DKI Jakarta.</p>
      
      <p>Menurut Gubernur, pencak silat tidak hanya mengajarkan bela diri, tetapi juga nilai-nilai luhur seperti kedisiplinan, ketangguhan, dan sportivitas. Nilai-nilai ini dianggap penting untuk membentuk karakter generasi muda.</p>
      
      <p>Ketua IPSI (Ikatan Pencak Silat Indonesia) DKI Jakarta, Budi Santoso, menyambut baik rencana tersebut. Ia mengatakan bahwa pihaknya siap mendukung program ini dengan menyediakan pelatih-pelatih berkualitas untuk sekolah-sekolah di Jakarta.</p>
      
      <p>"Kami sangat mengapresiasi langkah Pemprov DKI Jakarta. IPSI siap mendukung dengan menyediakan pelatih dan kurikulum yang sesuai untuk siswa-siswa," kata Budi.</p>
      
      <p>Rencananya, program ekstrakurikuler wajib pencak silat ini akan mulai diterapkan pada tahun ajaran baru 2025/2026. Pemprov DKI Jakarta juga akan mengalokasikan anggaran khusus untuk pengadaan sarana dan prasarana pendukung di sekolah-sekolah.</p>
    `,
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header with back button */}
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Kembali</span>
            </Link>
          </Button>

          <Link href="/">
            <div className="flex items-end">
              <span className="text-2xl font-bold text-blue-800">NewBlog</span>
              <span className="text-2xl font-bold text-red-500">com</span>
            </div>
          </Link>

          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Bagikan</span>
          </Button>
        </div>
      </header>

      {/* Article content with sidebar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 justify-between">
          {/* Main Article */}
          <article className="flex-1 max-w-3xl">
            <div className="mb-4">
              <span className="text-blue-700 font-medium">{newsData.category}</span>
            </div>

            <h1 className="text-3xl font-bold mb-4">{newsData.title}</h1>

            <div className="flex items-center text-gray-500 mb-6 text-sm">
              <span>{newsData.author}</span>
              <span className="mx-2">-</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{newsData.date}</span>
              </div>
            </div>

            <div className="mb-6">
              <Image
                src={newsData.image || "/placeholder.svg"}
                alt={newsData.title}
                width={1000}
                height={500}
                className="w-full h-auto rounded-md"
              />
            </div>

            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: newsData.content }} />
          </article>

          {/* Right Sidebar */}
          <div className="lg:w-80 space-y-6">
            <PopularNews />
            <RecentComments />
          </div>
        </div>
      </div>
    </main>
  )
}
