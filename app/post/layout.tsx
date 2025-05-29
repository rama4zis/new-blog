import Navigation from "@/components/nav"

export default function PostLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                {/* Layout UI */}
                {/* Place children where you want to render a page or nested layout */}
                <main className="min-h-screen">
                    <Navigation />
                    {children}
                </main>
            </body>
        </html>
    )
}