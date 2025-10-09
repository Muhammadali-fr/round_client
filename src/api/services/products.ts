
// fetcher function 
import { fetcher } from "../fetcher";

// get products 
export function getProducts() {
    return fetcher('/product', {
        method: 'GET',
    });
}

// get one product 
export function getOneProduct(id: string) {
    return fetcher(`/product/${id}`, {
        method: 'GET'
    });
};