
// components 
import Hero from "@/src/components/Hero";
import Products from "@/src/components/Products";

export default function () {
    return (
        <div className="custom-width min-h-[90vh] space-y-3 py-3">
            <Hero />
            <div className="space-y-2">
                <p className="text-2xl font-semibold">Products</p>
                <Products />
            </div>
        </div>
    )
}