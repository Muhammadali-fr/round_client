
// components 
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col justify-start min-h-screen">
            <Header />
            <div className="flex-1">
                {children}
            </div>
            <Footer />
        </div>
    )
}
