
// types 
import { ProductProp } from "../types/product";

// services 
import { getProducts } from "../api/services/products"

// next and react 
import Card from "./Card";

export default async function Products() {

    const {products}: {products: ProductProp[], success: boolean} = await getProducts();

    return (
        <ul className="grid grid-cols-4 gap-5">
            {
                products.map((item: ProductProp) => (
                    <Card key={item.id} item={item}/>
                ))
            }
        </ul>
    );
};