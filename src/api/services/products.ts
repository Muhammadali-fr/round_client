
// fetcher function 
import { fetcher } from "../fetcher";

// get user 
export function getProducts() {
    return fetcher('/product', {
        method: 'GET',
    });
}