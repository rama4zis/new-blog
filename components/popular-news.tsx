import Link from "next/link"
import Image from "next/image"

const popularNews = [
  {
    id: 1,
    title: "Harga BBM Naik Lagi, Ini Daftar Lengkap Harga Terbaru",
    image: "/placeholder.svg?height=80&width=120",
    views: "24.5K",
  },
  {
    id: 2,
    title: "Gempa Magnitudo 5.2 Guncang Sukabumi, Terasa Hingga Jakarta",
    image: "/placeholder.svg?height=80&width=120",
    views: "18.3K",
  },
  {
    id: 3,
    title: "Timnas Indonesia Kalahkan Vietnam 2-1 di Kualifikasi Piala Dunia",
    image: "/placeholder.svg?height=80&width=120",
    views: "15.7K",
  },
  {
    id: 4,
    title: "Menteri Keuangan Umumkan Kebijakan Pajak Baru untuk UMKM",
    image: "/placeholder.svg?height=80&width=120",
    views: "12.9K",
  },
  {
    id: 5,
    title: "Viral! Pria Ini Nikahi 3 Wanita Sekaligus, Begini Ceritanya",
    image: "/placeholder.svg?height=80&width=120",
    views: "10.2K",
  },
]

export default function PopularNews() {
  return (
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
      <div className="bg-blue-700 text-white py-2 px-4">
        <h2 className="font-bold">Berita Populer</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {popularNews.map((item, index) => (
          <Link key={item.id} href={`/news/${item.id}`}>
            <div className="p-3 hover:bg-gray-50 flex gap-3 group">
              <div className="relative flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={120}
                  height={80}
                  className="w-20 h-14 object-cover rounded"
                />
                <div className="absolute top-0 left-0 bg-blue-700 text-white text-xs px-1.5 py-0.5 rounded-br">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium line-clamp-2 group-hover:text-blue-700">{item.title}</h3>
                <div className="text-xs text-gray-500 mt-1">{item.views} dibaca</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
