import Navigation from "@/components/nav";
import NewsList from "@/components/news-list";
import PopularNews from "@/components/popular-news";
import RecentComments from "@/components/recent-comments";

export default function Home() {
  return (
    <main className="min-h-screen">
      

      <Navigation />

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
