
// interfaces and types 
import { ProductProp } from "@/src/types/product"

// services 
import { getProducts } from "@/src/api/services/products"

// components 
import Card from "@/src/components/Card";

// toast and loaders
import ProductsNotFound from "@/src/components/not-found/Product-not-found";

export default async function ShopPageProducts({ query }: { query: string | undefined }) {

    const data: { products: ProductProp[], success: boolean } = await getProducts(query || '');

    return (
        <div className="space-y-2">
            <p className="text-2xl font-semibold">Products</p>

            {
                data.products.length == 0 ? (
                    <ProductsNotFound />
                ) : (
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {
                            data?.products?.map((item: ProductProp) => (
                                <Card key={item.id} item={item} />  
                            ))
                        }
                    </ul>
                )
            }

        </div>
    )
};