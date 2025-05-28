import { AuthButtons } from "@/components/auth-button";
import NewsList from "@/components/news-list";
import PopularNews from "@/components/popular-news";
import RecentComments from "@/components/recent-comments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header>
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
            <span className="hidden md:inline font-medium">MENU</span>
          </div>
          <div className="relative w-full max-w-md mx-4">
            <Input type="search" placeholder="Cari berita anda" className="pl-3 pr-10 rounded-full border-gray-300" />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <AuthButtons />
          </div>
        </div>
      </header>

      {/* Logo */}
      <div className="container mx-auto px-4 py-6 flex justify-center">
        <Link href="/">
          <div className="flex items-end">
            <span className="text-5xl font-bold text-blue-800">NewBlog</span>
            <span className="text-5xl font-bold text-red-500">com</span>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="bg-blue-700 text-white">
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="flex space-x-6 py-3 whitespace-nowrap">
            <Link href="#" className="font-medium hover:text-blue-200">
              detikNews
            </Link>
            <Link href="#" className="font-medium hover:text-blue-200">
              detikFinance
            </Link>
            <Link href="#" className="font-medium hover:text-blue-200">
              detikHot
            </Link>
            <Link href="#" className="font-medium hover:text-blue-200">
              detikInet
            </Link>
            <Link href="#" className="font-medium hover:text-blue-200">
              detikSport
            </Link>
            <Link href="#" className="font-medium hover:text-blue-200">
              detikOto
            </Link>
            <Link href="#" className="font-medium hover:text-blue-200">
              detikTravel
            </Link>
            <Link href="#" className="font-medium hover:text-blue-200">
              detikFood
            </Link>
            <Link href="#" className="font-medium hover:text-blue-200">
              detikHealth
            </Link>
            <Link href="#" className="font-medium hover:text-blue-200">
              Wolipop
            </Link>
            <Link href="#" className="font-medium hover:text-blue-200">
              20detik
            </Link>
            <Link href="#" className="font-medium hover:text-blue-200">
              Daerah
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* News Grid */}
            {/* <NewsGrid /> */}

            {/* Featured News */}
            <div className="my-8">
              {/* <FeaturedNews /> */}
            </div>

            {/* Related News */}
            <div className="my-8">
              {/* <h2 className="text-xl font-bold mb-4">Berita Terkait</h2> */}
              {/* <RelatedNews /> */}
            </div>

            {/* News List */}
            <div className="my-8">
              <NewsList />
            </div>
          </div>



          {/* Right Sidebar */}
          <div className="lg:w-80 space-y-6 my-8">
            <PopularNews />
            <RecentComments />
          </div>
        </div>
      </div>
    </main>
  );
}
