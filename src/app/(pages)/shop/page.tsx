// components 
import Products from "@/src/components/Products";
import SearchInput from "./components/SearchInput";

export default async function Shop() {
    return (
        <div className="custom-width py-5 space-y-5">

            <div className="space-y-2">
                <p className="text-2xl">Search</p>
                <SearchInput/>
            </div>

            <div className="space-y-2">
                <p className="text-2xl">Products</p>

                {/* products  */}
                <ul>
                    <Products />
                </ul>
            </div>
        </div>
    )
}