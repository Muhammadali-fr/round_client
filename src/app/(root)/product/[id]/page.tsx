// next 
import Link from "next/link";

// services 
import { getOneProduct } from "@/src/api/services/products"

// interfaces 
import { ProductProp, SingleProductProp } from "@/src/types/product";

// components 
import ProductView from "./components/Product-view";

export default async function Product({ params }: { params: { id: string } }) {

    // params id 
    const { id } = await params;

    // fetching data 
    const { product, related }: { product: SingleProductProp, related: ProductProp[] } = await getOneProduct(id);

    return (
        <div className="custom-width space-y-5 py-5">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 flex gap-1">
                <Link href="/">Home</Link> / <Link href={`/shop?query=${product.category.name}`}>{product.category.name}</Link> / <p className="line-clamp-1">{product.name}</p>
            </nav>

            {/* Product view  */}
            <ProductView product={product} related={related} />
        </div>
    );
};
