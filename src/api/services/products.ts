
// fetcher function 
import { fetcher, getToken } from "../fetcher";

// get products 
export function getProducts(query?: string) {
    if(!query){
        query = ''
    };
    return fetcher(`/product?search=${query}`, {
        method: 'GET',
    });
}

// get one product 
export function getOneProduct(id: string) {
    return fetcher(`/product/${id}`, {
        method: 'GET'
    });
};

// delete product 
export function deleteProduct(id: string) {
    const token = getToken();
    if (!token) {
        alert('token not found');
    };

    return fetcher(`/product/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};