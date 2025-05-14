import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"

const newsListItems = [
  {
    id: 10,
    title: "Menteri PUPR Tinjau Proyek Tol Trans Sumatera, Target Selesai Akhir 2025",
    category: "detikNews",
    time: "20 menit lalu",
    image: "/placeholder.svg?height=60&width=90",
  },
  {
    id: 11,
    title: "Harga Emas Antam Hari Ini Naik Rp 5.000 per Gram",
    category: "detikFinance",
    time: "32 menit lalu",
    image: "/placeholder.svg?height=60&width=90",
  },
  {
    id: 12,
    title: "Polisi Tangkap Pelaku Penipuan Online yang Rugikan Ratusan Korban",
    category: "detikNews",
    time: "45 menit lalu",
    image: "/placeholder.svg?height=60&width=90",
  },
  {
    id: 13,
    title: "Menkominfo: Internet 5G Akan Digelar di 20 Kota Besar Tahun Ini",
    category: "detikInet",
    time: "1 jam lalu",
    image: "/placeholder.svg?height=60&width=90",
  },
  {
    id: 14,
    title: "Resep Ayam Bakar Madu yang Gurih dan Manis, Cocok untuk Makan Siang",
    category: "detikFood",
    time: "1 jam lalu",
    image: "/placeholder.svg?height=60&width=90",
  },
  {
    id: 15,
    title: "Kemenkes: Kasus DBD Meningkat 15% Dibanding Tahun Lalu",
    category: "detikHealth",
    time: "1 jam lalu",
    image: "/placeholder.svg?height=60&width=90",
  },
  {
    id: 16,
    title: "Daftar Harga Mobil Listrik Terbaru di Indonesia, Mulai Rp 400 Jutaan",
    category: "detikOto",
    time: "2 jam lalu",
    image: "/placeholder.svg?height=60&width=90",
  },
  {
    id: 17,
    title: "Timnas U-23 Indonesia Siap Hadapi Thailand di Final SEA Games",
    category: "detikSport",
    time: "2 jam lalu",
    image: "/placeholder.svg?height=60&width=90",
  },
  {
    id: 18,
    title: "5 Destinasi Wisata Baru di Bali yang Belum Banyak Dikunjungi",
    category: "detikTravel",
    time: "3 jam lalu",
    image: "/placeholder.svg?height=60&width=90",
  },
  {
    id: 19,
    title: "Tren Fashion 2025: Busana Ramah Lingkungan Jadi Pilihan Utama",
    category: "Wolipop",
    time: "3 jam lalu",
    image: "/placeholder.svg?height=60&width=90",
  },
]

export default function NewsList() {
  return (
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
      <div className="bg-blue-700 text-white py-2 px-4">
        <h2 className="font-bold">Berita Terbaru</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {newsListItems.map((item) => (
          <Link key={item.id} href={`/news/${item.id}`}>
            <div className="p-3 hover:bg-gray-50 flex gap-3 group">
              <div className="flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={90}
                  height={60}
                  className="w-[90px] h-[60px] object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium line-clamp-2 group-hover:text-blue-700">{item.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <span className="text-blue-700">{item.category}</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
