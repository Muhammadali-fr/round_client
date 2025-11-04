
// components 
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    )
}
