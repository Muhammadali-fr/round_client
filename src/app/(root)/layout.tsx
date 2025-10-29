
// components 
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <div className="min-h-[90vh]">
                {children}
            </div>
            <Footer />
        </div>
    )
}
