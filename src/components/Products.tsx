
// types 
import { ProductProp } from "../types/user";

// services 
import { getProducts } from "../api/services/products"

export default async function Products() {

    const products:ProductProp[]  = await getProducts();
        
    return (
        <div>
            {
                products.map((item: ProductProp) => (
                    <p>{item.name}</p>
                ))
            }
        </div>
    )
}