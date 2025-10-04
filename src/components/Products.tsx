
// types 
import { ProductProp } from "../types/user";

// services 
import { getProducts } from "../api/services/products"

// next and react 
import Image from "next/image";
import Card from "./Card";

export default async function Products() {

    const products: ProductProp[] = await getProducts();

    if(!products){
        return (
            <div>hatooo</div>
        )
    }

    return (
        <ul className="grid grid-cols-4 gap-5">
            {
                products.map((item: ProductProp) => (
                    <Card key={item.id} item={item}/>
                ))
            }
        </ul>
    )
}