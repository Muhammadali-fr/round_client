
// components 
import Hero from "@/src/components/Hero";
import Products from "@/src/components/Products";

export default function () {
    return (
        <div className="custom-width min-h-[90vh] space-y-5 py-5">
            <Hero/>
            <Products/>
        </div>
    )
}