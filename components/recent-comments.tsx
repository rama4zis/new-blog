import Link from "next/link"
import { MessageSquare } from "lucide-react"

const recentComments = [
  {
    id: 1,
    user: "Ahmad123",
    comment: "Setuju banget, pemerintah harus lebih tegas soal ini!",
    article: "Pemprov DKI Bakal Jadikan Pencak Silat Ekskul Wajib di Sekolah",
    articleId: 6,
    time: "5 menit lalu",
  },
  {
    id: 2,
    user: "Budi_Santoso",
    comment: "Wah keren nih, akhirnya ada kebijakan yang mendukung budaya lokal.",
    article: "Pemprov DKI Bakal Jadikan Pencak Silat Ekskul Wajib di Sekolah",
    articleId: 6,
    time: "15 menit lalu",
  },
  {
    id: 3,
    user: "SitiNurhayati",
    comment: "Semoga bisa diterapkan dengan baik ya, jangan sampai setengah-setengah.",
    article: "Pemprov DKI Bakal Jadikan Pencak Silat Ekskul Wajib di Sekolah",
    articleId: 6,
    time: "32 menit lalu",
  },
  {
    id: 4,
    user: "Darmawan88",
    comment: "Ini baru berita bagus, anak-anak perlu mengenal budaya sendiri.",
    article: "Pemprov DKI Bakal Jadikan Pencak Silat Ekskul Wajib di Sekolah",
    articleId: 6,
    time: "45 menit lalu",
  },
]

export default function RecentComments() {
  return (
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
      <div className="bg-blue-700 text-white py-2 px-4">
        <h2 className="font-bold">Komentar Terbaru</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {recentComments.map((item) => (
          <div key={item.id} className="p-3 hover:bg-gray-50">
            <div className="flex items-start gap-2">
              <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-blue-700">{item.user}</span>
                  <span className="text-xs text-gray-500">{item.time}</span>
                </div>
                <p className="text-sm mt-1 line-clamp-2">{item.comment}</p>
                <Link href={`/news/${item.articleId}`} className="text-xs text-gray-500 mt-1 block hover:underline">
                  di: {item.article}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
