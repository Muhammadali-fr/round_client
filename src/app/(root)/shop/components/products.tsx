
// interfaces and types 
import { ProductProp } from "@/src/types/product"

// services 
import { getProducts } from "@/src/api/services/products"

// components 
import Card from "@/src/components/Card";

export default async function ShopPageProducts() {

    const data = await getProducts();

    return (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {
                data?.products?.map((item: ProductProp) => (
                    <Card key={item.id} item={item} />
                ))
            }
        </ul>
    )
}